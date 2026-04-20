import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PRODUCTION_HOSTS = ['www.openmindai.pl', 'openmindai.pl'];

/**
 * Sets robots meta tag based on environment + redirect detection.
 * Canonical & hreflang are handled exclusively by usePageMeta.
 */
const useCanonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const rawPath = window.location.pathname || pathname;
    const normalizedPath = rawPath !== '/' ? rawPath.replace(/\/+$/, '') : '/';

    // --- Robots ---
    const isProduction = PRODUCTION_HOSTS.includes(window.location.hostname);
    const LEGACY_REDIRECT_PATHS = new Set([
      '/polityka-prywatnosci-i-bezpieczenstwo-danych',
      '/polityka-prywatnosci-i-bezpieczenstwa-danych',
      '/o-nas',
      '/kontakt',
      '/oferta',
      '/en/o-nas-en',
      '/en/kontakt-en',
      '/en/oferta-en',
    ]);
    const isRedirectSourcePath =
      LEGACY_REDIRECT_PATHS.has(normalizedPath) ||
      /^\/gdzie-dzialamy\/[^/]+$/.test(normalizedPath);

    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute(
      'content',
      isProduction && !isRedirectSourcePath
        ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        : 'noindex, nofollow'
    );
  }, [pathname]);
};

export default useCanonical;
