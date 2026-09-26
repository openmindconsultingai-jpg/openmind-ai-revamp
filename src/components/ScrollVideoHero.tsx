import { useEffect, useRef, useState } from "react";
import { noWidows } from "@/lib/typography";

// Jeden poziomy film dla desktopu i telefonów
const VIDEO_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_34xv3lFIvmqHeU79zolBBgWasHd/b1aec198-10f6-4bfc-9324-c478112c963e.mp4";

// Zdjęcie bazowe: pierwsza klatka filmu w wysokiej jakości (2560x1440).
// Widoczne od razu po wejściu, znika przy pierwszym ruchu scrolla.
const POSTER_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_34xv3lFIvmqHeU79zolBBgWasHd/bcd38187-af45-488c-863c-4d8afb89bf38.webp";
const POSTER_ALT =
  "Odbicie strony openmindai.pl w okularach przeciwsłonecznych właściciela firmy, który odpoczywa na morzu w dmuchanym kole OpenMind.";

// Kadrowanie na pionowych ekranach: "50% 50%" = środek kadru.
const OBJECT_POSITION_PORTRAIT = "50% 50%";

const FRAME_COUNT = 721;
const FPS = 24;
const SCROLL_HEIGHT_VH = 600;
const SMOOTHING = 0.12;

// Podpisy usług: od detalu do widoku z lotu ptaka.
const CAPTIONS = [
  {
    from: 0.06,
    to: 0.2,
    title: "Zespół, który nie dzwoni z każdym pytaniem",
    text: "Szkolenia AI uczą ludzi pracować szybciej i samodzielnie. Ty możesz wyłączyć telefon.",
    label: "SZKOLENIA AI",
    href: "/szkolenia-ai",
  },
  {
    from: 0.22,
    to: 0.36,
    title: "Najpierw sprawdzamy, gdzie ucieka czas",
    text: "Audyt AI pokazuje, które procesy w Twojej firmie warto oddać sztucznej inteligencji.",
    label: "KONSULTACJE I AUDYT AI",
    href: "/konsultacje-ai",
  },
  {
    from: 0.38,
    to: 0.52,
    title: "Faktury, maile i raporty robią się same",
    text: "Automatyzujemy powtarzalną pracę, żeby firma działała także wtedy, gdy Cię nie ma.",
    label: "AUTOMATYZACJA PROCESÓW",
    href: "/automatyzacja-ai",
  },
  {
    from: 0.54,
    to: 0.68,
    title: "Asystent, który zna Twoją firmę",
    text: "Model językowy na Twoich dokumentach. Odpowiedzi w sekundy, bez szukania po folderach.",
    label: "ASYSTENCI AI (LLM I RAG)",
    href: "/automatyzacja-ai",
  },
  {
    from: 0.7,
    to: 0.82,
    title: "Spójrz na firmę z lotu ptaka",
    text: "Strategia AI to plan na lata, a nie jednorazowy gadżet.",
    label: "STRATEGIA AI",
    href: "/konsultacje-ai",
  },
];
const HEADLINE_FROM = 0.86;

const VIDEO_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Wdrożenia AI dla firm, które działają, kiedy Ty odpoczywasz",
  description:
    "Właściciel firmy odpoczywa na morzu, a jego firma pracuje dzięki AI. Film OpenMind AI Consulting o szkoleniach, audytach, automatyzacji i asystentach AI dla firm.",
  thumbnailUrl: [POSTER_SRC],
  contentUrl: VIDEO_SRC,
  uploadDate: "2026-09-25",
  duration: "PT30S",
  publisher: { "@type": "Organization", name: "OpenMind AI Consulting", url: "https://openmindai.pl" },
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);

  // 0. Pierwszy, nawet najmniejszy ruch scrolla (kółko, dotyk, klawiatura, pasek)
  useEffect(() => {
    if (window.scrollY > 0) {
      setUserScrolled(true);
      return;
    }
    const mark = () => setUserScrolled(true);
    const onScroll = () => {
      if (window.scrollY > 0) mark();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Space", " ", "End"].includes(e.key)) mark();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", mark, { passive: true });
    window.addEventListener("touchmove", mark, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", mark);
      window.removeEventListener("touchmove", mark);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

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
      if (frame !== lastShown) {
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
  // Zdjęcie bazowe znika dopiero, gdy film jest gotowy i użytkownik ruszył scrollem.
  const posterVisible = reducedMotion ? !ready : !(ready && userScrolled);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ height: reducedMotion ? "100vh" : `${SCROLL_HEIGHT_VH}vh` }}
      aria-label="OpenMind AI Consulting"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_JSON_LD) }} />
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: OBJECT_POSITION_PORTRAIT }}
          muted
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          disablePictureInPicture
          aria-hidden="true"
        />

        {/* zdjęcie bazowe w wysokiej jakości nad filmem */}
        <img
          src={POSTER_SRC}
          alt={POSTER_ALT}
          width={2560}
          height={1440}
          decoding="async"
          {...({ fetchpriority: "high" } as Record<string, string>)}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-300"
          style={{ objectPosition: OBJECT_POSITION_PORTRAIT, opacity: posterVisible ? 1 : 0 }}
        />

        {/* delikatny gradient pod napisami */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-background/60 via-transparent to-background/20" />

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
              key={c.label}
              href={c.href}
              className="absolute bottom-[280px] left-5 z-20 max-w-[calc(100vw-2.5rem)] hyphens-auto md:bottom-[14vh] md:left-16 md:max-w-xl"
              style={{
                opacity: o,
                transform: `translateY(${(1 - o) * 24}px)`,
                pointerEvents: o > 0.5 ? "auto" : "none",
              }}
            >
              <span className="block text-[10px] tracking-[0.35em] text-primary md:text-xs">{c.label}</span>
              <span className="mt-2 block font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
                {noWidows(c.title)}
              </span>
              <span className="mt-3 block text-justify text-sm leading-relaxed text-foreground/80 md:text-lg">
                {noWidows(c.text)}
              </span>
              <span className="mt-4 inline-block border-b border-primary pb-1 text-[10px] tracking-[0.3em] text-primary md:text-xs">
                ZOBACZ →
              </span>
            </a>
          );
        })}

        {/* nagłówek na końcu filmu (w HTML od początku, widoczny na końcu) */}
        <div
          className="absolute inset-x-0 bottom-[16vh] z-20 px-5 pr-20 md:bottom-[12vh] md:px-16 md:pr-16"
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${(1 - headlineOpacity) * 30}px)`,
            pointerEvents: headlineOpacity > 0.5 ? "auto" : "none",
          }}
        >
          <h1 className="max-w-4xl hyphens-auto font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-6xl">
            {noWidows("Wdrożenia AI dla firm, które działają, kiedy Ty odpoczywasz")}
          </h1>
          <p className="mt-3 max-w-2xl text-justify text-sm leading-relaxed text-foreground/80 sm:text-base md:mt-4 md:text-lg">
            {noWidows(
              "Szkolenia, audyty i automatyzacja z AI dla firm, urzędów i szkół w całej Polsce. Od pierwszej rozmowy po proces, który pracuje bez Ciebie."
            )}
          </p>
          <a
            href="/contact#contact"
            className="mt-6 inline-block border-b border-primary pb-1 text-[10px] tracking-[0.22em] text-primary sm:text-xs md:mt-8 md:text-sm md:tracking-[0.3em]"
          >
            POROZMAWIAJMY O TWOJEJ FIRMIE →
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
