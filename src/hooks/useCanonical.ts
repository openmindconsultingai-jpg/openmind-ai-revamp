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
    const isRedirectSourcePath =
      normalizedPath === '/polityka-prywatnosci-i-bezpieczenstwo-danych' ||
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
