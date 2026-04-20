

## Why most pages aren't being indexed — diagnosis & fix

I checked the live site and found **the actual root cause**, plus several secondary issues. Good news: it's mostly fixable in one pass.

---

### 🔴 Critical bug #1 — `sitemap.xml` is broken on the custom domain

When I fetched `https://www.openmindai.pl/sitemap.xml` I got back **the React 404 page** (HTML, not XML). The same URL on `openmind-ai-revamp.lovable.app/sitemap.xml` returns the correct XML.

This means **your custom domain isn't actually serving the static `public/sitemap.xml` file** — it's falling through to the SPA and rendering the 404 component. Result: **Google has had no working sitemap on `www.openmindai.pl` for the entire time it's been live.** Every URL it knows about, it had to discover by crawling links — which is dramatically slower and often skips deep pages like the 192 city URLs.

This single issue explains 80% of "page not indexed" reports.

**Fix:** This is a hosting/routing problem on the custom domain side, not a code problem. The static files (`sitemap.xml`, `robots.txt`, `og-image.jpg`) work on the `.lovable.app` domain but not on `openmindai.pl`. Most likely cause: the domain still points partially to LH.pl (old hosting) instead of fully to Lovable, OR Lovable's static-asset serving isn't being hit because of a DNS / proxy layer at LH.pl.
**Action:** verify in Project → Settings → Domains that `www.openmindai.pl` shows status "Connected" with a green check, and that DNS at LH.pl points the A record to `185.158.133.1` (Lovable) with **no Cloudflare/LH proxy in front**. I can't check DNS from here — you need to confirm in the hosting panel.

---

### 🟡 Issue #2 — Sitemap is too large & undifferentiated

315 URLs is fine in principle, but ~192 of them are city pages with very similar templates. Google is conservative about indexing large numbers of near-duplicate template pages on a young domain. Even after we added unique content per city, the **template structure** (same H1 pattern, same sections, same CTA) signals "low diversity".

**Fix:**
- Split sitemap into `sitemap-main.xml` + `sitemap-cities.xml` + `sitemap-blog.xml` and reference them from a `sitemap-index.xml`. This helps GSC report indexing status per group.
- Drop `priority` and `changefreq` from city URLs (Google ignores them and they currently look spammy when all 192 say `priority 0.8`).
- Lower city priorities to `0.5` so main pages clearly outrank them.

---

### 🟡 Issue #3 — All pages share the same SSR shell

When Googlebot fetches any URL, the initial HTML is identical (same `<title>`, same `<meta description>`, same H1 placeholder). The per-page meta is set client-side by `usePageMeta` after JS runs. Googlebot **does** render JS, but with delay — and during the first crawl it often indexes the static shell. Two URLs with the same shell HTML look like duplicates until JS runs.

**Fix options (pick one):**
- **A. Pre-render with `vite-plugin-prerender` or `react-snap`** at build time for the ~20 most important pages (home, services, about, contact, blog index, top 10 cities). Generates real static HTML per route. Best long-term solution.
- **B. Inject per-route fallback `<title>`/`<meta>` via a tiny edge function** that intercepts the request before serving `index.html`. Lower lift than full SSR.
- **C. Accept it and wait** — rely on Google's JS rendering. Works eventually but slow.

I'd recommend **A** for the ~20 most important URLs.

---

### 🟢 Issue #4 — Recently changed canonicals/redirects need re-validation in GSC

The redirect+canonical work we did last cycle is correct, but Google needs to re-crawl those URLs before status updates. That can take 2–6 weeks. This is normal, not a bug.

**Action (you, in GSC):** for each affected URL category, click "Validate fix". Don't keep re-requesting indexing on individual URLs — it doesn't speed things up after the first request.

---

### What I'll change in the codebase (once you approve)

1. **Split sitemap** into `sitemap-index.xml` + `sitemap-main.xml` + `sitemap-cities.xml` + `sitemap-blog.xml` (`public/`). Drop `changefreq`, lower city `priority` to `0.5`.
2. **Update `robots.txt`** to point at `sitemap-index.xml`.
3. **Add per-route static `<title>` and `<meta description>` injection** via a small build script that generates one HTML file per top-20 route into `dist/` (lightweight prerender — no SSR runtime needed). Cities stay client-rendered for now.
4. **Add an internal-link block to `Home`** linking to ~12 voivodeship overview pages (currently missing) so crawl depth to city pages drops from 3 to 2.

### What only YOU can do (not in code)

1. **Verify `www.openmindai.pl/sitemap.xml` returns XML, not HTML.** This is the critical one. Check DNS at LH.pl, confirm domain status in Lovable settings. Without this, nothing else matters.
2. In GSC: open Sitemaps, **delete** the old sitemap entry, **resubmit** `https://www.openmindai.pl/sitemap-index.xml` (after step 1 works).
3. Wait 2–4 weeks. Don't keep clicking "Request indexing" — it has diminishing returns.

---

### TL;DR

> The main reason pages aren't indexed isn't your code — **your custom domain isn't serving `sitemap.xml`**. Fix DNS first, then I'll split the sitemap + prerender top pages to speed up the rest.

