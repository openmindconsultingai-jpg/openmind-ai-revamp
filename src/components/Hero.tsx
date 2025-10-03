import { ArrowRight } from 'lucide-react';
import heroBackground from '@/assets/ai-hero-background.jpg';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
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
            <span className="text-gradient text-glow">OpenMind</span>
            <br />
            <span className="text-foreground text-glow">AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-glow-subtle">
            Polski start-up łączący innowacyjność z elastycznością. 
            Dostarczamy zaawansowane rozwiązania AI dostosowane do dynamicznie zmieniającego się rynku.
          </p>
          
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Łączymy lokalne know-how z globalnymi technologiami sztucznej inteligencji, 
            oferując skuteczne wsparcie oparte na sprawdzonych narzędziach dla firm, szkół i rodzin.
          </p>

          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all glow-primary"
          >
            Wkrocz w technologię jutra już dziś
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
