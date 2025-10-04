import { Brain, Users, Lightbulb, Target, Zap, Shield, Rocket, Video, Building2 } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import servicesBackground from '@/assets/services-background.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Brain,
      titleKey: 'services.consulting.title',
      descKey: 'services.consulting.desc',
      benefitKeys: ['services.consulting.benefit1', 'services.consulting.benefit2', 'services.consulting.benefit3']
    },
    {
      icon: Users,
      titleKey: 'services.training.title',
      descKey: 'services.training.desc',
      benefitKeys: ['services.training.benefit1', 'services.training.benefit2', 'services.training.benefit3']
    },
    {
      icon: Rocket,
      titleKey: 'services.business.title',
      descKey: 'services.business.desc',
      benefitKeys: ['services.business.benefit1', 'services.business.benefit2', 'services.business.benefit3']
    },
    {
      icon: Video,
      titleKey: 'services.social.title',
      descKey: 'services.social.desc',
      benefitKeys: ['services.social.benefit1', 'services.social.benefit2', 'services.social.benefit3']
    },
    {
      icon: Building2,
      titleKey: 'services.public.title',
      descKey: 'services.public.desc',
      benefitKeys: ['services.public.benefit1', 'services.public.benefit2', 'services.public.benefit3']
    },
    {
      icon: Lightbulb,
      titleKey: 'services.strategy.title',
      descKey: 'services.strategy.desc',
      benefitKeys: ['services.strategy.benefit1', 'services.strategy.benefit2', 'services.strategy.benefit3']
    },
    {
      icon: Target,
      titleKey: 'services.custom.title',
      descKey: 'services.custom.desc',
      benefitKeys: ['services.custom.benefit1', 'services.custom.benefit2', 'services.custom.benefit3']
    },
    {
      icon: Zap,
      titleKey: 'services.optimization.title',
      descKey: 'services.optimization.desc',
      benefitKeys: ['services.optimization.benefit1', 'services.optimization.benefit2', 'services.optimization.benefit3']
    },
    {
      icon: Shield,
      titleKey: 'services.security.title',
      descKey: 'services.security.desc',
      benefitKeys: ['services.security.benefit1', 'services.security.benefit2', 'services.security.benefit3']
    }
  ];
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${servicesBackground})`,
            animation: 'slow-zoom 15s ease-in-out infinite alternate'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 shadow-lg shadow-primary/10">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground text-glow-subtle text-center">
                    {t(service.titleKey)}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-left">
                    {t(service.descKey)}
                  </p>

                  <div className="space-y-2">
                    {service.benefitKeys.map((benefitKey, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{t(benefitKey)}</span>
                      </div>
                    ))}
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
