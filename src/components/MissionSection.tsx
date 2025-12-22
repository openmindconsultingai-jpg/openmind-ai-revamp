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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32"
    >
      <VideoSectionBackground opacity={0.25} blurPx={8} overlayOpacity={0.75} />


      {/* Content */}
      <div 
        ref={textContainerRef}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        {/* Mission Title */}
        <h2 
          className="mission-title font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 md:mb-12 font-bold tracking-tight"
          style={{ 
            perspective: '1000px',
            transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span className="text-gradient">{t('mission.title')}</span>
        </h2>

        {/* SEO-optimized description */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p 
            className="mission-word font-sans text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed"
            style={{ 
              textShadow: `${mousePos.x * 10}px ${mousePos.y * 10}px 30px hsl(176 100% 43% / 0.2)`,
              transition: 'text-shadow 0.3s ease-out',
            }}
          >
            {t('mission.description1')}
          </p>
          <p 
            className="mission-word font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            style={{ 
              textShadow: `${mousePos.x * 8}px ${mousePos.y * 8}px 25px hsl(176 100% 43% / 0.15)`,
              transition: 'text-shadow 0.3s ease-out',
            }}
          >
            {t('mission.description2')}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center mt-16 gap-4">
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent self-center" />
          <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

    </section>
  );
};

export default MissionSection;
