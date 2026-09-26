# Nowa sekcja hero: film sterowany przewijaniem

## Zakres zmiany

- Dodać `src/components/ScrollVideoHero.tsx` na podstawie przekazanego komponentu, zachowując bez zmian jego mechanizm przewijania: 600vh, sticky 100vh, 721 klatek, 24 kl./s, blob preload, `requestAnimationFrame`, smoothing i tryb ograniczonego ruchu.
- Zastąpić obecną wieżę oraz jej przewijane intro i opisy na samej górze strony głównej nowym hero.
- Pozostawić bez zmian dalszą kolejność strony: „Zaufali nam”, „Gdzie działamy”, treści SEO, stopka i obecny widżet czatu.
- Zachować `FloatingNav` jako stałe menu nad filmem; jego obecny `z-index` jest wyższy niż warstwy hero.

## Linki i treść

Podpisy zostaną podpięte do istniejących stron:

- Szkolenia AI → `/szkolenia-ai`
- Audyt AI → `/konsultacje-ai`
- Automatyzacja procesów → `/automatyzacja-ai`
- Wdrożenia LLM i RAG → `/automatyzacja-ai`
- Strategia AI → `/konsultacje-ai`
- CTA „Napisz do nas przez formularz” → `/contact#contact`, czyli bezpośrednio do istniejącego formularza

Nagłówek końcowy filmu będzie jedynym `<h1>` strony głównej. Usunięty zostanie obecny `<h1>` wraz z zastępowaną sekwencją wieży.

## Wygląd i zachowanie

- Użyć dokładnie wskazanego poziomego filmu 1280×720 na komputerach i telefonach, bez osobnego pliku mobilnego i bez ponownej kompresji.
- Zachować `object-fit: cover` i centralne kadrowanie pionowych ekranów przez `OBJECT_POSITION_PORTRAIT`.
- Nie dodawać filtrów ani przyciemnienia poza delikatnym gradientem pod tekstem.
- Dopasować wyłącznie klasy wizualne do istniejących tokenów ciemnego motywu, turkusowego akcentu i obecnej typografii; logika odtwarzania pozostanie nietknięta.
- Pasek ładowania pokaże postęp i poster od pierwszej chwili. Jako poster wykorzystać istniejącą pierwszą klatkę projektu, bez pobierania alternatywnego filmu.
- Przy `prefers-reduced-motion` ustawić statycznie ostatnią klatkę z nagłówkiem i CTA.

## Szczegóły techniczne

- Usunąć z `Home.tsx` zależności używane wyłącznie przez dotychczasową wieżę (`LovableTower`, konfigurację wieży, mapę sekcji i nawigację kategorii).
- Nie zmieniać samego komponentu wieży ani strony porównawczej `/wariant-tower`; pozostaną dostępne poza główną stroną.
- Zachować SEO, dane strukturalne i metadane strony głównej bez zmian.
- Zapisać decyzję o nowym głównym hero w `AGENTS.md`, ponieważ zmienia się struktura strony głównej.

## Weryfikacja

- Sprawdzić podgląd na komputerze i telefonie: pierwszą klatkę, pasek ładowania, płynne przewijanie, zakończenie po 600vh i przejście do dalszej treści.
- Potwierdzić brak poziomego przewijania oraz brak przyciętych napisów i CTA na telefonie.
- Potwierdzić dokładnie jeden `<h1>`, menu nad filmem, poprawne linki pięciu podpisów i CTA do formularza.
- Sprawdzić wariant `prefers-reduced-motion`, błędy konsoli oraz końcowy stan kompilacji.
- Nie publikować zmian — pozostawić je wyłącznie w podglądzie.
