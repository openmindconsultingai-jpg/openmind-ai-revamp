# Naprawa favicony w Google (serce Lovable zamiast logo OpenMind)

## Co się faktycznie stało

Sprawdziłem projekt i przyczyna jest jednoznaczna:

1. W `index.html` ikona strony wskazuje na **zewnętrzną domenę** (`storage.googleapis.com/gpt-engineer-file-uploads/...`). Google wymaga, aby plik favicony leżał **na tej samej domenie co strona główna** — ikonę z obcej domeny po prostu ignoruje.
2. Gdy Google ignoruje zadeklarowaną ikonę, pobiera domyślne `https://www.openmindai.pl/favicon.ico`. Ten plik w projekcie to **domyślne serce Lovable** — i dokładnie to widać w wynikach wyszukiwania oraz w GSC.

To samo dotyczy Twoich innych projektów, jeśli tam też został domyślny `public/favicon.ico`.

## Co zrobię

1. Użyję **dokładnie tej samej ikony, która była dotychczas** — pliku `Open_Mind-min[1].png` z zewnętrznego adresu (sprawdziłem: nadal dostępny, HTTP 200). Pobiorę go i zapiszę lokalnie, kwadratowo wyśrodkowany, bez rozciągania:
   - `public/favicon.png` (96x96)
   - `public/favicon.ico` — **nadpisanie serca Lovable** tą samą ikoną (to kluczowe, bo Google i przeglądarki i tak pytają o `/favicon.ico`)
   - `public/apple-touch-icon.png` (180x180)
   Wygląd ikony pozostaje identyczny jak dotychczas — zmienia się tylko to, że jest hostowana na Twojej domenie.

2. W `index.html` podmienię tag ikony na ścieżki lokalne (same-origin):
   - `<link rel="icon" href="/favicon.ico" sizes="any">`
   - `<link rel="icon" type="image/png" href="/favicon.png">`
   - `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`
3. Sprawdzę, czy `scripts/prerender.ts` nie nadpisuje sekcji `<head>` w sposób gubiący te tagi, i w razie potrzeby dostosuję.
4. Uruchomię build i zweryfikuję, że pliki trafiają do `dist/`.

## Po wdrożeniu (ważne)

- Zmiana wymaga **publikacji** strony.
- Google odświeża faviconę przy kolejnym crawlu strony głównej — zwykle kilka dni do ~2 tygodni. Można to przyspieszyć, wysyłając stronę główną do indeksacji w GSC (Sprawdzenie URL → Poproś o zindeksowanie).
- Ikona musi być stale dostępna pod `https://www.openmindai.pl/favicon.ico` (kod 200, bez blokady w robots.txt) — zweryfikuję też robots.txt.

## Zakres

Zmiany tylko: `index.html`, pliki ikon w `public/`, ewentualnie `scripts/prerender.ts`. Bez zmian w wyglądzie, routingu, canonicalach, sitemapach i treści.
