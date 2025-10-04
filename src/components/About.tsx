import { Brain, Target, Lightbulb } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import aboutBackground from '@/assets/about-background.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${aboutBackground})`,
            animation: 'slow-zoom 15s ease-in-out infinite alternate'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient text-glow">{t('about.title')}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-glow-subtle">{t('about.expertise.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.expertise.desc')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-glow-subtle">{t('about.precision.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.precision.desc')}
              </p>
            </div>

            <div className="text-center space-y-4">
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
