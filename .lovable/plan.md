# Przebudowa usług pod SEO — wdrożenie kompletne (9 stron)

Wierne wdrożenie treści z 9 prototypów `.htm` + strategii z `STRATE~1.MD`. Bez ikonek AI w kategoriach — czyste karty tekstowe z brandowym stylem OpenMind (glassmorphism, Outfit/DM Sans, teal `#00dbcd`).

## Zakres

### Nowa architektura URL (płaska, zastępuje zagnieżdżoną)
```
/services.html                     ← przeprojektowany hub
/automatyzacja-ai.html
/szkolenia-ai.html                 ← hub szkoleń (+ mapa 192 miast)
/szkolenia-ai-stacjonarne.html     (+ mapa 192 miast)
/szkolenia-ai-online.html
/szkolenia-ai-indywidualne.html
/ai-dla-szkol.html                 (+ mapa 192 miast)
/teledyski-ai.html
/strony-www-branding.html
/konsultacje-ai.html
```

### Usuwane (stara struktura z poprzedniej iteracji)
- Routy `/szkolenia-ai/dla-firm`, `/szkolenia-ai/dla-szkol`, `/szkolenia-ai/chatgpt` (+ `.html`)
- Dane `src/data/trainings.ts` (kategorie `dla-firm`, `dla-szkol`, `chatgpt`) — przepiszę pod nowe slugi
- Wpisy w `sitemap-main.xml` prowadzące do starej struktury

## Implementacja

### 1. Dane treści — 1:1 z prototypów
- `src/data/services/servicesHub.ts` — treść hub (z `SERVIC~1.HTM`)
- `src/data/services/automatyzacja.ts` (z `AUTOMA~1.HTM`)
- `src/data/services/szkoleniaHub.ts` (z `SZKOLE~1.HTM`)
- `src/data/services/szkoleniaStacjonarne.ts` (z `SZKOLE~2.HTM`)
- `src/data/services/szkoleniaOnline.ts` (z `SZKOLE~3.HTM`)
- `src/data/services/szkoleniaIndywidualne.ts` (z `SZKOLE~4.HTM`)
- `src/data/services/aiDlaSzkol.ts` (z `AI-DLA~1.HTM`)
- `src/data/services/teledyski.ts` (z `TELEDY~1.HTM`)
- `src/data/services/stronyBranding.ts` (z `STRONY~1.HTM`)
- `src/data/services/konsultacje.ts` (z `KONSUL~1.HTM`)

Każdy plik eksportuje: `title` (meta ≤60), `description` (meta ≤160), `h1`, `intro`, `sections[]` (nagłówek + treść/listy), `faqs[]`, `courseOrServiceJsonLd`, `breadcrumbs`.

### 2. Uniwersalny szablon stron
`src/pages/ServiceLandingPage.tsx` — jeden komponent, przyjmuje `slug` i dobiera dane. Sekcje w kolejności prototypu:
- Hero (H1 + intro + CTA)
- Sekcje treści (glassmorphism cards **bez ikon**)
- Mapa 192 miast (`<ServiceAreas>`) — tylko na 3 stronach flagowanych w danych
- FAQ (akordeon, JSON-LD `FAQPage`)
- Linkowanie krzyżowe (grid do siostrzanych usług — tekst + krótki opis, **bez ikon**)
- CTA końcowe → `/contact.html`

Typografia: justowanie + `noWidows` (wg brand memory). Kolory: token semantyczny `teal` / `text-gradient`.

### 3. Przeprojektowany hub `/services.html`
Nowy komponent `src/components/ServicesHub.tsx` (zastępuje logikę `Services.tsx` na `/services.html`; obecny komponent tabowy pozostaje dostępny na starych URL-ach `/services/:slug` tylko dla wstecznej kompatybilności, ale każda karta linkuje do nowego płaskiego URL-a).

Hub: intro + grid 7 kart usług (title + short desc + link "Poznaj →"), **bez ikonek**, sekcja "dlaczego my" (z prototypu), sekcja miast, JSON-LD `Organization` + `ItemList`.

### 4. Routing (`src/App.tsx`)
Dodać 9 nowych route'ów (każdy z wariantem `.html` i bez). Usunąć 3 stare route'y (`/szkolenia-ai/dla-firm|dla-szkol|chatgpt` × 2). Dodać `RedirectWithSeo` z każdego starego URL-a na nowy odpowiednik:
- `/szkolenia-ai/dla-firm(.html)` → `/szkolenia-ai-stacjonarne.html`
- `/szkolenia-ai/dla-szkol(.html)` → `/ai-dla-szkol.html`
- `/szkolenia-ai/chatgpt(.html)` → `/szkolenia-ai-online.html`

### 5. Nawigacja i stopka
- `FloatingNav.tsx`: dropdown "Usługi" z 7 pozycjami (bez ikon)
- `Footer.tsx`: grid sitelinków zaktualizowany pod nowe URL-e

### 6. SEO infrastruktura
- `public/sitemap-main.xml`: dodać 9 nowych URL-i (priority 0.9 hub, 0.8 podstrony), usunąć stare 3
- `public/sitemap-html.xml`: to samo z `.html`
- `scripts/prerender.ts`: dodać 9 tras do listy prerenderowanej (SSG dla botów)

### 7. Sprzątanie
- `src/data/trainings.ts` — usuwam (lub przepisuję pod nowy hub)
- `src/pages/TrainingPage.tsx` — usuwam (zastąpione przez `ServiceLandingPage.tsx`)

## Weryfikacja

1. Każda z 9 stron ładuje się pod nowym URL i pod `.html`
2. Stare URL-e szkoleń robią redirect z `noindex` + `canonical`
3. `document.title`, `<meta description>`, canonical, JSON-LD widoczne w DOM (spot-check przez Playwright na 2-3 stronach)
4. Build zielony, brak linków do usuniętych route'ów w kodzie
5. Sitemap zawiera 9 nowych wpisów, nie ma starych

## Uwagi

- **Bez ikonek AI** w kartach kategorii — użytkownik wyraźnie tego nie chce. Zamiast ikon: numer/liczba porządkowa lub sam gradient tekstu w headerze karty.
- Treść przenoszę **wiernie** z prototypów (H1, sekcje, FAQ, JSON-LD), ale renderuję we własnym reactowym designie zgodnym z resztą strony (nie osadzam surowego HTML).
- Mapa 192 miast reużywa istniejący `ServiceAreas` — działa od razu, nic tam nie zmieniam.
- To duża zmiana; wdrożę w jednym podejściu jak potwierdziłeś. Kolejność edycji: dane → template → hub → routing → nav/footer → sitemap/prerender → usunięcie starego.
