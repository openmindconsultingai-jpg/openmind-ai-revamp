import { useEffect, useRef, useState } from "react";
import { noWidows } from "@/lib/typography";

// Jeden poziomy film dla desktopu i telefonów
const VIDEO_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_34xv3lFIvmqHeU79zolBBgWasHd/b1aec198-10f6-4bfc-9324-c478112c963e.mp4";

// Kadrowanie na pionowych ekranach: "50% 50%" = środek kadru.
// Pierwsza wartość przesuwa widoczny wycinek w poziomie (np. "45% 50%" lekko w lewo).
const OBJECT_POSITION_PORTRAIT = "50% 50%";

const FRAME_COUNT = 721;
const FPS = 24;
const SCROLL_HEIGHT_VH = 600;
const SMOOTHING = 0.12; // 0.08 = bardziej miękko, 0.2 = szybciej za palcem

// Podpisy usług: od najprostszej do najbardziej zaawansowanej.
// from/to = zakres postępu scrolla (0..1), w którym podpis jest widoczny.
const CAPTIONS = [
  { from: 0.06, to: 0.2, title: "Szkolenia AI", text: "Zespół, który wie, jak pracować z AI na co dzień.", href: "/szkolenia-ai" },
  { from: 0.22, to: 0.36, title: "Audyt AI", text: "Sprawdzamy, gdzie AI da Ci realny zysk.", href: "/konsultacje-ai" },
  { from: 0.38, to: 0.52, title: "Automatyzacja procesów", text: "Powtarzalna praca robi się sama.", href: "/automatyzacja-ai" },
  { from: 0.54, to: 0.68, title: "Wdrożenia LLM i RAG", text: "Asystenci AI na Twoich danych i dokumentach.", href: "/automatyzacja-ai" },
  { from: 0.7, to: 0.82, title: "Strategia AI", text: "Plan rozwoju AI dla całej organizacji.", href: "/konsultacje-ai" },
];
const HEADLINE_FROM = 0.86;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // 1. Wczytanie całego filmu do pamięci (blob), żeby przeskakiwanie po klatkach było natychmiastowe.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    const src = VIDEO_SRC;
    let objectUrl: string | null = null;
    let cancelled = false;

    const onReady = () => {
      if (cancelled) return;
      // Odblokowanie przewijania na iOS Safari
      video.play().then(() => video.pause()).catch(() => {});
      if (reduce) video.currentTime = (FRAME_COUNT - 1) / FPS;
      setLoadPct(100);
      setReady(true);
    };
    video.addEventListener("loadeddata", onReady, { once: true });

    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok || !res.body) throw new Error("fetch failed");
        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body.getReader();
        const chunks: ArrayBuffer[] = [];
        let received = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = new Uint8Array(value.byteLength);
          chunk.set(value);
          chunks.push(chunk.buffer);
          received += value.length;
          if (total) setLoadPct(Math.round((received / total) * 100));
        }
        if (cancelled) return;
        objectUrl = URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
        video.src = objectUrl;
      } catch {
        // Awaryjnie: bezpośrednie ładowanie (np. gdy CDN blokuje CORS)
        video.preload = "auto";
        video.src = src;
      }
      video.load();
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // 2. Scroll -> klatka, wygładzone w pętli requestAnimationFrame.
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    let raf = 0;
    let lastShown = -1;

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const target = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
      currentRef.current += (target - currentRef.current) * SMOOTHING;
      if (Math.abs(target - currentRef.current) < 0.0005) currentRef.current = target;

      const frame = Math.round(currentRef.current * (FRAME_COUNT - 1));
      if (frame !== lastShown && !video.seeking) {
        video.currentTime = frame / FPS + 0.001;
        lastShown = frame;
      }
      setProgress((p) => (Math.abs(p - currentRef.current) > 0.002 ? currentRef.current : p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, reducedMotion]);

  const p = reducedMotion ? 1 : progress;
  const headlineOpacity = clamp((p - HEADLINE_FROM) / 0.08);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ height: reducedMotion ? "100vh" : `${SCROLL_HEIGHT_VH}vh` }}
      aria-label="OpenMind AI Consulting"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: OBJECT_POSITION_PORTRAIT }}
          muted
          playsInline
          preload="auto"
          poster="/scroll-video-hero-poster.jpg"
          disablePictureInPicture
          aria-hidden="true"
        />

        {/* delikatny gradient pod napisami */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

        {/* pasek ładowania */}
        {!ready && (
          <div className="absolute inset-x-0 bottom-0 z-30">
            <div className="h-[3px] bg-primary transition-[width] duration-200" style={{ width: `${loadPct}%` }} />
            <p className="px-6 py-3 text-xs tracking-[0.3em] text-foreground/70">ŁADOWANIE {loadPct}%</p>
          </div>
        )}

        {/* podpisy usług */}
        {CAPTIONS.map((c) => {
          const fadeIn = clamp((p - c.from) / 0.03);
          const fadeOut = clamp((c.to - p) / 0.03);
          const o = Math.min(fadeIn, fadeOut);
          return (
            <a
              key={c.title}
              href={c.href}
              className="absolute bottom-[12vh] left-5 z-20 max-w-[calc(100vw-2.5rem)] hyphens-auto md:bottom-[14vh] md:left-16 md:max-w-md"
              style={{
                opacity: o,
                transform: `translateY(${(1 - o) * 24}px)`,
                pointerEvents: o > 0.5 ? "auto" : "none",
              }}
            >
              <span className="block text-[10px] tracking-[0.35em] text-primary md:text-xs">USŁUGA</span>
              <span className="mt-2 block font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">{c.title}</span>
              <span className="mt-3 block text-sm leading-relaxed text-foreground/80 md:text-lg">{noWidows(c.text)}</span>
              <span className="mt-4 inline-block border-b border-primary pb-1 text-[10px] tracking-[0.3em] text-primary md:text-xs">
                ZOBACZ →
              </span>
            </a>
          );
        })}

        {/* nagłówek na końcu filmu */}
        <div
          className="absolute inset-x-0 bottom-[8vh] z-20 px-5 md:bottom-[12vh] md:px-16"
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${(1 - headlineOpacity) * 30}px)`,
            pointerEvents: headlineOpacity > 0.5 ? "auto" : "none",
          }}
        >
          <h1 className="max-w-4xl hyphens-auto font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-6xl">
            {noWidows("AI, które naprawdę działa u Ciebie w firmie, urzędzie, szkole czy w domu")}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-base md:mt-4 md:text-lg">
            {noWidows("Szkolenia, audyty i wdrożenia sztucznej inteligencji, od pierwszej rozmowy po działający proces.")}
          </p>
          <a
            href="/contact#contact"
            className="mt-6 inline-block border-b border-primary pb-1 text-[10px] tracking-[0.22em] text-primary sm:text-xs md:mt-8 md:text-sm md:tracking-[0.3em]"
          >
            NAPISZ DO NAS PRZEZ FORMULARZ →
          </a>
        </div>

        {/* wskazówka przewijania na starcie */}
        <div
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.3em] text-foreground/70 md:text-xs"
          style={{ opacity: ready ? clamp(1 - p / 0.04) : 0 }}
        >
          PRZEWIŃ ↓
        </div>
      </div>
    </section>
  );
}