import { useEffect, useRef, useState } from 'react';
import { Brain, Users, Lightbulb, Target, Zap, Shield, Rocket, Video, Building2 } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoSectionBackground from '@/components/VideoSectionBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Service images - using abstract AI/tech themed images
const serviceImages = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', // AI Brain
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Team training
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', // Business tech
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', // Social media
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // Buildings
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80', // Strategy
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // Custom tech
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', // Optimization
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', // Security
];

const Services = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const services = [
    {
      icon: Brain,
      titleKey: 'services.consulting.title',
      descKey: 'services.consulting.desc',
      benefitKeys: ['services.consulting.benefit1', 'services.consulting.benefit2', 'services.consulting.benefit3'],
      image: serviceImages[0]
    },
    {
      icon: Users,
      titleKey: 'services.training.title',
      descKey: 'services.training.desc',
      benefitKeys: ['services.training.benefit1', 'services.training.benefit2', 'services.training.benefit3'],
      image: serviceImages[1]
    },
    {
      icon: Rocket,
      titleKey: 'services.business.title',
      descKey: 'services.business.desc',
      benefitKeys: ['services.business.benefit1', 'services.business.benefit2', 'services.business.benefit3'],
      image: serviceImages[2]
    },
    {
      icon: Video,
      titleKey: 'services.social.title',
      descKey: 'services.social.desc',
      benefitKeys: ['services.social.benefit1', 'services.social.benefit2', 'services.social.benefit3'],
      image: serviceImages[3]
    },
    {
      icon: Building2,
      titleKey: 'services.public.title',
      descKey: 'services.public.desc',
      benefitKeys: ['services.public.benefit1', 'services.public.benefit2', 'services.public.benefit3'],
      image: serviceImages[4]
    },
    {
      icon: Lightbulb,
      titleKey: 'services.strategy.title',
      descKey: 'services.strategy.desc',
      benefitKeys: ['services.strategy.benefit1', 'services.strategy.benefit2', 'services.strategy.benefit3'],
      image: serviceImages[5]
    },
    {
      icon: Target,
      titleKey: 'services.custom.title',
      descKey: 'services.custom.desc',
      benefitKeys: ['services.custom.benefit1', 'services.custom.benefit2', 'services.custom.benefit3'],
      image: serviceImages[6]
    },
    {
      icon: Zap,
      titleKey: 'services.optimization.title',
      descKey: 'services.optimization.desc',
      benefitKeys: ['services.optimization.benefit1', 'services.optimization.benefit2', 'services.optimization.benefit3'],
      image: serviceImages[7]
    },
    {
      icon: Shield,
      titleKey: 'services.security.title',
      descKey: 'services.security.desc',
      benefitKeys: ['services.security.benefit1', 'services.security.benefit2', 'services.security.benefit3'],
      image: serviceImages[8]
    }
  ];

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
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background parallax (was image-based)
      // Video background is handled by VideoSectionBackground.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Spotlight effect tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const grid = cardsRef.current;
    if (grid) {
      grid.addEventListener('mousemove', handleMouseMove);
      return () => grid.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section ref={sectionRef} id="services" className="pt-20 md:pt-24 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <VideoSectionBackground opacity={0.6} blurPx={3} overlayOpacity={0.45} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient text-glow">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div 
          ref={cardsRef} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative"
          style={{
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`,
          } as React.CSSProperties}
        >
          {/* Spotlight overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(176 100% 43% / 0.1), transparent 40%)`,
            }}
          />
          
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group relative cursor-pointer"
              >
                <div 
                  className="relative h-full min-h-[380px] md:min-h-[420px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
                  }}
                >
                  {/* Background Image */}
                  <img 
                    src={service.image} 
                    alt={t(service.titleKey)} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

                  {/* Gradient glow on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(400px circle at 50% 50%, hsl(176 100% 43% / 0.2), transparent 60%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <h3 className="relative z-10 font-heading text-xl md:text-2xl mb-3 text-foreground font-semibold">
                      {t(service.titleKey)}
                    </h3>
                    
                    <p className="relative z-10 font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {t(service.descKey)}
                    </p>

                    <div className="relative z-10 space-y-1.5">
                      {service.benefitKeys.map((benefitKey, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          <span>{t(benefitKey)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
