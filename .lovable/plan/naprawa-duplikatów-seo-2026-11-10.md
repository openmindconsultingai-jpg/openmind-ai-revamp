# Naprawa duplikatów SEO

1. Ujednolicić canonical, og:url, hreflang, dane strukturalne i linki na domenie `https://www.openmindai.pl`, bez `.html`.
2. Generować pełne strony jako `{path}/index.html`, a warianty `{path}.html` jako lekkie przekierowania bez noindex. Przekierowywać także wejścia `.html` obsługiwane przez aplikację.
3. Ujednolicić mapy strony, wykluczyć dokumenty techniczne i oznaczyć je noindex. Doradca AI jest stroną dla klientów, więc pozostaje w mapie pod `/ai-advisor`.
4. Poprawić odmianę miast i województw wyłącznie w zgłoszonych zdaniach; zachować ceny i pozostałą treść.
5. Dodać testy i kontrolę kończącą generowanie stron błędem przy nieprawidłowych adresach, plikach lub frazach; zweryfikować wynik i przedstawić liczby, początek mapy oraz przykład Nysy. Nie publikować.

## Szczegóły techniczne
- Wspólna normalizacja adresów dla metadanych oraz danych strukturalnych.
- Sprawdzenie wszystkich wygenerowanych dokumentów i linków źródłowych, nie tylko mapy strony.
- Data `2026-11-10` jako stała data tej poprawki dla stron rzeczywiście zmienionych; bez daty bieżącego builda jako fallbacku.
- Sprawdzić automatyczny wynik kompilacji oraz uruchomić testy kontroli SEO; nie wykonywać ręcznie kompilacji zarządzanej przez środowisko.