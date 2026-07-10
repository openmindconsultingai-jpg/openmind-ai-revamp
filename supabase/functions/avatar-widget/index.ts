// Dispatcher backendu widgetu HeyGen Live Avatar (OpenMind AI).
// Obsługuje wszystkie ścieżki `/api/*`, których wymaga skrypt
// `public/openmind-avatar-widget.js`, i podpina je pod istniejącą
// infrastrukturę projektu: `send-contact-email`, `send-booking-confirmation`,
// `booking-availability` oraz tabele `avatar_leads` i `bookings`.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const CLIENT_CONFIG = {
  client_id: "openmindai",
  brand: {
    name: "OpenMind AI",
    advisor_name: "Max",
    launcher_label: "Porozmawiaj z Maxem",
    primary_color: "#0a0f14",
    accent_color: "#00d9b1",
  },
  welcome_message:
    "Cześć, jestem Max z OpenMind AI. Pomogę Ci dobrać wdrożenie AI, automatyzację lub szkolenie dla Twojej firmy. Możesz zapytać o ofertę, widełki cenowe albo od razu umówić bezpłatną konsultację.",
  knowledge: {
    company_overview:
      "OpenMind AI Consulting pomaga firmom, szkołom i instytucjom praktycznie wdrażać sztuczną inteligencję: audyty AI, roadmapy wdrożeń, agentów AI, chatboty, automatyzacje procesów, szkolenia oraz live avatary dla stron internetowych.",
    services: [
      { id: "consulting", name: "Konsulting AI i wdrożenia", description: "Audyt potrzeb, dobór narzędzi, wdrożenie rozwiązań i szkolenie zespołu." },
      { id: "training", name: "Szkolenia AI", description: "Praktyczne wykorzystanie ChatGPT, Claude, Copilot i automatyzacji pracy." },
      { id: "automation", name: "Automatyzacja procesów", description: "Obsługa klienta, raporty, analiza danych i powtarzalne procesy firmowe." },
      { id: "creative_ai", name: "Wideo i obrazy AI", description: "Materiały reklamowe, animacje i content do mediów społecznościowych." },
      { id: "education_ai", name: "AI dla szkół i edukacji", description: "Szkolenia i wdrożenia sztucznej inteligencji dla nauczycieli i instytucji edukacyjnych." },
    ],
  },
  pricing: [
    { id: "audit", label: "Konsultacja / audyt AI", price_from: 500, price_to: 1500, currency: "PLN netto", note: "Pierwszy krok przed wdrożeniem." },
    { id: "training", label: "Szkolenie AI dla zespołu", price_from: 2500, price_to: 8000, currency: "PLN netto", note: "Zależne od liczby osób i zakresu." },
    { id: "automation", label: "Automatyzacja procesu", price_from: 3000, price_to: 12000, currency: "PLN netto", note: "Dla jednego procesu." },
    { id: "agent", label: "Agent AI / integracje", price_from: 10000, price_to: 50000, currency: "PLN netto", note: "Projekty z CRM/bazami danych." },
    { id: "live_avatar", label: "Live avatar / doradca AI", price_from: 8000, price_to: 30000, currency: "PLN netto setup", note: "Plus miesięczne utrzymanie." },
  ],
  lead_capture: {
    required_fields: ["name", "email", "phone", "company", "problem_description"],
    consent_text: "Wyrażam zgodę na kontakt ze strony OpenMind AI w sprawie mojego zapytania.",
    consent_version: "2026-07-06-v1",
  },
  quick_intents: [
    { id: "company", label: "O firmie" },
    { id: "pricing", label: "Ceny" },
    { id: "automation", label: "Automatyzacja" },
    { id: "training", label: "Szkolenia" },
    { id: "meeting", label: "Umów konsultację" },
  ],
  allowed_domains: [
    "https://openmindai.pl",
    "https://www.openmindai.pl",
    "https://openmind-ai-revamp.lovable.app",
  ],
  avatar_embed: {
    provider: "heygen_liveavatar_embed",
    voice_agent: "Max - OpenMind AI",
    url: "https://embed.liveavatar.com/v1/6730a102-8aa9-4634-a921-ef18a5f9697d?orientation=horizontal",
    orientation: "horizontal",
    aspect_ratio: "16/9",
    default_language: "pl",
  },
};

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

