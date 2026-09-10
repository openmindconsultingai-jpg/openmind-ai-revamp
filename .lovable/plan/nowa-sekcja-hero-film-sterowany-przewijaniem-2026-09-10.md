# Nowa sekcja hero: film sterowany przewijaniem

Zastępujemy obecną górę strony głównej (wideo w tle + model 3D + przycisk konsultacji) filmem, którego odtwarzanie steruje się przewijaniem. W miarę schodzenia w głąb wynurzają się kolejne napisy usług, każdy z linkiem do istniejącej podstrony.

## Co zobaczy odwiedzający

- Na wejściu: nieruchoma pierwsza klatka i nagłówek „AI, które naprawdę działa u Ciebie w firmie, urzędzie, szkole czy w domu”.
- Przewijanie w dół odtwarza film do przodu, w górę cofa. Odcinek trwa 6 wysokości ekranu.
- Po nagłówku pojawia się kolejno 6 napisów usług, każdy klikalny:
  Szkolenia AI (/szkolenia-ai), Produkcja treści (/teledyski-ai), Strategia AI (/konsultacje-ai), Automatyzacje i agenci (/automatyzacja-ai), Start i rozwój firmy (/zakladanie-firmy-z-ai), Czatboty, strony i branding (/strony-www-branding).
- Zaraz pod filmem zostaje pasek „Zaufali nam”, a dalej reszta strony bez zmian.
- Telefony pobierają lżejszą wersję filmu. Przy włączonej w systemie redukcji ruchu film się nie pobiera, a napisy pokazują się jako zwykła, czytelna lista.

## Co znika

- Dotychczasowa sekcja hero: wideo w tle, model 3D, przycisk „Umów bezpłatną konsultację”.
- Sekcja „Nasza misja”.
- Dwa kafelki: kontakt oraz wirtualny doradca.

Rezerwacja konsultacji pozostaje dostępna z menu i strony kontaktu — z samej góry strony głównej przycisk znika.

## Materiały

Cztery pliki są już w publicznym magazynie (bucket `hero`): wersja desktop, wersja mobilna oraz dwa obrazy pierwszej klatki. Komponent będzie je pobierał z tych publicznych adresów, więc nic nie trafia do repozytorium.

## Szczegóły techniczne

- Nowy `src/components/OpenMindScrollHero.tsx` (wersja z załącznika, bez zależności poza Reactem, style w środku pliku), użyty w `src/pages/Home.tsx` zamiast `VideoHero`.
- Propsy: `scrollVh={6}`, `title` wg ustaleń, `services` z relatywnymi ścieżkami (`/szkolenia-ai` itd.), źródła wskazujące na publiczne URL-e z bucketu `hero`.
- Fonty Bricolage Grotesque / IBM Plex dodane w `index.html` przez `<link>` z `display=swap` i `preconnect`; jeśli kolidują z obecną typografią marki, komponent dostaje font projektu.
- `src/components/VideoHero.tsx` przestaje być używany na stronie głównej; usuwamy import i renderowanie, plik zostaje jako nieużywany albo kasujemy go razem z martwymi zależnościami (`LazyNeuralIframe` pozostaje, bo używa go strona „O nas”).
- `MissionSection` usunięty z `Home.tsx`; kafelki kontaktu i doradcy usunięte z `src/components/BentoGrid.tsx` (siatka przeliczona, by nie zostały luki).
- `LogoTicker` przenoszony z wnętrza hero i renderowany bezpośrednio pod filmem w `Home.tsx`.
- SEO: dokładnie jeden `<h1>` na stronie głównej — ten w komponencie; opis i słowa kluczowe w `usePageMeta` bez zmian; linki usług jako zwykłe `<a href>`, więc prerender i tak je zapisze w statycznym HTML.
- Nagłówek strony (`FloatingNav`) pozostaje przezroczysty nad filmem, żeby nie przecinał kadru.
- Po wdrożeniu: sprawdzenie przewijania na desktopie i telefonie, obecności H1 raz, oraz działania linków usług.
