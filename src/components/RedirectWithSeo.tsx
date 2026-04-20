import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface RedirectWithSeoProps {
  to: string;
}

const SITE_URL = 'https://www.openmindai.pl';

/**
 * SEO-friendly client-side redirect.
 *
 * Before triggering the React Router <Navigate>, this component synchronously
 * sets:
 *   - <meta name="robots" content="noindex, nofollow"> so Googlebot does not
 *     index the legacy URL.
 *   - <link rel="canonical" href="<destination>"> so crawlers that DO read the
 *     legacy URL are pointed at the new canonical target.
 *
 * This solves "Duplicate without user-selected canonical" GSC errors caused by
 * legacy paths (e.g. /kontakt → /contact) that previously rendered the same
 * empty SPA shell as the destination.
 */
const RedirectWithSeo = ({ to }: RedirectWithSeoProps) => {
  // Run BEFORE paint so crawlers see the right tags even on the first frame.
  useEffect(() => {
    // robots: noindex
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    // canonical → destination
    document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `${SITE_URL}${to === '/' ? '' : to}`);
    document.head.appendChild(canonical);

    // Drop any stale hreflang alternates from the previous page.
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  }, [to]);

  return <Navigate to={to} replace />;
};

export default RedirectWithSeo;
