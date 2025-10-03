import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gradient">OpenMind</span>
            <br />
            <span className="text-foreground">AI Consulting</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Łączymy znajomość lokalnych wyzwań z najnowszymi możliwościami AI. 
            Dzięki temu otrzymujesz skuteczne wsparcie oparte na sprawdzonych narzędziach.
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
