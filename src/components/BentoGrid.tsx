import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import bentoContactImg from '@/assets/bento-contact.jpg';
import bentoAdvisorImg from '@/assets/bento-ai-advisor.jpg';

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card entrance
      gsap.fromTo(
        '.bento-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Spotlight effect tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mousemove', handleMouseMove);
      return () => grid.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleAdvisorClick = () => {
    navigate('/ai-advisor');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-16 -mt-32 overflow-hidden"
    >
      

      {/* Bento Grid - 2 tiles */}
      <div 
        ref={gridRef}
        className="container mx-auto px-6 relative"
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties}
      >
        {/* Spotlight overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(176 100% 43% / 0.15), transparent 40%)`,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Contact Tile */}
          <div
            className="bento-card group cursor-pointer"
            onClick={handleContactClick}
            data-cursor="Kontakt"
          >
            <div 
              className="relative h-full min-h-[320px] md:min-h-[380px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
              }}
            >
              {/* Background Image */}
              <img 
                src={bentoContactImg} 
                alt="Kontakt – konsulting sztucznej inteligencji AI OpenMind" 
                loading="lazy"
                width="800"
                height="600"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

              {/* Gradient glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, hsl(176 100% 43% / 0.2), transparent 60%)`,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h3 className="relative z-10 font-heading text-xl md:text-3xl mb-2 md:mb-4 text-foreground font-semibold">
                  {t('bento.contact.title')}
                </h3>
                <p className="relative z-10 font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
                  {t('bento.contact.desc')}
                </p>

                {/* CTA */}
                <div className="relative z-10 inline-flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                  <span>{t('bento.contact.cta')}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Advisor Tile */}
          <div
            className="bento-card group cursor-pointer"
            onClick={handleAdvisorClick}
            data-cursor="Doradca"
          >
            <div 
              className="relative h-full min-h-[320px] md:min-h-[380px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
              }}
            >
              {/* Background Image */}
              <img 
                src={bentoAdvisorImg} 
                alt="Wirtualny Doradca AI – sztuczna inteligencja SI dla biznesu" 
                loading="lazy"
                width="800"
                height="600"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

              {/* Gradient glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, hsl(190 100% 50% / 0.2), transparent 60%)`,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h3 className="relative z-10 font-heading text-xl md:text-3xl mb-2 md:mb-4 text-foreground font-semibold">
                  {t('bento.advisor.title')}
                </h3>
                <p className="relative z-10 font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
                  {t('bento.advisor.desc')}
                </p>

                {/* CTA */}
                <div className="relative z-10 inline-flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                  <span>{t('bento.advisor.cta')}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;