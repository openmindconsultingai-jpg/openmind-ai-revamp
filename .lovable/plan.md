

## Plan: Naprawa problemów z indeksowaniem (Google Search Console)

Trzy odrębne problemy zgłoszone przez GSC. Każdy wymaga innej naprawy.

---

### Problem 1 — `http://www.openmindai.pl/` oraz `http://openmindai.pl/` ("Strona zawiera przekierowanie")

**Przyczyna:** Google pamięta stare URL-e z protokołem `http://` (zanim była konfiguracja HTTPS/www). Hosting LH.pl + Lovable poprawnie robią 301 → `https://www.openmindai.pl/`, ale ta wiadomość w GSC to po prostu informacja, że Google nadal pyta o stary adres. Dodatkowo GSC nie ma jasno powiedzianej kanonicznej domeny.

**Co zrobimy:**
1. Dodamy do `index.html` jawne meta `<link rel="canonical">` jako *bootstrap* (zanim React go nadpisze), pokazujące, że domena docelowa to `https://www.openmindai.pl`. Pomaga to crawlerom przy pierwszym fetchu.
2. Dodamy w `robots.txt` jawny `Sitemap: https://www.openmindai.pl/sitemap.xml` (sprawdzimy/uzupełnimy).
3. Zalecimy użytkownikowi w GSC „Zatwierdź poprawkę” na tych dwóch URL-ach — to typowa, oczekiwana sytuacja po migracji na HTTPS i nie wymaga więcej zmian w kodzie. Po 30 dniach Google przestanie raportować.

---

### Problem 2 — `https://openmindai.pl/kontakt` ("Duplikat, brak kanonicznej")

**Przyczyna:** Stary URL `/kontakt` jest w GSC z czasów, gdy istniał jako osobna strona. Obecnie React Router robi `<Navigate to="/contact">` — ale to jest **przekierowanie po stronie klienta**, którego Googlebot nie zawsze wykonuje. Dla bota strona `/kontakt` ładuje pusty HTML i to samo `<head>` co `/contact`, więc GSC widzi dwa adresy z identyczną treścią i nie wie, który jest kanoniczny. Plus brak prefiksu `www`.

**Co zrobimy:**
1. Dla wszystkich tras, które są tylko redirectami (`/o-nas`, `/kontakt`, `/oferta`, `/polityka-prywatnosci-...`, ich warianty `/en/...`), zmienimy logikę tak, aby **przed renderem** (w komponencie redirect) ustawić `<meta name="robots" content="noindex">` oraz canonical wskazujący na nowy adres. To jest już częściowo w `useCanonical`, ale obecnie obejmuje tylko jedną ścieżkę. Rozszerzymy listę.
2. Dodatkowo stworzymy wspólny komponent `<RedirectWithSeo to="/contact" />` który ustawia canonical=docelowy URL + noindex zanim wykona Navigate. Dzięki temu Google jasno zobaczy, że `/kontakt` ma kanoniczną wersję `/contact`.
3. Po wdrożeniu: poprosimy użytkownika o „Sprawdź adres URL → Poproś o indeksowanie” w GSC dla `https://www.openmindai.pl/contact`.

---

### Problem 3 — 7 stron `gdzie-dzialamy/...` ("Duplikat, brak kanonicznej")

**URL-e:** turek, zgorzelec, dzierzoniow, szprotawa, rypin, andrychow, tuchola — to mniejsze miasta, dla których prawdopodobnie nie ma pełnego unikalnego contentu w `cityContent`, więc strona renderuje **fallback z generycznym tekstem** (ten sam dla wszystkich miast bez tłumaczeń). Google słusznie wykrył duplikację treści.

**Co zrobimy:**
1. Sprawdzimy w `src/data/cityContent/index.ts`, które miasta z listy `voivodeships` faktycznie mają pełny content (`opisGospodarki`, `wyzwaniaAI`, `przykladZastosowania`, `faq`).
2. Dla **każdego z 7 problemowych miast** uzupełnimy w odpowiednim pliku `src/data/cityContent/<wojewodztwo>.ts` unikalny content PL + EN (opis gospodarki miasta, kluczowe branże, scenariusz wdrożenia AI, FAQ × 4–5 pytań). Każde miasto ma swoją specyfikę:
   - **Turek** (wielkopolskie) — przemysł energetyczny, kopalnia, transformacja po Adamowie
   - **Zgorzelec** (dolnośląskie) — pogranicze PL-DE, logistyka, energetyka
   - **Dzierżoniów** (dolnośląskie) — przemysł elektroniczny, SSE
   - **Szprotawa** (lubuskie) — przemysł drzewny, mała produkcja
   - **Rypin** (kujawsko-pomorskie) — rolnictwo, przetwórstwo
   - **Andrychów** (małopolskie) — przemysł odzieżowy, włókienniczy
   - **Tuchola** (kujawsko-pomorskie) — turystyka, leśnictwo (Bory Tucholskie)
3. Dodatkowo: w `CityDetail.tsx` w bloku **fallback** (gdy `hasLocalizedContent` = false) zmienimy treść, żeby zawierała choćby `city.name` i `voivodeship.name` w kilku miejscach + dynamiczne H2 — to zmniejszy duplikację dla pozostałych miast bez pełnego contentu (jeśli takie są).
4. Zaktualizujemy `lastmod` w `sitemap.xml` dla tych 7 URL-i na dzisiejszą datę, żeby Google szybciej je przeindeksował.

---

### Pliki do edycji (techniczne)

- `index.html` — dodać `<link rel="canonical" href="https://www.openmindai.pl/">` bootstrap
- `public/robots.txt` — upewnić się, że jest `Sitemap:` z pełnym URL
- `src/components/RedirectWithSeo.tsx` *(nowy)* — komponent redirect z canonical+noindex
- `src/App.tsx` — zamiana `<Navigate>` na `<RedirectWithSeo>` dla legacy URL-i
- `src/hooks/useCanonical.ts` — uwzględnić wszystkie ścieżki redirect jako noindex
- `src/data/cityContent/wielkopolskie.ts` — dodać Turek
- `src/data/cityContent/dolnoslaskie.ts` — dodać Zgorzelec, Dzierżoniów
- `src/data/cityContent/lubuskie.ts` — dodać Szprotawę
- `src/data/cityContent/kujawsko-pomorskie.ts` — dodać Rypin, Tucholę
- `src/data/cityContent/malopolskie.ts` — dodać Andrychów
- `public/sitemap.xml` — odświeżyć `lastmod` dla 7 miast

---

### Po wdrożeniu — działania w GSC (instrukcja dla Ciebie)

1. **Inspect URL** w GSC dla każdego z 9 URL-i (2 root http + `/kontakt` + 7 miast) → kliknij **„Request indexing”**.
2. W zakładce **„Pages” → „Why pages aren't indexed”** → kliknij **„Validate fix”** dla każdego typu błędu.
3. Czekaj 7–14 dni — Google przeskanuje ponownie i zaktualizuje status.

