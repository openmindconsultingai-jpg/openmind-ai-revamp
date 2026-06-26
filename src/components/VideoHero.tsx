import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { noWidows } from '@/lib/typography';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy load BookingModal - not needed for initial render
const BookingModal = lazy(() => import('@/components/BookingModal'));
const LogoTicker = lazy(() => import('@/components/LogoTicker'));

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_URL = supabase.storage.from('hero').getPublicUrl('HERO OPENMIND 2.mp4').data.publicUrl;

const VideoHero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoadDeferred, setVideoLoadDeferred] = useState(true);

  // Check if mobile and defer video loading
  useEffect(() => {
    const checkMobile = window.innerWidth < 768;
    setIsMobile(checkMobile);
    
    // Defer video loading to after critical content is painted
    const timer = setTimeout(() => {
      setVideoLoadDeferred(false);
    }, checkMobile ? 100 : 0); // Small delay on mobile for faster FCP
    
    return () => clearTimeout(timer);
  }, []);

  // Text reveal animation - starts immediately
  useEffect(() => {
    if (animationStarted) return;
    setAnimationStarted(true);

    const ctx = gsap.context(() => {
      // Text reveal from mist effect - starts immediately
      gsap.fromTo(
        '.hero-letter',
        { 
          opacity: 0, 
          filter: 'blur(20px)',
          y: 50,
          scale: 0.8
        },
        { 
          opacity: 1, 
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power4.out',
          delay: 0.3
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, delay: 1.5, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 2, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationStarted]);

  // Scroll-based video effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video blur and scale on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (videoRef.current) {
            const blur = self.progress * 8;
            const scale = 1 + self.progress * 0.15;
            videoRef.current.style.filter = `blur(${blur}px)`;
            videoRef.current.style.transform = `scale(${scale})`;
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect - disabled on mobile for performance
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const handleVideoCanPlay = () => {
    setIsVideoReady(true);
  };

  const titleText = "OpenMind";
  const aiText = "AI";
  const seoH1Text = t('hero.seo.h1');
  const heroDescriptionText = t('hero.seo.description');
  const heroDescription2Text = t('hero.seo.description2');

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden py-24 sm:py-28 md:py-32" style={{ maxWidth: '100vw' }}
    >

      {/* Video Background - deferred loading for better FCP */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Placeholder gradient shown immediately */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10"
          style={{ opacity: isVideoReady ? 0 : 1, transition: 'opacity 1s ease-out' }}
        />
        
        {!videoLoadDeferred && (
          <video
            ref={videoRef}
            key={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={handleVideoCanPlay}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isVideoReady ? 1 : 0,
              transition: 'opacity 1.5s ease-out',
              willChange: isMobile ? 'auto' : 'transform, filter',
            }}
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/25" />
        
        {/* Noise overlay for cinematic effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.06,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, hsl(220 15% 5% / 0.6) 100%)',
          }}
        />
      </div>

      {/* Gradient mask at bottom for smooth transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, hsl(220 15% 5%) 100%)',
        }}
      />

      {/* Subtle animated orbs with parallax - simplified on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(176 100% 43% / 0.4) 0%, transparent 70%)',
              left: '10%',
              top: '20%',
              transform: `translate(${(mousePosition.x - 0.5) * -40}px, ${(mousePosition.y - 0.5) * -40}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          />
          <div 
            className="absolute w-[800px] h-[800px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, hsl(190 100% 50% / 0.5) 0%, transparent 70%)',
              right: '-10%',
              top: '-20%',
              transform: `translate(${(mousePosition.x - 0.5) * 50}px, ${(mousePosition.y - 0.5) * 50}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          />
        </div>
      )}

      {/* Interactive 3D Neural Model — right side on desktop screens, top-aligned with title */}
      <div
        className="hidden lg:block absolute z-[25]"
        style={{
          right: 'clamp(0.5rem, 2vw, 2.5rem)',
          top: 'clamp(5rem, 11vh, 8.5rem)',
          width: 'clamp(480px, 46vw, 760px)',
          height: 'min(68svh, 660px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <iframe
          src="/openmind-neural-hero.html?v=11"
          title="OpenMind AI – interaktywna sieć neuronowa"
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none', background: 'transparent', pointerEvents: 'auto' }}
          allow="autoplay"
        />
      </div>

      {/* Hero Text Content — left column on lg+; pointer-events scoped so model stays clickable */}
      <div className="relative z-20 w-full lg:flex lg:justify-start pointer-events-none">
        <div className="text-center px-5 max-w-6xl mx-auto w-full lg:max-w-[34rem] lg:mx-0 lg:ml-[3vw] lg:pr-3 lg:pl-5 xl:max-w-[40rem] xl:ml-[4vw] 2xl:max-w-[46rem] 2xl:ml-[6vw] pointer-events-auto">



          {/* Visually prominent brand name */}
          <div 
            ref={titleRef}
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[4.5rem] xl:text-[5.25rem] 2xl:text-[6.25rem] font-bold mb-4 leading-none tracking-tight"
            aria-hidden="true"
          >
            <span className="text-foreground" style={{ textShadow: '0 0 60px hsl(176 100% 43% / 0.5)' }}>
              {titleText.split('').map((letter, i) => (
                <span key={i} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </span>
            <span className="ml-4">
              {aiText.split('').map((letter, i) => (
                <span 
                  key={i} 
                  className="hero-letter inline-block text-gradient"
                  style={{ 
                    textShadow: '0 0 80px hsl(176 100% 43% / 0.8), 0 0 160px hsl(176 100% 43% / 0.5)',
                    ...(i === 1 ? { marginLeft: '-0.15em' } : {}),
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>

          {/* SEO H1 - visually smaller but semantically the main heading */}
          <h1 className="hero-subtitle font-heading text-base sm:text-lg md:text-xl lg:text-[1.35rem] font-semibold text-foreground/85 mb-4 max-w-3xl mx-auto">
            {seoH1Text}
          </h1>

          {/* Subtitle */}
          <div className="hero-subtitle font-sans max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1" style={{ textAlign: 'center' }}>
            <p className="text-sm sm:text-base md:text-lg leading-snug text-foreground/60" style={{ textAlign: 'center' }}>
              {heroDescriptionText}
            </p>
            {heroDescription2Text && (
              <p className="text-sm sm:text-base md:text-lg leading-snug text-foreground/60" style={{ textAlign: 'center' }}>
                {heroDescription2Text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CTA + Scroll indicator + Logo Ticker — centered full-width below hero columns */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-5 mt-8 lg:mt-12 flex flex-col items-center">
        {/* CTA Button with glass effect and artistic animation */}
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="hero-cta group inline-block relative overflow-hidden px-12 py-5 rounded-full transition-all duration-500 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, hsl(176 100% 43% / 0.1) 0%, hsl(190 100% 50% / 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid hsl(176 100% 43% / 0.3)',
            boxShadow: '0 0 40px hsl(176 100% 43% / 0.15), inset 0 0 20px hsl(176 100% 43% / 0.05)',
          }}
        >
          {/* Animated border glow */}
          <span 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(176 100% 43% / 0.4), transparent)',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
          
          {/* Rotating gradient border */}
          <span 
            className="absolute -inset-[2px] rounded-full opacity-60"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, hsl(176 100% 43% / 0.5) 10%, transparent 20%, transparent 80%, hsl(190 100% 50% / 0.5) 90%, transparent 100%)',
              animation: 'spin 4s linear infinite',
            }}
          />
          
          {/* Inner glass layer */}
          <span 
            className="absolute inset-[1px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(220 15% 5% / 0.8) 0%, hsl(220 15% 10% / 0.6) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          />
          
          {/* Floating particles effect */}
          <span className="absolute inset-0 rounded-full overflow-hidden">
            <span 
              className="absolute w-1 h-1 bg-primary/60 rounded-full"
              style={{
                left: '20%',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: '0s',
              }}
            />
            <span 
              className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
              style={{
                left: '60%',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: '1s',
              }}
            />
            <span 
              className="absolute w-1 h-1 bg-primary/50 rounded-full"
              style={{
                left: '80%',
                animation: 'float 3s ease-in-out infinite',
                animationDelay: '2s',
              }}
            />
          </span>
          
          {/* Text with glow */}
          <span 
            className="relative z-10 font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300"
            style={{
              textShadow: '0 0 20px hsl(176 100% 43% / 0.5)',
            }}
          >
            {t('hero.cta.consultation')}
          </span>
          
          {/* Shimmer sweep effect */}
          <span 
            className="absolute inset-0 z-5 rounded-full"
            style={{
              background: 'linear-gradient(110deg, transparent 25%, hsl(176 100% 43% / 0.2) 50%, transparent 75%)',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />
        </button>

        {/* Mobile-only 3D model — placed under the CTA, non-intrusive (pointer-events disabled so swipe scroll passes through) */}
        <div
          className="lg:hidden relative w-full mt-8 mb-2"
          style={{ height: 'min(46svh, 360px)' }}
          aria-hidden="true"
        >
          <iframe
            src="/openmind-neural-hero.html?v=11"
            title="OpenMind AI – interaktywna sieć neuronowa"
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none', background: 'transparent', pointerEvents: 'auto', touchAction: 'pan-y' }}
            allow="autoplay"
          />
        </div>

        {/* Scroll indicator */}
        <div className="mt-5 mb-3 sm:mt-6 sm:mb-4 flex flex-col items-center gap-2">
          <span className="font-sans text-xs text-foreground/50 uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
        </div>

        {/* Logo Ticker */}
        <Suspense fallback={null}>
          <LogoTicker />
        </Suspense>

        {/* Booking Modal - lazy loaded */}
        {isBookingOpen && (
          <Suspense fallback={null}>
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
          </Suspense>
        )}
      </div>

    </section>
  );
};

export default VideoHero;
