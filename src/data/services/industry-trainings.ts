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
      'Content, grafika i wideo generatywne w produkcji marketingowej — kampanie, automatyzacja publikacji, spójność marki.',
    title: 'Szkolenia AI dla marketingu i agencji reklamowych | OpenMind AI',
    description:
      'Szkolenia AI dla działów marketingu i agencji. Generatywny content, grafika, wideo (Midjourney, Runway, Sora), kampanie, automatyzacja publikacji, spójność marki.',
    h1: 'Szkolenia AI dla marketingu i agencji',
    audienceLd: 'Zespoły marketingu wewnętrznego, agencje reklamowe, freelancerzy marketingowi',
    whyH2: 'Dlaczego AI zmieniło marketing — na dobre',
    whyLead:
      'Content, grafika i krótkie wideo to obszary, w których AI daje najszybszy zwrot. Zespół marketingu, który do niedawna produkował 4 posty i 1 grafikę tygodniowo, dziś jest w stanie odpalić spójną kampanię w pół dnia. Uczymy tego bez utraty jakości i spójności marki — z gotowymi promptami, briefami dla modeli i systemem kontroli jakości.',
    whyBullets: [
      'Kalendarz treści i planer kampanii wspierany przez AI',
      'Grafiki i key visuale (Midjourney, Flux, Stable Diffusion)',
      'Wideo generatywne (Runway, Sora, Kling, Luma)',
      'Voice-over i lektorzy w wielu językach (ElevenLabs)',
      'Automatyzacja publikacji i raportów kampanii',
    ],
    modules: [
      { name: 'Strategia treści z AI', desc: 'Persony, journey, brief marki — jak zamienić je w powtarzalne prompty i playbooki dla zespołu.' },
      { name: 'Content pisany', desc: 'Posty, artykuły, newslettery, treści reklamowe — z zachowaniem tone of voice i długości formatów.' },
      { name: 'Grafika generatywna', desc: 'Midjourney i Flux w praktyce agencyjnej: key visuale, produktówki, ilustracje kampanii.' },
      { name: 'Wideo AI', desc: 'Runway, Sora, Kling — scenariusz, generacja ujęć, montaż, oprawa dźwiękowa.' },
      { name: 'Automatyzacja publikacji', desc: 'Publikacja do Meta, LinkedIn, TikTok, planery treści, raportowanie kampanii.' },
      { name: 'Spójność marki i kontrola jakości', desc: 'Style guide dla modeli, biblioteka promptów marki, checklist QA przed publikacją.' },
    ],
    faq: [
      {
        q: 'Czy wygenerowane materiały można używać komercyjnie?',
        a: 'Tak, pod warunkiem korzystania z narzędzi na licencjach komercyjnych (płatne konta Midjourney, Runway, OpenAI). Na szkoleniu omawiamy licencje każdego narzędzia i pułapki prawne (np. znaki towarowe w promptach, wizerunki osób).',
      },
      {
        q: 'Jak dbamy o spójność marki?',
        a: 'Budujemy razem style guide dla modeli graficznych i wideo, biblioteki promptów oraz checklist QA. To pozwala różnym osobom w zespole tworzyć materiały wyglądające jak z jednej ręki.',
      },
      {
        q: 'Czy prowadzicie warsztaty w agencji reklamowej?',
        a: 'Tak — regularnie prowadzimy zamknięte warsztaty w agencjach kreatywnych i mediowych. Program dostosowujemy do specyfiki klientów agencji (B2B, e-commerce, retail, luxury, farmacja).',
      },
      {
        q: 'Ile osób może wziąć udział?',
        a: 'Rekomendujemy 8-15 osób w warsztatach praktycznych i do 30-40 osób w webinarach demonstracyjnych. Dla większych zespołów prowadzimy programy kaskadowe.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-ksiegowych',
    path: '/szkolenia-ai-dla-ksiegowych',
    navLabel: 'Dla księgowych i biur rachunkowych',
    shortDesc:
      'AI w biurze rachunkowym — przetwarzanie dokumentów, raporty, analizy, komunikacja z klientami, bezpieczeństwo danych finansowych.',
    title: 'Szkolenia AI dla księgowych i biur rachunkowych | OpenMind AI',
    description:
      'Szkolenia AI dla księgowych i biur rachunkowych: przetwarzanie faktur, raporty, analizy, komunikacja z klientami. Bezpieczeństwo danych finansowych i RODO.',
    h1: 'Szkolenia AI dla księgowych i biur rachunkowych',
    audienceLd: 'Księgowi, właściciele biur rachunkowych, kadry płacowe, doradcy podatkowi',
    whyH2: 'Dlaczego AI w księgowości — mniej klikania, więcej analiz',
    whyLead:
      'W biurze rachunkowym najwięcej czasu pochłania praca dokumentowa: opisywanie faktur, przygotowywanie raportów, komunikacja z klientami. AI potrafi wyręczyć księgowego w większości tych zadań, uwalniając czas na analizy i doradztwo — obszary, w których wartość biura jest realnie odczuwalna dla klienta. Szkolimy z zachowaniem najwyższych standardów bezpieczeństwa danych finansowych.',
    whyBullets: [
      'Przetwarzanie faktur, umów i dokumentów w minutach zamiast godzin',
      'Automatyczne raporty miesięczne i sygnalizacja anomalii',
      'Odpowiedzi na maile klientów z bazy wiedzy biura',
      'Analizy podatkowe i objaśnienia zmian przepisów',
      'Bezpieczeństwo danych finansowych — narzędzia i polityki',
    ],
    modules: [
      { name: 'Bezpieczeństwo danych finansowych', desc: 'RODO, tajemnica zawodowa, klasyfikacja danych, dopuszczalne narzędzia (enterprise / on-premise).' },
      { name: 'Praca z fakturami i dokumentami', desc: 'OCR + LLM, weryfikacja pól, opisywanie i księgowanie, wychwytywanie błędów.' },
      { name: 'Raporty i analizy', desc: 'Miesięczne raporty dla klientów, komentarze do wyników, wskaźniki i benchmark branżowy.' },
      { name: 'Komunikacja z klientami', desc: 'Baza odpowiedzi, przypomnienia o dokumentach, tłumaczenie zmian w przepisach na prosty język.' },
      { name: 'Interpretacje i objaśnienia przepisów', desc: 'Streszczanie interpretacji KAS, orzeczeń, komentarzy — z twardym cross-checkiem źródeł.' },
      { name: 'Automatyzacje w biurze', desc: 'Integracje z popularnymi systemami księgowymi (Comarch, Symfonia, WAPRO, InsERT) — podstawowe workflow.' },
    ],
    faq: [
      {
        q: 'Czy dane klientów są bezpieczne?',
        a: 'Wyłącznie w narzędziach z odpowiednim reżimem przetwarzania. Publiczne wersje ChatGPT czy Gemini nie są właściwym miejscem na dane księgowe klientów. Uczymy pracy z Copilotem, ChatGPT Enterprise oraz rozwiązaniami on-premise.',
      },
      {
        q: 'Czy AI zastąpi księgowego?',
        a: 'Nie w perspektywie widocznej — automatyzuje jednak najbardziej powtarzalne zadania. Księgowy staje się bardziej doradcą, mniej operatorem systemu. To dobry moment na inwestycję w umiejętności analityczne i doradcze.',
      },
      {
        q: 'Czy szkolenie jest dla całego biura?',
        a: 'Tak. Prowadzimy zamknięte warsztaty dla biur rachunkowych, z osobnymi ścieżkami dla właścicieli, głównych księgowych, kadry płacowej i pracowników operacyjnych.',
      },
      {
        q: 'Czy integrujecie AI z konkretnymi programami księgowymi?',
        a: 'Pokazujemy podstawowe integracje z Comarch Optima, Symfonia, WAPRO, InsERT oraz systemami OCR faktur (Saldeo, Fakturownia, iFirma). Dedykowane wdrożenia realizujemy w ramach osobnej usługi.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-hr',
    path: '/szkolenia-ai-dla-hr',
    navLabel: 'Dla HR i rekrutacji',
    shortDesc:
      'AI w HR — ogłoszenia, wsparcie selekcji z zasadą równego traktowania, onboarding, komunikacja wewnętrzna, rozwój pracowników.',
    title: 'Szkolenia AI dla HR i rekrutacji | OpenMind AI',
    description:
      'Szkolenia AI dla działów HR: ogłoszenia i opisy stanowisk, wsparcie selekcji, onboarding, komunikacja wewnętrzna, rozwój pracowników. Zgodność z RODO i AI Act.',
    h1: 'Szkolenia AI dla działów HR i rekrutacji',
    audienceLd: 'Zespoły HR, HR Business Partnerzy, rekruterzy, kadra L&D, komunikacja wewnętrzna',
    whyH2: 'Dlaczego AI w HR — i dlaczego z zasadą równego traktowania',
    whyLead:
      'AI zmienia HR bardziej niż wiele innych działów: opisy stanowisk, ogłoszenia, komunikaty wewnętrzne, materiały onboardingowe, wsparcie selekcji, ścieżki rozwoju. Nasze szkolenie kładzie duży nacisk na etyczne wykorzystanie AI — zasadę równego traktowania, zgodność z RODO i AI Act, unikanie uprzedzeń modelu w procesach kadrowych.',
    whyBullets: [
      'Szybsze i lepsze ogłoszenia oraz opisy stanowisk',
      'Wsparcie selekcji zgodne z zasadą równego traktowania',
      'Onboarding automatyczny — checklisty, materiały, FAQ',
      'Komunikacja wewnętrzna, podsumowania spotkań',
      'Ścieżki rozwoju i indywidualne plany szkoleń',
    ],
    modules: [
      { name: 'Zasada równego traktowania i AI Act w HR', desc: 'Systemy wysokiego ryzyka według AI Act, ryzyka uprzedzeń modelu, obowiązki informacyjne wobec kandydatów.' },
      { name: 'Ogłoszenia i opisy stanowisk', desc: 'Prompty do generowania inkluzywnych ogłoszeń, opisów stanowisk i job architecture.' },
      { name: 'Wsparcie selekcji', desc: 'Streszczanie CV i portfoliów, pytania rekrutacyjne, przygotowanie do rozmowy — z zachowaniem finalnej decyzji człowieka.' },
      { name: 'Onboarding pracownika', desc: 'Automatyczny plan pierwszych 30/60/90 dni, materiały wprowadzające, mini-chatbot dla nowych.' },
      { name: 'Komunikacja wewnętrzna', desc: 'Newslettery, podsumowania zmian, tłumaczenie strategii firmy na język pracowników.' },
      { name: 'Rozwój i L&D', desc: 'Indywidualne plany rozwoju, mikrolearning, biblioteki materiałów, AI-tutor dla wybranych ról.' },
    ],
    faq: [
      {
        q: 'Czy AI może decydować o zatrudnieniu?',
        a: 'Nie. AI Act klasyfikuje systemy wspierające decyzje HR jako systemy wysokiego ryzyka i wymaga nadzoru człowieka. Decyzje zatrudnieniowe zawsze podejmuje rekruter lub menedżer — AI jedynie usprawnia analizę CV, przygotowanie pytań i komunikację.',
      },
      {
        q: 'Jak unikać uprzedzeń modelu w rekrutacji?',
        a: 'Uczymy metod: kompletne kryteria selekcji zamiast otwartych ocen, blind screening, standaryzowane pytania rekrutacyjne, audyt outputów pod kątem uprzedzeń, testy na próbach kontrolnych.',
      },
      {
        q: 'Czy da się użyć AI do oceny okresowej?',
        a: 'Tak, ale ostrożnie. AI może pomóc w strukturyzacji feedbacku i przygotowaniu formularzy, ale finalna ocena należy do przełożonego. Omawiamy zgodność takich rozwiązań z Kodeksem pracy i regulaminami wewnętrznymi.',
      },
      {
        q: 'Czy szkolimy też komunikację wewnętrzną?',
        a: 'Tak. Zespoły komunikacji wewnętrznej to jeden z częstszych odbiorców naszych warsztatów — pracujemy nad newsletterami, komunikatami zmian, tłumaczeniem strategii i tone of voice organizacji.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-urzedow',
    path: '/szkolenia-ai-dla-urzedow',
    navLabel: 'Dla urzędów i administracji',
    shortDesc:
      'AI w administracji publicznej — pisma, decyzje, obsługa obywateli, prosty język, dostępność, bezpieczeństwo informacji.',
    title: 'Szkolenia AI dla urzędów i administracji publicznej | OpenMind AI',
    description:
      'Szkolenia AI dla jednostek administracji publicznej: projekty pism i decyzji, obsługa obywateli, prosty język, dostępność cyfrowa, bezpieczeństwo informacji.',
    h1: 'Szkolenia AI dla urzędów i administracji publicznej',
    audienceLd: 'Urzędy administracji publicznej, samorządy, jednostki podległe, kadra kierownicza',
    whyH2: 'Dlaczego AI w administracji — szybciej i przystępniej dla obywatela',
    whyLead:
      'Administracja publiczna produkuje ogromne ilości tekstu: pisma, decyzje, komunikaty, materiały informacyjne. AI potrafi znacząco skrócić czas ich przygotowania i sprawić, że są napisane prostszym, dostępniejszym językiem. Szkolimy z pełną świadomością wymogów bezpieczeństwa informacji, dostępności cyfrowej i standardów administracji publicznej.',
    whyBullets: [
      'Projekty pism i decyzji szybciej i w prostszym języku',
      'Odpowiedzi na typowe zapytania obywateli',
      'Dostępność cyfrowa i standardy WCAG',
      'Bezpieczeństwo informacji — narzędzia dopuszczalne w JST',
      'Standaryzacja pracy między referatami i wydziałami',
    ],
    modules: [
      { name: 'Bezpieczeństwo informacji w JST', desc: 'Klasyfikacja informacji, systemy dopuszczalne w administracji, umowy powierzenia, KRI, dobre praktyki.' },
      { name: 'Prosty język w administracji', desc: 'Zasady prostego języka, redakcja pism dla obywatela, standard dostępności cyfrowej.' },
      { name: 'Projekty pism i decyzji', desc: 'Szablony pism urzędowych, streszczanie akt sprawy, projekty decyzji administracyjnych.' },
      { name: 'Obsługa obywateli i infolinia', desc: 'Baza odpowiedzi, chatbot informacyjny na stronę BIP, przygotowanie pracowników infolinii.' },
      { name: 'Komunikacja i materiały informacyjne', desc: 'Komunikaty prasowe, ulotki, treści na social media JST — w zgodzie z tone of voice urzędu.' },
      { name: 'Standardy między referatami', desc: 'Wspólne prompty, biblioteka szablonów, procedura wewnętrzna użycia AI w urzędzie.' },
    ],
    faq: [
      {
        q: 'Czy dane obywateli są bezpieczne w narzędziach AI?',
        a: 'Wyłącznie w narzędziach spełniających wymogi bezpieczeństwa informacji przewidziane dla administracji publicznej (KRI, RODO). Publiczne wersje ChatGPT nie są dopuszczalne dla danych osobowych — szkolimy z Copilotem w wersji rządowej, ChatGPT Enterprise oraz rozwiązaniami on-premise.',
      },
      {
        q: 'Czy AI może wydawać decyzje administracyjne?',
        a: 'Nie. AI wspiera pracownika urzędu w przygotowaniu projektu — dopracowuje redakcję, wychwytuje niespójności, przypomina o standardach. Decyzję zawsze wydaje osoba upoważniona; odpowiedzialność administracyjna pozostaje niezmieniona.',
      },
      {
        q: 'Czy pomożecie z prostym językiem?',
        a: 'Tak. Prosty język to jeden z najczęstszych powodów, dla których urzędy sięgają po nasze szkolenia. Uczymy metod przekładania trudnych pism na treści zrozumiałe dla obywatela — z zachowaniem zgodności ze stanem prawnym.',
      },
      {
        q: 'Czy prowadzicie szkolenia stacjonarnie w urzędzie?',
        a: 'Tak — prowadzimy zamknięte warsztaty w JST na terenie całej Polski. Standardowo są to sesje dla całych wydziałów lub całego urzędu, rozłożone w czasie tak, by nie utrudniać bieżącej obsługi obywateli.',
      },
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
