import { useState, useEffect } from 'react';
import logo from '@/assets/openmind-logo.webp';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img src={logo} alt="OpenMind AI" className="h-16 md:h-20" />
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Strona główna
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Nasze usługi
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              O nas
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-background/20 backdrop-blur-md border border-primary/30 text-primary-foreground hover:bg-background/30 hover:border-primary/50 shadow-lg px-6 py-2 rounded-lg transition-all font-semibold"
            >
              Kontakt
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
