import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="OpenMind AI" className="h-12 md:h-16 lg:h-20" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/' ? 'text-primary' : ''
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/services"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/services' ? 'text-primary' : ''
              }`}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/about"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/about' ? 'text-primary' : ''
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/blog"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/blog' ? 'text-primary' : ''
              }`}
            >
              {t('nav.blog')}
            </Link>
            <Link to="/contact">
              <Button
                variant="glass"
                className="font-semibold"
              >
                {t('nav.contact')}
              </Button>
            </Link>
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-border pt-4 animate-fade-in">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 ${
                location.pathname === '/' ? 'text-primary' : ''
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/services"
              onClick={closeMobileMenu}
              className={`block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 ${
                location.pathname === '/services' ? 'text-primary' : ''
              }`}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className={`block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 ${
                location.pathname === '/about' ? 'text-primary' : ''
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/blog"
              onClick={closeMobileMenu}
              className={`block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 ${
                location.pathname === '/blog' ? 'text-primary' : ''
              }`}
            >
              {t('nav.blog')}
            </Link>
            <Link to="/contact" onClick={closeMobileMenu}>
              <Button
                variant="glass"
                className="w-full font-semibold"
              >
                {t('nav.contact')}
              </Button>
            </Link>
            <div className="flex items-center justify-between pt-2">
              <span className="text-muted-foreground text-sm">{language === 'pl' ? 'Język' : 'Language'}:</span>
              <button
                onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors"
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
        )}
      </div>
    </nav>
  );
};

export default Navigation;
