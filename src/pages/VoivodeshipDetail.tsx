import { Navigate, useParams } from 'react-router-dom';
import { findVoivodeship } from '@/data/voivodeships';

/**
 * Canonical entry for service areas is the CITY page.
 * This route exists only to redirect /gdzie-dzialamy/:slug -> /gdzie-dzialamy/:slug/:citySlug
 */
const VoivodeshipDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? findVoivodeship(slug) : null;

  const firstCitySlug = data?.cities?.[0]?.slug;
  if (!data || !firstCitySlug) return <Navigate to="/" replace />;

  return <Navigate to={`/gdzie-dzialamy/${data.slug}/${firstCitySlug}.html`} replace />;
};

export default VoivodeshipDetail;
