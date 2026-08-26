// Wspólna weryfikacja Google reCAPTCHA v3 + "paszport sesji" dla czatów.
// Paszport = podpisany HMAC-SHA256 token, dzięki któremu jedna weryfikacja
// wystarcza na całą konwersację (bez odpytywania Google przy każdej wiadomości).

const SECRET = Deno.env.get("RECAPTCHA_SECRET_KEY");
const SCORE_THRESHOLD = 0.5;
const PASS_TTL_MS = 2 * 60 * 60 * 1000; // 2h

export interface RecaptchaResult {
  ok: boolean;
  status: number;
  error?: string;
  score?: number;
}

const OK: RecaptchaResult = { ok: true, status: 200 };

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET ?? "dev"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return b64url(new Uint8Array(sig));
}

/** Weryfikuje token reCAPTCHA v3 u Google. Fail-open, gdy brak sekretu. */
export async function verifyRecaptcha(
  token: unknown,
  expectedAction: string,
  remoteIp?: string,
): Promise<RecaptchaResult> {
  if (!SECRET) {
    console.warn("RECAPTCHA_SECRET_KEY not configured — skipping verification");
    return OK;
  }

  if (typeof token !== "string" || token.length < 20 || token.length > 4000) {
    return { ok: false, status: 403, error: "Weryfikacja reCAPTCHA nie powiodła się. Odśwież stronę i spróbuj ponownie." };
  }

  try {
    const params = new URLSearchParams({ secret: SECRET, response: token });
    if (remoteIp && remoteIp !== "unknown") params.set("remoteip", remoteIp);

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await res.json() as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn("reCAPTCHA rejected:", data["error-codes"]);
      return { ok: false, status: 403, error: "Weryfikacja reCAPTCHA nie powiodła się. Odśwież stronę i spróbuj ponownie." };
    }
    if (data.action && data.action !== expectedAction) {
      console.warn("reCAPTCHA action mismatch:", data.action, "!=", expectedAction);
      return { ok: false, status: 403, error: "Weryfikacja reCAPTCHA nie powiodła się. Odśwież stronę i spróbuj ponownie." };
    }
    const score = typeof data.score === "number" ? data.score : 0;
    if (score < SCORE_THRESHOLD) {
      console.warn("reCAPTCHA low score:", score);
      return {
        ok: false,
        status: 403,
        error: "Twoje żądanie zostało uznane za automatyczne. Skontaktuj się z nami mailowo: biuro@openmindai.pl",
        score,
      };
    }
    return { ...OK, score };
  } catch (e) {
    console.error("reCAPTCHA verification error:", e);
    // Awaria Google nie może blokować realnych klientów.
    return OK;
  }
}

/** Wydaje paszport sesji ważny PASS_TTL_MS. */
export async function issueSessionPass(scope: string): Promise<string> {
  const payload = `${scope}.${Date.now() + PASS_TTL_MS}`;
  return `${payload}.${await hmac(payload)}`;
}

/** Sprawdza paszport sesji (bez odpytywania Google). */
export async function verifySessionPass(pass: unknown, scope: string): Promise<boolean> {
  if (typeof pass !== "string") return false;
  const parts = pass.split(".");
  if (parts.length !== 3) return false;
  const [passScope, expStr, sig] = parts;
  if (passScope !== scope) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return sig === (await hmac(`${passScope}.${expStr}`));
}

/**
 * Ochrona konwersacji: jedna weryfikacja reCAPTCHA na rozpoczętą rozmowę.
 * Zwraca nowy paszport, gdy weryfikacja właśnie się powiodła.
 */
export async function guardChatSession(
  body: { recaptchaToken?: unknown; recaptchaPass?: unknown },
  scope: string,
  remoteIp?: string,
): Promise<RecaptchaResult & { pass?: string }> {
  if (!SECRET) return OK;

  if (await verifySessionPass(body.recaptchaPass, scope)) return OK;

  const result = await verifyRecaptcha(body.recaptchaToken, scope, remoteIp);
  if (!result.ok) return result;
  return { ...result, pass: await issueSessionPass(scope) };
}
