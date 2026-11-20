import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertCityText, assertPageCanonical, assertRetiredAdvisorRedirect, internalHtmlUrl, isRetiredAdvisorUrl, validateSeoOutput } from './seo-validation';
import { renderSitemapIndex, sitemapEntries } from './sitemap';
import { cleanPagePath, pageUrl, normalizeStructuredUrls } from '../src/lib/seoUrls';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildNewsPage, fetchPublishedNews } from './news-prerender';
import { fundingBannerPrerender } from './funding-banner-prerender';
import { getFundingBannerCopy, hasFundingBanner } from '../src/lib/fundingBanner';

test('BUR banner appears only on the requested location, training and consulting routes', () => {
  const included = [
    '/services', '/lokalizacje', '/gdzie-dzialamy/lodzkie', '/gdzie-dzialamy/lodzkie/lodz',
    '/szkolenia-ai', '/szkolenia-ai-stacjonarne', '/szkolenia-ai-online',
    '/szkolenia-ai-indywidualne', '/szkolenia-microsoft-copilot', '/ai-dla-szkol',
    '/szkolenia-ai-dla-lekarzy', '/szkolenia-ai-dla-programistow',
    '/konsultacje-ai', '/automatyzacja-ai', '/zakladanie-firmy-z-ai',
  ];
  for (const route of included) assert.equal(hasFundingBanner(route), true, route);
  for (const route of ['/', '/blog', '/teledyski-ai', '/strony-www-branding', '/contact']) {
    assert.equal(hasFundingBanner(route), false, route);
  }
});

test('BUR banner uses the existing city locative and translates its heading', () => {
  const city = { name: 'Łódź', locative: 'Łodzi' };
  assert.match(getFundingBannerCopy('pl', city).body, /szkolenia i doradztwo w Łodzi ze środków/);
  assert.equal(getFundingBannerCopy('en', city).heading, 'AI training and consulting with up to 80% funding');
  assert.match(getFundingBannerCopy('en', city).body, /consulting in Łódź through/);
});

test('BUR prerender contains readable copy and links without changing other routes', () => {
  const html = fundingBannerPrerender('/gdzie-dzialamy/lodzkie/lodz');
  assert.match(html, /Szkolenia i doradztwo AI z dofinansowaniem nawet do 80%/);
  assert.match(html, /w Łodzi ze środków regionalnych programów Fundusze Europejskie/);
  assert.match(html, /href="\/aktualnosci\/wpis-do-bazy-uslug-rozwojowych"/);
  assert.equal(fundingBannerPrerender('/blog'), '');
});

test('Nysa canonical uses the www domain and no HTML suffix', () => {
  assert.equal(pageUrl('/gdzie-dzialamy/opolskie/nysa.html'), 'https://www.openmindai.pl/gdzie-dzialamy/opolskie/nysa');
  assert.throws(() => assertPageCanonical('/gdzie-dzialamy/opolskie/nysa', 'https://www.openmindai.pl/gdzie-dzialamy/opolskie/nysa.html'));
});
test('homepage URL has a trailing slash', () => assert.equal(pageUrl('/'), 'https://www.openmindai.pl/'));
test('both retired advisor aliases are excluded, but the consultations page is not', () => {
  assert.equal(isRetiredAdvisorUrl('/ai-advisor'), true);
  assert.equal(isRetiredAdvisorUrl('https://www.openmindai.pl/ai-advisor.html?from=old'), true);
  assert.equal(isRetiredAdvisorUrl('/konsultacje-ai'), false);
  assert.throws(() => assertRetiredAdvisorRedirect('<link rel="canonical" href="https://www.openmindai.pl/ai-advisor">'), /Canonical mismatch/);
});

test('main sitemap dates record the redesign; blog and cities retain their previous dates', () => {
  const dateFor = (file: string, loc: string) => sitemapEntries(fs.readFileSync(`public/sitemap-${file}.xml`, 'utf8')).find(entry => entry.loc === pageUrl(loc))?.lastmod;
  assert.equal(dateFor('main', '/'), '2026-11-19');
  assert.equal(dateFor('blog', '/blog/73'), '2026-11-10');
  assert.equal(dateFor('cities', '/gdzie-dzialamy/opolskie/nysa'), '2026-11-10');
});

