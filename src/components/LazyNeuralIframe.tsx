import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  loadStrategy?: 'auto' | 'viewport' | 'click';
  ctaLabel?: string;
}

const LazyNeuralIframe = ({
  src,
  title = 'OpenMind AI – interaktywna sieć neuronowa',
  className = '',
  style,
  loadStrategy = 'auto',
  ctaLabel = 'Uruchom model 3D',
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;

    const triggerLoad = () => {
      if (cancelled) return;
      setShouldLoad(true);
    };

    if (loadStrategy === 'auto') {
      // Home hero: auto-load after 5 s + early interaction
      timer = setTimeout(triggerLoad, 5000);
      const onInteraction = () => triggerLoad();
      window.addEventListener('scroll', onInteraction, { once: true, passive: true });
      window.addEventListener('mousemove', onInteraction, { once: true, passive: true });
      window.addEventListener('touchstart', onInteraction, { once: true, passive: true });
      window.addEventListener('keydown', onInteraction, { once: true });
    } else if (loadStrategy === 'viewport') {
      // About page: only load when the iframe enters viewport
      if ('IntersectionObserver' in window && ref.current) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              triggerLoad();
              observer?.disconnect();
            }
          },
          { rootMargin: '0px', threshold: 0 }
        );
        observer.observe(ref.current);
      } else {
        triggerLoad();
      }
    }
    // 'click' strategy: nothing loads until the user explicitly asks for it

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      observer?.disconnect();
    };
  }, [loadStrategy]);

  const isClickStrategy = loadStrategy === 'click';

  return (
    <div
      ref={ref}
      className={`relative w-full h-full ${className}`}
      style={{ minHeight: '100%', ...style }}
    >
      {/* Instant gradient placeholder — no layout shift */}
      <div
        aria-hidden={!isClickStrategy || shouldLoad}
        className="absolute inset-0 w-full h-full transition-opacity duration-700"
        style={{
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? 'none' : 'auto',
          background:
            'radial-gradient(ellipse at center, hsl(176 100% 43% / 0.16) 0%, hsl(190 100% 50% / 0.10) 40%, transparent 75%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {isClickStrategy && !shouldLoad ? (
            <button
              type="button"
              onClick={() => setShouldLoad(true)}
              className="group relative px-8 py-4 rounded-full font-heading font-semibold text-base text-foreground transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(176 100% 43% / 0.12) 0%, hsl(190 100% 50% / 0.06) 100%)',
                border: '1px solid hsl(176 100% 43% / 0.35)',
                boxShadow: '0 0 40px hsl(176 100% 43% / 0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="group-hover:text-primary transition-colors duration-300">{ctaLabel}</span>
            </button>
          ) : (
            <>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" style={{ animation: 'pulse 1.4s ease-in-out infinite', animationDelay: '0s' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" style={{ animation: 'pulse 1.4s ease-in-out infinite', animationDelay: '0.2s' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" style={{ animation: 'pulse 1.4s ease-in-out infinite', animationDelay: '0.4s' }} />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground/70 tracking-wider uppercase">
                Ładowanie modelu AI
              </p>
            </>
          )}
        </div>
      </div>

      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          loading="eager"
          className="absolute inset-0 w-full h-full z-10 transition-opacity duration-700"
          style={{
            border: 'none',
            background: 'transparent',
            pointerEvents: 'auto',
            touchAction: 'pan-y',
            opacity: loaded ? 1 : 0,
          }}
          allow="autoplay"
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
};

export default LazyNeuralIframe;
