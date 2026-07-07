// Mint short-lived HeyGen Streaming Avatar session tokens.
// Public endpoint (widget is embedded on external sites). No JWT verification.
// The HeyGen API key stays server-side; only a short-lived token reaches the browser.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("HEYGEN_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "HEYGEN_API_KEY not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const res = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const raw = await res.text();
    if (!res.ok) {
      console.error("HeyGen create_token failed", res.status, raw);
      return new Response(
        JSON.stringify({ error: "heygen_error", status: res.status, detail: raw.slice(0, 500) }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let payload: any = {};
    try { payload = JSON.parse(raw); } catch { /* ignore */ }
    const token = payload?.data?.token ?? payload?.token;
    if (!token) {
      return new Response(
        JSON.stringify({ error: "no_token_in_response", detail: raw.slice(0, 500) }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        token,
        // HeyGen tokens are short-lived; the SDK will refresh via a new call.
        expires_in: 900,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("heygen-token unexpected error", err);
    return new Response(
      JSON.stringify({ error: "internal_error", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
