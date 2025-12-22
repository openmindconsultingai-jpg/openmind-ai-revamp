import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Sparkles, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoSectionBackground from '@/components/VideoSectionBackground';

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAdvisor, setShowAdvisor] = useState(false);

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
    setShowAdvisor(true);
  };

  const closeAdvisor = () => {
    setShowAdvisor(false);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <VideoSectionBackground opacity={0.25} blurPx={6} overlayOpacity={0.7} />

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12 md:mb-16">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center mb-4 font-semibold">
          <span className="text-gradient">{t('services.title')}</span>
        </h2>
        <p className="font-sans text-muted-foreground text-center max-w-2xl mx-auto text-base md:text-lg">
          {t('services.subtitle')}
        </p>
      </div>

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
              className="relative h-full min-h-[320px] md:min-h-[380px] p-8 rounded-2xl glass border border-border/30 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:scale-[1.02]"
              style={{
                boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
              }}
            >
              {/* Gradient glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, hsl(176 100% 43% / 0.2), transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div 
                className="relative z-10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, hsl(176 100% 43% / 0.25), transparent)`,
                  border: `1px solid hsl(176 100% 43% / 0.4)`,
                }}
              >
                <MessageSquare 
                  size={32} 
                  className="text-primary transition-transform duration-500 group-hover:rotate-12"
                />
              </div>

              {/* Content */}
              <h3 className="relative z-10 font-heading text-2xl md:text-3xl mb-4 text-foreground font-semibold">
                {t('bento.contact.title')}
              </h3>
              <p className="relative z-10 font-sans text-base text-muted-foreground leading-relaxed mb-6">
                {t('bento.contact.desc')}
              </p>

              {/* CTA */}
              <div className="relative z-10 inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                <span>{t('bento.contact.cta')}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>

              {/* Corner accent */}
              <div 
                className="absolute bottom-0 right-0 w-40 h-40 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at bottom right, hsl(176 100% 43%), transparent 70%)`,
                }}
              />
            </div>
          </div>

          {/* AI Advisor Tile */}
          <div
            className="bento-card group cursor-pointer"
            onClick={handleAdvisorClick}
            data-cursor="Doradca"
          >
            <div 
              className="relative h-full min-h-[320px] md:min-h-[380px] p-8 rounded-2xl glass border border-border/30 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:scale-[1.02]"
              style={{
                boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
              }}
            >
              {/* Gradient glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, hsl(190 100% 50% / 0.2), transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div 
                className="relative z-10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, hsl(190 100% 50% / 0.25), transparent)`,
                  border: `1px solid hsl(190 100% 50% / 0.4)`,
                }}
              >
                <Sparkles 
                  size={32} 
                  className="text-cyan-400 transition-transform duration-500 group-hover:rotate-12"
                />
              </div>

              {/* Content */}
              <h3 className="relative z-10 font-heading text-2xl md:text-3xl mb-4 text-foreground font-semibold">
                {t('bento.advisor.title')}
              </h3>
              <p className="relative z-10 font-sans text-base text-muted-foreground leading-relaxed mb-6">
                {t('bento.advisor.desc')}
              </p>

              {/* CTA */}
              <div className="relative z-10 inline-flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                <span>{t('bento.advisor.cta')}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>

              {/* Corner accent */}
              <div 
                className="absolute bottom-0 right-0 w-40 h-40 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at bottom right, hsl(190 100% 50%), transparent 70%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Advisor Modal */}
      {showAdvisor && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          onClick={closeAdvisor}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-4xl h-[80vh] glass rounded-3xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeAdvisor}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-muted/50 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-border/30">
                <h3 className="font-heading text-2xl md:text-3xl text-gradient font-semibold">
                  {t('bento.advisor.modal.title')}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {t('bento.advisor.modal.subtitle')}
                </p>
              </div>
              
              <div className="flex-1 p-6">
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/SqPZ4YgcXWDi1VhFEdoGc"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="rounded-xl"
                  title="AI Advisor Chatbot"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BentoGrid;