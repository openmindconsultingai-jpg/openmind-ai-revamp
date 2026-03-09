import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.openmindai.pl';
const SITE_NAME = 'OpenMind AI';
const DEFAULT_IMAGE = 'https://www.openmindai.pl/og-image.jpg';

interface PageMetaOptions {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

/**
 * Sets document <title>, <meta name="description">, <meta name="keywords">,
 * Open Graph tags, Twitter Card tags, canonical, hreflang, and optional JSON-LD.
 *
 * IMPORTANT: canonical & hreflang are derived from the CURRENT window.location.pathname
 * (NOT from the `path` prop) to guarantee they always reflect the real URL.
 * The `path` prop is kept only as a fallback / for og:url.
 */
const usePageMeta = ({
  title,
  description,
  keywords,
  path,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  jsonLd,
}: PageMetaOptions) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Derive canonical URL from the actual browser pathname (most reliable source)
    const rawPath = pathname || window.location.pathname || '';
    const normalizedPath = rawPath !== '/' ? rawPath.replace(/\/+$/, '') : '';
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;

    // Also compute og:url from explicit path prop if provided, else use canonical
    const ogUrl = path != null
      ? `${SITE_URL}${path === '/' ? '' : path}`
      : canonicalUrl;

    // Title
    document.title = title;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // --- Canonical ---
    document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', canonicalUrl);
    document.head.appendChild(canonicalLink);

    // --- Hreflang (always same as canonical) ---
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    ['pl', 'en', 'x-default'].forEach((lang) => {
      const alternateLink = document.createElement('link');
      alternateLink.setAttribute('rel', 'alternate');
      alternateLink.setAttribute('hreflang', lang);
      alternateLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(alternateLink);
    });

    // Standard meta
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', ogUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'pl_PL');

    // Twitter Card
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // JSON-LD structured data
    let scriptEl = document.querySelector<HTMLScriptElement>('script[data-page-jsonld]');
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.setAttribute('type', 'application/ld+json');
        scriptEl.setAttribute('data-page-jsonld', 'true');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      const s = document.querySelector('script[data-page-jsonld]');
      if (s) s.remove();
    };
  }, [title, description, keywords, path, pathname, ogImage, ogType, jsonLd]);
};

export default usePageMeta;
