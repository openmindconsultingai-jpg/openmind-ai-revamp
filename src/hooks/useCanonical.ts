import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.openmindai.pl';
const PRODUCTION_HOSTS = ['www.openmindai.pl', 'openmindai.pl'];

/**
 * Sets <link rel="canonical"> in <head> based on the current route.
 * Also sets noindex on non-production domains (preview/staging).
 */
const useCanonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    // Set canonical link
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Block indexing on non-production domains (preview, staging, lovable.app, etc.)
    const isProduction = PRODUCTION_HOSTS.includes(window.location.hostname);
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', isProduction ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' : 'noindex, nofollow');

    return () => {
      // Don't remove – let the next page update it
    };
  }, [pathname]);
};

export default useCanonical;