function json(status: number, payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

function id(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function isValidEmail(s: unknown): s is string {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 255;
}
function isValidPhone(s: unknown): s is string {
  return typeof s === "string" && s.replace(/\D/g, "").length >= 7 && s.length <= 30;
}

function scoreLead(lead: Record<string, unknown>): "hot" | "warm" | "cold" {
  let p = 0;
  if (lead.intent === "book_meeting") p += 3;
  if (lead.email && lead.phone) p += 3;
  if (/30|miesi|teraz|piln|jak najszybciej/i.test(String(lead.timeline ?? ""))) p += 2;
  if (String(lead.problem_description ?? "").length > 20) p += 2;
  if (lead.budget_range) p += 2;
  if (/firma|agencja|szko/i.test(String(lead.organization_type ?? ""))) p += 1;
  if (!lead.consent_contact) p -= 2;
  if (p >= 8) return "hot";
  if (p >= 4) return "warm";
  return "cold";
}

// Slot ID kodowany deterministycznie: slot_YYYYMMDD_HHMM.
function encodeSlotId(date: string, time: string): string {
  return `slot_${date.replace(/-/g, "")}_${time.replace(":", "")}`;
}
function decodeSlotId(slotId: string): { date: string; time: string } | null {
  const m = /^slot_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})$/.exec(slotId);
  if (!m) return null;
  return { date: `${m[1]}-${m[2]}-${m[3]}`, time: `${m[4]}:${m[5]}` };
}

async function handleConfig(): Promise<Response> {
  return json(200, CLIENT_CONFIG);
}

async function handleAvatarSession(req: Request): Promise<Response> {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const conversationId = id("conv");

  // Wymień sekretny klucz HeyGen na krótkotrwały JWT sesji streamingu.
  const heygenKey = Deno.env.get("HEYGEN_API_KEY");
  let sessionToken = "";
  let tokenError: string | null = null;

  if (!heygenKey) {
    tokenError = "HEYGEN_API_KEY nie jest skonfigurowany.";
  } else {
    try {
      const resp = await fetch("https://api.heygen.com/v1/streaming.create_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": heygenKey,
        },
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        tokenError = `HeyGen ${resp.status}: ${JSON.stringify(data).slice(0, 300)}`;
        console.error("HeyGen create_token failed:", tokenError);
      } else {
        sessionToken = String(data?.data?.token ?? data?.token ?? "");
        if (!sessionToken) {
          tokenError = "Brak pola token w odpowiedzi HeyGen.";
          console.error("HeyGen create_token: missing token", data);
        }
      }
    } catch (e) {
      tokenError = `Wyjątek przy pobieraniu tokenu HeyGen: ${String((e as Error)?.message ?? e)}`;
      console.error(tokenError);
    }
  }

  if (!sessionToken) {
    return json(502, {
      error: "Nie udało się wygenerować tokenu HeyGen.",
      details: tokenError,
    });
  }

  return json(200, {
    provider: "heygen",
    mode: "LIVE",
    conversation_id: conversationId,
    session_id: id("session"),
    session_token: sessionToken,
    sessionToken: sessionToken,
    max_session_duration: 600,
    sdk_start_required: false,
    advisor_name: CLIENT_CONFIG.brand.advisor_name,
    context_id: null,
    echo: { locale: body?.locale ?? "pl" },
  });
}

