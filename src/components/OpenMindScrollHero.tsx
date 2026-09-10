import { useEffect, useRef } from "react";

/**
 * OpenMindScrollHero
 *
 * Scroll-driven film. The visitor's scroll position is the playhead: scrolling
 * down runs the take forward, scrolling up runs it backward. As the descent
 * deepens, service captions surface one at a time, shallowest first.
 *
 * Dependencies: React only. Styles ship inside the component, so it drops into
 * any project regardless of Tailwind or CSS framework.
 *
 * Usage:
 *   <OpenMindScrollHero
 *     desktopSrc="/media/hero.mp4"
 *     mobileSrc="/media/hero-mobile.mp4"
 *     poster="/media/hero-poster.png"
 *   />
 */

export type HeroService = {
  /** Where the caption links to, e.g. "/uslugi/rag" or "#uslugi-rag". */
  href: string;
  /** One line under the title. Keep it under about 60 characters. */
  body: string;
  /** Depth marker. */
  no: string;
  title: string;
};

export type OpenMindScrollHeroProps = {
  desktopSrc: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  /** Opening headline, holds the first stretch of the descent. */
  kicker?: string;
  title?: string;
  subtitle?: string;
  /** Captions that surface as the film descends. */
  services?: HeroService[];
  /**
   * Scroll length of the journey in viewport heights. Higher means a slower,
   * more deliberate scrub. 8 is the tuned value; below 4 it feels rushed.
   */
  scrollVh?: number;
  /** Fraction of the journey the opening headline holds. */
  headlineHold?: number;
  /** Accent colours. Defaults are the OpenMind brand. */
  accent?: string;
  secondary?: string;
};

/**
 * Każdy napis prowadzi do istniejącej podstrony openmindai.pl. Adresy są
 * bezwzględne, więc komponent działa też wtedy, gdy Lovable serwuje samą
 * sekcję powitalną, a reszta serwisu stoi tam gdzie stała. Sitemap bez zmian.
 */
