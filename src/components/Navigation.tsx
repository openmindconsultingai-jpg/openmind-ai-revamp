import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/openmind-logo.webp';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
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
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {t('nav.about')}
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="glass"
              className="font-semibold"
            >
              {t('nav.contact')}
            </Button>
            <button
              onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
              className="ml-2 w-10 h-10 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors flex-shrink-0"
              title={language === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
            >
              {language === 'pl' ? (
                <img 
                  src="https://flagcdn.com/w80/gb.png" 
                  alt="English" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="https://flagcdn.com/w80/pl.png" 
                  alt="Polski" 
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