async function handleLeads(req: Request): Promise<Response> {
  let body: any = {};
  try { body = await req.json(); } catch { return json(400, { error: "Invalid JSON" }); }

  if (!body.consent_contact) return json(422, { error: "Do zapisu danych wymagana jest zgoda na kontakt." });
  if (!isValidEmail(body.email)) return json(422, { error: "Podaj poprawny email." });
  if (!isValidPhone(body.phone)) return json(422, { error: "Podaj poprawny numer telefonu." });

  const consent_text_version = String(body.consent_text_version ?? CLIENT_CONFIG.lead_capture.consent_version);
  const lead_score = scoreLead(body);

  const { data, error } = await supabase
    .from("avatar_leads")
    .insert({
      client_id: String(body.client_id ?? "openmindai"),
      conversation_id: body.conversation_id ? String(body.conversation_id) : null,
      name: String(body.name ?? "").slice(0, 200),
      email: String(body.email),
      phone: String(body.phone),
      company: String(body.company ?? "").slice(0, 200),
      organization_type: String(body.organization_type ?? "").slice(0, 100),
      interest_area: String(body.interest_area ?? "").slice(0, 200),
      problem_description: String(body.problem_description ?? "").slice(0, 4000),
      budget_range: String(body.budget_range ?? "").slice(0, 100),
      timeline: String(body.timeline ?? "").slice(0, 100),
      intent: String(body.intent ?? "lead_capture").slice(0, 50),
      consent_contact: true,
      consent_text_version,
      source_url: String(body.source_url ?? "").slice(0, 500),
      lead_score,
    })
    .select("id")
    .single();

  if (error) {
    console.error("avatar_leads insert error:", error);
    return json(500, { error: "Nie udało się zapisać zapytania." });
  }

  // Powiadom sprzedaż mailem — reuse istniejącej funkcji `send-contact-email`.
  try {
    await supabase.functions.invoke("send-contact-email", {
      body: {
        name: String(body.name ?? "").slice(0, 200) || "Live Avatar",
        email: String(body.email),
        phone: String(body.phone),
        message: [
          `[Live Avatar — ${lead_score.toUpperCase()}] intencja: ${body.intent ?? "lead_capture"}`,
          body.company ? `Firma: ${body.company}` : "",
          body.organization_type ? `Typ organizacji: ${body.organization_type}` : "",
          body.interest_area ? `Obszar: ${body.interest_area}` : "",
          body.budget_range ? `Budżet: ${body.budget_range}` : "",
          body.timeline ? `Timeline: ${body.timeline}` : "",
          body.problem_description ? `\nOpis:\n${body.problem_description}` : "",
          body.source_url ? `\nSource: ${body.source_url}` : "",
        ].filter(Boolean).join("\n").slice(0, 4000),
      },
    });
  } catch (e) {
    console.warn("send-contact-email failed for avatar lead:", e);
  }

  return json(201, {
    lead_id: data!.id,
    lead_score,
    next_step: body.intent === "book_meeting" ? "show_calendar" : "notify_sales",
  });
}

async function handleCalendarSlots(_req: Request): Promise<Response> {
  // Zwróć do 9 najbliższych wolnych slotów w dni robocze (Europe/Warsaw).
  const now = new Date();
  const results: any[] = [];
  const daysToScan = 14;
  const wantedPerDay = 3;

  for (let d = 1; d <= daysToScan && results.length < 9; d++) {
    const dt = new Date(now);
    dt.setDate(now.getDate() + d);
    const weekday = dt.getDay();
    if (weekday === 0 || weekday === 6) continue;
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const { data: booked } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", dateStr)
      .neq("status", "cancelled");
    const taken = new Set((booked ?? []).map((r: any) => String(r.booking_time).slice(0, 5)));
    const free = TIME_SLOTS.filter((t) => !taken.has(t));

    let addedForDay = 0;
    for (const time of free) {
      if (results.length >= 9 || addedForDay >= wantedPerDay) break;
      results.push({
        slot_id: encodeSlotId(dateStr, time),
        start: `${dateStr}T${time}:00`,
        end: `${dateStr}T${time}:30`,
        timezone: "Europe/Warsaw",
        label: `${new Intl.DateTimeFormat("pl-PL", {
          weekday: "long", day: "numeric", month: "long",
        }).format(dt)}, ${time}`,
      });
      addedForDay++;
    }
  }

  return json(200, { slots: results, timezone: "Europe/Warsaw", meeting_duration_minutes: 30 });
}

