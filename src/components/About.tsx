import { Brain, Target, Lightbulb } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import ceoImage from '@/assets/ceo-lukasz-czarnecki.png';
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient text-glow">{t('about.title')}</span>
            </h2>
          </div>

          {/* CEO Section */}
          <div className="mb-20 bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src={ceoImage} 
                  alt={t('about.ceo.name')}
                  className="w-full max-w-[300px] aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="space-y-4 max-w-3xl">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gradient text-glow-subtle mb-2">
                    {t('about.ceo.name')}
                  </h3>
                  <p className="text-lg text-primary font-semibold">{t('about.ceo.title')}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.ceo.bio')}
                </p>
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="mb-16 max-w-5xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {t('about.company.desc')}
            </p>
          </div>

          {/* Values Grid */}
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
