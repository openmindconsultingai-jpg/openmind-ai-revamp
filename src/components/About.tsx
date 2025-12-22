import { useEffect, useRef, useMemo } from 'react';
import logo from '@/assets/openmind-logo.webp';
import ceoImage from '@/assets/ceo-lukasz-czarnecki.png';
import VideoSectionBackground from '@/components/VideoSectionBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { noWidows } from '@/lib/typography';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Headers to style with gradient
const STYLED_HEADERS = [
  'Więcej niż Software House. Więcej niż Agencja.',
  'More than a Software House. More than an Agency.',
  'Nasza Filozofia: Logika i Magia',
  'Our Philosophy: Logic and Magic',
  'Pionierzy Praktycznej Innowacji',
  'Pioneers of Practical Innovation',
  'Dlaczego OpenMind?',
  'Why OpenMind?',
  'Nasza Misja',
  'Our Mission',
  'OpenMind AI Consulting. Twój partner w transformacji.',
  'OpenMind AI Consulting. Your partner in transformation.',
];

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  // Parse bio text and style headers
  const renderStyledBio = useMemo(() => {
    const bio = t('about.ceo.bio');
    const lines = bio.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        return <div key={index} className="h-4" />;
      }
      
      if (STYLED_HEADERS.includes(trimmedLine)) {
        // Center "OpenMind AI Consulting. Twój partner w transformacji." headers
        const shouldCenter = trimmedLine.includes('OpenMind AI Consulting. Twój partner') || 
                             trimmedLine.includes('OpenMind AI Consulting. Your partner');
        return (
          <h4 
            key={index} 
            className={`text-xl md:text-2xl font-bold text-gradient text-glow-subtle mt-8 mb-4 first:mt-0 ${shouldCenter ? 'text-center' : ''}`}
          >
            {trimmedLine}
          </h4>
        );
      }
      
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-3">
          {noWidows(trimmedLine)}
        </p>
      );
    });
  }, [t]);

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
    <section ref={sectionRef} id="about" className="pt-20 md:pt-24 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <VideoSectionBackground opacity={0.6} blurPx={3} overlayOpacity={0.45} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background" />
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
              <div className="ceo-text space-y-2 max-w-4xl">
                <h3 className="text-2xl md:text-3xl font-bold text-gradient text-glow-subtle mb-2 text-center">
                  {t('about.ceo.name')}
                </h3>
                <p className="text-primary/80 text-lg mb-6 text-center mx-auto max-w-md">
                  {t('about.ceo.title')}
                </p>
                <div className="space-y-0">
                  {renderStyledBio}
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div ref={valuesRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="value-card group cursor-pointer">
              <div 
                className="relative h-full min-h-[280px] md:min-h-[320px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" 
                  alt={t('about.expertise.title')}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, hsl(176 100% 43% / 0.2), transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('about.expertise.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.expertise.desc')}</p>
                </div>
              </div>
            </div>

            <div className="value-card group cursor-pointer">
              <div 
                className="relative h-full min-h-[280px] md:min-h-[320px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" 
                  alt={t('about.precision.title')}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, hsl(176 100% 43% / 0.2), transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('about.precision.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.precision.desc')}</p>
                </div>
              </div>
            </div>

            <div className="value-card group cursor-pointer">
              <div 
                className="relative h-full min-h-[280px] md:min-h-[320px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80" 
                  alt={t('about.innovation.title')}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, hsl(176 100% 43% / 0.2), transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('about.innovation.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.innovation.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