test('each index date comes from the newest date in its own child sitemap', () => {
  const index = renderSitemapIndex(new Map([
    ['sitemap-main.xml', [{ loc: pageUrl('/'), lastmod: '2026-11-19' }]],
    ['sitemap-news.xml', [{ loc: pageUrl('/aktualnosci/iso'), lastmod: '2026-11-18T12:00:00Z' }, { loc: pageUrl('/aktualnosci/bur'), lastmod: '2026-11-19T12:00:00Z' }]],
    ['sitemap-blog.xml', [{ loc: pageUrl('/blog/73'), lastmod: '2026-11-10' }]],
  ]));
  assert.deepEqual(sitemapEntries(index).map(entry => entry.lastmod), ['2026-11-19', '2026-11-19T12:00:00Z', '2026-11-10']);
});
test('all internal HTML links are rejected, including query strings', () => {
  for (const url of ['/blog/73.html', '/privacy.html', '/gdzie-dzialamy/opolskie/nysa.html?x=1#test']) assert.equal(internalHtmlUrl(url), true);
  assert.equal(internalHtmlUrl('/blog/73'), false);
  assert.equal(internalHtmlUrl('https://example.com/example.html'), false);
});
test('structured URLs preserve fragment IDs while removing extensions', () => {
  assert.deepEqual(normalizeStructuredUrls({ '@id': 'https://openmindai.pl/privacy.html#page' }), { '@id': 'https://www.openmindai.pl/privacy#page' });
  assert.equal(cleanPagePath('/privacy/index.html'), '/privacy');
});
test('extensionless output files fail validation', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-check-'));
  try {
    fs.writeFileSync(path.join(dir, 'privacy'), 'content');
    assert.throws(() => validateSeoOutput(dir, []), /Extensionless file/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
test('root hosting configs are allowed without disabling the page guard', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-check-'));
  try {
    fs.writeFileSync(path.join(dir, '_headers'), '/assets/*\n  Cache-Control: public');
    fs.writeFileSync(path.join(dir, '_redirects'), '/old /new 301');
    assert.doesNotThrow(() => validateSeoOutput(dir, []));
    fs.mkdirSync(path.join(dir, 'services'));
    fs.writeFileSync(path.join(dir, 'services', 'szkolenia-ai'), 'content');
    assert.throws(() => validateSeoOutput(dir, []), /Extensionless file/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
test('city nominative keyword phrases fail the guard', () => {
  for (const phrase of ['Wdrożenia AI Nysa realizujemy', 'Szkolenia AI Nysa prowadzimy', 'Automatyzacja AI Nysa to', 'Agent AI Nysa to', 'AI Nysa', 'sztuczna inteligencja Nysa przyniesie']) assert.throws(() => assertCityText(phrase));
  assert.doesNotThrow(() => assertCityText('Wdrożenia AI w Nysie realizujemy etapowo. Szkolenia AI dla firm z Nysy.'));
});
test('incorrect voivodeship inflection fails the guard', () => {
  assert.throws(() => assertCityText('(województwo opolskim)'));
  assert.throws(() => assertCityText('(województwo śląskim)'));
  assert.doesNotThrow(() => assertCityText('w województwie opolskim'));
});

test('news metadata uses the published date, an absolute cover and a self-referencing URL', () => {
  const organization = { '@type': 'Organization', name: 'OpenMind AI Consulting' };
  const { meta, lastmod } = buildNewsPage({
    slug: 'certyfikat-iso-9001', title_pl: 'Certyfikat ISO 9001', excerpt_pl: 'Zarządzanie jakością',
    content_pl: '## ISO 9001\n\n**Zarządzanie jakością**\n\n[Blog](/blog/73.html#temat)',
    image_url: '/news-cover.webp', published_at: '2026-11-19T12:00:00+00:00', created_at: '2026-11-18T12:00:00+00:00',
  }, organization);

  assert.equal(meta.title, 'Certyfikat ISO 9001 | Aktualności OpenMind AI');
  assert.equal(meta.description, 'Zarządzanie jakością');
  assert.equal(lastmod, '2026-11-19T12:00:00+00:00');
  assert.equal(meta.jsonLd.datePublished, lastmod);
  assert.equal(meta.jsonLd.url, 'https://www.openmindai.pl/aktualnosci/certyfikat-iso-9001');
  assert.deepEqual(meta.jsonLd.image, ['https://www.openmindai.pl/news-cover.webp']);
  assert.deepEqual(meta.jsonLd.author, organization);
  assert.deepEqual(meta.jsonLd.publisher, organization);
  assert.match(meta.body, /<h2>ISO 9001<\/h2>\n<p><strong>Zarządzanie jakością<\/strong><\/p>/);
  assert.match(meta.body, /href="\/blog\/73#temat"/);
});

test('news fetching keeps the publication filter across every page and discards partial results on failure', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'news-source-'));
  try {
    fs.writeFileSync(path.join(root, '.env'), 'VITE_SUPABASE_URL=https://production.example\nVITE_SUPABASE_PUBLISHABLE_KEY=public-test-key\n');
    const cursors: Array<string | null> = [];
    const list = await fetchPublishedNews(root, async (input) => {
      const url = new URL(String(input));
      assert.equal(url.origin, 'https://production.example');
      assert.equal(url.searchParams.get('published'), 'eq.true');
      const cursor = url.searchParams.get('slug');
      cursors.push(cursor);
      return Response.json(cursor === null ? [{ slug: 'iso' }] : cursor === 'gt.iso' ? [{ slug: 'szkolenia' }] : []);
    });
    assert.deepEqual(cursors, [null, 'gt.iso', 'gt.szkolenia']);
    assert.deepEqual(list.map(({ slug }) => slug), ['iso', 'szkolenia']);
    await assert.rejects(fetchPublishedNews(root, async (input) => new URL(String(input)).searchParams.has('slug')
      ? new Response(null, { status: 503 }) : Response.json([{ slug: 'iso' }])), /HTTP 503/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});