import { Brain, Users, Lightbulb, Target, Zap, Shield, Rocket, Video, Building2 } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import servicesBackground from '@/assets/services-background.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Brain,
      title: t('services.1.title'),
      description: t('services.1.desc'),
      benefits: [t('services.1.benefit1'), t('services.1.benefit2'), t('services.1.benefit3')]
    },
    {
      icon: Users,
      title: t('services.2.title'),
      description: t('services.2.desc'),
      benefits: [t('services.2.benefit1'), t('services.2.benefit2'), t('services.2.benefit3')]
    },
    {
      icon: Rocket,
      title: t('services.3.title'),
      description: t('services.3.desc'),
      benefits: [t('services.3.benefit1'), t('services.3.benefit2'), t('services.3.benefit3')]
    },
    {
      icon: Video,
      title: t('services.4.title'),
      description: t('services.4.desc'),
      benefits: [t('services.4.benefit1'), t('services.4.benefit2'), t('services.4.benefit3')]
    },
    {
      icon: Building2,
      title: t('services.5.title'),
      description: t('services.5.desc'),
      benefits: [t('services.5.benefit1'), t('services.5.benefit2'), t('services.5.benefit3')]
    },
    {
      icon: Lightbulb,
      title: t('services.6.title'),
      description: t('services.6.desc'),
      benefits: [t('services.6.benefit1'), t('services.6.benefit2'), t('services.6.benefit3')]
    },
    {
      icon: Target,
      title: t('services.7.title'),
      description: t('services.7.desc'),
      benefits: [t('services.7.benefit1'), t('services.7.benefit2'), t('services.7.benefit3')]
    },
    {
      icon: Zap,
      title: t('services.8.title'),
      description: t('services.8.desc'),
      benefits: [t('services.8.benefit1'), t('services.8.benefit2'), t('services.8.benefit3')]
    },
    {
      icon: Shield,
      title: t('services.9.title'),
      description: t('services.9.desc'),
      benefits: [t('services.9.benefit1'), t('services.9.benefit2'), t('services.9.benefit3')]
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
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-left">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{benefit}</span>
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
