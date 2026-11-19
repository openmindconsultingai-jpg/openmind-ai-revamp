import { memo, useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import openmindLogo from '@/assets/openmind-logo-nobg.webp';
import isoLogo from '@/assets/iso9001-teal.png.asset.json';
import burLogo from '@/assets/parp-bur-light.png.asset.json';

const FloatingNav = memo(() => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const hovered = useRef<string>();
  const focused = useRef<string>();
  const lastScrollY = useRef(0);
  const location = useLocation();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

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
    { path: '/', label: t('nav.home'), prefetch: () => import('@/pages/Home') },
    { path: '/services', label: t('nav.services'), prefetch: () => import('@/pages/ServicesHubPage') },
    { path: '/aktualnosci', label: t('nav.news'), prefetch: () => import('@/pages/News') },
    { path: '/about', label: t('nav.about'), prefetch: () => import('@/pages/About') },
    { path: '/blog', label: t('nav.blog'), prefetch: () => import('@/pages/Blog') },
    { path: '/contact', label: t('nav.contact'), prefetch: () => import('@/pages/Contact') },
  ];
  const prefetched = useRef(new Set<string>());
  const handlePrefetch = (path: string, fn: () => Promise<unknown>) => {
    if (prefetched.current.has(path)) return;
    prefetched.current.add(path);
    fn().catch(() => prefetched.current.delete(path));
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const activePath = navItems.find((item) => isActive(item.path))?.path;
  const highlightLink = useCallback(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const path = hovered.current ?? focused.current ?? activePath;
    let item: HTMLElement | undefined;
    for (const link of nav.querySelectorAll<HTMLElement>('[data-nav-path]')) {
      const highlighted = link.dataset.navPath === path;
      if (link.hasAttribute('data-highlight') !== highlighted) link.toggleAttribute('data-highlight', highlighted);
      if (highlighted) item = link;
    }
    pill.style.opacity = item?.offsetWidth ? '1' : '0';
    if (item?.offsetWidth) {
      pill.style.transform = `translateX(${item.offsetLeft}px)`;
      pill.style.width = `${item.offsetWidth}px`;
    }
  }, [activePath]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    highlightLink();
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(highlightLink) : undefined;
    resize?.observe(nav);
    for (const item of nav.querySelectorAll('a')) resize?.observe(item);
    return () => resize?.disconnect();
  }, [highlightLink, language]);

  return (
    <>
      <header
        className="fx-nav-header fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out"
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

        <div className="fx-nav-panel w-full">
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
            <div className="ml-3 flex items-center gap-2 md:gap-3 mr-auto">
              <Link
                to="/aktualnosci/certyfikat-iso-9001"
                onClick={closeMenu}
                title="Certyfikat ISO 9001"
                aria-label="Certyfikat ISO 9001"
                className="opacity-90 transition-opacity hover:opacity-100"
              >
                <img src={isoLogo.url} alt="ISO 9001" className="h-6 w-auto md:h-8" width="64" height="25" style={{ filter: 'drop-shadow(0 0 8px hsl(176 100% 43% / 0.35))' }} />
              </Link>
              <Link
                to="/aktualnosci/wpis-do-bazy-uslug-rozwojowych"
                onClick={closeMenu}
                title="PARP – Baza Usług Rozwojowych"
                aria-label="PARP – Baza Usług Rozwojowych"
                className="opacity-90 transition-opacity hover:opacity-100"
              >
                <img src={burLogo.url} alt="PARP Baza Usług Rozwojowych" className="h-8 w-auto md:h-10" width="58" height="32" />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav ref={navRef} className="relative hidden items-center gap-1 md:flex" onMouseLeave={() => { hovered.current = undefined; highlightLink(); }}>
              <span ref={pillRef} aria-hidden="true" className="fx-nav-pill" />
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => { hovered.current = item.path; highlightLink(); handlePrefetch(item.path, item.prefetch); }}
                    onFocus={() => { focused.current = item.path; highlightLink(); handlePrefetch(item.path, item.prefetch); }}
                    onBlur={() => { focused.current = undefined; highlightLink(); }}
                    className="fx-nav-link group relative px-3 lg:px-4 py-2 font-sans text-sm"
                    data-nav-path={item.path}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span aria-hidden="true" className="absolute pointer-events-none size-px opacity-0" />
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
            background: 'hsl(var(--background) / .96)',
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
                  width="48"
                  height="48"
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
