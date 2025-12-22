import { useEffect, useRef, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';

const EtherealHero = memo(() => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation - simplified
      gsap.fromTo(
        '.hero-letter',
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power2.out',
          delay: 0.3
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleText = "OpenMind";
  const aiText = "AI";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Static Background Orbs - no animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(176 100% 43% / 0.4) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(190 100% 50% / 0.5) 0%, transparent 70%)',
            right: '-10%',
            top: '-20%',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(176 100% 43% / 0.4) 0%, transparent 70%)',
            left: '40%',
            bottom: '-10%',
          }}
        />
      </div>

      {/* Grid pattern overlay - static */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(176 100% 43% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(176 100% 43% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Title with letter-by-letter animation */}
        <h1 
          ref={titleRef}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tight"
        >
          <span className="block">
            {titleText.split('').map((letter, i) => (
              <span 
                key={i} 
                className="hero-letter inline-block text-gradient-silver"
                style={{ opacity: 0 }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="block mt-2">
            {aiText.split('').map((letter, i) => (
              <span 
                key={i} 
                className="hero-letter inline-block text-gradient"
                style={{ opacity: 0 }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto opacity-0"
        >
          {t('hero.description')}
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <span className="font-sans text-xs text-muted-foreground uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
});

EtherealHero.displayName = 'EtherealHero';

export default EtherealHero;
