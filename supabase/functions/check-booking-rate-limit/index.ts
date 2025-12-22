import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_BOOKINGS_PER_HOUR = 3;
const MAX_BOOKINGS_PER_DAY = 5;

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientEmail } = await req.json();
    
    if (!clientEmail) {
      return new Response(
        JSON.stringify({ error: "Missing clientEmail" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = clientEmail.trim().toLowerCase();
    
    console.log('Checking rate limit for:', normalizedEmail);
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Sprawdź limit godzinowy
    const { count: hourlyCount, error: hourlyError } = await supabase
      .from('booking_rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('client_identifier', normalizedEmail)
      .gte('created_at', oneHourAgo.toISOString());

    if (hourlyError) {
      console.error('Hourly count error:', hourlyError);
    }

    // Sprawdź limit dzienny
    const { count: dailyCount, error: dailyError } = await supabase
      .from('booking_rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('client_identifier', normalizedEmail)
      .gte('created_at', oneDayAgo.toISOString());

    if (dailyError) {
      console.error('Daily count error:', dailyError);
    }

    console.log('Rate limits - hourly:', hourlyCount, 'daily:', dailyCount);

    if ((hourlyCount || 0) >= MAX_BOOKINGS_PER_HOUR) {
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: "hourly_limit", 
          message: "Przekroczono limit rezerwacji w ciągu godziny. Spróbuj ponownie później." 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if ((dailyCount || 0) >= MAX_BOOKINGS_PER_DAY) {
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          reason: "daily_limit", 
          message: "Przekroczono dzienny limit rezerwacji. Spróbuj ponownie jutro." 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Dodaj wpis rate limit
    const { error: insertError } = await supabase
      .from('booking_rate_limits')
      .insert({ client_identifier: normalizedEmail });

    if (insertError) {
      console.error('Insert rate limit error:', insertError);
    }

    return new Response(
      JSON.stringify({ allowed: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Rate limit error:', error);
    // W przypadku błędu, pozwól na rezerwację
    return new Response(
      JSON.stringify({ allowed: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
