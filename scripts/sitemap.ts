import { SEO_SITE } from '../src/lib/seoUrls';

type Entry = { loc: string; lastmod: string | null };
const NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

export function sitemapEntries(xml: string): Entry[] {
  return Array.from(xml.matchAll(/<(url|sitemap)>([\s\S]*?)<\/\1>/g)).flatMap(([, , entry]) => {
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    return loc ? [{ loc, lastmod: entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null }] : [];
  });
}

function renderEntries(root: string, tag: string, entries: Entry[]): string {
  const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rows = entries.map(({ loc, lastmod }) => `  <${tag}><loc>${escape(loc)}</loc>${lastmod ? `<lastmod>${escape(lastmod)}</lastmod>` : ''}</${tag}>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<${root} xmlns="${NS}">\n${rows.join('\n')}\n</${root}>\n`;
}

export const renderSitemap = (entries: Entry[]) => renderEntries('urlset', 'url', entries);

export function renderSitemapIndex(childMaps: ReadonlyMap<string, Entry[]>): string {
  return renderEntries('sitemapindex', 'sitemap', Array.from(childMaps, ([name, entries]) => ({
    loc: `${SEO_SITE}/${name}`,
    lastmod: entries.reduce<string | null>((latest, { lastmod }) => {
      if (!lastmod || !Number.isFinite(Date.parse(lastmod))) return latest;
      return !latest || Date.parse(lastmod) > Date.parse(latest) ? lastmod : latest;
    }, null),
  })));
}