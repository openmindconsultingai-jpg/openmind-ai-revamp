import { useCallback, useEffect, useRef } from 'react';
import { RECAPTCHA_SITE_KEY } from '@/config/recaptcha';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

/** Leniwe wstrzyknięcie skryptu Google — dopiero przy pierwszym użyciu. */
function loadScript(): Promise<void> {
  if (window.grecaptcha) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-openmind-recaptcha]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('recaptcha script failed')), { once: true });
        return;
      }

      const s = document.createElement('script');
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
      s.async = true;
      s.defer = true;
      s.dataset.openmindRecaptcha = 'true';
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error('recaptcha script failed'));
      };
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

  // Chronione komponenty montują bibliotekę od razu, aby była gotowa przed wysyłką.
  useEffect(() => {
    void loadScript().catch((error) => {
      console.error('[reCAPTCHA] Nie udało się załadować skryptu:', error);
    });
  }, []);

  const getToken = useCallback(async (action: string): Promise<string | null> => {
    try {
      await loadScript();
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) throw new Error('window.grecaptcha is unavailable');
      await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
      const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      // Tymczasowy log diagnostyczny: nie ujawnia treści tokenu.
      console.info('[reCAPTCHA] Token wygenerowany', { action, tokenLength: token.length });
      return token;
    } catch (error) {
      console.error('[reCAPTCHA] Generowanie tokenu nie powiodło się:', error);
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
