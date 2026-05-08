/**
 * Postbuild prerender — generates per-route static HTML files in dist/
 * so Googlebot sees real titles, descriptions, canonicals and a SEO content
 * snippet inside #root BEFORE the React bundle hydrates.
 *
 * Driven by the existing sitemap-*.xml files (single source of truth for URLs).
 * Does NOT touch vite.config.ts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { voivodeships } from '../src/data/voivodeships';
import { findCityContent } from '../src/data/cityContent/index';
import { digestArticles } from '../src/data/blogArticlesDigest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.openmindai.pl';

if (!fs.existsSync(DIST)) {
  console.error('[prerender] dist/ not found — run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

// ---------------------------------------------------------------------------
// URL → metadata mapping
// ---------------------------------------------------------------------------
type Meta = {
  title: string;
  description: string;
  h1: string;
  body: string; // HTML inside #root, replaces the default home snippet
};

const STATIC_META: Record<string, Meta> = {
  '/services': {
    title: 'Usługi AI – Konsulting, Szkolenia, Wdrożenia, Automatyzacja | OpenMind AI',
    description: 'Pełna oferta OpenMind AI: konsulting AI, szkolenia ze sztucznej inteligencji, wdrożenia AI, automatyzacja procesów, agencja kreatywna AI, AI dla szkół, tworzenie stron WWW.',
    h1: 'Usługi AI – konsulting, szkolenia i wdrożenia sztucznej inteligencji',
    body: '<p>Nasza pełna oferta usług AI dla firm, agencji i szkół w Polsce: konsulting strategiczny, szkolenia praktyczne z ChatGPT, Claude, Copilot i Gemini, wdrożenia narzędzi AI, automatyzacja procesów, produkcja kreatywna (wideo AI, obrazy AI), AI dla edukacji oraz tworzenie stron WWW.</p>',
  },
  '/services/konsulting-ai': {
    title: 'Konsulting AI dla firm – Strategia Sztucznej Inteligencji | OpenMind AI',
    description: 'Konsulting AI dla firm w Polsce. Audyt potrzeb, dobór narzędzi sztucznej inteligencji, mapa wdrożeń, ROI. Doświadczeni eksperci AI z OpenMind AI.',
    h1: 'Konsulting AI – strategiczne wdrożenie sztucznej inteligencji w firmie',
    body: '<p>Doradztwo strategiczne w obszarze sztucznej inteligencji: audyt procesów, identyfikacja przypadków użycia AI, dobór modeli (ChatGPT, Claude, Gemini, Copilot), plan wdrożenia, analiza ROI i zarządzanie zmianą.</p>',
  },
  '/services/szkolenia-ai': {
    title: 'Szkolenia AI dla firm i pracowników – ChatGPT, Claude, Copilot | OpenMind AI',
    description: 'Praktyczne szkolenia AI dla firm i pracowników: ChatGPT, Claude, Copilot, Gemini, automatyzacja, prompt engineering. Online i stacjonarnie w całej Polsce.',
    h1: 'Szkolenia AI – praktyczne warsztaty ze sztucznej inteligencji',
    body: '<p>Szkolenia AI dostosowane do branży i poziomu zaawansowania: prompt engineering, ChatGPT dla biznesu, automatyzacja workflow, generatywna AI w marketingu, narzędzia copywriterskie, asystenci AI w codziennej pracy.</p>',
  },
  '/services/automatyzacja-ai': {
    title: 'Automatyzacja procesów z AI – Workflow, n8n, Zapier | OpenMind AI',
    description: 'Automatyzacja procesów biznesowych z AI: integracje, workflow, raportowanie, obsługa klienta, generowanie treści. Make, n8n, Zapier + modele językowe.',
    h1: 'Automatyzacja procesów ze sztuczną inteligencją',
    body: '<p>Łączymy modele AI z narzędziami no-code/low-code (Make, n8n, Zapier) i API, aby automatyzować obsługę klienta, raporty, analizę danych, content marketing i przepływy dokumentów.</p>',
  },
  '/services/agencja-kreatywna-ai': {
    title: 'Agencja Kreatywna AI – Wideo AI, Obrazy AI, Reklamy | OpenMind AI',
    description: 'Produkcja kreatywna z AI: wideo AI, obrazy AI, reklamy, animacje, content social media. Midjourney, Runway, ElevenLabs, Sora.',
    h1: 'Agencja kreatywna AI – wideo, obrazy i reklamy generatywne',
    body: '<p>Tworzymy materiały reklamowe i artystyczne z wykorzystaniem generatywnej AI: filmy reklamowe (Runway, Sora), obrazy (Midjourney, Stable Diffusion), voice-over (ElevenLabs), kampanie social media i identyfikacje wizualne.</p>',
  },
  '/services/ai-dla-szkol': {
    title: 'AI dla Szkół – Szkolenia dla Nauczycieli, Warsztaty | OpenMind AI',
    description: 'Sztuczna inteligencja w edukacji: szkolenia dla nauczycieli, warsztaty dla uczniów, wdrożenie narzędzi AI w szkołach. Cała Polska.',
    h1: 'AI dla szkół – sztuczna inteligencja w edukacji',
    body: '<p>Kompleksowe wsparcie placówek edukacyjnych: szkolenia rad pedagogicznych, warsztaty dla uczniów, polityki użycia AI, wdrożenie asystentów AI dla nauczycieli, integracja z platformami edukacyjnymi.</p>',
  },
  '/services/tworzenie-stron-www': {
    title: 'Tworzenie stron WWW z AI – Nowoczesne Strony Internetowe | OpenMind AI',
    description: 'Projektowanie i wdrożenie nowoczesnych stron WWW z wykorzystaniem AI. SEO, performance, integracje, asystenci AI na stronie.',
    h1: 'Tworzenie stron WWW – nowoczesne strony z AI',
    body: '<p>Projektujemy i wdrażamy szybkie, dostępne i zoptymalizowane pod SEO strony internetowe z opcjonalnymi modułami AI: chatbot, wyszukiwanie semantyczne, personalizacja treści, integracje z CRM.</p>',
  },
  '/about': {
    title: 'O nas – OpenMind AI Consulting | Eksperci AI w Polsce',
    description: 'Poznaj OpenMind AI Consulting – polski hub technologiczny łączący inżynierię AI z kreatywnością. Szkolenia, wdrożenia, generatywne media, automatyzacja.',
    h1: 'O OpenMind AI – polski hub konsultingu sztucznej inteligencji',
    body: '<p>OpenMind AI Consulting to zespół ekspertów AI z doświadczeniem w e-commerce, medycynie, prawie, edukacji i nieruchomościach. Łączymy inżynierię modeli językowych z kreatywnością, dostarczając praktyczne wdrożenia w całej Polsce.</p>',
  },
  '/contact': {
    title: 'Kontakt – Bezpłatna Konsultacja AI | OpenMind AI',
    description: 'Skontaktuj się z OpenMind AI. Bezpłatna konsultacja: szkolenia AI, wdrożenia AI, automatyzacja, produkcja kreatywna. Odpowiadamy w 24h.',
    h1: 'Kontakt – bezpłatna konsultacja AI',
    body: '<p>Napisz do nas, aby umówić bezpłatną konsultację dotyczącą wdrożeń AI, szkoleń, automatyzacji procesów lub produkcji kreatywnej. E-mail: biuro@openmindai.pl. Działamy w całej Polsce.</p>',
  },
  '/blog': {
    title: 'Baza Wiedzy o AI – Artykuły, Poradniki, Aktualności | OpenMind AI',
    description: 'Praktyczna baza wiedzy o sztucznej inteligencji: artykuły o ML, automatyzacji, ChatGPT, generatywnej AI, wdrożeniach dla firm, trendach AI.',
    h1: 'Blog OpenMind AI – baza wiedzy o sztucznej inteligencji',
    body: '<p>Artykuły, poradniki i aktualności ze świata AI: machine learning, modele językowe, agenci AI, wideo i obrazy generatywne, regulacje, inwestycje, badania i zastosowania w biznesie.</p>',
  },
  '/ai-advisor': {
    title: 'Doradca AI – Spersonalizowana Mapa Wdrożeń AI | OpenMind AI',
    description: 'Interaktywny doradca AI od OpenMind. Odpowiedz na kilka pytań i otrzymaj spersonalizowaną mapę wdrożeń sztucznej inteligencji w Twojej firmie.',
    h1: 'Doradca AI – spersonalizowana mapa wdrożeń sztucznej inteligencji',
    body: '<p>Nasz interaktywny doradca AI analizuje branżę, procesy i cele Twojej firmy, a następnie generuje rekomendacje konkretnych narzędzi i wdrożeń AI z szacowanym ROI.</p>',
  },
  '/privacy': {
    title: 'Polityka Prywatności | OpenMind AI Consulting',
    description: 'Polityka prywatności OpenMind AI Consulting. Przetwarzanie danych osobowych zgodnie z RODO oraz bezpieczeństwo danych.',
    h1: 'Polityka prywatności OpenMind AI',
    body: '<p>Informacje o przetwarzaniu danych osobowych, prawach użytkowników zgodnie z RODO oraz bezpieczeństwie danych w OpenMind AI Consulting.</p>',
  },
};

const CATEGORY_LABEL: Record<number, { pl: string }> = Object.fromEntries(
  digestArticles.map((a) => [a.id, { pl: a.category.pl }]),
);

// Parse PL translations directly from LanguageContext.tsx.
// First occurrence wins (PL block precedes EN block in the file).
const langSrc = fs.readFileSync(path.join(ROOT, 'src/contexts/LanguageContext.tsx'), 'utf8');
const PL_TRANSLATIONS: Record<string, string> = {};
// Match 'key': '...single-quoted value...' (no escaped quotes inside our blog title/excerpt entries)
for (const m of langSrc.matchAll(/'(blog\.article\d+\.(?:title|excerpt))'\s*:\s*'([^']*)'/g)) {
  if (!(m[1] in PL_TRANSLATIONS)) PL_TRANSLATIONS[m[1]] = m[2];
}

function clip(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}

function blogMeta(id: number): Meta {
  const cat = CATEGORY_LABEL[id]?.pl;
  const realTitle = PL_TRANSLATIONS[`blog.article${id}.title`];
  const realExcerpt = PL_TRANSLATIONS[`blog.article${id}.excerpt`];
  const catLabel = cat ? ` – ${cat}` : '';
  if (realTitle && realExcerpt) {
    return {
      title: `${realTitle} | Baza Wiedzy AI – OpenMind AI`,
      description: clip(realExcerpt, 155),
      h1: realTitle,
      body: `<p>${realExcerpt}</p><p>Artykuł z bazy wiedzy OpenMind AI${cat ? ` w kategorii <strong>${cat}</strong>` : ''}. Praktyczna wiedza o sztucznej inteligencji, modelach językowych, automatyzacji i wdrożeniach AI w polskich firmach.</p>`,
    };
  }
  return {
    title: `Artykuł ${id}${catLabel} – Baza Wiedzy AI | OpenMind AI`,
    description: `Artykuł nr ${id} z bazy wiedzy OpenMind AI${cat ? ` w kategorii ${cat}` : ''}. Praktyczne informacje o sztucznej inteligencji, wdrożeniach i trendach AI.`,
    h1: `Artykuł ${id}${catLabel} – Baza Wiedzy o Sztucznej Inteligencji`,
    body: `<p>Artykuł z bazy wiedzy OpenMind AI${cat ? ` w kategorii <strong>${cat}</strong>` : ''}. Praktyczna treść o sztucznej inteligencji, modelach językowych, automatyzacji i wdrożeniach AI w polskich firmach.</p>`,
  };
}

function voivMeta(slug: string): Meta | null {
  const v = voivodeships.find((x) => x.slug === slug);
  if (!v) return null;
  const cityNames = v.cities.map((c) => c.name).join(', ');
  return {
    title: `Sztuczna Inteligencja w województwie ${v.name} – Wdrożenia i Szkolenia AI | OpenMind AI`,
    description: `OpenMind AI – wdrożenia, szkolenia i konsulting sztucznej inteligencji w województwie ${v.locativeName}. Obsługujemy m.in. ${v.cities.slice(0, 4).map((c) => c.name).join(', ')}.`,
    h1: `Sztuczna inteligencja (AI) w województwie ${v.name}`,
    body: `<p>OpenMind AI realizuje wdrożenia, szkolenia i konsulting AI dla firm i instytucji w województwie ${v.locativeName}. Obsługujemy m.in.: ${cityNames}.</p>`,
  };
}

function cityMeta(voivSlug: string, citySlug: string): Meta | null {
  const v = voivodeships.find((x) => x.slug === voivSlug);
  if (!v) return null;
  const c = v.cities.find((x) => x.slug === citySlug);
  if (!c) return null;
  return {
    title: `AI w ${c.locative} – Wdrożenia, Szkolenia i Konsulting Sztucznej Inteligencji | OpenMind AI`,
    description: `Sztuczna inteligencja w ${c.locative} (województwo ${v.locativeName}). Wdrożenia AI, szkolenia z ChatGPT, automatyzacja procesów, agencja kreatywna AI. Bezpłatna konsultacja.`,
    h1: `Sztuczna inteligencja (AI) w ${c.locative}`,
    body: `<p>OpenMind AI świadczy usługi wdrożeń, szkoleń i konsultingu sztucznej inteligencji w ${c.locative} (województwo ${v.locativeName}). Pomagamy lokalnym firmom wdrażać ChatGPT, automatyzować procesy oraz tworzyć materiały reklamowe z generatywną AI.</p><p><a href="/gdzie-dzialamy/${v.slug}">Zobacz pełną listę miast w województwie ${v.name}</a></p>`,
  };
}

// ---------------------------------------------------------------------------
// Sitemap parsing
// ---------------------------------------------------------------------------
function readSitemap(file: string): string[] {
  const raw = fs.readFileSync(path.join(ROOT, 'public', file), 'utf8');
  return [...raw.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const allUrls = [
  ...readSitemap('sitemap-main.xml'),
  ...readSitemap('sitemap-blog.xml'),
  ...readSitemap('sitemap-cities.xml'),
];

const HTML_SITEMAP_LASTMOD = '2026-05-08';
const MAIN_HTML_ROUTES = [
  '/services',
  '/services/konsulting-ai',
  '/services/szkolenia-ai',
  '/services/automatyzacja-ai',
  '/services/agencja-kreatywna-ai',
  '/services/ai-dla-szkol',
  '/services/tworzenie-stron-www',
  '/about',
  '/contact',
  '/blog',
  '/ai-advisor',
  '/privacy',
];

function buildHtmlSitemapXml(): string {
  const missingCityContent: string[] = [];
  const cityRoutes = voivodeships.flatMap((voivodeship) =>
    voivodeship.cities.map((city) => {
      const route = `/gdzie-dzialamy/${voivodeship.slug}/${city.slug}`;
      if (!findCityContent(voivodeship.slug, city.slug)) missingCityContent.push(route);
      return route;
    }),
  );

  if (missingCityContent.length) {
    throw new Error(`[prerender] sitemap-html missing cityContent for: ${missingCityContent.slice(0, 10).join(', ')}`);
  }

  const digestArticleIds = new Set(digestArticles.map((article) => article.id));
  const blogRoutes = Array.from({ length: 110 }, (_, index) => index + 1)
    .filter((id) => id <= 60 || digestArticleIds.has(id))
    .map((id) => `/blog/${id}`);

  const entries = [
    ...cityRoutes.map((route) => ({ route, priority: '0.7' })),
    ...blogRoutes.map((route) => ({ route, priority: '0.6' })),
    ...MAIN_HTML_ROUTES.map((route) => ({ route, priority: '0.8' })),
  ];

  if (cityRoutes.length !== 192 || blogRoutes.length !== 110 || MAIN_HTML_ROUTES.length !== 12 || entries.length !== 314) {
    throw new Error(`[prerender] sitemap-html invalid counts: cities=${cityRoutes.length}, blog=${blogRoutes.length}, main=${MAIN_HTML_ROUTES.length}, total=${entries.length}`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(({ route, priority }) => `  <url><loc>${SITE}${route}.html</loc><lastmod>${HTML_SITEMAP_LASTMOD}</lastmod><priority>${priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`;
}

// ---------------------------------------------------------------------------
// HTML transform
// ---------------------------------------------------------------------------
const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function buildHtml(routePath: string, meta: Meta): string {
  // Canonical always points to the .html variant (matches sitemap), except root.
  const canonical = routePath === '/' ? `${SITE}/` : `${SITE}${routePath}.html`;
  let html = template;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escAttr(meta.title)}</title>`);

  // meta description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escAttr(meta.description)}" />`,
  );

  // canonical (single tag in template)
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`,
  );

  // hreflang (3 tags, all point to canonical for this URL)
  html = html.replace(
    /<link rel="alternate" hreflang="pl"[^>]*>/,
    `<link rel="alternate" hreflang="pl" href="${canonical}" />`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en"[^>]*>/,
    `<link rel="alternate" hreflang="en" href="${canonical}" />`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default"[^>]*>/,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
  );

  // OG/Twitter
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escAttr(meta.title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escAttr(meta.description)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escAttr(meta.title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escAttr(meta.description)}" />`,
  );

  // Replace the SEO snippet inside #root with route-specific content.
  // Match the entire <div id="root">...</div> block (non-greedy, first occurrence).
  const newRoot =
    `<div id="root">\n` +
    `      <h1>${meta.h1}</h1>\n` +
    `      ${meta.body}\n` +
    `      <nav aria-label="Główna nawigacja SEO">\n` +
    `        <a href="/">Strona główna</a>\n` +
    `        <a href="/services">Usługi AI</a>\n` +
    `        <a href="/about">O nas</a>\n` +
    `        <a href="/blog">Blog</a>\n` +
    `        <a href="/contact">Kontakt</a>\n` +
    `      </nav>\n` +
    `    </div>`;
  // The SEO snippet has <section> but no nested <div>, so non-greedy </div> matches the root close.
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, newRoot);

  // Inject URL-cleanup script: after first paint, strip ".html" from the URL
  // so users see a clean path in the address bar; React Router handles bare paths.
  const cleanupScript =
    `<script>(function(){try{var p=location.pathname;if(p.endsWith('.html')){history.replaceState(null,'',p.slice(0,-5)+location.search+location.hash);}}catch(e){}})();</script>`;
  html = html.replace('</head>', `${cleanupScript}</head>`);

  return html;
}

function writeRoute(routePath: string, html: string) {
  // routePath like "/services/konsulting-ai"
  // Write BOTH variants so Lovable hosting can match the exact request path:
  //   1) dist/services/konsulting-ai/index.html  (for trailing-slash URLs)
  //   2) dist/services/konsulting-ai.html        (for clean URLs without slash)
  // Lovable hosting serves the file matching the request path verbatim and
  // only falls back to root index.html if no file matches — so we need both.
  const rel = routePath.replace(/^\/+/, '');
  const dir = path.join(DIST, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

  // Flat sibling .html — most static hosts map "/foo/bar" → "/foo/bar.html"
  const parent = path.join(DIST, path.dirname(rel));
  fs.mkdirSync(parent, { recursive: true });
  fs.writeFileSync(path.join(DIST, rel + '.html'), html, 'utf8');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
let written = 0;
let skipped = 0;
const missing: string[] = [];

for (const url of allUrls) {
  const u = new URL(url);
  // Sitemap URLs end with ".html" (except root). Strip it for meta lookup
  // and route matching; canonical/file-write will re-add it.
  let routePath = u.pathname.replace(/\/+$/, '') || '/';
  if (routePath.endsWith('.html')) routePath = routePath.slice(0, -5) || '/';

  if (routePath === '/') {
    // Home is already correct in dist/index.html
    skipped++;
    continue;
  }

  let meta: Meta | null = null;

  if (STATIC_META[routePath]) {
    meta = STATIC_META[routePath];
  } else if (/^\/blog\/(\d+)$/.test(routePath)) {
    const id = Number(routePath.match(/^\/blog\/(\d+)$/)![1]);
    meta = blogMeta(id);
  } else if (/^\/gdzie-dzialamy\/[^/]+$/.test(routePath)) {
    const slug = routePath.split('/')[2];
    meta = voivMeta(slug);
  } else if (/^\/gdzie-dzialamy\/[^/]+\/[^/]+$/.test(routePath)) {
    const [, , v, c] = routePath.split('/');
    meta = cityMeta(v, c);
  }

  if (!meta) {
    missing.push(routePath);
    continue;
  }

  writeRoute(routePath, buildHtml(routePath, meta));
  written++;
}

// Write llms.txt for AI crawlers (LLM-friendly site map)
const llmsTxt = `# OpenMind AI Consulting

OpenMind AI Consulting — polski lider wdrożeń sztucznej inteligencji dla firm, agencji i szkół. Konsulting strategiczny, szkolenia AI z ChatGPT/Claude/Gemini/Copilot, automatyzacja procesów, agencja kreatywna AI (wideo i obrazy generowane przez AI), AI dla edukacji.

## Najważniejsze
- Strona główna: ${SITE}/
- Wszystkie usługi: ${SITE}/services
- Konsulting AI: ${SITE}/services/konsulting-ai
- Szkolenia AI: ${SITE}/services/szkolenia-ai
- Automatyzacja AI: ${SITE}/services/automatyzacja-ai
- Agencja kreatywna AI: ${SITE}/services/agencja-kreatywna-ai
- AI dla szkół: ${SITE}/services/ai-dla-szkol
- Baza wiedzy AI (110 artykułów): ${SITE}/blog
- O nas: ${SITE}/about
- Kontakt: ${SITE}/contact

## Sitemapy
- ${SITE}/sitemap-index.xml
- ${SITE}/sitemap-main.xml
- ${SITE}/sitemap-cities.xml
- ${SITE}/sitemap-blog.xml

## Zasięg geograficzny
192 miasta w 16 województwach Polski. Pełna lista w sitemap-cities.xml.

## Kontakt
biuro@openmindai.pl • ${SITE}/contact
`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llmsTxt, 'utf8');

const htmlSitemapXml = buildHtmlSitemapXml();
fs.writeFileSync(path.join(DIST, 'sitemap-html.xml'), htmlSitemapXml, 'utf8');

console.log(`[prerender] wrote ${written} static HTML files + llms.txt + sitemap-html.xml (skipped: ${skipped}, missing: ${missing.length})`);
if (missing.length) {
  console.log('[prerender] no metadata for:\n' + missing.slice(0, 10).map((p) => '  ' + p).join('\n'));
}