const DEFAULT_SERVICES: HeroService[] = [
  {
    body: "Warsztaty z ChatGPT, Claude i automatyzacji, stacjonarnie, online i 1:1",
    href: "/szkolenia-ai",
    no: "01",
    title: "Szkolenia AI",
  },
  {
    body: "Teledyski, spoty reklamowe, animacje i materiały social media",
    href: "/teledyski-ai",
    no: "02",
    title: "Produkcja treści",
  },
  {
    body: "Audyt procesów, dobór narzędzi i strategia wdrożenia. Pierwsza rozmowa bezpłatna",
    href: "/konsultacje-ai",
    no: "03",
    title: "Strategia AI",
  },
  {
    body: "Agenci AI, obieg dokumentów i integracje z CRM oraz ERP",
    href: "/automatyzacja-ai",
    no: "04",
    title: "Automatyzacje i agenci",
  },
  {
    body: "Dla startupów, jednoosobowych działalności i małych firm, od pomysłu po skalowanie",
    href: "/zakladanie-firmy-z-ai",
    no: "05",
    title: "Start i rozwój firmy",
  },
  {
    body: "Strony pod wyszukiwarki, czatbot na stronie i pełna identyfikacja wizualna",
    href: "/strony-www-branding",
    no: "06",
    title: "Czatboty, strony i branding",
  },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export default function OpenMindScrollHero({
  accent = "#00C896",
  desktopSrc,
  headlineHold = 0.13,
  kicker = "OpenMind AI Consulting",
  mobilePoster,
  mobileSrc,
  poster,
  scrollVh = 8,
  secondary = "#00C8E8",
  services = DEFAULT_SERVICES,
  subtitle = "Doradztwo i wdrożenia dla firm, szkół i instytucji w całej Polsce.",
  title = "AI, które naprawdę działa u Ciebie w firmie",
}: OpenMindScrollHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.matchMedia("(max-width: 760px)");

    // Pick the lighter encode on small screens before the browser starts
    // fetching, so phones never pull the desktop file.
    const chosen = isMobile.matches && mobileSrc ? mobileSrc : desktopSrc;
    if (video.getAttribute("src") !== chosen) video.setAttribute("src", chosen);
    const chosenPoster =
      isMobile.matches && mobilePoster ? mobilePoster : poster;
    if (chosenPoster) video.setAttribute("poster", chosenPoster);

    if (reduced.matches) {
      // Honour the setting: no fetch, no scrub, poster only. The captions stay
      // legible because they are rendered, just not animated.
      video.removeAttribute("src");
      video.load();
      track.dataset.static = "true";
      return;
    }

    let duration = 0;
    let current = 0;
    let target = 0;
    let frame = 0;
    let seeking = false;
    let unlocked = false;

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // iOS refuses to seek a video that has never been handed a play() call.
    // One silent play/pause on the first gesture unlocks the pipeline.
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      const attempt = video.play();
      if (attempt && typeof attempt.then === "function") {
        attempt.then(() => video.pause()).catch(() => undefined);
      }
    };
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("pointerdown", unlock, { once: true });

    const span = 0.8 / Math.max(services.length, 1);
    const start = 0.17;

    const paint = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? clamp01(-rect.top / travel) : 0;

      // Media time follows the scroll, smoothed so a flick of the wheel reads
      // as a camera move rather than a jump cut.
      if (duration > 0) {
        target = progress * (duration - 0.05);
        current += (target - current) * 0.16;
        if (Math.abs(target - current) < 0.004) current = target;
        if (!seeking) {
          seeking = true;
          try {
            video.currentTime = current;
          } catch {
            // Some browsers throw while the buffer is still filling.
          }
          seeking = false;
        }
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
      if (headRef.current) {
        const fade = clamp01(1 - progress / headlineHold);
        headRef.current.style.opacity = String(fade);
        headRef.current.style.transform = `translate3d(0, ${(
          (1 - fade) * -26
        ).toFixed(2)}px, 0)`;
        headRef.current.style.pointerEvents = fade > 0.5 ? "auto" : "none";
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = progress > 0.02 ? "0" : "1";
      }

      for (const [index, node] of itemRefs.current.entries()) {
        if (!node) continue;
        const from = start + index * span;
        const local = (progress - (from + span / 2)) / (span / 2);
        const distance = Math.abs(local);
        const strength = distance < 1 ? 1 - distance ** 2 : 0;
        node.style.opacity = String(strength);
        node.style.transform = `translate3d(0, ${(-local * 42).toFixed(2)}px, 0)`;
        node.style.filter = `blur(${((1 - strength) * 9).toFixed(2)}px)`;
        node.style.pointerEvents = strength > 0.55 ? "auto" : "none";
        node.tabIndex = strength > 0.55 ? 0 : -1;
        node.setAttribute("aria-hidden", strength > 0.4 ? "false" : "true");
      }

      // Keep easing toward the target even when the wheel has stopped.
      if (duration > 0 && Math.abs(target - current) > 0.004) request();
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [
    desktopSrc,
    headlineHold,
    mobilePoster,
    mobileSrc,
    poster,
    services.length,
  ]);

  return (
    <section
      aria-label="OpenMind AI Consulting"
      className="omh"
      ref={trackRef}
      style={
        {
          "--omh-accent": accent,
          "--omh-secondary": secondary,
          height: `${scrollVh * 100}vh`,
        } as React.CSSProperties
      }
    >
      <style>{CSS_TEXT}</style>

      <div className="omh-stage">
        <video
          className="omh-video"
          disablePictureInPicture
          muted
          playsInline
          preload="auto"
          ref={videoRef}
        />
        <div className="omh-veil" />

        <div className="omh-head" ref={headRef}>
          <p className="omh-kicker">{kicker}</p>
          <h1 className="omh-title">{title}</h1>
          <p className="omh-sub">{subtitle}</p>
        </div>

        <div className="omh-depths">
          {services.map((service, index) => (
            <a
              className="omh-depth"
              href={service.href}
              key={service.no}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
            >
              <span className="omh-depth-no">{service.no}</span>
              <span className="omh-depth-title">{service.title}</span>
              <span className="omh-depth-body">{service.body}</span>
              <span className="omh-depth-more">
                Zobacz zakres
                <span aria-hidden="true">&#8594;</span>
              </span>
            </a>
          ))}
        </div>

        <div aria-hidden="true" className="omh-hint" ref={hintRef}>
          <span className="omh-hint-label">Przewijaj, aby odtworzyć</span>
          <span className="omh-hint-rail">
            <span className="omh-hint-bead" />
          </span>
        </div>

        <span aria-hidden="true" className="omh-bar">
          <span className="omh-bar-fill" ref={barRef} />
        </span>
      </div>
    </section>
  );
}

