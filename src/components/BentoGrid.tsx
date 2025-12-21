import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Building2, Users, GraduationCap, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'business',
    icon: Building2,
    titleKey: 'services.business.title',
    descKey: 'services.business.desc',
    color: 'hsl(176 100% 43%)',
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'administration',
    icon: Users,
    titleKey: 'services.administration.title',
    descKey: 'services.administration.desc',
    color: 'hsl(190 100% 50%)',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'education',
    icon: GraduationCap,
    titleKey: 'services.education.title',
    descKey: 'services.education.desc',
    color: 'hsl(176 100% 43%)',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'ai',
    icon: Brain,
    titleKey: 'services.ai.title',
    descKey: 'services.ai.desc',
    color: 'hsl(190 100% 50%)',
    gridClass: 'md:col-span-2 md:row-span-1',
  },
];

const BentoGrid = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedService, setExpandedService] = useState<string | null>(null);

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

  const handleCardClick = (id: string) => {
    setExpandedService(id);
  };

  const closeExpanded = () => {
    setExpandedService(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center mb-4 font-semibold">
          <span className="text-gradient">{t('services.title')}</span>
        </h2>
        <p className="font-sans text-muted-foreground text-center max-w-2xl mx-auto">
          {t('services.subtitle')}
        </p>
      </div>

      {/* Bento Grid */}
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
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(176 100% 43% / 0.1), transparent 40%)`,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`bento-card ${service.gridClass} group cursor-pointer`}
                onClick={() => handleCardClick(service.id)}
                data-cursor="Odkryj"
              >
                <div 
                  className="relative h-full min-h-[280px] p-8 rounded-2xl glass border border-border/20 overflow-hidden transition-all duration-500 hover:border-primary/30"
                  style={{
                    boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.05), 0 20px 50px -20px hsl(0 0% 0% / 0.5)`,
                  }}
                >
                  {/* Gradient glow on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(400px circle at 50% 50%, ${service.color}15, transparent 60%)`,
                    }}
                  />

                  {/* Icon */}
                  <div 
                    className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}20, transparent)`,
                      border: `1px solid ${service.color}30`,
                    }}
                  >
                    <Icon 
                      size={28} 
                      style={{ color: service.color }}
                      className="transition-transform duration-500 group-hover:rotate-12"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 font-heading text-2xl mb-3 text-foreground font-semibold">
                    {t(service.titleKey)}
                  </h3>
                  <p className="relative z-10 font-sans text-sm text-muted-foreground leading-relaxed">
                    {t(service.descKey)}
                  </p>

                  {/* Corner accent */}
                  <div 
                    className="absolute bottom-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at bottom right, ${service.color}, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Service Modal */}
      {expandedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={closeExpanded}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
          
          {/* Modal Content */}
          <div 
            className="relative max-w-2xl w-full glass rounded-3xl p-10 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeExpanded}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X size={24} />
            </button>

            {(() => {
              const service = services.find(s => s.id === expandedService);
              if (!service) return null;
              const Icon = service.icon;
              
              return (
                <>
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}30, transparent)`,
                      border: `1px solid ${service.color}40`,
                    }}
                  >
                    <Icon size={40} style={{ color: service.color }} />
                  </div>
                  
                  <h3 className="font-heading text-4xl mb-4 text-gradient font-semibold">
                    {t(service.titleKey)}
                  </h3>
                  <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                    {t(service.descKey)}
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default BentoGrid;