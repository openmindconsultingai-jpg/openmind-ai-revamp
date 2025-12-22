import { memo, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const FloatingNav = memo(() => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/ai-advisor', label: t('nav.aiAdvisor') || 'AI Advisor' },
    { path: '/about', label: t('nav.about') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      {/* Floating Pill Navigation - Bottom Center */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300">
        {/* Desktop Navigation - Minimalist Pill */}
        <div 
          className="hidden md:flex items-center gap-0.5 rounded-full px-1.5 py-1.5"
          style={{
            background: 'hsl(220 15% 8% / 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid hsl(0 0% 100% / 0.06)',
            boxShadow: '0 8px 32px hsl(220 15% 0% / 0.4), 0 0 0 1px hsl(0 0% 100% / 0.02) inset',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                px-4 py-2 rounded-full font-sans text-sm transition-colors duration-200
                ${location.pathname === item.path 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground/60 hover:text-foreground hover:bg-muted/30'
                }
              `}
              style={{
                boxShadow: location.pathname === item.path 
                  ? '0 0 20px hsl(176 100% 43% / 0.4)' 
                  : 'none'
              }}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-1 ml-1.5 pl-1.5 border-l border-border/30">
            <button
              onClick={() => setLanguage('pl')}
              className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-opacity duration-200 ${
                language === 'pl' ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : 'opacity-60 hover:opacity-100'
              }`}
              aria-label="Polski"
            >
              <img 
                src="https://flagcdn.com/w40/pl.png" 
                alt="Polski" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-opacity duration-200 ${
                language === 'en' ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : 'opacity-60 hover:opacity-100'
              }`}
              aria-label="English"
            >
              <img 
                src="https://flagcdn.com/w40/gb.png" 
                alt="English" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Trigger - Floating Pill */}
        <button
          onClick={toggleMenu}
          className="md:hidden rounded-full p-3.5 text-foreground transition-colors duration-200"
          style={{
            background: 'hsl(220 15% 8% / 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid hsl(0 0% 100% / 0.06)',
            boxShadow: '0 8px 32px hsl(220 15% 0% / 0.4)',
          }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Full-screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center md:hidden">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`
                  font-heading text-3xl transition-colors duration-200 font-semibold
                  ${location.pathname === item.path 
                    ? 'text-gradient' 
                    : 'text-foreground/70 hover:text-foreground'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setLanguage('pl')}
                className={`w-12 h-12 rounded-full overflow-hidden transition-opacity duration-200 ${
                  language === 'pl' ? 'ring-2 ring-primary scale-110' : 'opacity-50'
                }`}
              >
                <img 
                  src="https://flagcdn.com/w80/pl.png" 
                  alt="Polski" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-12 h-12 rounded-full overflow-hidden transition-opacity duration-200 ${
                  language === 'en' ? 'ring-2 ring-primary scale-110' : 'opacity-50'
                }`}
              >
                <img 
                  src="https://flagcdn.com/w80/gb.png" 
                  alt="English" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
});

FloatingNav.displayName = 'FloatingNav';

export default FloatingNav;
