import { useEffect } from 'react';

const WIDGET_SRC = '/openmind-avatar-widget.js';
const AVATAR_EMBED_URL =
  'https://embed.liveavatar.com/v1/64b526e4-741c-43b6-a918-4e40f3261c7a?orientation=horizontal';

// Supabase edge function acts as the widget's backend proxy:
// widget will call `${API_BASE_URL}/api/leads`, `/api/calendar/slots`, etc.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const API_BASE_URL = `${SUPABASE_URL}/functions/v1/avatar-widget`;

/**
 * Wstrzykuje zewnętrzny widget OpenMind Live Avatar (HeyGen) do strony.
 * Widget sam tworzy launcher (`.om-avatar-launcher`) — przycisk „Zapytaj doradcę AI"
 * w hero programatycznie klika ten launcher, żeby otworzyć okno avatara.
 */
export function OpenMindAvatarWidget() {
  useEffect(() => {
    if (document.querySelector('script[data-openmind-avatar-widget="true"]')) return;

    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.dataset.openmindAvatarWidget = 'true';
    script.dataset.clientId = 'openmindai';
    script.dataset.locale = 'pl';
    script.dataset.language = 'pl';
    script.dataset.apiBaseUrl = API_BASE_URL;
    script.dataset.avatarEmbedUrl = AVATAR_EMBED_URL;
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.querySelector('.om-avatar-launcher')?.remove();
      document.querySelector('.om-avatar-widget')?.remove();
      document.getElementById('om-avatar-widget-styles')?.remove();
    };
  }, []);

  return null;
}

export default OpenMindAvatarWidget;
