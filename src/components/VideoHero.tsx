import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHeroVideos } from '@/hooks/useHeroVideos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoHero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { currentVideo, getNextVideo } = useHeroVideos();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

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
            const blur = self.progress * 30;
            const scale = 1 + self.progress * 0.3;
            videoRef.current.style.filter = `blur(${blur}px)`;
            videoRef.current.style.transform = `scale(${scale})`;
          }
        }
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

  const handleVideoEnded = () => {
    getNextVideo();
  };

  const handleVideoCanPlay = () => {
    setIsVideoReady(true);
  };

  const titleText = "OpenMind";
  const aiText = "AI";

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {currentVideo && (
          <video
            ref={videoRef}
            key={currentVideo.url}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onCanPlay={handleVideoCanPlay}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isVideoReady ? 1 : 0,
              transition: 'opacity 1.5s ease-out',
              willChange: 'transform, filter',
            }}
          >
            <source src={currentVideo.url} type="video/mp4" />
          </video>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/50" />
        
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

      {/* Subtle animated orbs with parallax */}
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

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Main Title with letter-by-letter mist reveal */}
        <h1 
          ref={titleRef}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-6 leading-none tracking-tight"
        >
          <span className="block text-foreground" style={{ textShadow: '0 0 60px hsl(176 100% 43% / 0.5)' }}>
            {titleText.split('').map((letter, i) => (
              <span key={i} className="hero-letter inline-block">
                {letter}
              </span>
            ))}
          </span>
          <span className="block mt-2">
            {aiText.split('').map((letter, i) => (
              <span 
                key={i} 
                className="hero-letter inline-block text-gradient"
                style={{ 
                  textShadow: '0 0 80px hsl(176 100% 43% / 0.8), 0 0 160px hsl(176 100% 43% / 0.5)'
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle font-sans text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3">
          <span className="font-sans text-xs text-foreground/50 uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
