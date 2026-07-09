// Industry-specific AI training landing pages (9 pages).
// Content is generated from compact per-industry specs to keep the file
// maintainable — each page still gets ~500 words of unique Polish copy,
// 6-module curriculum, format cards, and JSON-LD (Course + FAQPage + Breadcrumbs).

import type { Proto } from './index';

const SITE = 'https://www.openmindai.pl';

export interface IndustrySpec {
  slug: string;
  path: string;              // "/szkolenia-ai-dla-lekarzy"
  navLabel: string;          // hub / footer label
  shortDesc: string;         // one-liner
  title: string;             // <title>
  description: string;       // meta description
  h1: string;
  audienceLd: string;        // schema.org Course.audience
  /** Hero lead paragraph (shortDesc used as hero sub); this becomes the intro of "Dlaczego AI w..." */
  whyH2: string;
  whyLead: string;           // 2-3 sentences
  whyBullets: string[];      // 4-6 tight benefit points
  modules: Array<{ name: string; desc: string }>;   // exactly 6
  faq: Array<{ q: string; a: string }>;             // exactly 4
}

/* ── Compact per-industry specs ── */
const SPECS: IndustrySpec[] = [
  {
    slug: 'szkolenia-ai-dla-lekarzy',
    path: '/szkolenia-ai-dla-lekarzy',
    navLabel: 'Dla lekarzy i medycyny',
    shortDesc:
      'Uczymy lekarzy i zespoły medyczne bezpiecznej pracy z AI: od dokumentacji i opisów wizyt po streszczanie publikacji naukowych. Bez danych pacjentów w publicznych narzędziach — rozwiązania zgodne z tajemnicą lekarską i RODO.',
    title:
      'Szkolenia AI dla lekarzy i placówek medycznych — bezpiecznie, zgodnie z RODO | OpenMind AI',
    description:
      'Praktyczne szkolenia AI dla lekarzy, przychodni i szpitali: dokumentacja medyczna szybciej, streszczanie badań, komunikacja z pacjentem. Tajemnica lekarska i RODO w standardzie.',
    h1: 'Szkolenia AI dla lekarzy — odzyskaj czas pochłaniany przez dokumentację',
    audienceLd: 'Lekarze, personel medyczny, kadra zarządzająca placówek ochrony zdrowia',
    whyH2: 'Dlaczego AI w medycynie',
    whyLead:
      'Uczymy lekarzy i zespoły medyczne bezpiecznej pracy z AI: od dokumentacji i opisów wizyt po streszczanie publikacji naukowych. Bez danych pacjentów w publicznych narzędziach — rozwiązania zgodne z tajemnicą lekarską i RODO.',
    whyBullets: [
      'Lekarz spędza nawet 1/3 dnia na dokumentacji — AI skraca to wielokrotnie.',
      'Tempo publikacji przekracza możliwości śledzenia — AI streszcza i filtruje.',
      'Komunikacja z pacjentem może być jaśniejsza i szybsza.',
    ],
    modules: [
      {
        name: 'Bezpieczny start: zasady pracy z AI w medycynie',
        desc: 'Tajemnica lekarska, RODO, anonimizacja, narzędzia z gwarancjami prywatności.',
      },
      {
        name: 'Dokumentacja medyczna z AI',
        desc: 'Szkice wpisów, opisy wizyt, epikryzy, skierowania; biblioteka promptów gabinetu.',
      },
      {
        name: 'Praca z wiedzą medyczną',
        desc: 'Streszczanie publikacji i wytycznych, porównywanie badań; weryfikacja źródeł i granice zaufania do AI.',
      },
      {
        name: 'Komunikacja z pacjentem',
        desc: 'Zalecenia prostym językiem, materiały edukacyjne, wielojęzyczność.',
      },
      {
        name: 'Organizacja pracy gabinetu',
        desc: 'Grafiki, korespondencja, przygotowanie dokumentów rozliczeniowych, automatyzacja rejestracji i przypomnień.',
      },
      {
        name: 'Warsztat wdrożeniowy',
        desc: 'Zestaw narzędzi pod specjalizację, plan wdrożenia i polityka użycia AI w placówce.',
      },
    ],
    faq: [
      {
        q: 'Czy dane pacjentów są bezpieczne?',
        a: 'Na szkoleniu tylko dane syntetyczne i zanonimizowane. Zasada: żadnych danych pacjentów w publicznych narzędziach, tylko rozwiązania z umowami powierzenia lub modele lokalne.',
      },
      {
        q: 'Czy AI może stawiać diagnozy?',
        a: 'Nie. AI wspiera administrację i dostęp do wiedzy — odpowiedzialność kliniczna zawsze po stronie lekarza.',
      },
      {
        q: 'Czy szkolicie całe placówki?',
        a: 'Tak: 1:1, zespoły przychodni, szpitale (program kaskadowy).',
      },
      {
        q: 'W jakich formatach?',
        a: 'Stacjonarnie w placówce w całej Polsce, online lub 1:1, także weekendy.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-prawnikow',
    path: '/szkolenia-ai-dla-prawnikow',
    navLabel: 'Dla prawników i kancelarii',
    shortDesc:
      'Uczymy prawników wykorzystywać AI tam, gdzie daje przewagę: analiza i streszczanie umów, research, projekty pism — z żelaznymi zasadami weryfikacji źródeł i ochrony tajemnicy zawodowej.',
    title:
      'Szkolenia AI dla prawników i kancelarii — analiza umów, research, poufność | OpenMind AI',
    description:
      'Szkolenia AI dla adwokatów, radców i kancelarii: analiza umów, research z weryfikacją źródeł, projekty pism. Tajemnica zawodowa i bezpieczne narzędzia w standardzie.',
    h1: 'Szkolenia AI dla prawników — więcej merytoryki, mniej rzemiosła',
    audienceLd: 'Adwokaci, radcowie prawni, aplikanci, prawnicy in-house, kadry kancelarii',
    whyH2: 'Dlaczego AI w kancelarii',
    whyLead:
      'Uczymy prawników wykorzystywać AI tam, gdzie daje przewagę: analiza i streszczanie umów, research, projekty pism — z żelaznymi zasadami weryfikacji źródeł i ochrony tajemnicy zawodowej.',
    whyBullets: [
      'Analiza dokumentów to godziny, które AI skraca do minut.',
      'Klienci oczekują szybszych odpowiedzi przy tych samych stawkach.',
      'Kancelarie, które wdrożą AI wcześniej, przejmą klientów pozostałych.',
    ],
    modules: [
      {
        name: 'Zasady bezpieczeństwa i etyki',
        desc: 'Tajemnica adwokacka/radcowska a AI; co wolno wprowadzać do modeli; anonimizacja; polityka AI kancelarii; stanowiska samorządów.',
      },
      {
        name: 'Halucynacje i weryfikacja',
        desc: 'Dlaczego AI wymyśla orzeczenia; techniki weryfikacji każdego wyniku; praca na własnych dokumentach.',
      },
      {
        name: 'Analiza umów i dokumentów',
        desc: 'Streszczanie, ryzyka i klauzule, porównywanie wersji, checklisty due diligence.',
      },
      {
        name: 'Research prawniczy',
        desc: 'Przyspieszanie kwerend, syntezy stanowisk, argumentacja — zawsze z weryfikacją w źródłach pierwotnych.',
      },
      {
        name: 'Pisma i dokumenty',
        desc: 'Projekty pism i umów na bazie wzorów kancelarii; styl; korespondencja prostym językiem.',
      },
      {
        name: 'Warsztat wdrożeniowy',
        desc: 'Biblioteka promptów pod praktykę, wybór narzędzi z poufnością danych, plan wdrożenia.',
      },
    ],
    faq: [
      {
        q: 'Czy wprowadzanie dokumentów klientów do AI narusza tajemnicę?',
        a: 'Do publicznych darmowych narzędzi może naruszać. Uczymy pracy na rozwiązaniach z umowami powierzenia, wersjach enterprise i anonimizacji.',
      },
      {
        q: 'AI wymyśla orzeczenia — jak temu ufać?',
        a: 'Nie ufać. Weryfikacja to główny moduł — każde źródło sprawdza prawnik.',
      },
      {
        q: 'Dla całej kancelarii?',
        a: 'Tak, od jednoosobowych praktyk po duże kancelarie; osobne ścieżki dla prawników i administracji.',
      },
      {
        q: 'W jakich formatach?',
        a: 'Stacjonarnie w kancelarii, online lub 1:1.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-jdg',
    path: '/szkolenia-ai-dla-jdg',
    navLabel: 'Dla JDG i solopreneurów',
    shortDesc:
      'Jednoosobowa działalność to dziesiątki ról naraz. Pokazujemy, jak AI przejmuje marketing, oferty, dokumenty i obsługę klienta — za ułamek kosztu etatu. Konkretnie, na Twojej firmie, z efektami od pierwszej sesji.',
    title:
      'Szkolenia AI dla przedsiębiorców JDG — firma jednoosobowa z mocą zespołu | OpenMind AI',
    description:
      'Szkolenie AI dla jednoosobowej działalności: marketing, oferty, obsługa klienta i automatyzacje niskim kosztem. Praktycznie, 1:1 lub w małych grupach. Efekty od pierwszej sesji.',
    h1: 'Szkolenia AI dla JDG — prowadź firmę, jakbyś miał zespół',
    audienceLd:
      'Właściciele jednoosobowych działalności gospodarczych, freelancerzy, solopreneurzy',
    whyH2: 'Dlaczego AI w JDG',
    whyLead:
      'Jednoosobowa działalność to dziesiątki ról naraz. Pokazujemy, jak AI przejmuje marketing, oferty, dokumenty i obsługę klienta — za ułamek kosztu etatu. Konkretnie, na Twojej firmie, z efektami od pierwszej sesji.',
    whyBullets: [
      'AI zastępuje kompetencje, na które solo-przedsiębiorcy nie stać etatowo (copywriter, grafik, asystent).',
      'Godzina zaoszczędzona dziennie to ponad miesiąc pracy rocznie.',
      'Przewaga nad konkurencją robiącą wszystko ręcznie.',
    ],
    modules: [
      {
        name: 'Twój wirtualny zespół',
        desc: 'Konfiguracja ChatGPT/Claude pod firmę: kontekst, styl, oferta; asystenci do powtarzalnych zadań.',
      },
      {
        name: 'Marketing i social media',
        desc: 'Posty, rolki, grafiki i harmonogram w godzinę tygodniowo.',
      },
      {
        name: 'Oferty, wyceny i e-maile',
        desc: 'Szablony ofert, które sprzedają; odpowiedzi w minutę.',
      },
      {
        name: 'Dokumenty i organizacja',
        desc: 'Szkice umów, faktury, ewidencje, plan tygodnia.',
      },
      {
        name: 'Automatyzacje niskim kosztem',
        desc: 'Make/Zapier w wersjach darmowych i tanich: odpowiedzi, przypomnienia, publikacje, leady.',
      },
      {
        name: 'Warsztat wdrożeniowy',
        desc: 'Komplet narzędzi na żywo; plan na 30 dni.',
      },
    ],
    faq: [
      {
        q: 'Nie znam się na technologii — dam radę?',
        a: 'Tak, zaczynamy od zera na Twojej firmie. Większość uczestników to nie-informatycy.',
      },
      {
        q: 'Kiedy się zwróci?',
        a: 'Jeśli AI oszczędza 5 h tygodniowo, szkolenie zwraca się w pierwszy miesiąc.',
      },
      {
        q: '1:1 czy grupa?',
        a: 'Oba: 1:1 (także w naszej siedzibie) lub małe grupy otwarte.',
      },
      {
        q: 'Jakie narzędzia?',
        a: 'ChatGPT/Claude, Canva AI, Make/Zapier, grafika i wideo — pod budżet JDG, większość darmowa lub do ok. 100 zł/mies.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-msp',
    path: '/szkolenia-ai-dla-msp',
    navLabel: 'Dla MŚP',
    shortDesc:
      'Przeszkolimy Twoją firmę działami — od sprzedaży po produkcję — i zostawimy wspólne standardy pracy z AI, politykę bezpieczeństwa oraz plan pierwszych automatyzacji. Program dopasowany do rytmu firmy.',
    title:
      'Szkolenia AI dla małych i średnich firm — przeszkol zespół działami | OpenMind AI',
    description:
      'Szkolenia AI dla MŚP: sprzedaż, biuro, marketing, produkcja. Wspólne standardy, polityka AI i pilotażowe automatyzacje po szkoleniu. Stacjonarnie w całej Polsce i online.',
    h1: 'Szkolenia AI dla małych i średnich firm — cały zespół na wyższym biegu',
    audienceLd:
      'Właściciele i kadra zarządzająca małych i średnich firm, kierownicy działów',
    whyH2: 'Dlaczego program dla całej firmy',
    whyLead:
      'Przeszkolimy Twoją firmę działami — od sprzedaży po produkcję — i zostawimy wspólne standardy pracy z AI, politykę bezpieczeństwa oraz plan pierwszych automatyzacji. Program dopasowany do rytmu firmy.',
    whyBullets: [
      'Największy zwrot z AI jest w firmach 10–250 osób — procesy już są, biurokracji jeszcze nie ma.',
      'Nierówna adopcja między działami tworzy chaos.',
      'Pracownicy i tak używają AI — lepiej ustalić zasady, zanim wyciekną dane.',
    ],
    modules: [
      {
        name: 'Kickoff dla całej firmy',
        desc: 'Webinar: co AI zmienia w Waszej branży, cele, zasady bezpieczeństwa.',
      },
      {
        name: 'Sprzedaż i obsługa klienta',
        desc: 'Oferty, follow-upy, notatki ze spotkań, CRM.',
      },
      {
        name: 'Biuro i administracja',
        desc: 'Dokumenty, raporty, korespondencja, faktury.',
      },
      {
        name: 'Marketing',
        desc: 'Content, grafiki, kampanie w standardzie marki.',
      },
      {
        name: 'Standardy i polityka AI',
        desc: 'Biblioteka promptów, zasady danych, RODO, koszty licencji per stanowisko.',
      },
      {
        name: 'Pilotaż automatyzacji',
        desc: '1–2 procesy o najszybszym zwrocie budowane z zespołem; plan na kwartał.',
      },
    ],
    faq: [
      {
        q: 'Jak szkolić, żeby firma nie stanęła?',
        a: 'Działami, w blokach 3–4 h, program na 2–6 tygodni.',
      },
      {
        q: 'Jeden program dla wszystkich?',
        a: 'Nie, moduły są działowe: sprzedaż ćwiczy na ofertach, biuro na dokumentach.',
      },
      {
        q: 'Co zostaje po szkoleniu?',
        a: 'Biblioteka promptów, polityka AI, certyfikaty, nagrania, 1–2 automatyzacje pilotażowe, plan rozwoju.',
      },
      {
        q: 'Koszt licencji?',
        a: 'Warianty od darmowych po enterprise, liczymy per stanowisko.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-korporacji',
    path: '/szkolenia-ai-dla-korporacji',
    navLabel: 'Dla korporacji',
    shortDesc:
      'Projektujemy programy rozwojowe AI dla dużych organizacji: kaskadowe szkolenia (inspiracja dla wszystkich, warsztaty dla zespołów), ścieżki per dział, governance i polityki użycia oraz mierzenie adopcji po wdrożeniu.',
    title:
      'Szkolenia AI dla dużych firm i korporacji — programy rozwojowe, governance | OpenMind AI',
    description:
      'Programy szkoleniowe AI dla korporacji: kaskada webinar + warsztaty, ścieżki per dział, polityki AI, zgodność RODO/AI Act, mierzenie adopcji. Realizacja w całej Polsce.',
    h1: 'Szkolenia AI dla korporacji — od inspiracji po zmierzoną adopcję',
    audienceLd:
      'Duże firmy i korporacje: zarządy, HR, L&D, IT, dyrektorzy działów, pracownicy',
    whyH2: 'Dlaczego korporacja potrzebuje programu, nie pojedynczego szkolenia',
    whyLead:
      'Projektujemy programy rozwojowe AI dla dużych organizacji: kaskadowe szkolenia (inspiracja dla wszystkich, warsztaty dla zespołów), ścieżki per dział, governance i polityki użycia oraz mierzenie adopcji po wdrożeniu.',
    whyBullets: [
      'Pojedynczy warsztat nie zmienia praktyki dużej organizacji — potrzebna kaskada i utrwalenie.',
      'Shadow AI (prywatne konta pracowników) to realne ryzyko wycieku.',
      'RODO i AI Act wymagają ładu korporacyjnego.',
    ],
    modules: [
      {
        name: 'Executive briefing',
        desc: 'Zarząd: strategia, ryzyka, decyzje licencyjne, architektura wdrożenia.',
      },
      {
        name: 'Webinar inspiracyjny dla wszystkich pracowników',
        desc: 'Do kilkuset osób — spójny start, terminologia, zasady bezpieczeństwa.',
      },
      {
        name: 'Warsztaty działowe',
        desc: 'Sprzedaż, finanse, HR, IT, operacje, marketing — na realnych procesach.',
      },
      {
        name: 'Governance i zgodność',
        desc: 'Polityka użycia AI, klasyfikacja danych, RODO i AI Act, integracja z narzędziami enterprise (Copilot, ChatGPT Enterprise, Claude), rola IT.',
      },
      {
        name: 'Champions program',
        desc: 'Wewnętrzni liderzy AI utrzymujący adopcję; materiały train-the-trainer.',
      },
      {
        name: 'Pomiar i utrwalenie',
        desc: 'Ankiety adopcji, metryki, follow-up po 30/90 dniach, raport dla zarządu.',
      },
    ],
    faq: [
      {
        q: 'Ilu pracowników?',
        a: 'Od 50 do kilku tysięcy: webinary skalują inspirację, warsztaty 8–15 osób budują umiejętności.',
      },
      {
        q: 'Współpraca z IT i compliance?',
        a: 'Tak, od pierwszego dnia — governance to moduł programu.',
      },
      {
        q: 'Mamy Copilota — szkolicie z niego?',
        a: 'Tak, prowadzimy ścieżki na licencjonowanych narzędziach.',
      },
      {
        q: 'Jak mierzycie efekt?',
        a: 'Ankiety przed/po, metryki adopcji per dział, raport po 30 i 90 dniach.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-marketingu',
    path: '/szkolenia-ai-dla-marketingu',
    navLabel: 'Dla marketingu i agencji',
    shortDesc:
      'Uczymy zespoły marketingu i agencje pełnego warsztatu generatywnej AI: teksty, grafiki, wideo i kampanie — szybciej i taniej, bez utraty jakości i spójności marki. Pracujemy na Waszych realnych briefach.',
    title:
      'Szkolenia AI dla marketingu i agencji — content, grafika, wideo, kampanie | OpenMind AI',
    description:
      'Szkolenia AI dla działów marketingu i agencji: content, grafika generatywna, wideo AI, kampanie i automatyzacja publikacji. Warsztaty na realnych briefach. Cała Polska i online.',
    h1: 'Szkolenia AI dla marketingu — produkcja contentu na sterydach, spójność marki pod kontrolą',
    audienceLd: 'Zespoły marketingu wewnętrznego, agencje reklamowe, freelancerzy marketingowi',
    whyH2: 'Dlaczego AI w marketingu — koszt contentu spada, tempo iteracji rośnie',
    whyLead:
      'Produkcja contentu to największy koszt marketingu — AI tnie go wielokrotnie. Klienci oczekują więcej wariantów i szybszych iteracji, a przewagę buduje warsztat zespołu, nie sam dostęp do narzędzi. Dlatego pracujemy z Wami na realnych briefach, aż standardy wejdą w codzienną pracę.',
    whyBullets: [
      'Wielokrotnie niższy koszt jednostkowy contentu',
      'Więcej wariantów kreacji przy tym samym budżecie',
      'Szybsze iteracje kampanii i testy A/B',
      'Spójność marki dzięki brand voice i style guide dla modeli',
      'Przewaga warsztatowa zespołu, nie zależność od jednego narzędzia',
    ],
    modules: [
      { name: 'Strategia i research', desc: 'Analiza konkurencji, persony, brief kreatywny, plan kampanii; walidacja pomysłów przed produkcją.' },
      { name: 'Copywriting z AI', desc: 'Posty, artykuły, newslettery, scenariusze w tonie marki (brand voice prompt); redakcja i fact-checking.' },
      { name: 'Grafika generatywna', desc: 'Midjourney, Canva AI, Adobe: koncepty, key visuale, adaptacje formatów; spójność serii.' },
      { name: 'Wideo AI', desc: 'Rolki, animacje, spoty: Runway/Kling, lektor ElevenLabs, montaż; seria short-form na tydzień w jedno popołudnie.' },
      { name: 'Automatyzacja publikacji', desc: 'Kalendarz, warianty per kanał, planowanie i raportowanie.' },
      { name: 'Warsztat na Waszym briefie', desc: 'Zespół realizuje mini-kampanię od briefu po materiały; standardy pracy po szkoleniu.' },
    ],
    faq: [
      { q: 'Czy content z AI nie będzie generyczny?', a: 'Będzie, jeśli bez warsztatu; uczymy brand voice, iteracji i redakcji — kierunek nadaje zespół.' },
      { q: 'Jakich narzędzi używamy?', a: 'ChatGPT/Claude, Midjourney, Canva AI, Runway/Kling, ElevenLabs, Make — pod Wasz stack.' },
      { q: 'Dla agencji czy in-house?', a: 'Dla obu; agencjom dodajemy moduł wyceniania pracy z AI.' },
      { q: 'A prawa autorskie?', a: 'Omawiamy status prawny treści generatywnych, licencje komercyjne i dobre praktyki.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-ksiegowych',
    path: '/szkolenia-ai-dla-ksiegowych',
    navLabel: 'Dla księgowych i biur rachunkowych',
    shortDesc:
      'Uczymy księgowych i biura rachunkowe pracy z AI: automatyczne przetwarzanie dokumentów, raporty pisane ludzkim językiem, sprawna komunikacja z klientami — z pełnym poszanowaniem poufności danych finansowych.',
    title:
      'Szkolenia AI dla księgowych i biur rachunkowych — dokumenty, raporty, klienci | OpenMind AI',
    description:
      'Szkolenia AI dla księgowych: przetwarzanie dokumentów, raporty i analizy, komunikacja z klientami. Bezpieczeństwo danych finansowych w standardzie. Stacjonarnie i online.',
    h1: 'Szkolenia AI dla księgowych — mniej przepisywania, więcej doradztwa',
    audienceLd: 'Księgowi, właściciele biur rachunkowych, kadry płacowe, doradcy podatkowi',
    whyH2: 'Dlaczego AI w księgowości — analiza zamiast przepisywania',
    whyLead:
      'Ręczne wprowadzanie dokumentów znika z rynku — zostaje analiza i doradztwo. Klienci pytają „co to dla mnie znaczy" i AI pomaga tłumaczyć liczby na wnioski. Sezon rozliczeń nie musi już oznaczać nadgodzin, jeżeli zespół umie mądrze z niej korzystać.',
    whyBullets: [
      'Automatyczny odczyt i klasyfikacja dokumentów',
      'Raporty i komentarze do wyników prostym językiem',
      'Sprawna, powtarzalna komunikacja z klientami',
      'Bezpieczne standardy pracy z danymi finansowymi',
      'Więcej czasu na doradztwo, mniej na operatywę',
    ],
    modules: [
      { name: 'Bezpieczeństwo danych finansowych', desc: 'Co wolno wprowadzać do AI; anonimizacja; narzędzia z umowami powierzenia; polityka biura.' },
      { name: 'Przetwarzanie dokumentów', desc: 'Odczyt i klasyfikacja faktur, wyciągów, umów; kontrola jakości; łączenie z systemami FK.' },
      { name: 'Raporty i analizy', desc: 'Komentarze do wyników prostym językiem, analizy odchyleń, prezentacje dla klientów.' },
      { name: 'Komunikacja z klientami', desc: 'Odpowiedzi na powtarzalne pytania, przypomnienia o dokumentach, tłumaczenie zmian przepisów (z weryfikacją!).' },
      { name: 'Praca z przepisami', desc: 'Streszczanie interpretacji i zmian, notatki wewnętrzne — z żelazną zasadą weryfikacji u źródła.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Automatyzacja jednego procesu biura (np. obieg dokumentów od klienta); plan na sezon.' },
    ],
    faq: [
      { q: 'Czy dane klientów są bezpieczne?', a: 'Pracujemy na danych testowych; publiczne narzędzia tylko bez danych, reszta enterprise lub lokalnie.' },
      { q: 'Czy AI zna polskie przepisy?', a: 'Modele bywają nieaktualne — uczymy pracy z własnymi źródłami i bezwzględnej weryfikacji.' },
      { q: 'Czy AI zastąpi księgowych?', a: 'Zastąpi przepisywanie; analiza, odpowiedzialność i relacja zostają.' },
      { q: 'W jakich formatach prowadzicie szkolenia?', a: 'Stacjonarnie w biurze, online, 1:1; najlepiej przed sezonem.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-hr',
    path: '/szkolenia-ai-dla-hr',
    navLabel: 'Dla HR i rekrutacji',
    shortDesc:
      'Uczymy zespoły HR wykorzystywać AI w rekrutacji, onboardingu i komunikacji wewnętrznej — z naciskiem na równe traktowanie kandydatów, ochronę danych osobowych i wymogi AI Act wobec narzędzi rekrutacyjnych.',
    title:
      'Szkolenia AI dla HR i rekrutacji — ogłoszenia, selekcja, onboarding | OpenMind AI',
    description:
      'Szkolenia AI dla działów HR: ogłoszenia i opisy stanowisk, wsparcie selekcji zgodne z zasadami równego traktowania, onboarding, komunikacja wewnętrzna i rozwój pracowników.',
    h1: 'Szkolenia AI dla HR — szybsza rekrutacja, lepsza komunikacja, zero dyskryminacji',
    audienceLd: 'Zespoły HR, HR Business Partnerzy, rekruterzy, kadra L&D, komunikacja wewnętrzna',
    whyH2: 'Dlaczego AI w HR — tempo, jakość i zgodność z AI Act',
    whyLead:
      'Dobre ogłoszenie i szybki feedback decydują o kandydatach — AI skraca czas reakcji z dni do godzin. Komunikacja wewnętrzna to setki powtarzalnych tekstów, a AI Act klasyfikuje AI w rekrutacji jako wysokiego ryzyka. HR musi więc znać zasady, zanim narzędzia trafią do procesu.',
    whyBullets: [
      'Szybsze i lepsze ogłoszenia oraz opisy stanowisk',
      'Wsparcie selekcji zgodne z zasadą równego traktowania',
      'Onboarding automatyczny — checklisty, materiały, FAQ',
      'Komunikacja wewnętrzna i tłumaczenie strategii',
      'Zgodność z RODO i AI Act w procesach kadrowych',
    ],
    modules: [
      { name: 'Zasady gry: dane, równość, AI Act', desc: 'RODO w HR, ryzyko dyskryminacji algorytmicznej, czego nie automatyzować w selekcji; rola człowieka w decyzjach.' },
      { name: 'Ogłoszenia i employer branding', desc: 'Opisy stanowisk, ogłoszenia w tonie firmy, inkluzywny język.' },
      { name: 'Wsparcie selekcji', desc: 'Pytania, scenariusze rozmów, zadania; porządkowanie notatek; AI jako asystent rekrutera, nie decydent.' },
      { name: 'Onboarding', desc: 'Plany wdrożenia, materiały powitalne, FAQ nowego pracownika, checklisty.' },
      { name: 'Komunikacja wewnętrzna i dokumenty', desc: 'Ogłoszenia, newslettery, polityki prostym językiem; ankiety i analiza feedbacku.' },
      { name: 'Rozwój i szkolenia', desc: 'Ścieżki rozwojowe, materiały szkoleniowe, quizy — HR buduje programy z AI samodzielnie.' },
    ],
    faq: [
      { q: 'Czy AI może odrzucać CV?', a: 'Odradzamy automatycznych decyzji: AI Act traktuje selekcję jako wysokie ryzyko; model „AI asystuje, człowiek decyduje".' },
      { q: 'A dane kandydatów?', a: 'Anonimizacja, umowy powierzenia, minimalizacja danych — moduł nr 1.' },
      { q: 'Czy obejmuje nasz ATS?', a: 'Tak, pokazujemy bezpieczne łączenie z AI.' },
      { q: 'W jakich formatach?', a: 'Warsztat dla działu HR, 1:1 dla managerów, moduł dla zarządu.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-urzedow',
    path: '/szkolenia-ai-dla-urzedow',
    navLabel: 'Dla urzędów i administracji',
    shortDesc:
      'Uczymy urzędy i instytucje publiczne bezpiecznego wykorzystania AI: szybsze przygotowanie pism i projektów dokumentów, obsługa obywateli, komunikacja prostym językiem i dostępność — z pełnym poszanowaniem bezpieczeństwa informacji.',
    title:
      'Szkolenia AI dla urzędów i administracji publicznej — pisma, obsługa, dostępność | OpenMind AI',
    description:
      'Szkolenia AI dla administracji publicznej: pisma i projekty decyzji, obsługa obywateli, prosty język, dostępność cyfrowa. Bezpieczeństwo informacji i RODO w standardzie.',
    h1: 'Szkolenia AI dla urzędów — sprawniejsza administracja, prostszy język, zadowoleni obywatele',
    audienceLd: 'Urzędy administracji publicznej, samorządy, jednostki podległe, kadra kierownicza',
    whyH2: 'Dlaczego AI w administracji — mniej papieru, więcej obywatela',
    whyLead:
      'Urzędy toną w powtarzalnej korespondencji — AI skraca przygotowanie odpowiedzi. Obowiązek prostego języka i dostępności (WCAG) łatwiej spełnić z AI. Obywatele oczekują standardu obsługi znanego z usług komercyjnych, a administracja może dziś ten standard realnie dowieźć.',
    whyBullets: [
      'Projekty pism i decyzji szybciej i w prostszym języku',
      'Odpowiedzi na typowe zapytania obywateli',
      'Standard prostego języka i dostępność cyfrowa (WCAG)',
      'Bezpieczeństwo informacji — narzędzia dopuszczalne w JST',
      'Standaryzacja pracy między referatami i wydziałami',
    ],
    modules: [
      { name: 'Bezpieczeństwo informacji w urzędzie', desc: 'Klasyfikacja informacji, RODO, czego nie wprowadzać do narzędzi publicznych; zasady jednostki.' },
      { name: 'Pisma i projekty dokumentów', desc: 'Szkice odpowiedzi, projekty decyzji (do weryfikacji merytorycznej), uzasadnienia, protokoły.' },
      { name: 'Prosty język', desc: 'Przekształcanie pism urzędowych na język zrozumiały dla obywatela.' },
      { name: 'Obsługa obywateli', desc: 'FAQ, odpowiedzi na powtarzalne zapytania, wielojęzyczność, treści na stronę i BIP.' },
      { name: 'Dostępność cyfrowa', desc: 'Teksty alternatywne, struktura dokumentów, WCAG.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Biblioteka promptów jednostki, propozycja zasad użycia AI, plan pilotażu w jednym wydziale.' },
    ],
    faq: [
      { q: 'Czy urząd może legalnie używać ChatGPT?', a: 'Tak, przy właściwych zasadach: bez danych osobowych i informacji chronionych w narzędziach publicznych; pomagamy opracować zasady.' },
      { q: 'Czy AI może wydawać decyzje?', a: 'Nie — AI przygotowuje projekty, decyzje podejmuje i podpisuje urzędnik.' },
      { q: 'Szkolicie całe jednostki?', a: 'Tak: od wydziałów po programy dla całych urzędów, także online.' },
      { q: 'Macie doświadczenie z sektorem publicznym?', a: 'Prowadzimy zajęcia dla placówek oświatowych i instytucji; znamy wymogi formalne.' },
    ],
  },
];

/* ── Proto builder ── */

function breadcrumbsLd(name: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Szkolenia AI', item: `${SITE}/szkolenia-ai.html` },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  };
}

function courseLd(s: IndustrySpec, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: s.h1,
    description: s.description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'OpenMind AI Consulting',
      url: SITE,
    },
    audience: { '@type': 'Audience', audienceType: s.audienceLd },
    inLanguage: 'pl-PL',
    hasCourseInstance: [
      { '@type': 'CourseInstance', courseMode: 'onsite', name: 'Szkolenie stacjonarne' },
      { '@type': 'CourseInstance', courseMode: 'online', name: 'Szkolenie online na żywo' },
    ],
  };
}

function faqLd(s: IndustrySpec) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function buildProto(s: IndustrySpec): Proto {
  const url = `${SITE}${s.path}.html`;

  return {
    title: s.title,
    description: s.description,
    h1: s.h1,
    sections: [
      // 1) Dlaczego AI w [branzy]
      {
        h2: s.whyH2,
        p: [s.whyLead],
        li: s.whyBullets,
        subs: [],
      },
      // 2) Program szkolenia — 6 modułów jako subs
      {
        h2: 'Program szkolenia — 6 modułów',
        p: [
          'Program dopasowujemy do zespołu, poziomu zaawansowania i konkretnych zadań, z którymi mierzycie się na co dzień. Poniżej rdzeń programu — realizujemy go w całości lub w wybranym zakresie.',
        ],
        li: [],
        subs: s.modules.map((m) => ({
          h3: m.name,
          p: [m.desc],
          li: [],
        })),
      },
      // 3) Formaty — 3 karty (specjalna sekcja, template renderuje jako linki)
      {
        h2: 'Formaty szkolenia',
        p: ['Każdy program prowadzimy w trzech formatach — wybierz dopasowany do zespołu i tempa pracy.'],
        li: [],
        subs: [
          {
            h3: 'Stacjonarnie — u Ciebie lub w naszej siedzibie',
            p: ['Zamknięte warsztaty w Twojej firmie lub w OpenMind AI. Intensywna praca w grupie, bezpośredni kontakt z trenerem, natychmiastowe wdrożenie w zespole.'],
            li: [],
          },
          {
            h3: 'Online — na żywo z trenerem',
            p: ['Warsztaty przez Teams, Zoom lub Meet. Idealne dla zespołów rozproszonych i firm, które chcą przeszkolić pracowników bez kosztów logistyki.'],
            li: [],
          },
          {
            h3: 'Indywidualnie 1:1 — najszybsza droga',
            p: ['Sesje indywidualne z trenerem, w pełni pod Twoje stanowisko i cele. Najlepszy format dla właścicieli firm i kluczowych specjalistów.'],
            li: [],
          },
        ],
      },
    ],
    jsonld: [
      courseLd(s, url),
      faqLd(s),
      breadcrumbsLd(s.h1, url),
    ] as unknown as Record<string, unknown>[],
  };
}

/** Registry entries ready to be spread into the main services map. */
export const INDUSTRY_TRAINING_SPECS = SPECS;

export const INDUSTRY_TRAINING_ENTRIES = SPECS.map((s) => ({
  slug: s.slug,
  path: s.path,
  navLabel: s.navLabel,
  shortDesc: s.shortDesc,
  showCities: false as const,
  data: buildProto(s),
  // Extra data used by the template for FAQ rendering (mirrors JSON-LD FAQPage)
  faq: s.faq,
}));
