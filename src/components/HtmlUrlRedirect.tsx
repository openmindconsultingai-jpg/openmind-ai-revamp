import { Navigate, useLocation } from 'react-router-dom';
import { cleanPagePath } from '@/lib/seoUrls';

/** Prevent the SPA fallback from rendering duplicate content at HTML aliases. */
export default function HtmlUrlRedirect({ children }: { children: React.ReactNode }) {
  const { pathname, search, hash } = useLocation();
  if (/\.html$/.test(pathname)) {
    return <Navigate to={`${cleanPagePath(pathname)}${search}${hash}`} replace />;
  }
  return <>{children}</>;
}