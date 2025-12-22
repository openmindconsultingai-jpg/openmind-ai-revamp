import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

  try {
    const { messages, generatePdf } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // If generating PDF, return structured response
    if (generatePdf) {
      const pdfResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-pro-preview",
          messages: [
            { 
              role: "system", 
              content: `Na podstawie poprzedniej rozmowy, wyodrębnij i podsumuj wszystkie zaproponowane zastosowania AI. 
              Odpowiedz w formacie JSON:
              {
                "title": "Twoje spersonalizowane zastosowania AI",
                "applications": [
                  {
                    "name": "Nazwa zastosowania",
                    "description": "Krótki opis korzyści",
                    "benefit": "Główna korzyść"
                  }
                ],
                "nextSteps": "Zachęta do kontaktu z OpenMind AI Consulting"
              }`
            },
            ...messages,
          ],
        }),
      });

      if (!pdfResponse.ok) {
        const errorText = await pdfResponse.text();
        console.error("AI gateway error for PDF:", pdfResponse.status, errorText);
        throw new Error("Failed to generate PDF content");
      }

      const pdfData = await pdfResponse.json();
      return new Response(JSON.stringify({ 
        type: "pdf",
        content: pdfData.choices[0].message.content 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
        model: "google/gemini-3-pro-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Błąd serwera AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI Advisor error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Nieznany błąd" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