async function handleCalendarBook(req: Request): Promise<Response> {
  let body: any = {};
  try { body = await req.json(); } catch { return json(400, { error: "Invalid JSON" }); }
  if (!body.slot_id) return json(422, { error: "slot_id jest wymagany." });

  const decoded = decodeSlotId(String(body.slot_id));
  if (!decoded) return json(422, { error: "Nieprawidłowy slot_id." });

  // Znajdź lead w bazie żeby uzupełnić dane do potwierdzenia mailowego.
  let lead: any = null;
  if (body.lead_id) {
    const { data } = await supabase
      .from("avatar_leads")
      .select("*")
      .eq("id", String(body.lead_id))
      .maybeSingle();
    lead = data;
  }

  const clientName = String(body.name ?? lead?.name ?? "").slice(0, 100) || "Klient Live Avatar";
  const clientEmail = String(body.email ?? lead?.email ?? "");
  const clientPhone = String(body.phone ?? lead?.phone ?? "");
  const notes = String(body.notes ?? lead?.problem_description ?? "").slice(0, 1000);

  if (!isValidEmail(clientEmail) || !isValidPhone(clientPhone)) {
    return json(422, { error: "Brak poprawnego emaila lub telefonu — najpierw wypełnij formularz kontaktowy." });
  }

  // Insert bookingu — polityka wymusza walidacje.
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      booking_date: decoded.date,
      booking_time: decoded.time,
      status: "confirmed",
      notes: notes || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("bookings insert error:", error);
    return json(409, { error: "Ten termin jest już zajęty lub dane są niepoprawne.", details: error.message });
  }

  // Wyślij mail potwierdzający (klient + owner).
  try {
    await supabase.functions.invoke("send-booking-confirmation", {
      body: {
        clientName,
        clientEmail,
        clientPhone,
        bookingDate: decoded.date,
        bookingTime: decoded.time,
        notes,
      },
    });
  } catch (e) {
    console.warn("send-booking-confirmation failed:", e);
  }

  return json(201, {
    appointment_id: booking!.id,
    status: "booked",
    confirmation_sent: true,
    booking_date: decoded.date,
    booking_time: decoded.time,
    timezone: "Europe/Warsaw",
  });
}

async function handleHealth(): Promise<Response> {
  return json(200, {
    ok: true,
    service: "openmind-avatar-widget",
    mode: "iframe",
    timestamp: new Date().toISOString(),
  });
}

async function handleReadiness(): Promise<Response> {
  return json(200, {
    ready: true,
    liveavatar_ready: true,
    mode: "iframe",
    checks: {
      client_config: true,
      pricing: true,
      lead_capture: true,
      calendar_provider: "supabase_bookings",
      notifications_provider: "resend",
      webhook_configured: true,
    },
    next_required_for_production: [],
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  // pathname wygląda np. "/avatar-widget/api/leads" — bierzemy sufiks od "/api".
  const idx = url.pathname.indexOf("/api");
  const path = idx >= 0 ? url.pathname.slice(idx) : url.pathname;

  try {
    if (req.method === "GET" && path.startsWith("/api/config")) return await handleConfig();
    if (req.method === "GET" && path.startsWith("/api/health")) return await handleHealth();
    if (req.method === "GET" && path.startsWith("/api/readiness")) return await handleReadiness();
    if (req.method === "GET" && path.startsWith("/api/calendar/slots")) return await handleCalendarSlots(req);
    if (req.method === "POST" && path === "/api/avatar/session") return await handleAvatarSession(req);
    if (req.method === "POST" && path === "/api/leads") return await handleLeads(req);
    if (req.method === "POST" && path === "/api/calendar/book") return await handleCalendarBook(req);

    return json(404, { error: "Not found", path });
  } catch (e) {
    console.error("avatar-widget dispatcher error:", e);
    return json(500, { error: "Internal error", message: String((e as Error)?.message ?? e) });
  }
});
