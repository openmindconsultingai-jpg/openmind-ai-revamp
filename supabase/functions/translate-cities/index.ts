import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cities } = await req.json();

    if (!cities || !Array.isArray(cities) || cities.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request: provide cities array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
