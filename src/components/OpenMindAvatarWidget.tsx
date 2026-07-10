import { useCallback, useEffect, useRef, useState } from 'react';
import {
  LiveAvatarSession,
  SessionEvent,
  AgentEventsEnum,
  VoiceChatState,
  SessionInteractivityMode,
} from '@heygen/liveavatar-web-sdk';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const API_BASE_URL = `${SUPABASE_URL}/functions/v1/avatar-widget`;

type ChatMessage = { role: 'user' | 'avatar' | 'system'; text: string; id: string };
type Status =
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'user-speaking'
  | 'processing'
  | 'avatar-speaking'
  | 'muted'
  | 'error'
  | 'disconnected';

const STATUS_LABEL: Record<Status, string> = {
  idle: 'Gotowy',
  connecting: 'Łączenie…',
  listening: 'Słucham…',
  'user-speaking': 'Słucham…',
  processing: 'Przetwarzam…',
  'avatar-speaking': 'Max odpowiada…',
  muted: 'Mikrofon wyciszony',
  error: 'Błąd',
  disconnected: 'Rozłączony',
};

async function ensureLiveAvatarListening(session: LiveAvatarSession | null) {
  if (!session) return false;
  try {
    if (session.voiceChat?.state !== VoiceChatState.ACTIVE) {
      await session.voiceChat.start({
        mode: SessionInteractivityMode.CONVERSATIONAL,
        defaultMuted: false,
      });
    }
    if (session.voiceChat?.isMuted) {
      await session.voiceChat.unmute();
    }
    if (typeof (session as any).startListening === 'function') {
      (session as any).startListening();
    }
    return true;
  } catch (error) {
    console.warn('Could not start LiveAvatar listening', error);
    return false;
  }
}

