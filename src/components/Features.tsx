import { CheckCircle2, Users, Globe } from 'lucide-react';
import featuresBackground from '@/assets/features-background.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: CheckCircle2,
      titleKey: 'features.personalization.title',
      descKey: 'features.personalization.desc',
    },
    {
      icon: Users,
      titleKey: 'features.universal.title',
      descKey: 'features.universal.desc',
    },
    {
      icon: Globe,
      titleKey: 'features.knowhow.title',
      descKey: 'features.knowhow.desc',
    },
  ];
  return (
    <section id="services" className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${featuresBackground})`,
            animation: 'slow-zoom 15s ease-in-out infinite alternate'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 shadow-lg shadow-primary/10">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground text-glow-subtle group-hover:text-gradient transition-colors text-center">
                    {t(feature.titleKey)}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-left">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
