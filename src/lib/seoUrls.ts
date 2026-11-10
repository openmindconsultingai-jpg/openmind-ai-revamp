export const SEO_SITE = 'https://www.openmindai.pl';

export function cleanPagePath(value: string): string {
  const pathname = new URL(value, SEO_SITE).pathname;
  return pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
}

export function pageUrl(value: string): string {
  return `${SEO_SITE}${cleanPagePath(value)}`;
}

export function normalizeStructuredUrls<T>(value: T): T {
  if (typeof value === 'string' && /^https?:\/\/(www\.)?openmindai\.pl(?:\/|$)/.test(value)) {
    const parsed = new URL(value);
    return `${pageUrl(parsed.pathname)}${parsed.search}${parsed.hash}` as T;
  }
  if (Array.isArray(value)) return value.map(normalizeStructuredUrls) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeStructuredUrls(item)])) as T;
  }
  return value;
}