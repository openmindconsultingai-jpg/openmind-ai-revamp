import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting as backup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3; // Max 3 bookings per email per day
const RATE_LIMIT_WINDOW = 86400000; // 24 hours in milliseconds

function checkMemoryRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientEmail } = await req.json();
    
    if (!clientEmail) {
      return new Response(
        JSON.stringify({ allowed: false, error: "Missing client email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = clientEmail.toLowerCase().trim();
    console.log('Rate limit check for:', normalizedEmail);
    
    // Check in-memory rate limit
    const allowed = checkMemoryRateLimit(normalizedEmail);
    
    if (!allowed) {
      console.log('Rate limit exceeded for:', normalizedEmail);
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          error: "Przekroczono limit rezerwacji. Spróbuj ponownie za 24 godziny." 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Also check database for persistent rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Count bookings from this email in last 24 hours
    const oneDayAgo = new Date(Date.now() - RATE_LIMIT_WINDOW).toISOString();
    
    const { count, error } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('client_email', normalizedEmail)
      .gte('created_at', oneDayAgo);

    if (error) {
      console.error('Database rate limit check error:', error);
      // Allow if DB check fails, rely on memory limit
      return new Response(
        JSON.stringify({ allowed: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (count !== null && count >= RATE_LIMIT_MAX) {
      console.log('Database rate limit exceeded for:', normalizedEmail, 'count:', count);
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          error: "Przekroczono limit rezerwacji. Spróbuj ponownie za 24 godziny." 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ allowed: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Rate limit error:', error);
    return new Response(
      JSON.stringify({ allowed: false, error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
