import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit: 10 calls/hour per IP — translate-cities is expensive (max_tokens=8000)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 3600000;
const MAX_CITIES_PER_REQUEST = 10;
const MAX_FIELD_LENGTH = 2000;

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         req.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(id: string): boolean {
  const now = Date.now();
  const rec = rateLimitMap.get(id);
  if (!rec || now > rec.resetTime) {
    rateLimitMap.set(id, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX) return false;
  rec.count++;
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!checkRateLimit(getClientIP(req))) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in 1 hour." }), {
      status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { cities } = await req.json();

    if (!cities || !Array.isArray(cities) || cities.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request: provide cities array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (cities.length > MAX_CITIES_PER_REQUEST) {
      return new Response(JSON.stringify({ error: `Max ${MAX_CITIES_PER_REQUEST} cities per request` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const c of cities) {
      const fields = [c?.opisGospodarki, c?.wyzwaniaAI, c?.czasDojazdu, c?.przykladZastosowania];
      if (fields.some((f) => typeof f === "string" && f.length > MAX_FIELD_LENGTH)) {
        return new Response(JSON.stringify({ error: "Field too long" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build prompt for batch translation
    const cityTexts = cities.map((city: any, i: number) => {
      const faqText = city.faq.map((f: any, j: number) =>
        `    FAQ${j + 1}_Q: ${f.pytanie}\n    FAQ${j + 1}_A: ${f.odpowiedz}`
      ).join("\n");

      return `CITY_${i}:
  nazwa: ${city.nazwa}
  opisGospodarki: ${city.opisGospodarki}
  branzeKluczowe: ${JSON.stringify(city.branzeKluczowe)}
  wyzwaniaAI: ${city.wyzwaniaAI}
  czasDojazdu: ${city.czasDojazdu}
  przykladZastosowania: ${city.przykladZastosowania}
${faqText}`;
    }).join("\n\n");

    const prompt = `Translate the following Polish city data to English. This is for a website about AI consulting services (OpenMind AI Consulting) that operates across Poland.

IMPORTANT RULES:
- Keep proper nouns (city names, company names, university names) unchanged
- Keep "OpenMind AI" unchanged
- Translate naturally, not word-for-word
- Keep the same professional tone
- Return ONLY valid JSON, no markdown, no backticks
- For branzeKluczowe, translate each industry name

Return JSON array where each element has this structure:
{
  "opisGospodarki": "...",
  "branzeKluczowe": ["...", "..."],
  "wyzwaniaAI": "...",
  "czasDojazdu": "...",
  "przykladZastosowania": "...",
  "faq": [{"question": "...", "answer": "..."}]
}

DATA TO TRANSLATE:
${cityTexts}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 8000,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "You are a professional translator. You translate Polish business content to English. Always return ONLY valid JSON arrays. No markdown formatting, no backticks, no explanations.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Clean up potential markdown wrapping
    let cleaned = content.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    // Parse and validate
    const translations = JSON.parse(cleaned);
    
    if (!Array.isArray(translations) || translations.length !== cities.length) {
      console.error(`Expected ${cities.length} translations, got ${Array.isArray(translations) ? translations.length : 'non-array'}`);
      throw new Error("Translation count mismatch");
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(JSON.stringify({ error: "Translation service temporarily unavailable." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
