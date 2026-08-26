import { useCallback, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const CONFIG_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recaptcha-config`;

let siteKeyPromise: Promise<string | null> | null = null;
let scriptPromise: Promise<void> | null = null;

/** Publiczny site key pobierany raz z backendu (nie wymaga rebuildu przy zmianie klucza). */
function loadSiteKey(): Promise<string | null> {
  if (!siteKeyPromise) {
    siteKeyPromise = fetch(CONFIG_URL, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    })
      .then((r) => r.json())
      .then((d) => (typeof d?.siteKey === 'string' && d.siteKey ? d.siteKey : null))
      .catch(() => null);
  }
  return siteKeyPromise;
}

/** Leniwe wstrzyknięcie skryptu Google — dopiero przy pierwszym użyciu. */
function loadScript(siteKey: string): Promise<void> {
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('recaptcha script failed'));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * Zwraca funkcję generującą token reCAPTCHA v3 dla danej akcji.
 * Zwraca null, gdy reCAPTCHA nie jest skonfigurowana lub niedostępna
 * (backend działa wtedy w trybie fail-open, więc formularze nadal działają).
 */
export function useRecaptcha() {
  const pendingRef = useRef<Promise<string | null> | null>(null);

  const getToken = useCallback(async (action: string): Promise<string | null> => {
    try {
      const siteKey = await loadSiteKey();
      if (!siteKey) return null;
      await loadScript(siteKey);
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) return null;
      await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
      return await grecaptcha.execute(siteKey, { action });
    } catch {
      return null;
    }
  }, []);

  /** Wymusza pojedyncze równoległe wywołanie (przydatne przy szybkim klikaniu). */
  const getTokenOnce = useCallback(
    (action: string) => {
      if (!pendingRef.current) {
        pendingRef.current = getToken(action).finally(() => {
          pendingRef.current = null;
        });
      }
      return pendingRef.current;
    },
    [getToken],
  );

  return { getToken, getTokenOnce };
}

export default useRecaptcha;
