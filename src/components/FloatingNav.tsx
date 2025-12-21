import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const FloatingNav = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isVisible]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/about', label: t('nav.about') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      {/* Floating Pill Navigation */}
      <nav 
        ref={navRef}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                px-5 py-2.5 rounded-full font-sans text-sm transition-all duration-300
                ${location.pathname === item.path 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border/50">
            <button
              onClick={() => setLanguage('pl')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                language === 'pl' ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-muted/50'
              }`}
              aria-label="Polski"
            >
              <span className="text-sm">🇵🇱</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                language === 'en' ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-muted/50'
              }`}
              aria-label="English"
            >
              <span className="text-sm">🇬🇧</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Trigger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden glass rounded-full p-4 text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                onClick={() => setIsMenuOpen(false)}
                className={`
                  font-heading text-3xl transition-all duration-300 font-semibold
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
                className={`text-2xl transition-all ${
                  language === 'pl' ? 'scale-125' : 'opacity-50'
                }`}
              >
                🇵🇱
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-2xl transition-all ${
                  language === 'en' ? 'scale-125' : 'opacity-50'
                }`}
              >
                🇬🇧
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default FloatingNav;