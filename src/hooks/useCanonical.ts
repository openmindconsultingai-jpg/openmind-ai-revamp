import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.openmindai.pl';
const PRODUCTION_HOSTS = ['www.openmindai.pl', 'openmindai.pl'];

/**
 * Sets <link rel="canonical">, <link rel="alternate" hreflang="...">
 * in <head> based on the current route.
 * Also sets noindex on non-production domains (preview/staging).
 */
const useCanonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const rawPath = window.location.pathname || pathname;
    const normalizedPath = rawPath !== '/' ? rawPath.replace(/\/+$/, '') : '/';
    const canonicalUrl = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;

    // --- Canonical (ensure single tag only) ---
    document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', canonicalUrl);
    document.head.appendChild(canonicalLink);

    // --- Hreflang tags (ensure single tag per locale only) ---
    document
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());

    ['pl', 'en', 'x-default'].forEach((hreflangValue) => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', hreflangValue);
      el.setAttribute('href', canonicalUrl);
      document.head.appendChild(el);
    });

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

    return () => {
      // Don't remove – let the next page update them
    };
  }, [pathname]);
};

export default useCanonical;