export function OpenMindAvatarWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'avatar',
      text:
        'Cześć, jestem Max z OpenMind AI. Kliknij „Połącz głos", żebym mógł Cię usłyszeć i odpowiedzieć.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [connected, setConnected] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sessionRef = useRef<LiveAvatarSession | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const addMessage = useCallback((role: ChatMessage['role'], text: string) => {
    if (!text?.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, role, text: text.trim() },
    ]);
  }, []);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Otwieranie widgetu przez zewnętrzne przyciski `[data-open-avatar]` lub `.om-avatar-launcher`.
  useEffect(() => {
    const handler = () => setOpen(true);
    const launcherEls = document.querySelectorAll<HTMLElement>('[data-open-avatar], .om-avatar-launcher');
    launcherEls.forEach((el) => el.addEventListener('click', handler));
    return () => launcherEls.forEach((el) => el.removeEventListener('click', handler));
  }, []);

  const requestMic = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Ta przeglądarka nie udostępnia mikrofonu.');
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
  }, []);

  const startVoice = useCallback(async () => {
    setErrorMsg(null);
    if (sessionRef.current) {
      await ensureLiveAvatarListening(sessionRef.current);
      return;
    }
    try {
      setStatus('connecting');
      await requestMic();

      const resp = await fetch(`${API_BASE_URL}/api/avatar/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: 'pl', source_url: location.href }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || `Backend ${resp.status}`);
      const token: string = data.sessionToken || data.session_token;
      if (!token) throw new Error('Brak session_token z backendu.');

      const session = new LiveAvatarSession(token, {
        voiceChat: { mode: SessionInteractivityMode.CONVERSATIONAL, defaultMuted: false },
      });
      sessionRef.current = session;

      session.on(SessionEvent.SESSION_STREAM_READY, () => {
        console.log('[LiveAvatar] stream ready');
        if (videoRef.current) {
          session.attach(videoRef.current);
          videoRef.current.autoplay = true;
          videoRef.current.playsInline = true;
          videoRef.current.muted = false;
          videoRef.current.play().catch((e) => console.warn('video.play blocked', e));
        }
        setConnected(true);
        setStatus('listening');
        void ensureLiveAvatarListening(session).then(() => {
          // Wymuś pierwszą wypowiedź Maxa, jeśli agent nie ma auto-greeting.
          setTimeout(() => {
            try {
              const greeting = 'Przywitaj się krótko jako Max z OpenMind AI i zapytaj, w czym możesz pomóc.';
              if (typeof (session as any).sendUserMessage === 'function') {
                (session as any).sendUserMessage(greeting);
              } else if (typeof (session as any).message === 'function') {
                (session as any).message(greeting);
              }
              console.log('[LiveAvatar] initial greeting trigger sent');
            } catch (error) {
              console.error('[LiveAvatar] initial greeting trigger failed', error);
            }
          }, 1200);
        });
      });

      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
        console.log('[LiveAvatar] session disconnected');
        setConnected(false);
        setStatus('disconnected');
        sessionRef.current = null;
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.removeAttribute('src');
          videoRef.current.load();
        }
      });

      session.on(AgentEventsEnum.USER_SPEAK_STARTED, () => {
        console.log('[LiveAvatar] user speak started');
        setStatus('user-speaking');
      });
      session.on(AgentEventsEnum.USER_SPEAK_ENDED, () => {
        console.log('[LiveAvatar] user speak ended');
        setStatus('processing');
      });
      session.on(AgentEventsEnum.USER_TRANSCRIPTION, (e: any) => {
        console.log('[LiveAvatar] user text', e);
        if (e?.text) addMessage('user', e.text);
      });
      session.on(AgentEventsEnum.AVATAR_SPEAK_STARTED, () => {
        console.log('[LiveAvatar] avatar speak started');
        setStatus('avatar-speaking');
      });
      session.on(AgentEventsEnum.AVATAR_SPEAK_ENDED, () => {
        console.log('[LiveAvatar] avatar speak ended');
        setStatus('listening');
        void ensureLiveAvatarListening(sessionRef.current);
      });
      session.on(AgentEventsEnum.AVATAR_TRANSCRIPTION, (e: any) => {
        console.log('[LiveAvatar] avatar text', e);
        if (e?.text) addMessage('avatar', e.text);
      });

      await session.start();
      await ensureLiveAvatarListening(session);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('LiveAvatar start failed', e);
      setErrorMsg(msg);
      setStatus('error');
      sessionRef.current = null;
    }
  }, [addMessage, requestMic]);

  const stopVoice = useCallback(async () => {
    const s = sessionRef.current;
    if (!s) {
      setConnected(false);
      setStatus('idle');
      return;
    }
    try { (s as any).stopListening?.(); } catch (e) { console.warn(e); }
    try { s.voiceChat?.stop(); } catch (e) { console.warn(e); }
    try { await s.stop(); } catch (e) { console.warn(e); }
    sessionRef.current = null;
    setConnected(false);
    setStatus('idle');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, []);

  const sendText = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;
    setInputText('');
    addMessage('user', text);
    const s = sessionRef.current;
    if (s) {
      try {
        if (typeof (s as any).sendUserMessage === 'function') {
          (s as any).sendUserMessage(text);
        } else {
          s.message(text);
        }
        setStatus('processing');
      } catch (e) {
        console.warn('Could not send text to LiveAvatar', e);
        addMessage('system', 'Nie udało się wysłać wiadomości do Maxa. Połącz głos ponownie.');
      }
    } else {
      addMessage('system', 'Kliknij „Połącz głos", żeby porozmawiać z Maxem.');
    }
  }, [inputText, addMessage]);

  // Sprzątanie przy odmontowaniu.
  useEffect(() => {
    return () => {
      const s = sessionRef.current;
      if (s) {
        try { s.voiceChat?.stop(); } catch { /* noop */ }
        try { void s.stop(); } catch { /* noop */ }
        sessionRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Launcher (kompatybilny z istniejącymi selektorami .om-avatar-launcher / [data-open-avatar]) */}
      {!open && (
        <button
          type="button"
          aria-label="Porozmawiaj z Maxem"
          onClick={() => setOpen(true)}
          className="om-avatar-launcher fixed bottom-6 right-6 z-[9998] inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, hsl(176 100% 40%), hsl(176 100% 28%))',
            boxShadow: '0 8px 32px hsl(176 100% 43% / 0.4)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Porozmawiaj z Maxem
        </button>
      )}

      {open && (
        <div
          className="om-avatar-widget fixed bottom-6 right-6 z-[9999] flex flex-col w-[min(420px,calc(100vw-2rem))] max-h-[min(720px,calc(100svh-2rem))] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, hsl(220 20% 8% / 0.98), hsl(220 20% 6% / 0.98))',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex flex-col">
              <strong className="text-white text-sm">Max — doradca AI</strong>
              <span className="text-xs text-white/60">
                {STATUS_LABEL[status]}
                {connected ? '' : status === 'idle' ? ' · offline' : ''}
              </span>
            </div>
            <button
              type="button"
              onClick={async () => { await stopVoice(); setOpen(false); }}
              className="text-white/60 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Zamknij"
            >
              ×
            </button>
          </div>

          {/* Video */}
          <div className="relative w-full aspect-video bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={false}
              playsInline
              autoPlay
            />
            {!connected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white/70 text-sm text-center px-6">
                {status === 'connecting'
                  ? 'Łączę Maxa…'
                  : status === 'error'
                    ? errorMsg || 'Nie udało się połączyć.'
                    : 'Kliknij „Połącz głos", aby porozmawiać z Maxem.'}
              </div>
            )}
          </div>

          {/* Chat */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2 min-h-[120px] max-h-[240px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === 'user'
                    ? 'text-right'
                    : m.role === 'system'
                      ? 'text-center text-xs text-white/50'
                      : 'text-left'
                }
              >
                <span
                  className={
                    m.role === 'user'
                      ? 'inline-block px-3 py-2 rounded-2xl rounded-tr-sm bg-primary text-primary-foreground text-sm max-w-[85%]'
                      : m.role === 'system'
                        ? ''
                        : 'inline-block px-3 py-2 rounded-2xl rounded-tl-sm bg-white/5 text-white/90 text-sm max-w-[85%]'
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="border-t border-white/10 p-3 space-y-2">
            <div className="flex gap-2">
              {!connected ? (
                <button
                  type="button"
                  onClick={() => void startVoice()}
                  disabled={status === 'connecting'}
                  className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {status === 'connecting' ? 'Łączę…' : '🎙 Połącz głos'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void stopVoice()}
                  className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-red-500/80 text-white hover:bg-red-500"
                >
                  Zakończ rozmowę
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendText(); } }}
                placeholder={connected ? 'Napisz do Maxa…' : 'Najpierw połącz głos'}
                className="flex-1 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary/60"
              />
              <button
                type="button"
                onClick={sendText}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white hover:bg-white/20"
              >
                Wyślij
              </button>
            </div>
            {errorMsg && status === 'error' && (
              <p className="text-xs text-red-400">{errorMsg}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default OpenMindAvatarWidget;
