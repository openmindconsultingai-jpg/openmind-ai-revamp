/**
 * Single source of truth for city-page SEO content (PL).
 * Used BOTH by the React page (src/pages/CityDetail.tsx) and by the
 * static prerender (scripts/prerender.ts) so that title, description,
 * headings, body copy and FAQ are identical before and after hydration.
 */

export interface CitySeoSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface CitySeoFaq {
  pytanie: string;
  odpowiedz: string;
}

interface CityLike {
  name: string;
  locative: string;
  genitive: string;
}

interface VoivLike {
  name: string;
  locativeName: string;
  genitiveName: string;
}

export const cityPageTitle = (city: CityLike): string =>
  `AI w ${city.locative} – Wdrożenia, Szkolenia i Konsulting Sztucznej Inteligencji | OpenMind AI`;

export const cityPageDescription = (city: CityLike, voivodeship: VoivLike): string =>
  `Sztuczna inteligencja w ${city.locative} (województwo ${voivodeship.locativeName}). Wdrożenia AI, szkolenia z ChatGPT, automatyzacja procesów, agencja kreatywna AI. Bezpłatna konsultacja.`;

export const cityPageH1 = (city: CityLike): string =>
  `Sztuczna inteligencja (AI) w ${city.locative}`;

const listBranze = (branze?: string[]): string => {
  if (!branze || branze.length === 0) {
    return 'handlu, usług, produkcji, logistyki, edukacji oraz sektora medycznego i prawnego';
  }
  const items = branze.slice(0, 5).map((b) => b.toLowerCase());
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} oraz ${items[items.length - 1]}`;
};

/**
 * ~1000+ words of localized, city-contextual copy (PL).
 */
export const buildCitySeoSections = (
  city: CityLike,
  voivodeship: VoivLike,
  branzeKluczowe?: string[],
): CitySeoSection[] => {
  const M = city.name;
  const L = city.locative;
  const G = city.genitive;
  const branze = listBranze(branzeKluczowe);

  return [
    {
      id: 'wdrozenia',
      heading: `Wdrożenia AI dla firm w ${L}`,
      paragraphs: [
        `Wdrożenia AI ${M} realizujemy etapowo: zaczynamy od audytu procesów, w którym mierzymy czas pracy poświęcany na powtarzalne zadania, a następnie wybieramy te obszary, w których sztuczna inteligencja ${M} przyniesie najszybszy zwrot z inwestycji. Najczęściej automatyzujemy obsługę korespondencji i skrzynek firmowych, kwalifikację zapytań ofertowych, przygotowywanie ofert i kosztorysów, obieg dokumentów, wystawianie i opisywanie faktur, tworzenie raportów sprzedażowych oraz przygotowywanie treści marketingowych.`,
        `Pracujemy z firmami z ${L} działającymi w obszarach takich jak ${branze}. Dla e-commerce budujemy generatory opisów produktów i asystentów obsługi zamówień, dla firm produkcyjnych – automatyczne raportowanie i analizę danych z systemów ERP, dla biur rachunkowych i kancelarii – narzędzia do streszczania dokumentów i wyszukiwania informacji w archiwach, a dla sektora usługowego – systemy odpowiadające na zapytania klientów przez całą dobę.`,
        `Każde wdrożenie kończy się przekazaniem dokumentacji, instrukcji dla zespołu i krótkim szkoleniem wdrożeniowym. Dzięki temu firma z ${G} nie zostaje z narzędziem, którego nikt nie umie obsłużyć – pracownicy od pierwszego dnia wiedzą, jak korzystać z nowych rozwiązań i jak zgłaszać potrzeby rozwojowe.`,
      ],
    },
    {
      id: 'szkolenia',
      heading: `Szkolenia AI i ChatGPT w ${L}`,
      paragraphs: [
        `Szkolenia AI ${M} prowadzimy w trzech formatach: stacjonarnie w siedzibie klienta lub wynajętej sali w ${L}, online w formie warsztatów na żywo oraz indywidualnie – jako mentoring dla właścicieli firm i kadry zarządzającej. Każdy program dopasowujemy do branży i realnych zadań uczestników, więc ćwiczenia wykonujemy na dokumentach, materiałach i procesach danej organizacji, a nie na abstrakcyjnych przykładach.`,
        `Program podstawowy obejmuje pracę z ChatGPT i innymi najlepszymi narzędziami AI: skuteczne formułowanie poleceń, przygotowywanie ofert i pism, analizę danych i tabel, tworzenie prezentacji, redagowanie treści marketingowych oraz zasady bezpieczeństwa i ochrony danych osobowych zgodnie z RODO. Poziom zaawansowany to automatyzacja workflow, budowa własnych asystentów AI, integracje z narzędziami firmowymi oraz generatywna grafika i wideo.`,
        `Szkolenia kierujemy do zespołów sprzedaży, marketingu, obsługi klienta, HR, administracji i działów technicznych, a także do jednoosobowych działalności i mikrofirm z ${G}, które chcą pracować szybciej bez zwiększania zatrudnienia. Po warsztacie uczestnicy otrzymują materiały, bibliotekę gotowych promptów i możliwość konsultacji wdrożeniowej.`,
      ],
    },
    {
      id: 'automatyzacja',
      heading: `Automatyzacja procesów biznesowych w ${L}`,
      paragraphs: [
        `Automatyzacja AI ${M} to połączenie modeli językowych z narzędziami przepływu pracy, dzięki którym dane przenoszą się między systemami bez ręcznego przepisywania. Łączymy pocztę, arkusze, CRM, systemy magazynowe, kalendarze i komunikatory w spójny obieg, w którym zgłoszenie klienta trafia od razu do właściwej osoby, a raport powstaje automatycznie o ustalonej godzinie.`,
        `Typowe scenariusze dla firm z ${G} to: automatyczne odpowiedzi na zapytania ofertowe wraz z wyceną wstępną, kategoryzacja i priorytetyzacja zgłoszeń serwisowych, odczytywanie danych z faktur i dokumentów PDF, przypomnienia o płatnościach, monitoring opinii w internecie oraz cykliczne podsumowania sprzedaży i ruchu na stronie. Efektem jest zwykle kilka do kilkunastu godzin pracy odzyskiwanych tygodniowo w skali zespołu.`,
      ],
    },
    {
      id: 'agenci',
      heading: `Agenci AI i chatboty dla firm z ${G}`,
      paragraphs: [
        `Agent AI ${M} to asystent, który zna ofertę, cennik, procedury i najczęstsze pytania konkretnej firmy. Budujemy go na bazie dokumentów klienta, dzięki czemu odpowiada zgodnie z realnymi zasadami organizacji, a nie ogólną wiedzą z internetu. Agent może pracować na stronie internetowej, w komunikatorze, w wewnętrznym systemie firmy lub jako asystent telefoniczny obsługujący pierwszy kontakt.`,
        `Chatboty wdrażane w firmach z ${L} przejmują powtarzalne rozmowy: pytania o dostępność, godziny pracy, status zamówienia, warunki współpracy czy dokumenty potrzebne do wyceny. Rozmowy, które wymagają decyzji człowieka, agent przekazuje do zespołu wraz z podsumowaniem. Dzięki temu klient dostaje odpowiedź natychmiast, a pracownicy zajmują się wyłącznie sprawami o realnej wartości.`,
      ],
    },
    {
      id: 'edukacja',
      heading: `AI dla szkół i edukacji w ${L}`,
      paragraphs: [
        `Placówkom oświatowym z ${G} oferujemy szkolenia rad pedagogicznych, warsztaty dla uczniów oraz pomoc w przygotowaniu szkolnej polityki korzystania ze sztucznej inteligencji. Nauczyciele uczą się przygotowywać materiały dydaktyczne, sprawdziany, scenariusze lekcji i informacje zwrotne dla uczniów, oszczędzając czas na pracy administracyjnej.`,
        `Osobno pracujemy z uczniami nad świadomym i uczciwym korzystaniem z narzędzi AI: weryfikacją źródeł, rozpoznawaniem błędnych odpowiedzi modeli oraz odpowiedzialnym wykorzystaniem generatywnej grafiki i tekstu. Szkolenia prowadzimy stacjonarnie w ${L} oraz zdalnie, także dla zespołów kilku placówek jednocześnie.`,
      ],
    },
    {
      id: 'dlaczego',
      heading: `Dlaczego firmy z ${G} wybierają OpenMind AI`,
      paragraphs: [
        `Pracujemy po polsku – dokumentacja, szkolenia, wsparcie i kontakt z opiekunem projektu prowadzone są w języku polskim, co znacząco skraca czas wdrożenia w zespołach nietechnicznych. Rozliczamy się w oparciu o jasny zakres prac, a przed startem pokazujemy, które procesy realnie warto zautomatyzować, a które lepiej zostawić bez zmian.`,
        `Pierwsze efekty pojawiają się zwykle w ciągu kilku dni do kilku tygodni, w zależności od złożoności projektu: proste automatyzacje i szkolenia działają niemal od razu, rozbudowani agenci AI i integracje z systemami firmowymi wymagają dłuższego cyklu. Po zakończeniu wdrożenia zapewniamy wsparcie techniczne, aktualizacje narzędzi i konsultacje rozwojowe.`,
        `Firmy z ${G} i całego województwa ${voivodeship.genitiveName} obsługujemy zarówno zdalnie, jak i na miejscu – dojeżdżamy na warsztaty, spotkania wdrożeniowe i prezentacje dla zarządu. Pierwsza rozmowa konsultacyjna jest bezpłatna i niezobowiązująca.`,
      ],
    },
  ];
};

export const buildCitySeoFaq = (city: CityLike): CitySeoFaq[] => {
  const G = city.genitive;
  const L = city.locative;
  return [
    {
      pytanie: `Ile kosztuje wdrożenie AI w firmie z ${G}?`,
      odpowiedz: `Koszt zależy od zakresu: pojedyncza automatyzacja procesu to zwykle wydatek rzędu kilku tysięcy złotych, a rozbudowany agent AI zintegrowany z systemami firmowymi kosztuje odpowiednio więcej. Wycenę przygotowujemy dopiero po bezpłatnym audycie, w którym sprawdzamy, ile czasu pracy pochłaniają obecne procesy. Dzięki temu od razu widać, w jakim czasie wdrożenie się zwróci. Nie pobieramy opłat za pierwszą rozmowę i wstępną analizę potrzeb.`,
    },
    {
      pytanie: `Czy prowadzicie szkolenia stacjonarnie w ${L}?`,
      odpowiedz: `Tak, szkolenia AI prowadzimy stacjonarnie w ${L} – w siedzibie klienta lub w wynajętej sali szkoleniowej. Alternatywnie realizujemy warsztaty online na żywo oraz sesje indywidualne dla właścicieli firm i kadry zarządzającej. Format dobieramy do liczby uczestników i dostępności zespołu. Materiały i nagrania przekazujemy po zakończeniu szkolenia.`,
    },
    {
      pytanie: 'Jak długo trwa wdrożenie automatyzacji AI?',
      odpowiedz: 'Proste automatyzacje, takie jak obsługa skrzynki mailowej czy generowanie raportów, uruchamiamy zwykle w ciągu kilku dni roboczych. Bardziej złożone projekty z integracją CRM, systemu magazynowego lub własnego agenta AI zajmują od kilku do kilkunastu tygodni. Pracujemy etapami, więc pierwsze działające elementy widać na długo przed zakończeniem całego projektu. Harmonogram ustalamy na starcie i raportujemy postępy.',
    },
    {
      pytanie: 'Od czego zacząć wdrożenie AI w małej firmie?',
      odpowiedz: 'Najlepiej zacząć od jednego, dobrze opisanego procesu, który zabiera najwięcej czasu i jest powtarzalny – najczęściej to obsługa zapytań od klientów lub przygotowywanie ofert. Wybieramy go wspólnie podczas bezpłatnej konsultacji i uruchamiamy jako pilotaż. Po potwierdzeniu oszczędności czasu rozszerzamy zakres na kolejne obszary. Takie podejście ogranicza ryzyko i nie wymaga dużego budżetu na starcie.',
    },
    {
      pytanie: 'Czy oferujecie wsparcie po wdrożeniu?',
      odpowiedz: 'Tak, po zakończeniu wdrożenia zapewniamy wsparcie techniczne, aktualizacje narzędzi oraz konsultacje rozwojowe. Reagujemy na zmiany w modelach i integracjach, żeby automatyzacje działały bez przerw. Klienci mogą też zamawiać dodatkowe szkolenia dla nowych pracowników. Wsparcie prowadzimy w języku polskim, mailowo i telefonicznie.',
    },
  ];
};
