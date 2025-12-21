import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';

const EtherealHero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(
        '.hero-letter',
        { 
          opacity: 0, 
          filter: 'blur(10px)',
          y: 30 
        },
        { 
          opacity: 1, 
          filter: 'blur(0px)',
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.5
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power2.out' }
      );

      // Floating orbs animation
      gsap.to('.orb-1', {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        scale: 'random(0.9, 1.1)',
        duration: 'random(15, 25)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.orb-2', {
        x: 'random(-40, 40)',
        y: 'random(-40, 40)',
        scale: 'random(0.85, 1.15)',
        duration: 'random(18, 28)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });

      gsap.to('.orb-3', {
        x: 'random(-60, 60)',
        y: 'random(-60, 60)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(20, 30)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleText = "OpenMind";
  const aiText = "AI";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="orb-1 absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(185 100% 55% / 0.4) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
            transform: `translate(${(mousePosition.x - 0.5) * -30}px, ${(mousePosition.y - 0.5) * -30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="orb-2 absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(270 60% 50% / 0.5) 0%, transparent 70%)',
            right: '-10%',
            top: '-20%',
            transform: `translate(${(mousePosition.x - 0.5) * 40}px, ${(mousePosition.y - 0.5) * 40}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="orb-3 absolute w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, hsl(280 100% 65% / 0.4) 0%, transparent 70%)',
            left: '40%',
            bottom: '-10%',
            transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(185 100% 55% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(185 100% 55% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Title with letter-by-letter animation */}
        <h1 
          ref={titleRef}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tight"
        >
          <span className="block text-glow">
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
                style={{ opacity: 0, animationDelay: `${(titleText.length + i) * 0.03}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="font-mono text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto opacity-0"
        >
          {t('hero.description')}
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
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
};

export default EtherealHero;