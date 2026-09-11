# Zmiana kolejności pięter wieży (/wariant-tower)

Nowa kolejność sekcji podczas przewijania:

```text
1. Szkolenia z AI
2. Konsultacje i strategia AI w firmie
3. Czatboty, strony WWW, branding
4. Produkcja treści marketingowych i wideo AI
5. Rozwój każdej firmy z AI
6. Automatyzacje, aplikacje dedykowane i agenci AI
```

## Zmiany

1. **`src/pages/HomeTower.tsx`** — przestawienie tablicy `SECTIONS` do nowej kolejności:
   - `01` Szkolenia AI → `/szkolenia-ai`
   - `02` Konsultacje i strategia AI → `/konsultacje-ai`
   - `03` Czatboty, strony WWW, branding → `/strony-www-branding` (także w tekście: „aplikacje dedykowane" dopasowane do istniejących opisów bez zmiany podstron)
   - `04` Produkcja treści i wideo AI → `/teledyski-ai`
   - `05` Rozwój firmy z AI → `/zakladanie-firmy-z-ai`
   - `06` Automatyzacje, aplikacje dedykowane i agenci AI → `/automatyzacja-ai`
   - Tytuły sekcji zaktualizowane pod listę użytkownika (np. „Automatyzacje, aplikacje dedykowane i agenci AI").
2. **`src/config/tower-config.ts`** — kolejność `towerCategories` (piny na wieży) dopasowana do nowej kolejności z tymi samymi pozycjami `at: 0, 0.2, …, 1` i zaktualizowanymi etykietami.
3. **Weryfikacja** — build + krótki test podglądu `/wariant-tower`: kolejność napisów i pinów zgodna z listą, linki prowadzą na właściwe podstrony.

Zakres: tylko wariant porównawczy `/wariant-tower`; strona główna bez zmian.
