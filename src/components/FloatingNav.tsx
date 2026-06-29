import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import openmindLogo from '@/assets/openmind-logo-nobg.webp';

const FloatingNav = memo(() => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setScrolled(currentY > 24);

      if (isMenuOpen) {
        setHidden(false);
      } else if (currentY < 80) {
        setHidden(false);
      } else if (diff > 6) {
        setHidden(true);
      } else if (diff < -6) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/ai-advisor', label: t('nav.aiAdvisor') || 'AI Advisor' },
    { path: '/about', label: t('nav.about') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out"
        style={{
          transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
        }}
      >
        {/* Brand glow line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, hsl(176 100% 43% / 0.6) 50%, transparent 100%)',
          }}
        />

        <div
          className="w-full transition-all duration-300"
          style={{
            background: scrolled
              ? 'hsl(220 15% 6% / 0.78)'
              : 'hsl(220 15% 6% / 0.45)',
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            borderBottom: scrolled
              ? '1px solid hsl(176 100% 43% / 0.12)'
              : '1px solid hsl(0 0% 100% / 0.04)',
            boxShadow: scrolled
              ? '0 8px 32px hsl(220 15% 0% / 0.45)'
              : 'none',
          }}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex items-center"
              aria-label="OpenMind AI Consulting – strona główna"
            >
              <img
                src={openmindLogo}
                alt="OpenMind AI Consulting"
                className="h-12 w-auto md:h-14 object-contain"
                width="120"
                height="144"
                style={{ filter: 'drop-shadow(0 0 12px hsl(176 100% 43% / 0.25))' }}
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group relative px-4 py-2 font-sans text-sm transition-colors duration-200 hover:!text-[hsl(176_100%_65%)]"
                    style={{
                      color: active
                        ? 'hsl(176 100% 65%)'
                        : 'hsl(0 0% 100% / 0.72)',
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-px transition-all duration-300 ${
                        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, hsl(176 100% 55%), transparent)',
                        boxShadow: '0 0 10px hsl(176 100% 55% / 0.7)',
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster: lang + mobile trigger */}
            <div className="flex items-center gap-2">
              <div
                className="hidden items-center gap-1 rounded-full p-1 md:flex"
                style={{
                  background: 'hsl(0 0% 100% / 0.04)',
                  border: '1px solid hsl(0 0% 100% / 0.06)',
                }}
              >
                <button
                  onClick={() => setLanguage('pl')}
                  className={`flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition ${
                    language === 'pl'
                      ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
                      : 'opacity-55 hover:opacity-100'
                  }`}
                  aria-label="Polski"
                >
                  <img
                    src="https://flagcdn.com/w40/pl.png"
                    alt="Polski"
                    width="28"
                    height="28"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition ${
                    language === 'en'
                      ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
                      : 'opacity-55 hover:opacity-100'
                  }`}
                  aria-label="English"
                >
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="English"
                    width="28"
                    height="28"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition md:hidden"
                style={{
                  background: 'hsl(220 15% 8% / 0.6)',
                  border: '1px solid hsl(176 100% 43% / 0.25)',
                  boxShadow: '0 0 14px hsl(176 100% 43% / 0.18)',
                }}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center md:hidden"
          style={{
            background: 'hsl(220 15% 4% / 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <nav className="flex flex-col items-center gap-7">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`font-heading text-3xl font-semibold transition-colors duration-200 ${
                    active ? 'text-gradient' : 'text-foreground/75 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setLanguage('pl')}
                className={`h-12 w-12 overflow-hidden rounded-full transition ${
                  language === 'pl' ? 'scale-110 ring-2 ring-primary' : 'opacity-50'
                }`}
                aria-label="Polski"
              >
                <img
                  src="https://flagcdn.com/w80/pl.png"
                  alt="Polski"
                  width="48"
                  height="48"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`h-12 w-12 overflow-hidden rounded-full transition ${
                  language === 'en' ? 'scale-110 ring-2 ring-primary' : 'opacity-50'
                }`}
                aria-label="English"
              >
                <img
                  src="https://flagcdn.com/w80/gb.png"
                  alt="English"
                  className="h-full w-full object-cover"
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
