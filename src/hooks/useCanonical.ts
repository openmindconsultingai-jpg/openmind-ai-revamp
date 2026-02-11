import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://openmindai.pl';

/**
 * Sets <link rel="canonical"> in <head> based on the current route.
 * Removes query params and hash to keep canonical clean.
 */
const useCanonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    return () => {
      // Don't remove – let the next page update it
    };
  }, [pathname]);
};

export default useCanonical;
