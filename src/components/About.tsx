import { useEffect, useRef } from 'react';
import { Brain, Target, Lightbulb } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import ceoImage from '@/assets/ceo-lukasz-czarnecki.png';
import VideoSectionBackground from '@/components/VideoSectionBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CEO section animation
      gsap.fromTo(
        '.ceo-image',
        { opacity: 0, scale: 0.8, rotateY: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ceoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.ceo-text',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ceoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Values cards animation
      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background parallax (was image-based)
      // Video background is handled by VideoSectionBackground.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <VideoSectionBackground opacity={0.5} blurPx={4} overlayOpacity={0.55} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/35 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient text-glow">{t('about.title')}</span>
            </h2>
          </div>

          {/* CEO Section */}
          <div ref={ceoRef} className="mb-20 bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="ceo-image overflow-hidden rounded-2xl shadow-lg group" style={{ perspective: '1000px' }}>
                <img 
                  src={ceoImage} 
                  alt={t('about.ceo.name')}
                  className="w-full max-w-[300px] aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="ceo-text space-y-4 max-w-3xl">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gradient text-glow-subtle mb-2">
                    {t('about.ceo.name')}
                  </h3>
                  <p className="text-lg text-primary font-semibold">{t('about.ceo.title')}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.ceo.bio')}
                </p>
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div ref={descRef} className="mb-16 max-w-5xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {t('about.company.desc')}
            </p>
          </div>

          {/* Values Grid */}
          <div ref={valuesRef} className="grid md:grid-cols-3 gap-8">
            <div className="value-card text-center space-y-4 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-glow-subtle">{t('about.expertise.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.expertise.desc')}
              </p>
            </div>

            <div className="value-card text-center space-y-4 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-glow-subtle">{t('about.precision.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.precision.desc')}
              </p>
            </div>

            <div className="value-card text-center space-y-4 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-glow-subtle">{t('about.innovation.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.innovation.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
