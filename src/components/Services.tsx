import { memo, useState, useCallback } from 'react';
import { Brain, Users, Lightbulb, Target, Zap, Shield, Rocket, Video, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoSectionBackground from '@/components/VideoSectionBackground';

type ExpandedCards = Record<number, boolean>;

const serviceImages = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
];

const Services = memo(() => {
  const { t, language } = useLanguage();
  const [expandedCards, setExpandedCards] = useState<ExpandedCards>({});
  
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

  const toggleCard = useCallback((index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  return (
    <section id="services" className="pt-20 md:pt-24 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <VideoSectionBackground opacity={0.6} blurPx={3} overlayOpacity={0.45} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" loading="lazy" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const isExpanded = expandedCards[index];
            return (
              <div
                key={index}
                className="group relative cursor-pointer"
                onClick={() => toggleCard(index)}
              >
                <div 
                  className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                    isExpanded ? 'min-h-[520px] md:min-h-[580px]' : 'min-h-[380px] md:min-h-[420px]'
                  }`}
                  style={{
                    boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.08), 0 25px 60px -20px hsl(0 0% 0% / 0.6)`,
                  }}
                >
                  {/* Background Image */}
                  <img 
                    src={service.image} 
                    alt={t(service.titleKey)} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <h3 className="relative z-10 font-heading text-xl md:text-2xl mb-3 text-foreground font-semibold">
                      {t(service.titleKey)}
                    </h3>
                    
                    <p className={`relative z-10 font-sans text-sm text-muted-foreground leading-relaxed mb-4 transition-all duration-200 ${
                      isExpanded ? '' : 'line-clamp-2'
                    }`}>
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

                    {/* Expand/Collapse button */}
                    <div className="relative z-10 mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                      <span>{isExpanded ? (language === 'pl' ? 'Zwiń' : 'Collapse') : (language === 'pl' ? 'Rozwiń' : 'Expand')}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
});

Services.displayName = 'Services';

export default Services;
