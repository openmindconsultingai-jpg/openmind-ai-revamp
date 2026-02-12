import { useEffect } from 'react';

const SITE_URL = 'https://openmindai.pl';
const SITE_NAME = 'OpenMind AI';
const DEFAULT_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/hL5DHSK2kPP5D5kfMFPItZpWWjm1/social-images/social-1759531582102-Open_Mind-min[1].png';

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
 * Open Graph tags, Twitter Card tags, and optional JSON-LD structured data.
 */
const usePageMeta = ({
  title,
  description,
  keywords,
  path = '',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  jsonLd,
}: PageMetaOptions) => {
  useEffect(() => {
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

    const url = `${SITE_URL}${path === '/' ? '' : path}`;

    // Standard meta
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
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
      // Cleanup JSON-LD on unmount
      const s = document.querySelector('script[data-page-jsonld]');
      if (s) s.remove();
    };
  }, [title, description, keywords, path, ogImage, ogType, jsonLd]);
};

export default usePageMeta;
