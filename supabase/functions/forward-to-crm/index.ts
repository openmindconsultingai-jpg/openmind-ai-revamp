import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// CRM webhook URL - hidden from client code
const CRM_WEBHOOK_URL = "https://lmpaoodakxvqcaivximb.supabase.co/functions/v1/webhook-lead-capture";

interface LeadCaptureRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600000; // 1 hour

function checkRateLimit(identifier: string): boolean {
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

// Input validation
function validateInput(data: LeadCaptureRequest): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2 || data.name.length > 100) {
    return { valid: false, error: "Invalid name" };
  }
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@') || data.email.length > 255) {
    return { valid: false, error: "Invalid email" };
  }
  if (data.phone && (typeof data.phone !== 'string' || data.phone.length > 20)) {
    return { valid: false, error: "Invalid phone" };
  }
  if (data.message && (typeof data.message !== 'string' || data.message.length > 1000)) {
    return { valid: false, error: "Invalid message" };
  }
  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: LeadCaptureRequest = await req.json();

    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Rate limit by email
    if (!checkRateLimit(data.email.toLowerCase())) {
      console.log("Rate limit exceeded for CRM forward:", data.email);
      return new Response(
        JSON.stringify({ error: "Too many requests" }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Forwarding lead to CRM for:", data.email);

    // Forward to CRM webhook with a short timeout so an external DNS/webhook issue
    // never keeps the website request hanging for long.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    let crmResponse: Response;

    try {
      crmResponse = await fetch(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          company: '',
          source: 'website_form',
          message: data.message || ''
        })
      });
    } catch (error: any) {
      console.error("CRM webhook unavailable:", error?.message || error);
      return new Response(
        JSON.stringify({ success: false, queued: false, error: "CRM webhook unavailable" }),
        { status: 202, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      console.error("CRM webhook error:", errorText);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to forward to CRM" }),
        { status: 202, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const crmData = await crmResponse.json().catch(() => ({}));
    console.log("CRM forward successful");

    return new Response(
      JSON.stringify({ success: true, data: crmData }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in forward-to-crm function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
