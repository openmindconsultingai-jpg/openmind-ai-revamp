import fs from 'node:fs';
import path from 'node:path';
import { parseEnv } from 'node:util';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import type { Tables } from '../src/integrations/supabase/types';
import { cleanPagePath, pageUrl, SEO_SITE } from '../src/lib/seoUrls';
import { internalHtmlUrl } from './seo-validation';

export type PublishedNews = Pick<Tables<'news'>,
  'slug' | 'title_pl' | 'excerpt_pl' | 'content_pl' | 'image_url' | 'published_at' | 'created_at'>;

export async function fetchPublishedNews(root: string, fetchPage = fetch): Promise<PublishedNews[]> {
  // The committed public Vite config points at production. Injected preview
  // variables point at the draft and must not determine the build inventory.
  const { VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY } = parseEnv(fs.readFileSync(path.join(root, '.env'), 'utf8'));
  if (!VITE_SUPABASE_URL || !VITE_SUPABASE_PUBLISHABLE_KEY) throw new Error('Missing production public Supabase config');
  const url = new URL('/rest/v1/news', VITE_SUPABASE_URL);
  url.search = new URLSearchParams({
    select: 'slug,title_pl,excerpt_pl,content_pl,image_url,published_at,created_at',
    published: 'eq.true',
    order: 'slug.asc',
    limit: '200',
  }).toString();
  const signal = AbortSignal.timeout(15_000);
  const rows: PublishedNews[] = [];
  // Keyset pagination also works when PostgREST's own row cap is below our limit.
  for (;;) {
    const cursor = rows.at(-1)?.slug;
    if (cursor) url.searchParams.set('slug', `gt.${cursor}`);
    const response = await fetchPage(url, {
      headers: { apikey: VITE_SUPABASE_PUBLISHABLE_KEY }, signal,
    });
    if (!response.ok) throw new Error(`Public news request returned HTTP ${response.status}`);
    const page = await response.json() as PublishedNews[];
    if (!Array.isArray(page) || page.some(row => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row?.slug) || row.slug === cursor)) {
      throw new Error('Invalid news listing response or slug');
    }
    if (!page.length) return rows;
    rows.push(...page);
  }
}

function absoluteImageUrl(value: string | null): string | undefined {
  if (!value?.trim()) return;
  try {
    const url = new URL(value, SEO_SITE);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
  } catch { /* An invalid or missing image is not published in metadata. */ }
}

export function buildNewsPage(row: PublishedNews, organization: object) {
  const route = `/aktualnosci/${row.slug}`;
  const url = pageUrl(route);
  const image = absoluteImageUrl(row.image_url);
  const publishedTime = row.published_at ?? row.created_at;
  // Use the same Markdown renderer and URL safety rules as the browser.
  const body = renderToStaticMarkup(createElement(ReactMarkdown, {
    children: row.content_pl,
    urlTransform: (value, key) => key === 'href' && internalHtmlUrl(value) ? cleanPagePath(value) + new URL(value, SEO_SITE).search + new URL(value, SEO_SITE).hash : defaultUrlTransform(value),
  }));
  return {
    route,
    lastmod: row.published_at,
    meta: {
      title: `${row.title_pl} | Aktualności OpenMind AI`,
      description: row.excerpt_pl,
      h1: row.title_pl,
      body,
      article: { image, publishedTime },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: row.title_pl,
        description: row.excerpt_pl,
        datePublished: publishedTime,
        ...(image ? { image: [image] } : {}),
        author: organization,
        publisher: organization,
        mainEntityOfPage: url,
        url,
        inLanguage: 'pl-PL',
      },
    },
  };
}