import fs from 'node:fs';
import path from 'node:path';
import { cleanPagePath, pageUrl, SEO_SITE } from '../src/lib/seoUrls';
import { voivodeships } from '../src/data/voivodeships';

export function internalHtmlUrl(value: string): boolean {
  try {
    const url = new URL(value.replace(/&amp;/g, '&'), SEO_SITE);
    return ['www.openmindai.pl', 'openmindai.pl'].includes(url.hostname) && /\.html$/.test(url.pathname);
  } catch { return false; }
}

export function assertPageCanonical(route: string, canonical: string): void {
  if (canonical !== pageUrl(route)) throw new Error(`Canonical mismatch: ${route} -> ${canonical}`);
}

export function assertCityText(text: string): void {
  const names = voivodeships.flatMap(v => v.cities.map(c => c.name))
    .sort((a, b) => b.length - a.length).map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const badCity = new RegExp(`(?:Wdrożenia AI|Szkolenia AI|Automatyzacja AI|Agent AI|AI|sztuczna inteligencja)\\s+(?:${names.join('|')})(?=$|[^\\p{L}])`, 'iu');
  const badRegion = /województwo\s+[\p{L}-]+skim\b/iu;
  if (badCity.test(text) || badRegion.test(text)) throw new Error(`Unnatural city phrase: ${text.match(badCity)?.[0] ?? text.match(badRegion)?.[0]}`);
}

export function walkFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(file) : [file];
  });
}

export function validateSeoOutput(dist: string, routes: string[]): void {
  const files = walkFiles(dist);
  for (const file of files) {
    const relativeFile = path.relative(dist, file);
    const isRootHostingConfig = path.dirname(relativeFile) === '.' && ['_headers', '_redirects'].includes(relativeFile);
    if (!path.extname(file) && !isRootHostingConfig) throw new Error(`Extensionless file in dist: ${file}`);
    if (!file.endsWith('.html')) continue;
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)) {
      if (internalHtmlUrl(match[1])) throw new Error(`Internal HTML link in ${file}: ${match[1]}`);
    }
    for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      for (const url of match[1].matchAll(/https?:\/\/(?:www\.)?openmindai\.pl[^"\s<]*/g)) {
        if (internalHtmlUrl(url[0])) throw new Error(`HTML URL in JSON-LD: ${file}`);
      }
    }
  }
  for (const route of routes) {
    const file = path.join(dist, route.replace(/^\//, ''), 'index.html');
    const html = fs.readFileSync(file, 'utf8');
    const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)];
    if (canonicals.length !== 1) throw new Error(`Expected one canonical in ${file}`);
    assertPageCanonical(route, canonicals[0][1]);
    const og = html.match(/<meta property="og:url" content="([^"]+)"/);
    if (!og || og[1] !== pageUrl(route)) throw new Error(`og:url mismatch: ${route}`);
    for (const alternate of html.matchAll(/<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g)) {
      assertPageCanonical(route, alternate[1]);
    }
    if (/^\/gdzie-dzialamy\/[^/]+\/[^/]+$/.test(route)) {
      const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
      assertCityText(body.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' '));
      const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
      assertCityText(description);
    }
    if (route === '/') continue;
    const redirect = fs.readFileSync(path.join(dist, `${route.slice(1)}.html`), 'utf8');
    assertPageCanonical(route, redirect.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '');
    if (!redirect.includes('http-equiv="refresh"') || !redirect.includes('location.replace(') || /noindex|<div id="root"|type="module"/.test(redirect)) {
      throw new Error(`Invalid HTML redirect: ${route}`);
    }
  }
  for (const file of files.filter(file => /sitemap.*\.xml$/.test(file))) {
    for (const loc of fs.readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (internalHtmlUrl(loc[1])) throw new Error(`HTML URL in sitemap: ${loc[1]}`);
      const pathname = new URL(loc[1]).pathname;
      if (!pathname.endsWith('.xml') && !routes.includes(cleanPagePath(pathname))) throw new Error(`Unknown sitemap route: ${pathname}`);
    }
  }
  for (const file of walkFiles(path.resolve('src')).filter(file => /\.(tsx?|json)$/.test(file))) {
    const source = fs.readFileSync(file, 'utf8');
    for (const link of source.matchAll(/\b(?:to|href)\s*[:=]\s*(?:\{\s*)?["'`]([^"'`]+)["'`]/g)) {
      if (internalHtmlUrl(link[1])) throw new Error(`Source HTML link: ${file}: ${link[1]}`);
    }
  }
  console.log(`[seo] validated ${routes.length} full pages and ${routes.length - 1} HTML redirects`);
}