const CSS_TEXT = `
.omh {
  position: relative;
  background: #0D1117;
  color: #E9F2F0;
  font-family: "IBM Plex Sans", system-ui, -apple-system, sans-serif;
}
.omh-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
}
.omh-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #050D1A;
}
.omh[data-static="true"] .omh-video { object-fit: cover; }
.omh-veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(5,13,26,0.72) 0%, rgba(5,13,26,0.28) 46%, rgba(5,13,26,0) 72%),
    linear-gradient(to bottom, rgba(5,13,26,0.55) 0%, rgba(5,13,26,0) 30%);
  pointer-events: none;
}
.omh-head,
.omh-depths {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 clamp(20px, 5vw, 56px);
}
.omh-head { will-change: opacity, transform; }
.omh-kicker {
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--omh-accent);
  margin: 0 0 18px;
}
.omh-title {
  font-family: "Bricolage Grotesque", system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(36px, 6.6vw, 82px);
  line-height: 0.98;
  letter-spacing: -0.04em;
  margin: 0 0 20px;
  max-width: 15ch;
  text-shadow: 0 6px 44px rgba(5,13,26,0.8);
}
.omh-sub {
  font-size: clamp(15px, 1.9vw, 19px);
  line-height: 1.55;
  color: rgba(233,242,240,0.8);
  max-width: 32ch;
  margin: 0;
  text-shadow: 0 3px 22px rgba(5,13,26,0.85);
}
.omh-depths { pointer-events: none; }
.omh-depth {
  position: absolute;
  left: clamp(20px, 5vw, 56px);
  right: clamp(20px, 5vw, 56px);
  top: 0;
  display: grid;
  gap: 10px;
  opacity: 0;
  text-decoration: none;
  color: #E9F2F0;
  will-change: transform, opacity, filter;
}
.omh-depth-no {
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--omh-accent);
}
.omh-depth-title {
  font-family: "Bricolage Grotesque", system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(34px, 6.2vw, 76px);
  line-height: 0.98;
  letter-spacing: -0.04em;
  max-width: 14ch;
  text-shadow: 0 6px 40px rgba(5,13,26,0.78);
}
.omh-depth-body {
  font-size: clamp(15px, 1.8vw, 18.5px);
  line-height: 1.5;
  color: rgba(233,242,240,0.78);
  max-width: 34ch;
  text-shadow: 0 3px 20px rgba(5,13,26,0.85);
}
.omh-depth-more {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 6px;
  width: fit-content;
  padding-bottom: 5px;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--omh-secondary);
  border-bottom: 1px solid rgba(0,200,232,0.35);
  transition: color 0.25s ease, border-color 0.25s ease, gap 0.25s ease;
}
.omh-depth:hover .omh-depth-more {
  color: var(--omh-accent);
  border-color: var(--omh-accent);
  gap: 15px;
}
.omh-depth:focus-visible {
  outline: 2px solid var(--omh-accent);
  outline-offset: 12px;
}
.omh-hint {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.omh-hint-label {
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(233,242,240,0.55);
}
.omh-hint-rail {
  position: relative;
  display: block;
  width: 1px;
  height: 38px;
  background: rgba(233,242,240,0.18);
  overflow: hidden;
}
.omh-hint-bead {
  position: absolute;
  left: -1px;
  top: 0;
  width: 3px;
  height: 12px;
  background: var(--omh-accent);
  box-shadow: 0 0 10px var(--omh-accent);
  animation: omh-bead 2.1s cubic-bezier(0.65,0,0.35,1) infinite;
}
@keyframes omh-bead {
  0% { transform: translateY(-14px); opacity: 0; }
  35% { opacity: 1; }
  100% { transform: translateY(38px); opacity: 0; }
}
.omh-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(233,242,240,0.12);
  display: block;
}
.omh-bar-fill {
  display: block;
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: linear-gradient(to right, #00A8D6, var(--omh-secondary), var(--omh-accent));
  box-shadow: 0 0 18px rgba(0,200,150,0.55);
}
@media (max-width: 760px) {
  .omh-depth-title { max-width: 11ch; }
  .omh-sub { max-width: 28ch; }
}
@media (prefers-reduced-motion: reduce) {
  .omh-hint-bead { animation: none; top: 12px; }
  .omh-depth { opacity: 1 !important; filter: none !important; position: relative; }
  .omh-depths { position: relative; top: auto; transform: none; display: grid; gap: 28px; padding-top: 22vh; }
}
`;
