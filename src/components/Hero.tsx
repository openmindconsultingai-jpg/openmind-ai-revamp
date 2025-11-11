import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroBackground from '@/assets/ai-hero-background.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 md:pt-24">
      {/* Animated AI Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroBackground})`,
            animation: 'slow-zoom 15s ease-in-out infinite alternate, subtle-shift 10s ease-in-out infinite'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>
      
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-center">
            <span className="text-gradient text-glow">{t('hero.title')}</span>{" "}
            <span className="text-foreground text-glow">{t('hero.subtitle')}</span>
          </h1>
          
          <div className="flex justify-center my-8">
            <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_8601k9t05zq8f5tbghtehtcvpr3n"></elevenlabs-convai>' }} />
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-glow-subtle text-center">
            {t('hero.description')}
          </p>
          
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto text-center">
            {t('hero.description2')}
          </p>

          <Button
            onClick={scrollToContact}
            variant="glass"
            size="lg"
            className="group text-sm sm:text-base md:text-lg font-semibold px-4 sm:px-6 md:px-8"
          >
            <span className="text-center leading-tight">{t('hero.cta')}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
