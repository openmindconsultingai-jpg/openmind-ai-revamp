import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoSectionBackground from '@/components/VideoSectionBackground';

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect - elements move at different speeds
      gsap.to('.mission-bg-layer-1', {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.mission-bg-layer-2', {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Text reveal with dramatic entrance
      gsap.fromTo(
        '.mission-title',
        { opacity: 0, y: 150, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // Individual word animation with stagger
      gsap.fromTo(
        '.mission-word',
        { 
          opacity: 0, 
          y: 80, 
          rotateX: 90,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse interaction for text distortion effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textContainerRef.current) return;
      
      const rect = textContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setMousePos({ x, y });
    };

    const container = textContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const missionText = t('hero.subtitle');
  const words = missionText.split(' ');

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      <VideoSectionBackground opacity={0.20} blurPx={12} overlayOpacity={0.82} />

      {/* Parallax background layers */}
      <div 
        className="mission-bg-layer-1 absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsl(176 100% 43% / 0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, hsl(190 100% 50% / 0.3) 0%, transparent 40%)
          `,
        }}
      />
      
      <div 
        className="mission-bg-layer-2 absolute inset-0 opacity-15"
        style={{
          background: `
            radial-gradient(circle at 60% 20%, hsl(176 100% 50% / 0.3) 0%, transparent 30%),
            radial-gradient(circle at 30% 80%, hsl(190 100% 60% / 0.2) 0%, transparent 35%)
          `,
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(176 100% 43% / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(176 100% 43% / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div 
        ref={textContainerRef}
        className="relative z-10 container mx-auto px-6"
      >
        <h2 
          className="mission-title font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] 2xl:text-[140px] text-center leading-[0.95] max-w-6xl mx-auto font-bold tracking-tight"
          style={{ 
            perspective: '1000px',
            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {words.map((word, i) => (
            <span 
              key={i} 
              className="mission-word inline-block mr-[0.25em] cursor-default"
              style={{ 
                transformStyle: 'preserve-3d',
                textShadow: `
                  ${mousePos.x * 20}px ${mousePos.y * 20}px 40px hsl(176 100% 43% / 0.3),
                  0 0 80px hsl(176 100% 43% / 0.15)
                `,
                transition: 'text-shadow 0.3s ease-out',
              }}
            >
              <span className="text-gradient-silver hover:text-gradient transition-all duration-300">
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Decorative elements */}
        <div className="flex justify-center mt-20 gap-4">
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent self-center" />
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Top gradient for smooth transition from hero */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(220 15% 5%) 0%, transparent 100%)',
        }}
      />
    </section>
  );
};

export default MissionSection;
