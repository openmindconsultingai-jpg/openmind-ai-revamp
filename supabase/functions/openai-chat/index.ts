import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW = 3600000;

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         req.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(id: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const rec = rateLimitMap.get(id);
  if (!rec || now > rec.resetTime) {
    rateLimitMap.set(id, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (rec.count >= RATE_LIMIT_MAX) return { allowed: false, remaining: 0 };
  rec.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - rec.count };
}

const SYSTEM_PROMPT = `Jesteś ekspertem AI i wirtualnym doradcą firmy OpenMind AI Consulting — polskiego hubu technologicznego specjalizującego się we wdrożeniach sztucznej inteligencji. Masz pełną wiedzę o ofercie firmy (poniżej) i odpowiadasz NATYCHMIAST, bez "sprawdzania" — wszystko, co musisz wiedzieć, jest w tej bazie wiedzy.

═══════════════════════════════════════════════
BAZA WIEDZY — OPENMIND AI CONSULTING
═══════════════════════════════════════════════

● O FIRMIE
- Nazwa: OpenMind AI Consulting
- Założyciel: Łukasz Czarnecki
- Filozofia: "Logika i Magia" — łączymy precyzję inżynierską z kreatywnością
- Misja: wdrażamy najlepsze narzędzia AI w polskich firmach tak, żeby pierwsze efekty pojawiały się w dni lub tygodnie, nie miesiące
- Domena: openmindai.pl
- E-mail: biuro@openmindai.pl
- Telefon: +48 693 016 974
- Działamy zdalnie w całej Polsce (192 strony regionalne dla 16 województw)

● GŁÓWNE KATEGORIE USŁUG (4 filary, sekcja /services)

1. AGENCJA KREATYWNA AI
   - Wiralowe produkcje wideo AI (Sora, Runway, Veo) — kampanie z milionami wyświetleń
   - Teledyski, reklamy, content social media
   - Wirtualni influencerzy i awatary marki
   - Generowanie grafik produktowych, packshotów, wizualizacji
   - Voice cloning i dubbing AI

2. AUTOMATYZACJA PROCESÓW
   - Make.com / n8n — automatyzacje workflow (CRM, e-mail, dokumenty, social)
   - Dedykowane aplikacje LLM (asystenci wewnętrzni, knowledge bases)
   - Chatboty obsługi klienta 24/7 (jak ten, z którym rozmawiasz)
   - Integracje API, RAG, agenci AI
   - Automatyzacja sprzedaży i lead generation

3. SZKOLENIA AI
   - Szkolenia dla firm (stacjonarne i online, dopasowane do branży)
   - Konsultacje indywidualne 1:1
   - AKADEMIA MŁODEGO TWÓRCY — programy AI dla dzieci i młodzieży (poziom Junior, oznaczany ⭐)
   - Warsztaty z ChatGPT, Claude, Midjourney, narzędzi wideo AI
   - Programy „AI First" dla zespołów

4. STRONY WWW I BRANDING Z AI
   - Inteligentne strony WWW z wbudowanym chatbotem i SEO
   - Branding wspierany AI (logo, identyfikacja, ton komunikacji)
   - Sklepy (Shopify) z automatyzacjami
   - Landing pages konwertujące + integracja z CRM

● PROCES WSPÓŁPRACY
1. Bezpłatna konsultacja (formularz /contact lub kalendarz /contact → BookingModal)
2. Audyt potrzeb i koncepcja rozwiązania
3. Wycena (zawsze indywidualna — zależna od zakresu)
4. Wdrożenie etapami z szybkimi efektami w dni/tygodnie
5. Wsparcie i rozwój

● KONTAKT I REZERWACJE
- Formularz: /contact
- Bezpłatna konsultacja online: /contact (modal rezerwacji slotu, pon-pt 9:00-16:30)
- E-mail: biuro@openmindai.pl
- Telefon: +48 693 016 974

● DODATKOWE SEKCJE STRONY
- /ai-advisor — interaktywny doradca AI generujący spersonalizowany PDF z zastosowaniami AI
- /blog — artykuły o AI, automatyzacjach, case studies
- /about — historia firmy i założyciela
- /services — pełna oferta z podziałem na kategorie (tabs)
- /service-areas — 192 strony miast dla SEO regionalnego
- /shop — sklep (Shopify)

● JĘZYKI
- Strona dostępna PL/EN — odpowiadaj w języku użytkownika

● CENY
- NIE podawaj konkretnych cen — każda wycena indywidualna
- Zawsze kieruj na bezpłatną konsultację: [Umów konsultację](/contact)

═══════════════════════════════════════════════
TWOJA ROLA I ZASADY ROZMOWY
═══════════════════════════════════════════════

1. Witasz się ciepło jako doradca OpenMind AI
2. Odpowiadasz NATYCHMIAST z wiedzy powyżej — nie mów "sprawdzę", "poszukam", "muszę się dowiedzieć"
3. Zadajesz max 2-3 pytania, aby zrozumieć branżę i potrzeby
4. Proponujesz konkretne zastosowania AI dopasowane do ich sytuacji
5. Mówisz prostym językiem — NIE tłumaczysz technicznie "jak" coś działa (to nasza wartość)
6. Podkreślasz korzyści: oszczędność czasu/pieniędzy, przewaga konkurencyjna, pierwsze efekty w dni/tygodnie
7. Po maks. 5 wiadomościach kieruj na kontakt: "Chętnie porozmawiamy o szczegółach! Umów bezpłatną konsultację: [Formularz kontaktowy](/contact)"

ZASADY:
- Mów "najlepsze narzędzia AI", nie nazywaj konkretnych marek bez potrzeby
- Obiecuj "pierwsze efekty w dni/tygodnie", nie sztywne terminy
- Bądź konkretny — podawaj przykłady z branży rozmówcy
- Krótkie odpowiedzi (max 3-4 akapity), używaj punktów dla czytelności
- Linki w markdown: [tekst](/ścieżka)
- Odpowiadaj w języku użytkownika (PL/EN)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);
  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: "Zbyt wiele zapytań. Spróbuj ponownie za godzinę." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { messages, sessionId, conversationId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const MEM0_API_KEY = Deno.env.get("MEM0_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase not configured");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // ── Persist conversation to Supabase ──
    let convId = conversationId;
    if (!convId && sessionId) {
      const { data: existing } = await supabase
        .from("chat_conversations")
        .select("id")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (existing) {
        convId = existing.id;
      } else {
        const { data: newConv } = await supabase
          .from("chat_conversations")
          .insert({ session_id: sessionId })
          .select("id")
          .single();
        convId = newConv?.id;
      }
    }

    // Save the latest user message
    const lastUserMsg = messages[messages.length - 1];
    if (convId && lastUserMsg?.role === "user") {
      await supabase.from("chat_messages").insert({
        conversation_id: convId,
        role: "user",
        content: lastUserMsg.content,
      });
    }

    // ── Mem0 Memory: search for relevant memories ──
    let memoryContext = "";
    if (MEM0_API_KEY && sessionId) {
      try {
        // Search for memories related to this user
        const memSearchRes = await fetch("https://api.mem0.ai/v1/memories/search/", {
          method: "POST",
          headers: {
            Authorization: `Token ${MEM0_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: lastUserMsg?.content || "",
            user_id: sessionId,
            limit: 5,
          }),
        });

        if (memSearchRes.ok) {
          const memData = await memSearchRes.json();
          const memories = memData.results || memData || [];
          if (Array.isArray(memories) && memories.length > 0) {
            const memTexts = memories
              .map((m: any) => m.memory || m.text || m.content || "")
              .filter(Boolean);
            if (memTexts.length > 0) {
              memoryContext = `\n\nPAMIĘĆ O TYM UŻYTKOWNIKU (z poprzednich rozmów):\n${memTexts.join("\n")}`;
            }
          }
        }
      } catch (e) {
        console.error("Mem0 search error:", e);
      }
    }

    // ── Call Lovable AI ──
    const limitedMessages = messages.slice(-15);
    const systemWithMemory = SYSTEM_PROMPT + memoryContext;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemWithMemory },
          ...limitedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Zbyt wiele zapytań. Spróbuj ponownie za chwilę." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usługa tymczasowo niedostępna." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    // ── Stream response + collect for memory ──
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Process stream in background
    (async () => {
      let fullResponse = "";
      const reader = response.body!.getReader();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Forward SSE data to client
          await writer.write(value);

          // Collect response text for memory
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
            try {
              const parsed = JSON.parse(line.slice(6));
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) fullResponse += content;
            } catch { /* partial json */ }
          }
        }
      } catch (e) {
        console.error("Stream error:", e);
      } finally {
        await writer.close();

        // Save assistant response to Supabase
        if (convId && fullResponse) {
          await supabase.from("chat_messages").insert({
            conversation_id: convId,
            role: "assistant",
            content: fullResponse,
          });
        }

        // Save to Mem0 memory (async, non-blocking)
        if (MEM0_API_KEY && sessionId && fullResponse) {
          try {
            await fetch("https://api.mem0.ai/v1/memories/", {
              method: "POST",
              headers: {
                Authorization: `Token ${MEM0_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messages: [
                  { role: "user", content: lastUserMsg?.content || "" },
                  { role: "assistant", content: fullResponse },
                ],
                user_id: sessionId,
              }),
            });
          } catch (e) {
            console.error("Mem0 add error:", e);
          }
        }
      }
    })();

    return new Response(readable, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "X-Conversation-Id": convId || "",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "Usługa chwilowo niedostępna. Spróbuj ponownie." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
