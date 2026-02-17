import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting - max requests per IP per hour
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 50;
const RATE_LIMIT_WINDOW = 3600000;

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

// Input validation
function validateMessages(messages: unknown): { valid: boolean; error?: string; data?: Array<{ role: string; content: string }> } {
  if (!messages || !Array.isArray(messages)) {
    return { valid: false, error: "Invalid request format: messages must be an array" };
  }
  if (messages.length === 0 || messages.length > 50) {
    return { valid: false, error: "Messages array must have 1-50 items" };
  }
  const validRoles = new Set(["user", "assistant", "system"]);
  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') {
      return { valid: false, error: "Each message must be an object" };
    }
    if (!validRoles.has(msg.role)) {
      return { valid: false, error: "Invalid message role" };
    }
    if (typeof msg.content !== 'string' || msg.content.length === 0 || msg.content.length > 4000) {
      return { valid: false, error: "Message content must be 1-4000 characters" };
    }
  }
  return { valid: true, data: messages as Array<{ role: string; content: string }> };
}

const SYSTEM_PROMPT = `Jesteś wirtualnym doradcą AI od OpenMind AI Consulting - ekspertem w znajdowaniu kreatywnych zastosowań sztucznej inteligencji w biznesie, życiu codziennym, edukacji i innych dziedzinach.

TWOJA ROLA:
- Zadajesz maksymalnie 5 strategicznych pytań, aby zrozumieć sytuację, potrzeby i wyzwania rozmówcy
- Po zebraniu wystarczających informacji, przedstawiasz maksymalnie 10 kreatywnych zastosowań AI dopasowanych do ich sytuacji
- Mówisz prostym językiem, jak do laika - NIGDY nie tłumaczysz technicznie jak coś zrobić
- Jesteś perswazyjny i zachęcasz do kontaktu przez formularz w celu stworzenia konceptu

ZASADY:
1. Pytania zadawaj pojedynczo, nie wszystkie naraz
2. Bądź ciepły, przyjazny i entuzjastyczny
3. Każde zastosowanie AI opisuj w kontekście KORZYŚCI dla użytkownika (oszczędność czasu, pieniędzy, lepsza jakość życia, przewaga konkurencyjna)
4. NIGDY nie mów jak technicznie to zrobić - to nasza tajemnica i wartość, którą oferujemy
5. Po przedstawieniu zastosowań, zaproponuj umówienie bezpłatnej konsultacji przez formularz kontaktowy
6. Możesz zaproponować wygenerowanie PDF z podsumowaniem zastosowań

STRUKTURA ROZMOWY:
1. Powitanie i pierwsze pytanie o obszar zainteresowania (biznes/życie osobiste/edukacja/inne)
2. Pytania pogłębiające (max 4 dodatkowe) - dostosowane do odpowiedzi
3. Przedstawienie 5-10 kreatywnych zastosowań AI
4. Zachęta do kontaktu

PRZYKŁADOWE OBSZARY ZASTOSOWAŃ (dla inspiracji):
- Automatyzacja powtarzalnych zadań
- Personalizacja doświadczeń klientów
- Analiza danych i wyciąganie wniosków
- Tworzenie treści marketingowych
- Asystenci wirtualni
- Optymalizacja procesów
- Edukacja i rozwój osobisty
- Zdrowie i wellness
- Produktywność osobista
- Komunikacja i języki

Rozpocznij rozmowę od ciepłego powitania i pierwszego pytania.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);
  const rateCheck = checkRateLimit(clientIP);
  
  if (!rateCheck.allowed) {
    console.log("Rate limit exceeded for IP:", clientIP);
    return new Response(JSON.stringify({ 
      error: "Zbyt wiele zapytań. Spróbuj ponownie za godzinę." 
    }), {
      status: 429,
      headers: { 
        ...corsHeaders, 
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": "0"
      },
    });
  }

  try {
    const body = await req.json();
    const { generatePdf } = body;
    
    // Validate messages
    const validation = validateMessages(body.messages);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const limitedMessages = validation.data!.slice(-20);
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Usługa tymczasowo niedostępna." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (generatePdf) {
      console.log("Generating PDF with messages count:", limitedMessages.length);
      
      const transcript = limitedMessages
        .map((m) => `${m.role === "user" ? "Użytkownik" : "Doradca AI"}: ${String(m.content || "").trim()}`)
        .join("\n\n");

      const pdfResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          max_tokens: 1400,
          messages: [
            {
              role: "system",
              content:
                "Jesteś asystentem, który tworzy raport. ZAWSZE zwracasz WYŁĄCZNIE poprawny JSON (bez markdown, bez backticks, bez dodatkowych zdań).",
            },
            {
              role: "user",
              content: `Na podstawie poniższej transkrypcji rozmowy wyodrębnij wszystkie konkretne zastosowania AI, które zostały zaproponowane (lista ma być kompletna).\n\nZwróć JSON o strukturze:\n{\n  \"title\": \"Twoje spersonalizowane zastosowania AI\",\n  \"summary\": \"2-3 zdania podsumowania sytuacji\",\n  \"applications\": [\n    {\n      \"name\": \"...\",\n      \"description\": \"...\",\n      \"benefit\": \"...\"\n    }\n  ],\n  \"nextSteps\": \"Wezwanie do kontaktu\"\n}\n\nTRANSKRYPCJA:\n${transcript}`,
            },
          ],
        }),
      });

      if (!pdfResponse.ok) {
        console.error("AI gateway error for PDF:", pdfResponse.status);
        return new Response(JSON.stringify({ error: "Nie udało się wygenerować raportu." }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const pdfData = await pdfResponse.json();
      const content = pdfData.choices?.[0]?.message?.content || "";
      
      if (!content) {
        console.error("Empty content from AI response");
        return new Response(JSON.stringify({ error: "Nie udało się wygenerować raportu." }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ 
        type: "pdf",
        content: content 
      }), {
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(rateCheck.remaining)
        },
      });
    }

    // Regular streaming chat
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...limitedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Zbyt wiele zapytań. Spróbuj ponownie za chwilę." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usługa tymczasowo niedostępna. Spróbuj później." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", response.status);
      return new Response(JSON.stringify({ error: "Błąd serwera AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "X-RateLimit-Remaining": String(rateCheck.remaining)
      },
    });
  } catch (error) {
    console.error("AI Advisor error:", error);
    return new Response(JSON.stringify({ error: "Wystąpił błąd. Spróbuj ponownie." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
