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
  {
    slug: 'szkolenia-microsoft-copilot',
    path: '/szkolenia-microsoft-copilot',
    navLabel: 'Microsoft Copilot (M365)',
    shortDesc:
      'Praktyczne szkolenie Microsoft 365 Copilot: Word, Excel, Outlook, Teams, PowerPoint i agenci w Copilot Studio. Dla firm z licencjami M365 — dane pozostają w Waszym tenancie.',
    title:
      'Szkolenie Microsoft Copilot — Word, Excel, Outlook, Teams | OpenMind AI',
    description:
      'Praktyczne szkolenie z pakietu Microsoft 365 Copilot: dokumenty w Word, analiza w Excel, maile w Outlook, spotkania w Teams, agenci w Copilot Studio. Dla firm z licencjami M365.',
    h1: 'Szkolenie Microsoft Copilot — wyciśnij maksimum z licencji, za którą płacisz',
    audienceLd: 'Firmy z licencjami Microsoft 365 Copilot, kadra kierownicza, administratorzy IT, pracownicy biurowi',
    whyH2: 'Dlaczego Microsoft Copilot',
    whyLead:
      'Copilot potrafi znacznie więcej niż podpowiadać tekst — pod warunkiem, że zespół umie z niego korzystać. Uczymy pracy z Copilotem w Word, Excel, Outlook, Teams i PowerPoint oraz budowy prostych agentów w Copilot Studio. Dane firmy zostają w Waszym tenancie M365.',
    whyBullets: [
      'Firmy płacą za licencje Copilot, których pracownicy używają w 10%.',
      'Copilot działa na danych firmowych (maile, dokumenty, spotkania) — to przewaga nad zwykłym chatem, ale wymaga warsztatu.',
      'Dobrze skonfigurowany Copilot to AI zgodna z polityką bezpieczeństwa IT.',
    ],
    modules: [
      { name: 'Start z Copilot w M365 — licencje, dostępy, prywatność', desc: 'Co widzi Copilot, gdzie zostają dane, ustawienia administracyjne.' },
      { name: 'Word i PowerPoint', desc: 'Tworzenie i redakcja dokumentów, streszczenia, prezentacje z dokumentów źródłowych, styl firmowy.' },
      { name: 'Excel z Copilotem', desc: 'Analiza danych, formuły, tabele przestawne, wykresy i wnioski z danych pisane ludzkim językiem.' },
      { name: 'Outlook i Teams', desc: 'Streszczenia wątków, szkice odpowiedzi, podsumowania i notatki ze spotkań, zadania po spotkaniach.' },
      { name: 'Copilot Chat i agenci', desc: 'Praca na plikach firmowych, wyszukiwanie w wiedzy organizacji, proste agenty w Copilot Studio.' },
      { name: 'Wdrożenie i adopcja', desc: 'Zasady użycia, scenariusze per dział, mierzenie wykorzystania licencji, plan rozwoju.' },
    ],
    faq: [
      { q: 'Czy potrzebujemy licencji Copilot?', a: 'Na warsztat tak; dla części ćwiczeń wystarczy plan M365 z Copilot Chat. Pomagamy też zdecydować przed zakupem, czy licencja się opłaci.' },
      { q: 'Czym Copilot różni się od ChatGPT?', a: 'Działa wewnątrz M365 na danych firmy (maile, pliki, spotkania) i nie wysyła ich poza tenant — to inna klasa zastosowań i bezpieczeństwa.' },
      { q: 'Czy dane firmowe są bezpieczne?', a: 'Tak — Copilot respektuje uprawnienia M365; na szkoleniu omawiamy ustawienia administracyjne i dobre praktyki.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie, online lub program kaskadowy dla całej organizacji; także ścieżka dla administratorów IT.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-nieruchomosci',
    path: '/szkolenia-ai-dla-nieruchomosci',
    navLabel: 'Dla nieruchomości',
    shortDesc:
      'Szkolenia AI dla pośredników, biur nieruchomości i deweloperów: opisy ofert, home staging AI, analiza rynku i błyskawiczna obsługa zapytań.',
    title:
      'Szkolenia AI dla biur nieruchomości i deweloperów | OpenMind AI',
    description:
      'Szkolenia AI dla pośredników i deweloperów: opisy ofert, które sprzedają, home staging AI, analiza rynku, obsługa zapytań 24/7. Stacjonarnie i online.',
    h1: 'Szkolenia AI dla nieruchomości — oferty, które sprzedają same',
    audienceLd: 'Pośrednicy nieruchomości, biura nieruchomości, deweloperzy, agenci sprzedaży',
    whyH2: 'Dlaczego AI w nieruchomościach',
    whyLead:
      'Uczymy pośredników, biura i deweloperów pracy z AI: perfekcyjne opisy ofert w minutę, wirtualny home staging, analiza cen i obsługa zapytań o każdej porze. Agent, który odpisuje pierwszy, wygrywa klienta.',
    whyBullets: [
      'Opis oferty decyduje o kliknięciach — AI pisze warianty pod portale i social media.',
      'Wirtualny home staging za grosze zamiast sesji aranżacyjnych.',
      'Szybkość odpowiedzi na zapytania = przewaga w walce o klienta.',
    ],
    modules: [
      { name: 'Opisy ofert i ogłoszenia', desc: 'Struktura, język korzyści, warianty pod portale, social media i eksport.' },
      { name: 'Grafika i home staging AI', desc: 'Poprawa zdjęć, wirtualne aranżacje pustych wnętrz, wizualizacje.' },
      { name: 'Analiza rynku i wyceny', desc: 'Porównania ofert, trendy cenowe, raporty dla klientów.' },
      { name: 'Obsługa zapytań', desc: 'Szybkie odpowiedzi, kwalifikacja leadów, przypomnienia i follow-upy.' },
      { name: 'Dokumenty i umowy', desc: 'Szkice pism, checklisty transakcyjne, notatki ze spotkań.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Zestaw narzędzi biura, automatyzacja publikacji ofert.' },
    ],
    faq: [
      { q: 'Czy AI może pisać oferty za cały zespół?', a: 'Tak, z zachowaniem stylu biura — budujemy wspólne szablony i prompty.' },
      { q: 'Home staging AI — czy to legalne w ogłoszeniach?', a: 'Uczymy dobrych praktyk: wizualizacje oznaczamy, stan faktyczny dokumentują zdjęcia.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie w biurze, online, 1:1 dla właścicieli.' },
      { q: 'Czy dotyczy też deweloperów?', a: 'Tak: opisy inwestycji, materiały sprzedażowe, obsługa zapytań z kampanii.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-ecommerce',
    path: '/szkolenia-ai-dla-ecommerce',
    navLabel: 'Dla e-commerce',
    shortDesc:
      'Szkolenia AI dla e-commerce i sklepów internetowych: opisy produktów na skalę, obsługa klienta 24/7, personalizacja, grafiki produktowe i marketplace.',
    title:
      'Szkolenia AI dla e-commerce i sklepów internetowych | OpenMind AI',
    description:
      'Szkolenia AI dla e-commerce: opisy produktów na skalę, obsługa klienta, personalizacja, grafiki produktowe i automatyzacja marketplace. Stacjonarnie i online.',
    h1: 'Szkolenia AI dla e-commerce — setki opisów, obsługa 24/7, wyższa konwersja',
    audienceLd: 'Właściciele sklepów internetowych, managerowie e-commerce, zespoły marketingu i obsługi',
    whyH2: 'Dlaczego AI w e-commerce',
    whyLead:
      'Uczymy zespoły e-commerce wykorzystywać AI na całej długości lejka: opisy i zdjęcia produktów, obsługa klienta, personalizacja komunikacji i automatyzacja pracy na marketplace’ach.',
    whyBullets: [
      'Opisy setek produktów to tygodnie pracy — AI robi to w godziny, z SEO.',
      'Większość zapytań klientów jest powtarzalna — chatbot odpowiada natychmiast.',
      'Personalizacja komunikacji podnosi konwersje bez zwiększania budżetu na reklamę.',
    ],
    modules: [
      { name: 'Opisy produktów na skalę', desc: 'Szablony, warianty pod SEO i marketplace, tłumaczenia na rynki zagraniczne.' },
      { name: 'Grafika produktowa AI', desc: 'Tła, packshoty, warianty lifestyle, bannery kampanii.' },
      { name: 'Obsługa klienta', desc: 'Chatbot znający ofertę, statusy zamówień, zwroty; przekazywanie trudnych spraw ludziom.' },
      { name: 'Marketing i personalizacja', desc: 'Newslettery, segmentacja, opisy kategorii, kampanie produktowe.' },
      { name: 'Analiza danych sklepu', desc: 'Trendy sprzedaży, analiza opinii, raporty pisane ludzkim językiem.' },
      { name: 'Automatyzacje', desc: 'Synchronizacja ofert, alerty cenowe, obieg zamówień i dokumentów.' },
    ],
    faq: [
      { q: 'Mamy 5000 produktów — da się to ogarnąć AI?', a: 'Tak, to typowy przypadek: szablony + dane produktowe + automatyzacja dają opisy całego katalogu.' },
      { q: 'Czy chatbot nie zepsuje nam opinii?', a: 'Dobrze wdrożony bot odpowiada tylko na to, co wie, i oddaje rozmowę człowiekowi — uczymy takiej konfiguracji.' },
      { q: 'A integracje?', a: 'Pokazujemy podejścia dla popularnych platform (Shoper, WooCommerce, PrestaShop, Allegro).' },
      { q: 'W jakich formatach?', a: 'Online najczęściej, stacjonarnie lub 1:1 dla właścicieli.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-gastronomii-hotelarstwa',
    path: '/szkolenia-ai-dla-gastronomii-hotelarstwa',
    navLabel: 'Dla gastronomii i hotelarstwa',
    shortDesc:
      'Szkolenia AI dla restauracji, hoteli i pensjonatów: wielojęzyczna obsługa gości, odpowiedzi na opinie, social media, rezerwacje i menu.',
    title:
      'Szkolenia AI dla gastronomii i hotelarstwa (HoReCa) | OpenMind AI',
    description:
      'Szkolenia AI dla restauracji i hoteli: wielojęzyczna obsługa gości, odpowiedzi na opinie, social media, rezerwacje i menu. Stacjonarnie w całej Polsce i online.',
    h1: 'Szkolenia AI dla HoReCa — gościnność wspierana technologią',
    audienceLd: 'Restauracje, hotele, pensjonaty, obiekty HoReCa, właściciele i managerowie',
    whyH2: 'Dlaczego AI w HoReCa',
    whyLead:
      'Uczymy restauracje, hotele i pensjonaty pracy z AI: wielojęzyczna komunikacja z gościem, błyskawiczne odpowiedzi na opinie, social media, które same się prowadzą, i sprawna obsługa rezerwacji.',
    whyBullets: [
      'Odpowiedzi na opinie (Google, Booking, TripAdvisor) budują pozycję obiektu — AI pisze je w minutę, w każdym języku.',
      'Goście pytają o to samo — AI odpowiada natychmiast, także nocą.',
      'Sezonowość wymaga elastycznego marketingu bez etatu marketera.',
    ],
    modules: [
      { name: 'Opinie i reputacja', desc: 'Profesjonalne odpowiedzi na każdą opinię, monitoring, wnioski z feedbacku gości.' },
      { name: 'Wielojęzyczna obsługa gości', desc: 'Odpowiedzi na zapytania, informacje przed przyjazdem, komunikaty.' },
      { name: 'Social media i promocja', desc: 'Posty, zdjęcia dań i wnętrz z AI, oferty sezonowe, współpraca z portalami.' },
      { name: 'Menu i oferta', desc: 'Opisy dań, karty sezonowe, tłumaczenia menu, oferty grup i eventów.' },
      { name: 'Rezerwacje i organizacja', desc: 'Potwierdzenia, przypomnienia, grafiki zespołu, checklisty.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Zestaw narzędzi obiektu, automatyzacja powtarzalnej komunikacji.' },
    ],
    faq: [
      { q: 'Nie mamy czasu na szkolenia w sezonie — kiedy najlepiej?', a: 'Poza sezonem lub w krótkich blokach online 2h; program dopasowujemy do rytmu obiektu.' },
      { q: 'Czy AI odpisze na każdą opinię?', a: 'Przygotowuje szkic w tonie obiektu — publikujecie po akceptacji; przy dużej skali automatyzujemy z regułami.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie w obiekcie, online, 1:1 dla właścicieli.' },
      { q: 'Czy to działa dla małej restauracji?', a: 'Tak — właśnie dla małych zespołów AI daje największy efekt.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-budownictwa',
    path: '/szkolenia-ai-dla-budownictwa',
    navLabel: 'Dla budownictwa i architektury',
    shortDesc:
      'Szkolenia AI dla firm budowlanych i pracowni architektonicznych: kosztorysy, dokumentacja przetargowa, wizualizacje koncepcyjne, korespondencja z inwestorami.',
    title:
      'Szkolenia AI dla budownictwa i architektury | OpenMind AI',
    description:
      'Szkolenia AI dla firm budowlanych i pracowni architektonicznych: kosztorysy, dokumentacja przetargowa, wizualizacje koncepcyjne, korespondencja z inwestorami.',
    h1: 'Szkolenia AI dla budownictwa — mniej papierów, więcej budowania',
    audienceLd: 'Firmy budowlane, generalni wykonawcy, pracownie architektoniczne, inżynierowie, kierownicy budów',
    whyH2: 'Dlaczego AI w budownictwie',
    whyLead:
      'Uczymy firmy budowlane, pracownie projektowe i inżynierów pracy z AI: szybsze kosztorysy i oferty przetargowe, dokumentacja budowy, wizualizacje koncepcyjne i sprawna komunikacja z inwestorami.',
    whyBullets: [
      'Przetargi wymagają ton dokumentów — AI przyspiesza ich przygotowanie i analizę SIWZ/SWZ.',
      'Dziennik budowy, protokoły i korespondencja zjadają godziny kierowników.',
      'Wizualizacje koncepcyjne z AI pozwalają pokazać pomysł inwestorowi w godzinę.',
    ],
    modules: [
      { name: 'Dokumentacja przetargowa', desc: 'Analiza SWZ, przygotowanie ofert, pytania do zamawiającego, harmonogramy.' },
      { name: 'Kosztorysy i wyceny', desc: 'Struktura kosztorysów, warianty ofert, analiza cen materiałów.' },
      { name: 'Dokumentacja budowy', desc: 'Protokoły, notatki, raporty postępu, korespondencja z inspektorami.' },
      { name: 'Wizualizacje koncepcyjne AI', desc: 'Moodboardy, warianty elewacji i wnętrz, materiały dla inwestora (z oznaczeniem, że to koncepcja).' },
      { name: 'BHP i procedury', desc: 'Instrukcje, szkolenia stanowiskowe, checklisty kontroli.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Narzędzia pod firmę, automatyzacja obiegu dokumentów budowy.' },
    ],
    faq: [
      { q: 'Czy AI zna polskie prawo budowlane?', a: 'Modele bywają nieaktualne — uczymy pracy z własnymi źródłami i weryfikacji; AI przyspiesza pisanie, nie zastępuje uprawnień.' },
      { q: 'Wizualizacje AI zamiast projektu?', a: 'Nie — to materiał koncepcyjny do rozmów z inwestorem; projekt robi projektant.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie w firmie lub na budowie, online dla biur projektowych.' },
      { q: 'Dla jak dużych firm?', a: 'Od jednoosobowych wykonawców po generalnych wykonawców.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-logistyki',
    path: '/szkolenia-ai-dla-logistyki',
    navLabel: 'Dla transportu i logistyki (TSL)',
    shortDesc:
      'Szkolenia AI dla branży TSL: dokumenty przewozowe, korespondencja międzynarodowa, komunikacja z kierowcami i klientami, analiza stawek.',
    title:
      'Szkolenia AI dla transportu, spedycji i logistyki (TSL) | OpenMind AI',
    description:
      'Szkolenia AI dla branży TSL: dokumenty przewozowe, korespondencja międzynarodowa, optymalizacja komunikacji z kierowcami i klientami, analiza stawek.',
    h1: 'Szkolenia AI dla TSL — szybsza spedycja, mniej papierologii',
    audienceLd: 'Firmy transportowe, spedycje, operatorzy logistyczni, spedytorzy, managerowie TSL',
    whyH2: 'Dlaczego AI w TSL',
    whyLead:
      'Uczymy firmy transportowe, spedycje i operatorów logistycznych pracy z AI: błyskawiczna korespondencja w każdym języku, obieg dokumentów przewozowych, analiza stawek i sprawna komunikacja z kierowcami i klientami.',
    whyBullets: [
      'Spedytor żyje w skrzynce mailowej i komunikatorach — AI pisze i tłumaczy w sekundy.',
      'Dokumenty przewozowe (CMR, faktury, zlecenia) to idealny materiał do automatycznego przetwarzania.',
      'Szybka wycena zapytania często decyduje o zleceniu.',
    ],
    modules: [
      { name: 'Korespondencja międzynarodowa', desc: 'Maile i komunikaty w każdym języku, negocjacje stawek, reklamacje.' },
      { name: 'Dokumenty przewozowe', desc: 'Odczyt i klasyfikacja CMR, zleceń, faktur; kontrola kompletności.' },
      { name: 'Wyceny i analiza stawek', desc: 'Szybkie odpowiedzi na zapytania, analiza rentowności tras.' },
      { name: 'Komunikacja z kierowcami', desc: 'Instrukcje, awizacje, statusy — jasno i wielojęzycznie.' },
      { name: 'Raporty i KPI', desc: 'Punktualność, reklamacje, rentowność — raporty pisane ludzkim językiem.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Automatyzacja jednego procesu (np. obieg zleceń), plan rozwoju.' },
    ],
    faq: [
      { q: 'Czy AI zintegrować z naszym TMS?', a: 'Pokazujemy podejścia przez API i automatyzacje; na warsztacie pracujemy na Waszych realnych dokumentach.' },
      { q: 'Wielojęzyczność naprawdę działa?', a: 'Tak — to najmocniejsza strona AI: korespondencja PL/EN/DE/UA i inne w sekundach.' },
      { q: 'W jakich formatach?', a: 'Online (spedycja pracuje w różnych lokalizacjach) lub stacjonarnie w centrali.' },
      { q: 'Od czego zacząć?', a: 'Od korespondencji i dokumentów — najszybszy zwrot.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-produkcji',
    path: '/szkolenia-ai-dla-produkcji',
    navLabel: 'Dla produkcji i przemysłu',
    shortDesc:
      'Szkolenia AI dla firm produkcyjnych: dokumentacja techniczna, instrukcje stanowiskowe, BHP, raporty zmianowe, analiza awarii i przestojów. Stacjonarnie w zakładzie i online.',
    title: 'Szkolenia AI dla produkcji i przemysłu | OpenMind AI',
    description:
      'Szkolenia AI dla firm produkcyjnych: dokumentacja techniczna, instrukcje stanowiskowe, BHP, raporty zmianowe, analiza awarii i przestojów. Stacjonarnie w zakładzie i online.',
    h1: 'Szkolenia AI dla produkcji — dokumentacja i raporty bez zatrzymywania linii',
    audienceLd: 'Firmy produkcyjne, kierownicy produkcji, technolodzy, utrzymanie ruchu, jakość, BHP',
    whyH2: 'Dlaczego AI w produkcji',
    whyLead:
      'Uczymy firmy produkcyjne pracy z AI tam, gdzie papier spotyka halę: dokumentacja techniczna, instrukcje stanowiskowe, raporty zmianowe, BHP i analiza przestojów — jasno, szybko i wielojęzycznie dla załóg międzynarodowych.',
    whyBullets: [
      'Dokumentacja techniczna i instrukcje to setki stron do pisania i aktualizacji.',
      'Raporty zmianowe i analiza awarii zawierają wiedzę, której nikt nie ma czasu czytać — AI wyciąga wnioski.',
      'Załogi wielojęzyczne (PL/UA/EN) potrzebują instrukcji w swoich językach.',
    ],
    modules: [
      { name: 'Dokumentacja techniczna', desc: 'Instrukcje, procedury, karty technologiczne: tworzenie, aktualizacja, upraszczanie języka.' },
      { name: 'Instrukcje stanowiskowe i BHP', desc: 'Wersje wielojęzyczne, checklisty, materiały szkoleniowe dla operatorów.' },
      { name: 'Raporty zmianowe i produkcyjne', desc: 'Standaryzacja, streszczenia dla kierownictwa, trendy z danych.' },
      { name: 'Analiza awarii i przestojów', desc: 'Wnioski z historii, 5-why wspierane AI, baza wiedzy utrzymania ruchu.' },
      { name: 'Komunikacja i administracja', desc: 'Korespondencja z dostawcami, dokumenty jakościowe, audyty.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Automatyzacja jednego obiegu dokumentów, plan dla zakładu.' },
    ],
    faq: [
      { q: 'Czy dane produkcyjne są bezpieczne?', a: 'Uczymy zasad: dane wrażliwe tylko w narzędziach z umowami powierzenia lub lokalnie; część zastosowań działa bez danych wrażliwych.' },
      { q: 'Czy to wymaga integracji z MES/ERP?', a: 'Nie na starcie — najszybszy zwrot dają dokumenty i raporty; integracje pokazujemy jako kolejny krok.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie w zakładzie (także przy linii), online dla biura.' },
      { q: 'Dla kogo w firmie?', a: 'Kierownicy produkcji, technolodzy, utrzymanie ruchu, jakość, BHP.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-beauty-wellness',
    path: '/szkolenia-ai-dla-beauty-wellness',
    navLabel: 'Dla beauty i wellness',
    shortDesc:
      'Szkolenia AI dla salonów beauty, gabinetów kosmetycznych, siłowni i trenerów: social media, rezerwacje, komunikacja z klientkami, pakiety i promocje.',
    title: 'Szkolenia AI dla branży beauty i wellness | OpenMind AI',
    description:
      'Szkolenia AI dla salonów beauty, gabinetów kosmetycznych, siłowni i trenerów: social media, rezerwacje, komunikacja z klientkami, pakiety i promocje.',
    h1: 'Szkolenia AI dla beauty i wellness — pełny grafik bez agencji marketingowej',
    audienceLd: 'Salony beauty, gabinety kosmetyczne, siłownie, trenerzy personalni, właściciele i managerowie',
    whyH2: 'Dlaczego AI w beauty i wellness',
    whyLead:
      'Uczymy salony, gabinety, siłownie i trenerów prowadzić marketing i komunikację z AI: social media, które wyglądają profesjonalnie, szybkie odpowiedzi na zapytania, przypomnienia o wizytach i oferty, które wracają klientki.',
    whyBullets: [
      'W beauty decyduje Instagram — AI tworzy treści na poziomie agencji za ułamek ceny.',
      'Nieodebrane zapytanie wieczorem to stracona wizyta — AI odpowiada od razu.',
      'Stali klienci wracają dzięki regularnej, osobistej komunikacji.',
    ],
    modules: [
      { name: 'Social media salonu', desc: 'Posty, rolki, harmonogram, spójna estetyka; zdjęcia przed/po z poszanowaniem prywatności.' },
      { name: 'Zapytania i rezerwacje', desc: 'Szybkie odpowiedzi, cenniki, przypomnienia, listy oczekujących.' },
      { name: 'Oferty i pakiety', desc: 'Sezonowe promocje, pakiety zabiegów, vouchery, teksty sprzedażowe.' },
      { name: 'Komunikacja z klientkami', desc: 'Zalecenia po zabiegach, plany pielęgnacyjne/treningowe (informacyjne, nie medyczne), newslettery.' },
      { name: 'Opinie i polecenia', desc: 'Odpowiedzi na opinie, prośby o recenzje, program poleceń.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Zestaw narzędzi salonu, automatyzacja przypomnień.' },
    ],
    faq: [
      { q: 'Nie jestem „techniczna" — dam radę?', a: 'Tak, program jest dla praktyków, nie informatyków; większość uczestniczek zaczyna od zera.' },
      { q: 'Czy AI może układać plany zabiegowe?', a: 'Tworzy materiały informacyjne i komunikację; decyzje zabiegowe i medyczne zawsze po stronie specjalisty.' },
      { q: 'W jakich formatach?', a: '1:1 w salonie lub online, małe grupy dla ekip.' },
      { q: 'Ile czasu tygodniowo zajmie marketing z AI?', a: 'Zwykle 1–2 godziny na tydzień treści.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-rolnictwa',
    path: '/szkolenia-ai-dla-rolnictwa',
    navLabel: 'Dla rolnictwa i agrobiznesu',
    shortDesc:
      'Szkolenia AI dla rolników i firm agro: wnioski o dopłaty, dokumentacja, analiza cen i pogody, sprzedaż bezpośrednia i marketing gospodarstwa.',
    title: 'Szkolenia AI dla rolnictwa i agrobiznesu | OpenMind AI',
    description:
      'Szkolenia AI dla rolników i firm agro: wnioski o dopłaty, dokumentacja, analiza cen i pogody, sprzedaż bezpośrednia i marketing gospodarstwa.',
    h1: 'Szkolenia AI dla rolnictwa — technologia, która rozumie gospodarstwo',
    audienceLd: 'Rolnicy, gospodarstwa rodzinne, grupy producenckie, firmy agrobiznesu',
    whyH2: 'Dlaczego AI w rolnictwie',
    whyLead:
      'Uczymy rolników, grupy producenckie i firmy agro pracy z AI: szybsze wnioski i dokumentacja (dopłaty, ekoschematy), analiza cen skupu, marketing sprzedaży bezpośredniej i codzienna papierologia gospodarstwa.',
    whyBullets: [
      'Wnioski o dopłaty i ekoschematy to coraz więcej biurokracji — AI pomaga ją ogarnąć.',
      'Ceny skupu i prognozy zmieniają się codziennie — AI zbiera i streszcza informacje.',
      'Sprzedaż bezpośrednia (od pola do stołu) wymaga marketingu, na który nie ma czasu.',
    ],
    modules: [
      { name: 'Dokumentacja i wnioski', desc: 'Przygotowanie dokumentów do dopłat i ekoschematów, rejestry, ewidencje (z weryfikacją u doradcy).' },
      { name: 'Analiza rynku', desc: 'Ceny skupu, trendy, kalkulacje opłacalności upraw i produkcji.' },
      { name: 'Sprzedaż bezpośrednia', desc: 'Marketing gospodarstwa, social media, opisy produktów, współpraca z lokalnymi odbiorcami.' },
      { name: 'Korespondencja i urzędy', desc: 'Pisma do ARiMR, KOWR, gmin; umowy z odbiorcami.' },
      { name: 'Planowanie sezonu', desc: 'Harmonogramy prac, checklisty, notatki polowe zamieniane w raporty.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Zestaw narzędzi gospodarstwa, praktyka na realnych dokumentach.' },
    ],
    faq: [
      { q: 'Czy AI wypełni za mnie wniosek o dopłaty?', a: 'Pomoże przygotować dane i treści, ale wniosek warto zweryfikować z doradcą — uczymy współpracy obu światów.' },
      { q: 'Nie mam czasu na kursy — jak to wygląda?', a: 'Krótkie sesje online wieczorami lub zjazd stacjonarny poza sezonem.' },
      { q: 'Czy to dla małych gospodarstw?', a: 'Tak, największy efekt daje tam, gdzie jedna osoba robi wszystko.' },
      { q: 'W jakich formatach?', a: 'Online, stacjonarnie u nas lub wyjazdowo dla grup producenckich.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-ngo',
    path: '/szkolenia-ai-dla-ngo',
    navLabel: 'Dla NGO i fundacji',
    shortDesc:
      'Szkolenia AI dla organizacji pozarządowych: wnioski grantowe, sprawozdania, fundraising, komunikacja z darczyńcami. Specjalne stawki dla III sektora.',
    title: 'Szkolenia AI dla NGO i fundacji — wnioski grantowe z AI | OpenMind AI',
    description:
      'Szkolenia AI dla organizacji pozarządowych: wnioski grantowe, sprawozdania, fundraising, komunikacja z darczyńcami. Specjalne stawki dla III sektora.',
    h1: 'Szkolenia AI dla NGO — więcej misji, mniej biurokracji',
    audienceLd: 'Fundacje, stowarzyszenia, organizacje pozarządowe, koordynatorzy projektów, zarządy NGO',
    whyH2: 'Dlaczego AI w NGO',
    whyLead:
      'Uczymy fundacje i stowarzyszenia pracy z AI tam, gdzie III sektor traci najwięcej czasu: wnioski grantowe, sprawozdania, fundraising i komunikacja. Małymi zespołami można robić wielkie rzeczy — AI to dźwignia.',
    whyBullets: [
      'Wniosek grantowy to dziesiątki stron — AI pomaga pisać lepiej i szybciej, zwiększając szanse organizacji.',
      'Sprawozdawczość (merytoryczna i finansowa) zjada czas, który powinien iść na misje.',
      'Fundraising wymaga regularnej, osobistej komunikacji z darczyńcami.',
    ],
    modules: [
      { name: 'Wnioski grantowe', desc: 'Analiza regulaminów konkursów, struktura wniosku, opisy projektów, budżety, harmonogramy; bank treści organizacji.' },
      { name: 'Sprawozdania', desc: 'Merytoryczne i częściowe, zestawienia działań, wskaźniki, raporty dla grantodawców.' },
      { name: 'Fundraising i darczyńcy', desc: 'Apele, podziękowania, newslettery, kampanie 1,5%, komunikacja z biznesem.' },
      { name: 'Komunikacja i social media', desc: 'Historie beneficjentów (z poszanowaniem godności i prywatności), promocja działań.' },
      { name: 'Organizacja pracy', desc: 'Protokoły, uchwały, dokumenty statutowe, wolontariat.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Narzędzia darmowe i nonprofit-owe (rabaty dla NGO), plan wdrożenia.' },
    ],
    faq: [
      { q: 'Czy nas na to stać?', a: 'Mamy specjalne stawki dla III sektora, a większość narzędzi pokazujemy w wersjach darmowych lub z rabatami nonprofit.' },
      { q: 'Czy grantodawcy akceptują wnioski pisane z AI?', a: 'AI pomaga pisać — treść merytoryczna i prawda o projekcie są Wasze; uczymy uczciwego i skutecznego użycia.' },
      { q: 'W jakich formatach?', a: 'Online (także wieczorami), stacjonarnie, warsztaty dla federacji i sieci.' },
      { q: 'A dane beneficjentów?', a: 'Zasady jak przy RODO: anonimizacja, żadnych danych wrażliwych w publicznych narzędziach.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-turystyki',
    path: '/szkolenia-ai-dla-turystyki',
    navLabel: 'Dla turystyki i biur podróży',
    shortDesc:
      'Szkolenia AI dla biur podróży, pilotów i organizatorów turystyki: oferty i programy wyjazdów, wielojęzyczna obsługa, social media i dokumenty.',
    title: 'Szkolenia AI dla turystyki i biur podróży | OpenMind AI',
    description:
      'Szkolenia AI dla biur podróży, pilotów i organizatorów turystyki: oferty i programy wyjazdów, wielojęzyczna obsługa, social media i dokumenty.',
    h1: 'Szkolenia AI dla turystyki — oferty i programy wyjazdów w godzinę, nie w tydzień',
    audienceLd: 'Biura podróży, touroperatorzy, organizatorzy turystyki, piloci wycieczek, przewodnicy',
    whyH2: 'Dlaczego AI w turystyce',
    whyLead:
      'Uczymy biura podróży, organizatorów i przewodników pracy z AI: atrakcyjne oferty i programy wyjazdów, wielojęzyczna obsługa klientów, social media pełne inspiracji i sprawna dokumentacja imprez turystycznych.',
    whyBullets: [
      'Oferta wyjazdu to godziny researchu i pisania — AI skraca to do minut.',
      'Klienci pytają o wszystko i o każdej porze — AI odpowiada natychmiast.',
      'Sezonowość wymaga intensywnego marketingu w krótkich oknach sprzedażowych.',
    ],
    modules: [
      { name: 'Oferty i programy', desc: 'Itineraria dzień po dniu, opisy hoteli i atrakcji, warianty cenowe, oferty grupowe.' },
      { name: 'Research destynacji', desc: 'Informacje praktyczne, pogoda, wymogi wizowe (z weryfikacją u źródeł oficjalnych).' },
      { name: 'Obsługa klienta', desc: 'Odpowiedzi na zapytania, dokumenty podróży, komunikaty przed wyjazdem, obsługa wielojęzyczna.' },
      { name: 'Social media i inspiracje', desc: 'Posty kierunkowe, grafiki, kampanie first/last minute.' },
      { name: 'Dokumentacja imprez', desc: 'Umowy, warunki uczestnictwa, rozliczenia (szkice do weryfikacji prawnej).' },
      { name: 'Warsztat wdrożeniowy', desc: 'Zestaw narzędzi biura, automatyzacja zapytań i ofertowania.' },
    ],
    faq: [
      { q: 'Czy AI nie wymyśli nieistniejących atrakcji?', a: 'Może — dlatego uczymy weryfikacji i pracy na własnych materiałach; AI przyspiesza, człowiek potwierdza.' },
      { q: 'W jakich formatach?', a: 'Online lub stacjonarnie, najlepiej przed sezonem sprzedażowym.' },
      { q: 'Czy dla pilotów i przewodników też?', a: 'Tak: przygotowanie tras, materiały krajoznawcze, komunikacja z grupą.' },
      { q: 'Integracja z naszym systemem rezerwacji?', a: 'Pokazujemy automatyzacje wokół istniejących systemów.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-programistow',
    path: '/szkolenia-ai-dla-programistow',
    navLabel: 'Dla programistów i IT',
    shortDesc: 'Szkolenia AI dla zespołów deweloperskich: GitHub Copilot, Claude Code, Cursor, agenci kodujący, code review i bezpieczeństwo — praktyka na Waszym repozytorium.',
    title: 'Szkolenia AI dla programistów i software house — Copilot, Claude, agenci | OpenMind AI',
    description: 'Szkolenia AI dla zespołów IT: GitHub Copilot, Claude Code, code review z AI, agenci kodujący, bezpieczeństwo kodu. Praktyka na Waszym repozytorium.',
    h1: 'Szkolenia AI dla programistów — koduj z AI szybciej, nie bezmyślnie',
    audienceLd: 'Programiści, zespoły deweloperskie, software house, team leadowie i QA',
    whyH2: 'Dlaczego AI w zespole deweloperskim',
    whyLead: 'Uczymy zespoły deweloperskie pracy z asystentami kodu (GitHub Copilot, Claude Code, Cursor): od skutecznego promptowania po agentów realizujących całe zadania — z code review, testami i bezpieczeństwem, które nie pozwalają AI popsuć produkcji.',
    whyBullets: [
      'Asystenci kodu przyspieszają pracę kilkukrotnie, ale bez warsztatu generują dług techniczny.',
      'Przewaga zespołu nie leży w dostępie do narzędzi, tylko w praktykach: prompty, review, testy.',
      'Juniorzy z AI mogą pracować jak midzi — albo produkować bugi szybciej niż kiedykolwiek.',
    ],
    modules: [
      { name: 'Warsztat asystentów kodu', desc: 'Copilot, Claude Code, Cursor: konfiguracja, kontekst projektu, reguły zespołu.' },
      { name: 'Promptowanie i specyfikacje', desc: 'Od ticketu do implementacji: jak opisywać zadania, żeby AI robiła to, co trzeba.' },
      { name: 'Agenci kodujący', desc: 'Delegowanie całych zadań, praca równoległa, granice autonomii.' },
      { name: 'Code review i jakość', desc: 'Przegląd kodu z AI i kodu OD AI; testy, refaktoryzacja, dług techniczny.' },
      { name: 'Bezpieczeństwo', desc: 'Sekrety, licencje, wycieki kodu, polityka firmy wobec narzędzi AI.' },
      { name: 'Warsztat na Waszym repo', desc: 'Realne zadania z Waszego backlogu, standardy zespołu po szkoleniu.' },
    ],
    faq: [
      { q: 'Czy pracujemy na naszym kodzie?', a: 'Tak, po podpisaniu NDA warsztat prowadzimy na Waszym repozytorium — to największa wartość.' },
      { q: 'Które narzędzie wybrać?', a: 'Pokazujemy różnice i pomagamy dobrać pod stack i budżet; szkolenie nie jest przywiązane do jednego vendora.' },
      { q: 'Czy AI zastąpi programistów?', a: 'Zmienia rolę: mniej pisania, więcej projektowania i weryfikacji — uczymy właśnie tego.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie lub online, ścieżki osobno dla devów, QA i team leadów.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-psychologow',
    path: '/szkolenia-ai-dla-psychologow',
    navLabel: 'Dla psychologów i psychoterapeutów',
    shortDesc: 'Szkolenia AI dla gabinetów psychologicznych: dokumentacja i organizacja, materiały psychoedukacyjne, marketing gabinetu — z żelazną ochroną tajemnicy zawodowej.',
    title: 'Szkolenia AI dla psychologów i psychoterapeutów | OpenMind AI',
    description: 'Szkolenia AI dla gabinetów psychologicznych: dokumentacja i notatki, marketing gabinetu, materiały psychoedukacyjne — z absolutną ochroną tajemnicy zawodowej.',
    h1: 'Szkolenia AI dla psychologów — technologia w służbie relacji, nie zamiast niej',
    audienceLd: 'Psycholodzy, psychoterapeuci, coachowie, ośrodki zdrowia psychicznego',
    whyH2: 'Dlaczego AI w gabinecie psychologicznym',
    whyLead: 'Uczymy psychologów i psychoterapeutów bezpiecznego korzystania z AI: dokumentacja i organizacja praktyki, materiały psychoedukacyjne, marketing gabinetu — z żelazną zasadą: żadnych danych klientów w narzędziach AI.',
    whyBullets: [
      'Dokumentacja i administracja zjadają godziny między sesjami.',
      'Dobre materiały psychoedukacyjne budują pozycję specjalisty.',
      'Marketing gabinetu to dziś warunek pełnego kalendarza — a AI robi go etycznie i szybko.',
    ],
    modules: [
      { name: 'Etyka i poufność', desc: 'Co wolno, czego nigdy: tajemnica zawodowa, anonimizacja, narzędzia lokalne vs chmurowe.' },
      { name: 'Dokumentacja i organizacja', desc: 'Szablony notatek (bez danych klientów), harmonogramy, korespondencja administracyjna.' },
      { name: 'Materiały psychoedukacyjne', desc: 'Artykuły, infografiki, materiały dla klientów między sesjami.' },
      { name: 'Marketing gabinetu', desc: 'Strona, wizytówka Google, social media, opisy specjalizacji.' },
      { name: 'Rozwój zawodowy', desc: 'Streszczanie literatury i badań, przygotowanie do superwizji i wystąpień.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Zestaw narzędzi praktyki, zasady bezpieczeństwa na piśmie.' },
    ],
    faq: [
      { q: 'Czy AI może prowadzić terapię?', a: 'Nie i tego nie uczymy; AI wspiera administrację i edukację — relacja terapeutyczna jest niezastąpialna.' },
      { q: 'Notatki z sesji w AI?', a: 'Tylko w pełni zanonimizowane szablony lub narzędzia lokalne; to pierwszy moduł szkolenia.' },
      { q: 'W jakich formatach?', a: '1:1 (także w naszej siedzibie), online, grupy dla ośrodków.' },
      { q: 'Czy dotyczy też coachów i interwentów?', a: 'Tak, program dopasowujemy do formy praktyki.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-fizjoterapeutow',
    path: '/szkolenia-ai-dla-fizjoterapeutow',
    navLabel: 'Dla fizjoterapeutów',
    shortDesc: 'Szkolenia AI dla fizjoterapeutów: dokumentacja wizyt, materiały dla pacjentów, plany ćwiczeń (informacyjne), marketing gabinetu i rezerwacje.',
    title: 'Szkolenia AI dla fizjoterapeutów i gabinetów rehabilitacji | OpenMind AI',
    description: 'Szkolenia AI dla fizjoterapeutów: dokumentacja, materiały dla pacjentów, plany ćwiczeń (informacyjne), marketing gabinetu i rezerwacje.',
    h1: 'Szkolenia AI dla fizjoterapeutów — więcej czasu przy stole, mniej przy biurku',
    audienceLd: 'Fizjoterapeuci, masażyści, osteopaci, gabinety rehabilitacji i kliniki',
    whyH2: 'Dlaczego AI w gabinecie fizjoterapii',
    whyLead: 'Uczymy fizjoterapeutów i gabinety rehabilitacji pracy z AI: dokumentacja wizyt, czytelne materiały i instrukcje ćwiczeń dla pacjentów, marketing gabinetu i sprawna komunikacja — z poszanowaniem tajemnicy medycznej.',
    whyBullets: [
      'Dokumentacja i opisy zabiegów zjadają czas między pacjentami.',
      'Pacjenci nie ćwiczą w domu, bo nie pamiętają instrukcji — czytelne materiały zmieniają efekty terapii.',
      'Pełny grafik gabinetu buduje się dziś w internecie.',
    ],
    modules: [
      { name: 'Bezpieczeństwo danych pacjentów', desc: 'Anonimizacja, dobór narzędzi, zasady gabinetu.' },
      { name: 'Dokumentacja', desc: 'Szkice opisów wizyt i zabiegów, historia terapii, zaświadczenia.' },
      { name: 'Materiały dla pacjentów', desc: 'Instrukcje ćwiczeń prostym językiem, plany domowe (informacyjne, pod nadzorem terapeuty), edukacja.' },
      { name: 'Marketing gabinetu', desc: 'Wizytówka Google, social media, artykuły eksperckie, odpowiedzi na opinie.' },
      { name: 'Rezerwacje i komunikacja', desc: 'Przypomnienia, listy oczekujących, odpowiedzi na zapytania.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Zestaw narzędzi gabinetu, automatyzacja przypomnień.' },
    ],
    faq: [
      { q: 'Czy AI może układać plany terapii?', a: 'Nie — plan układa fizjoterapeuta; AI pomaga go zapisać, zilustrować i przekazać pacjentowi.' },
      { q: 'Dane pacjentów?', a: 'Zasady jak w medycynie: anonimizacja, żadnych danych w publicznych narzędziach.' },
      { q: 'W jakich formatach?', a: '1:1 w gabinecie, online, grupy dla klinik i sieci.' },
      { q: 'Czy dotyczy masażystów i osteopatów?', a: 'Tak, program dopasowujemy.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-weterynarzy',
    path: '/szkolenia-ai-dla-weterynarzy',
    navLabel: 'Dla weterynarzy',
    shortDesc: 'Szkolenia AI dla lecznic weterynaryjnych: dokumentacja wizyt, komunikacja z opiekunami, przypomnienia o profilaktyce, marketing kliniki.',
    title: 'Szkolenia AI dla weterynarzy i klinik weterynaryjnych | OpenMind AI',
    description: 'Szkolenia AI dla lecznic weterynaryjnych: dokumentacja wizyt, komunikacja z opiekunami, przypomnienia o profilaktyce, marketing kliniki.',
    h1: 'Szkolenia AI dla weterynarzy — więcej uwagi dla pacjentów, którzy nie mówią',
    audienceLd: 'Lekarze weterynarii, technicy weterynarii, właściciele klinik i lecznic',
    whyH2: 'Dlaczego AI w klinice weterynaryjnej',
    whyLead: 'Uczymy lekarzy weterynarii i zespoły klinik pracy z AI: szybsza dokumentacja wizyt, zrozumiała komunikacja z opiekunami zwierząt, przypomnienia o szczepieniach i profilaktyce oraz marketing lecznicy.',
    whyBullets: [
      'Dokumentacja i zalecenia zjadają czas przyjęć.',
      'Opiekunowie zapominają o profilaktyce — automatyczne przypomnienia to zdrowsze zwierzęta i stabilniejszy przychód.',
      'Opinie w Google decydują o wyborze lecznicy.',
    ],
    modules: [
      { name: 'Dokumentacja wizyt', desc: 'Szkice opisów, historie leczenia, zalecenia pozabiegowe.' },
      { name: 'Komunikacja z opiekunami', desc: 'Zalecenia prostym językiem, instrukcje opieki, odpowiedzi na typowe pytania.' },
      { name: 'Profilaktyka i przypomnienia', desc: 'Szczepienia, odrobaczanie, wizyty kontrolne — automatycznie.' },
      { name: 'Marketing kliniki', desc: 'Social media, edukacja opiekunów, odpowiedzi na opinie.' },
      { name: 'Organizacja lecznicy', desc: 'Grafiki, zamówienia, korespondencja z hurtowniami.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Narzędzia kliniki, automatyzacja przypomnień.' },
    ],
    faq: [
      { q: 'Czy AI może diagnozować zwierzęta?', a: 'Nie — diagnoza należy do lekarza; AI wspiera dokumentację i komunikację.' },
      { q: 'Dane opiekunów?', a: 'RODO jak wszędzie: anonimizacja i narzędzia z umowami powierzenia.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie w lecznicy, online, 1:1 dla właścicieli klinik.' },
      { q: 'Małe gabinety też?', a: 'Tak, właśnie tam automatyzacja przypomnień daje najwięcej.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-fotografow',
    path: '/szkolenia-ai-dla-fotografow',
    navLabel: 'Dla fotografów i filmowców',
    shortDesc: 'Szkolenia AI dla fotografów: selekcja i edycja wspierana AI, oferty i wyceny, marketing portfolio, obsługa klientów ślubnych i biznesowych.',
    title: 'Szkolenia AI dla fotografów i filmowców | OpenMind AI',
    description: 'Szkolenia AI dla fotografów: selekcja i edycja wspierana AI, oferty i wyceny, marketing, obsługa klientów ślubnych i biznesowych.',
    h1: 'Szkolenia AI dla fotografów — mniej nocy przy edycji, więcej za obiektywem',
    audienceLd: 'Fotografowie, filmowcy, studia fotograficzne, agencje eventowe',
    whyH2: 'Dlaczego AI w pracy fotografa',
    whyLead: 'Uczymy fotografów i filmowców wykorzystywać AI w całym procesie: selekcja i edycja wspierana AI, oferty które się sprzedają, marketing portfolio i sprawna obsługa klientów — od zapytania po dostawę galerii.',
    whyBullets: [
      'Selekcja i edycja to 70% czasu projektu — AI skraca je drastycznie.',
      'Szybka, profesjonalna odpowiedź na zapytanie wygrywa zlecenia ślubne.',
      'Regularne social media budują kalendarz sezonu.',
    ],
    modules: [
      { name: 'Selekcja i edycja z AI', desc: 'Culling, korekty seryjne, retusz wspierany AI (Lightroom AI, narzędzia generatywne), spójność stylu.' },
      { name: 'Oferty i wyceny', desc: 'Pakiety, odpowiedzi na zapytania, umowy (szkice), komunikacja przed sesją.' },
      { name: 'Marketing portfolio', desc: 'Social media, opisy sesji, SEO strony, współpraca z lokalnymi markami.' },
      { name: 'Obsługa klienta', desc: 'Przewodniki przed sesją, harmonogramy dnia ślubu, dostawa galerii, opinie.' },
      { name: 'Wideo i nowe usługi', desc: 'AI w montażu, teledyski i animacje jako rozszerzenie oferty.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Twój workflow od zapytania po galerię, automatyzacje.' },
    ],
    faq: [
      { q: 'Czy AI-retusz to oszustwo?', a: 'Uczymy uczciwych praktyk: AI przyspiesza rzemiosło, styl i decyzje są Twoje.' },
      { q: 'Prawa autorskie generatywnych elementów?', a: 'Omawiamy licencje narzędzi i dobre praktyki w umowach.' },
      { q: 'W jakich formatach?', a: 'Online lub 1:1; grupy dla studiów i agencji.' },
      { q: 'Czy to dla filmowców też?', a: 'Tak: montaż, transkrypcje, trailery, promocja.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-muzykow',
    path: '/szkolenia-ai-dla-muzykow',
    navLabel: 'Dla muzyków i twórców',
    shortDesc: 'Szkolenia AI dla muzyków, zespołów i wytwórni: teksty i koncepty, okładki, promocja premier, social media i teledyski AI.',
    title: 'Szkolenia AI dla muzyków i twórców — produkcja, promocja, teledyski | OpenMind AI',
    description: 'Szkolenia AI dla muzyków, zespołów i wytwórni: teksty i koncepty, okładki, promocja premier, social media i teledyski AI. Od studia po scenę.',
    h1: 'Szkolenia AI dla muzyków — Ty tworzysz muzykę, AI robi resztę',
    audienceLd: 'Muzycy, zespoły, małe wytwórnie, managerowie artystów',
    whyH2: 'Dlaczego AI wokół muzyki',
    whyLead: 'Uczymy muzyków, zespoły i małe wytwórnie wykorzystywać AI wokół muzyki: koncepty i teksty (jako narzędzie, nie zamiennik), okładki i grafiki, promocja premier, social media i teledyski AI — czyli wszystko, co między studiem a słuchaczem.',
    whyBullets: [
      'Premiera bez promocji to premiera, której nie było — AI robi kampanie jednoosobowo.',
      'Okładki, canvasy i teledyski kosztowały tysiące — dziś robi się je w studiu.',
      'Regularny kontakt ze słuchaczami buduje streamy bardziej niż playlisty.',
    ],
    modules: [
      { name: 'AI w procesie twórczym', desc: 'Burza pomysłów, teksty i koncepty jako wsparcie (nie zamiennik), demo i preprodukcja.' },
      { name: 'Identyfikacja wydania', desc: 'Okładki, canvasy Spotify, grafiki premiery, spójna estetyka ery.' },
      { name: 'Promocja premiery', desc: 'Plan kampanii, pitch do playlist i mediów, opisy na platformy, EPK.' },
      { name: 'Social media artysty', desc: 'Rolki, teasery, treści między premierami, społeczność fanów.' },
      { name: 'Teledyski i wizualia AI', desc: 'Od konceptu po klip: narzędzia, proces, współpraca z twórcami (to także nasza usługa — pokazujemy cały warsztat).' },
      { name: 'Warsztat wdrożeniowy', desc: 'Plan najbliższej premiery krok po kroku.' },
    ],
    faq: [
      { q: 'Czy AI napisze za mnie piosenkę?', a: 'Może, ale nie o to chodzi — uczymy używać AI jako współpracownika, autorstwo i emocje są Twoje.' },
      { q: 'Co z prawami autorskimi?', a: 'Omawiamy status prawny treści AI, licencje narzędzi i oznaczanie w serwisach.' },
      { q: 'W jakich formatach?', a: '1:1 (także w naszej siedzibie), online, warsztaty dla zespołów i wytwórni.' },
      { q: 'Czy zrobicie mi teledysk?', a: 'Tak — produkcja teledysków AI to nasza osobna usługa. Na szkoleniu nauczysz się procesu, a klip możemy zrobić razem.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-ubezpieczen',
    path: '/szkolenia-ai-dla-ubezpieczen',
    navLabel: 'Dla ubezpieczeń',
    shortDesc: 'Szkolenia AI dla branży ubezpieczeń: porównania ofert, korespondencja z klientami i TU, odnowienia polis, marketing agenta.',
    title: 'Szkolenia AI dla agentów ubezpieczeniowych i multiagencji | OpenMind AI',
    description: 'Szkolenia AI dla branży ubezpieczeń: porównania ofert, korespondencja z klientami i TU, odnowienia polis, marketing agenta. Zgodnie z RODO i tajemnicą ubezpieczeniową.',
    h1: 'Szkolenia AI dla agentów ubezpieczeniowych — więcej polis, mniej papierów',
    audienceLd: 'Agenci ubezpieczeniowi, multiagencje, brokerzy',
    whyH2: 'Dlaczego AI w ubezpieczeniach',
    whyLead: 'Uczymy agentów i multiagencje pracy z AI: czytelne porównania ofert, sprawna korespondencja z klientami i towarzystwami, pilnowanie odnowień i marketing, który przyciąga klientów — z poszanowaniem tajemnicy ubezpieczeniowej.',
    whyBullets: [
      'Porównanie ofert kilku TU to godziny — AI porządkuje je w minuty.',
      'Odnowienia przepadają przez brak przypomnień — automatyzacja to czysty przychód.',
      'Klienci wybierają agenta, który odpisuje pierwszy i tłumaczy prosto.',
    ],
    modules: [
      { name: 'Bezpieczeństwo danych klientów', desc: 'RODO, tajemnica ubezpieczeniowa, anonimizacja, dobór narzędzi.' },
      { name: 'Porównania i oferty', desc: 'Zestawienia OWU, różnice między wariantami prostym językiem, prezentacje dla klienta.' },
      { name: 'Korespondencja', desc: 'Odpowiedzi na zapytania, pisma do TU, obsługa szkód (komunikacja).' },
      { name: 'Odnowienia i portfel', desc: 'Przypomnienia, przegląd polis klienta, dosprzedaż.' },
      { name: 'Marketing agenta', desc: 'Social media, edukacja klientów, opinie, wizytówka Google.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Narzędzia agencji, automatyzacja odnowień.' },
    ],
    faq: [
      { q: 'Czy AI może doradzać klientowi?', a: 'Rekomendacja należy do agenta — AI przygotowuje materiały i porównania, decyzje i odpowiedzialność są Twoje.' },
      { q: 'Dane klientów?', a: 'Anonimizacja i narzędzia z umowami powierzenia — moduł nr 1.' },
      { q: 'W jakich formatach?', a: 'Online (agenci pracują w terenie), stacjonarnie dla multiagencji, 1:1.' },
      { q: 'OWU w AI?', a: 'Tak — praca z dokumentami OWU to jeden z najmocniejszych przypadków użycia.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-motoryzacji',
    path: '/szkolenia-ai-dla-motoryzacji',
    navLabel: 'Dla motoryzacji',
    shortDesc: 'Szkolenia AI dla motoryzacji: wyceny napraw, komunikacja z klientami, ogłoszenia aut, opinie Google i social media warsztatu.',
    title: 'Szkolenia AI dla warsztatów i serwisów samochodowych | OpenMind AI',
    description: 'Szkolenia AI dla motoryzacji: wyceny napraw, komunikacja z klientami, ogłoszenia aut, opinie Google i social media warsztatu.',
    h1: 'Szkolenia AI dla motoryzacji — warsztat pełen aut, nie papierów',
    audienceLd: 'Warsztaty samochodowe, serwisy, komisy, dealerzy',
    whyH2: 'Dlaczego AI w motoryzacji',
    whyLead: 'Uczymy warsztaty, serwisy i komisy pracy z AI: szybkie wyceny i kosztorysy, jasna komunikacja z klientami, skuteczne ogłoszenia samochodów, odpowiedzi na opinie i social media, które przyciągają klientów z okolicy.',
    whyBullets: [
      'Klient chce wiedzieć „ile i kiedy" — szybka, konkretna odpowiedź wygrywa zlecenie.',
      'Ogłoszenie auta z dobrym opisem sprzedaje się szybciej i drożej.',
      'Opinie Google to dziś szyld warsztatu.',
    ],
    modules: [
      { name: 'Wyceny i kosztorysy', desc: 'Szacunki napraw, warianty (oryginał/zamiennik), komunikacja kosztów prostym językiem.' },
      { name: 'Komunikacja z klientami', desc: 'Statusy naprawy, zalecenia, przypomnienia o przeglądach i sezonowej wymianie.' },
      { name: 'Ogłoszenia aut', desc: 'Opisy pojazdów, które sprzedają, zdjęcia wspierane AI, odpowiedzi na pytania kupujących.' },
      { name: 'Opinie i lokalny marketing', desc: 'Odpowiedzi na każdą opinię, wizytówka Google, social media warsztatu.' },
      { name: 'Dokumenty i administracja', desc: 'Zlecenia, protokoły przyjęcia, korespondencja z ubezpieczycielami przy szkodach.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Narzędzia serwisu, automatyzacja przypomnień.' },
    ],
    faq: [
      { q: 'Nie mamy czasu na szkolenia — jak to wygląda?', a: 'Krótkie bloki, także po godzinach otwarcia lub online; efekty od pierwszego dnia.' },
      { q: 'Czy AI zna się na autach?', a: 'Wiedza techniczna jest Wasza — AI przyspiesza pisanie, liczenie i komunikację.' },
      { q: 'W jakich formatach?', a: 'Stacjonarnie w warsztacie, online, 1:1 dla właścicieli.' },
      { q: 'Komisy i dealerzy też?', a: 'Tak — moduł ogłoszeń i sprzedaży jest właśnie dla nich.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-szkol-jezykowych',
    path: '/szkolenia-ai-dla-szkol-jezykowych',
    navLabel: 'Dla szkół językowych',
    shortDesc: 'Szkolenia AI dla szkół językowych: materiały i ćwiczenia w minuty, konwersacje z AI, personalizacja nauki, marketing szkoły.',
    title: 'Szkolenia AI dla szkół językowych i lektorów | OpenMind AI',
    description: 'Szkolenia AI dla szkół językowych: materiały i ćwiczenia w minuty, konwersacje z AI, personalizacja nauki, marketing szkoły i organizacja semestru.',
    h1: 'Szkolenia AI dla szkół językowych — lekcje, które przygotowują się same',
    audienceLd: 'Szkoły językowe, lektorzy, sieci szkół, metodycy',
    whyH2: 'Dlaczego AI w szkole językowej',
    whyLead: 'Uczymy szkoły językowe i lektorów wykorzystywać AI: materiały i ćwiczenia dopasowane do poziomu w minuty, konwersacje z AI między zajęciami, personalizacja nauki oraz marketing i organizacja semestru.',
    whyBullets: [
      'Przygotowanie materiałów to największy nieopłacany koszt lektora — AI skraca je z godzin do minut.',
      'Uczniowie robią największy postęp, ćwicząc między zajęciami — AI daje im partnera do konwersacji.',
      'Szkoły konkurują dziś elastycznością i personalizacją.',
    ],
    modules: [
      { name: 'Materiały dydaktyczne', desc: 'Ćwiczenia, teksty, dialogi i testy pod poziom i zainteresowania grupy; adaptacja podręczników.' },
      { name: 'Konwersacje z AI', desc: 'Konfiguracja partnerów konwersacyjnych dla uczniów, zadania domowe mówione, feedback wymowy.' },
      { name: 'Personalizacja', desc: 'Plany dla uczniów indywidualnych, materiały wyrównawcze, przygotowanie do egzaminów.' },
      { name: 'Ocenianie i feedback', desc: 'Sprawdzanie prac pisemnych z komentarzem, śledzenie postępów.' },
      { name: 'Marketing szkoły', desc: 'Social media, zapisy na semestr, komunikacja z rodzicami i firmami.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Standardy szkoły, biblioteka promptów lektorów.' },
    ],
    faq: [
      { q: 'Czy AI zastąpi lektora?', a: 'Nie — zastępuje przygotowywanie kserówek; relacja i motywacja są nie do zastąpienia.' },
      { q: 'Czy uczniowie nie będą oszukiwać z AI?', a: 'Będą próbowali — uczymy, jak projektować zadania odporne na AI i jak uczyć mądrego korzystania.' },
      { q: 'W jakich formatach?', a: 'Online dla lektorów, stacjonarnie dla kadry szkoły, program dla sieci szkół.' },
      { q: 'Jakie języki?', a: 'Dowolne — AI mówi we wszystkich, których uczycie.' },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-coachow',
    path: '/szkolenia-ai-dla-coachow',
    navLabel: 'Dla trenerów i coachów',
    shortDesc: 'Szkolenia AI dla trenerów i coachów: materiały szkoleniowe, kursy online, webinary, marketing eksperta i obsługa społeczności.',
    title: 'Szkolenia AI dla coachów, trenerów biznesu i twórców kursów | OpenMind AI',
    description: 'Szkolenia AI dla trenerów i coachów: materiały szkoleniowe, kursy online, webinary, marketing eksperta i obsługa społeczności.',
    h1: 'Szkolenia AI dla trenerów i coachów — skaluj wiedzę bez utraty jakości',
    audienceLd: 'Trenerzy biznesu, coachowie, twórcy kursów online, mentorzy',
    whyH2: 'Dlaczego AI w pracy trenera',
    whyLead: 'Uczymy trenerów biznesu, coachów i twórców kursów wykorzystywać AI: materiały i prezentacje w ułamku czasu, kursy online i webinary, marketing marki eksperckiej i obsługa społeczności — żebyś mógł dotrzeć szerzej, nie pracując więcej.',
    whyBullets: [
      'Materiał szkoleniowy to godziny pracy przed każdą edycją — AI aktualizuje i personalizuje w minuty.',
      'Kurs online to dziś pełnoprawny produkt — AI pomaga go zbudować od scenariusza po landing.',
      'Marka eksperta wymaga stałej obecności w mediach.',
    ],
    modules: [
      { name: 'Materiały szkoleniowe', desc: 'Prezentacje, ćwiczenia, scenariusze warsztatów, wersje pod klienta.' },
      { name: 'Kursy online', desc: 'Struktura kursu, skrypty wideo, quizy, materiały dodatkowe, platformy.' },
      { name: 'Webinary i wystąpienia', desc: 'Konspekty, slajdy, zapowiedzi, follow-upy po wydarzeniu.' },
      { name: 'Marka eksperta', desc: 'Artykuły, LinkedIn, newsletter, książka/e-book z pomocą AI (uczciwie).' },
      { name: 'Obsługa klientów i społeczności', desc: 'Onboarding, odpowiedzi, ankiety, testimoniale.' },
      { name: 'Warsztat wdrożeniowy', desc: 'Twój produkt krok po kroku, automatyzacje sprzedaży.' },
    ],
    faq: [
      { q: 'Czy treści z AI nie będą płytkie?', a: 'Będą, jeśli AI ma zastąpić ekspertyzę — uczymy, jak łączyć Twoją wiedzę z tempem AI.' },
      { q: 'Czy mogę tworzyć kursy o AI po tym szkoleniu?', a: 'Dostaniesz warsztat i narzędzia; wiedzę merytoryczną budujesz dalej — chętnie wesprzemy mentoringiem.' },
      { q: 'W jakich formatach?', a: '1:1, online, grupy mastermind.' },
      { q: 'Dla początkujących trenerów też?', a: 'Tak — AI najbardziej przyspiesza właśnie start.' },
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
