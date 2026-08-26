import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Zwraca PUBLICZNY site key reCAPTCHA v3 (bezpieczny do ujawnienia w przeglądarce).
serve((req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const siteKey = Deno.env.get("RECAPTCHA_SITE_KEY") ?? null;

  return new Response(JSON.stringify({ siteKey }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
