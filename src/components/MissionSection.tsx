import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background blur and scale effect
      gsap.to('.mission-bg', {
        scale: 1.2,
        filter: 'blur(30px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Text reveal with parallax
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // Individual word animation
      gsap.fromTo(
        '.mission-word',
        { opacity: 0, y: 50, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const missionText = t('hero.subtitle');
  const words = missionText.split(' ');

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Blurred background from hero */}
      <div 
        className="mission-bg absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(176 100% 43% / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, hsl(190 100% 50% / 0.3) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <h2 
          ref={textRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center leading-tight max-w-5xl mx-auto font-semibold"
          style={{ perspective: '1000px' }}
        >
          {words.map((word, i) => (
            <span 
              key={i} 
              className="mission-word inline-block mr-[0.3em] text-gradient-silver"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Decorative line */}
        <div className="flex justify-center mt-16">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;