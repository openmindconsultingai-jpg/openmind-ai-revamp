import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

// Input validation
function validateContactInput(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') return { valid: false, error: "Invalid request" };
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.length > 100) {
    return { valid: false, error: "Name must be 2-100 characters" };
  }
  if (!data.email || typeof data.email !== 'string' || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || data.email.length > 255) {
    return { valid: false, error: "Invalid email address" };
  }
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 1 || data.message.length > 2000) {
    return { valid: false, error: "Message must be 1-2000 characters" };
  }
  if (data.phone && (typeof data.phone !== 'string' || data.phone.length > 20)) {
    return { valid: false, error: "Invalid phone number" };
  }
  return { valid: true };
}

// Simple in-memory rate limiting (per function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600000;

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();

    // Validate input
    const validation = validateContactInput(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, message } = data;

    // Rate limit check
    if (!checkRateLimit(email.toLowerCase())) {
      console.log("Rate limit exceeded for contact email");
      return new Response(
        JSON.stringify({ error: "Zbyt wiele wiadomości. Spróbuj ponownie później." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending contact email");

    // Sanitize all user inputs
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || '');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const emailResponse = await resend.emails.send({
      from: "OpenMind AI <onboarding@resend.dev>",
      to: ["biuro@openmindai.pl"],
      replyTo: email,
      subject: `Nowa wiadomość od ${safeName}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Telefon:</strong> ${safePhone}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Nie udało się wysłać wiadomości. Spróbuj ponownie." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
