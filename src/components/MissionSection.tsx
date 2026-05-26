import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { noWidows } from '@/lib/typography';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lightweight one-shot reveal — no scrub, no blur/rotateX (GPU-cheap)
      gsap.fromTo(
        '.mission-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.mission-word',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32"
    >
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="mission-title font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 md:mb-12 font-bold tracking-tight">
          <span className="text-gradient">{t('mission.title')}</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          <p className="mission-word font-sans text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed">
            {noWidows(t('mission.description1'))}
          </p>
          <p className="mission-word font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            {noWidows(t('mission.description2'))}
          </p>
        </div>

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
