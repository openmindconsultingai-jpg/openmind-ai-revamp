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
      'Praktyczne szkolenie dla lekarzy, przychodni i klinik — jak bezpiecznie używać AI w codziennej pracy z zachowaniem tajemnicy lekarskiej i RODO.',
    title: 'Szkolenia AI dla lekarzy i placówek medycznych | OpenMind AI',
    description:
      'Szkolenia AI dla lekarzy, przychodni i klinik. Dokumentacja medyczna, streszczanie publikacji, komunikacja z pacjentem — bezpiecznie, zgodnie z RODO i tajemnicą lekarską.',
    h1: 'Szkolenia AI dla lekarzy i placówek medycznych',
    audienceLd: 'Lekarze, personel medyczny, kadra zarządzająca placówek ochrony zdrowia',
    whyH2: 'Dlaczego AI w medycynie — i gdzie faktycznie oszczędza czas',
    whyLead:
      'AI nie zastępuje lekarza. Dobrze dobrane narzędzia realnie skracają czas spędzany na dokumentacji, opisach wizyt, korespondencji z pacjentami i przeglądzie literatury — a to codziennie kilkadziesiąt minut, które można oddać pacjentowi lub sobie. Uczymy tego w sposób bezpieczny: żadnych danych pacjentów w publicznych narzędziach, jasne zasady wynikające z tajemnicy lekarskiej i RODO.',
    whyBullets: [
      'Szybsze uzupełnianie dokumentacji medycznej i opisów wizyt',
      'Streszczanie publikacji, wytycznych i procedur w minutach',
      'Uprzejma, jasna komunikacja z pacjentem i rodziną',
      'Organizacja pracy gabinetu, przypomnienia i szablony pism',
      'Bezpieczne narzędzia — enterprise, on-premise lub anonimizacja danych',
    ],
    modules: [
      { name: 'RODO i tajemnica lekarska w pracy z AI', desc: 'Co wolno, czego absolutnie nie. Klasyfikacja danych, zasady anonimizacji i wybór narzędzi dopuszczalnych w placówce medycznej.' },
      { name: 'Dokumentacja i opisy wizyt', desc: 'Szablony i prompty do szybkiego uzupełniania kart pacjentów, opisów badań i wypisów — na anonimizowanych przykładach.' },
      { name: 'Streszczanie publikacji naukowych i wytycznych', desc: 'Jak w kilka minut przejść przez artykuł, wytyczne PTK/PTG/EULAR czy metaanalizę i wyciągnąć wnioski dla praktyki klinicznej.' },
      { name: 'Komunikacja z pacjentem', desc: 'Empatyczne odpowiedzi, tłumaczenie języka medycznego na prosty, szablony maili i informacji pozabiegowych.' },
      { name: 'Bezpieczne narzędzia dla placówki', desc: 'Copilot, ChatGPT Enterprise, rozwiązania on-premise (LLaMA, Mistral) — dobór, konfiguracja, polityka użycia.' },
      { name: 'Organizacja gabinetu i automatyzacje', desc: 'Kalendarz, przypomnienia SMS/e-mail, obsługa recepcji, generowanie zaświadczeń — z gotowymi automatyzacjami.' },
    ],
    faq: [
      {
        q: 'Czy dane pacjentów są bezpieczne w narzędziach AI?',
        a: 'Wyłącznie wtedy, gdy zostały wcześniej odpowiednio zabezpieczone lub anonimizowane. Publiczny ChatGPT czy Claude nie są dopuszczalne dla danych osobowych pacjenta. Na szkoleniu pokazujemy trzy bezpieczne ścieżki: rozwiązania enterprise z umową powierzenia przetwarzania, warianty on-premise oraz konsekwentną anonimizację przed wysłaniem promptu.',
      },
      {
        q: 'Czy AI może wspierać diagnostykę?',
        a: 'AI wspiera lekarza — nie zastępuje. Może pomóc w różnicowaniu, sugerować pytania różnicujące w wywiadzie, streszczać opisy badań i przypominać o wytycznych. Decyzja diagnostyczna i terapeutyczna zawsze należy do lekarza, a odpowiedzialność zawodowa pozostaje niezmieniona.',
      },
      {
        q: 'Czy prowadzicie szkolenia dla całych placówek?',
        a: 'Tak. Realizujemy warsztaty dla rad lekarskich, całych oddziałów oraz przychodni — od 6 do 40 osób w grupie. Program dostosowujemy do specjalności (POZ, kardiologia, ginekologia, ortopedia, stomatologia, medycyna estetyczna) i do systemów, których używacie na co dzień.',
      },
      {
        q: 'W jakich formatach można zorganizować szkolenie?',
        a: 'Stacjonarnie w Waszej placówce, online na żywo (Zoom/Teams/Meet) oraz indywidualnie 1:1 dla właścicieli praktyk. Standardowo 4 lub 8 godzin dydaktycznych, materiały i biblioteka bezpiecznych promptów w cenie.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-prawnikow',
    path: '/szkolenia-ai-dla-prawnikow',
    navLabel: 'Dla prawników i kancelarii',
    shortDesc:
      'AI w praktyce prawniczej — research, umowy, pisma i due diligence z zachowaniem tajemnicy zawodowej i weryfikacją źródeł.',
    title: 'Szkolenia AI dla prawników i kancelarii | OpenMind AI',
    description:
      'Szkolenia AI dla adwokatów, radców i kancelarii: analiza umów, research prawny, projekty pism, due diligence. Bezpieczne narzędzia i weryfikacja halucynacji.',
    h1: 'Szkolenia AI dla prawników i kancelarii',
    audienceLd: 'Adwokaci, radcowie prawni, aplikanci, prawnicy in-house, kadry kancelarii',
    whyH2: 'Dlaczego AI w kancelarii — i dlaczego trzeba to robić ostrożnie',
    whyLead:
      'Dobrze użyte narzędzia AI potrafią skrócić czas przygotowania standardowych pism i analiz o 30–60 procent. Źle użyte prowadzą do halucynacji orzeczeń, naruszenia tajemnicy adwokackiej lub radcowskiej i błędów, które kończą się w izbie. Uczymy jednego i drugiego — z naciskiem na weryfikację źródeł, dobór narzędzi zgodnych z etyką zawodu i polityki bezpieczeństwa dla kancelarii.',
    whyBullets: [
      'Szybsza analiza i streszczanie długich umów oraz akt',
      'Research prawny z twardą weryfikacją źródeł',
      'Projekty pism, opinii i draftów decyzji',
      'Due diligence i porównywanie dokumentów',
      'Ochrona tajemnicy zawodowej — narzędzia i polityki',
    ],
    modules: [
      { name: 'Etyka zawodowa i tajemnica adwokacka/radcowska', desc: 'Kodeksy etyki, RODO, tajemnica przedsiębiorstwa — mapa dopuszczalnych narzędzi i praktyk.' },
      { name: 'Analiza i streszczanie umów', desc: 'Praca z długimi kontraktami: identyfikacja ryzyk, klauzul standardowych i odstępstw, porównywanie wersji.' },
      { name: 'Research prawny z weryfikacją', desc: 'Metodyka pytań, cross-check w LEX/Legalis, uczymy rozpoznawania halucynowanych orzeczeń i cytatów.' },
      { name: 'Projekty pism i opinii', desc: 'Draft pozwu, odpowiedzi, apelacji, opinii prawnej — na własnych szablonach kancelarii, z zachowaniem stylu.' },
      { name: 'Due diligence i data room', desc: 'Praca z dużymi zbiorami dokumentów, wyciąganie kluczowych informacji, streszczenia dla klienta i partnerów.' },
      { name: 'Polityka AI w kancelarii', desc: 'Regulamin użycia narzędzi AI, klauzula dla klientów, procedury dla zespołu — gotowe wzory.' },
    ],
    faq: [
      {
        q: 'Czy używanie AI narusza tajemnicę adwokacką?',
        a: 'Nie, jeżeli używa się narzędzi z odpowiednim reżimem przetwarzania (umowa powierzenia, brak treningu na danych, wersje enterprise lub on-premise) i przestrzega procedur wewnętrznych kancelarii. Publiczny ChatGPT bez konta enterprise nie jest właściwym miejscem na dane objęte tajemnicą.',
      },
      {
        q: 'Jak radzić sobie z halucynacjami orzeczeń?',
        a: 'Uczymy dwuetapowego procesu: model generuje hipotezę i cytat, a prawnik weryfikuje sygnaturę i treść w LEX, Legalis lub bazie SN. Pokazujemy też prompty ograniczające ryzyko halucynacji i narzędzia RAG oparte na zamkniętych bazach kancelarii.',
      },
      {
        q: 'Czy szkolenie obejmuje aplikantów i sekretariat?',
        a: 'Tak. Prowadzimy warsztaty dla całej kancelarii — z osobnymi ścieżkami dla wspólników, prawników, aplikantów oraz sekretariatu i administracji. Każda ścieżka ma inne priorytety i inne prompty.',
      },
      {
        q: 'Czy pomożecie napisać wewnętrzną politykę AI kancelarii?',
        a: 'Tak. Po szkoleniu dostarczamy szablon regulaminu użycia narzędzi AI, klauzulę informacyjną dla klientów oraz procedurę weryfikacji outputów. Wdrożenie polityki możemy przeprowadzić w ramach osobnej konsultacji.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-jdg',
    path: '/szkolenia-ai-dla-jdg',
    navLabel: 'Dla JDG i solopreneurów',
    shortDesc:
      'Jednoosobowa firma z AI działa jak z zespołem. Marketing, oferty, obsługa klienta, automatyzacje — konkret i szybki zwrot.',
    title: 'Szkolenia AI dla przedsiębiorców JDG i solopreneurów | OpenMind AI',
    description:
      'Szkolenia AI 1:1 i w małych grupach dla właścicieli jednoosobowych firm. Marketing, oferty, obsługa klienta, automatyzacje niskim kosztem. Format konkretny i szybki.',
    h1: 'Szkolenia AI dla przedsiębiorców JDG',
    audienceLd: 'Właściciele jednoosobowych działalności gospodarczych, freelancerzy, solopreneurzy',
    whyH2: 'Dlaczego AI w JDG — jedna osoba, moc małego zespołu',
    whyLead:
      'W jednoosobowej firmie każda godzina spędzona na powtarzalnych zadaniach to godzina zabrana klientom. AI robi tu największą różnicę: pisze pierwsze wersje ofert, prowadzi social media, obsługuje maile, generuje dokumenty i porządkuje kalendarz. Nasze szkolenie jest maksymalnie praktyczne — wychodzisz z gotowymi promptami i automatyzacjami dopasowanymi do Twojej branży.',
    whyBullets: [
      'Marketing i social media prowadzone w kilkadziesiąt minut tygodniowo',
      'Oferty, wyceny i propozycje handlowe generowane na szablonach',
      'Obsługa klienta i FAQ oparte o Twoje materiały',
      'Faktury, umowy i dokumenty przygotowane z wyprzedzeniem',
      'Proste automatyzacje bez zespołu IT i wysokich kosztów',
    ],
    modules: [
      { name: 'Twój biznes na jednej kartce — wejście AI', desc: 'Wspólnie mapujemy Twoje procesy i wybieramy 3-5 obszarów z największym potencjałem oszczędności czasu.' },
      { name: 'Marketing i social media z AI', desc: 'Planer treści, generowanie postów, grafik i krótkich filmów pod Twój profil marki.' },
      { name: 'Oferty, wyceny, propozycje handlowe', desc: 'Szablony pod Twoją usługę, prompty do szybkiego dopasowania do klienta, dobór ceny i argumentacji.' },
      { name: 'Obsługa klienta i skrzynka mailowa', desc: 'Bazy odpowiedzi, szablony dla typowych sytuacji, mini-chatbot na stronę lub Messengera.' },
      { name: 'Dokumenty i formalności', desc: 'Umowy, protokoły, faktury opisowe, pisma do urzędów — z zachowaniem Twojego stylu.' },
      { name: 'Automatyzacje niskim kosztem', desc: 'Make/Zapier/n8n w minimalnej wersji — 2-3 automatyzacje, które realnie oszczędzają godziny tygodniowo.' },
    ],
    faq: [
      {
        q: 'W jakim formacie prowadzicie szkolenia dla JDG?',
        a: 'Najczęściej 1:1 online lub stacjonarnie w naszej siedzibie — pełny dzień pracy nad Twoją firmą. Alternatywnie małe grupy 4-8 osób z branż komplementarnych. Wybieramy razem to, co bardziej Ci pasuje.',
      },
      {
        q: 'Ile to kosztuje i jak szybko się zwraca?',
        a: 'Standardowe szkolenie 1:1 to jeden dzień pracy trenera. Zwrot z inwestycji najczęściej pojawia się w pierwszym miesiącu — dzięki oszczędności kilku godzin tygodniowo na marketingu i obsłudze klientów.',
      },
      {
        q: 'Nie znam się na technologii — dam radę?',
        a: 'Tak. Zdecydowana większość naszych uczestników JDG nie miała wcześniej styczności z AI. Pracujemy na Twoim komputerze i Twoich narzędziach; zaczynamy od podstaw i kończymy przy działających workflow.',
      },
      {
        q: 'Czy dostanę gotowe prompty i szablony?',
        a: 'Tak. Wychodzisz ze szkolenia z biblioteką promptów i szablonów dopasowanych do Twojej działalności, gotowymi do użycia następnego dnia. Otrzymujesz też materiały do samodzielnej dalszej nauki.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-msp',
    path: '/szkolenia-ai-dla-msp',
    navLabel: 'Dla MŚP',
    shortDesc:
      'Programy szkoleniowe dla małych i średnich firm — dział po dziale, ze wspólną polityką AI i pilotażowymi automatyzacjami.',
    title: 'Szkolenia AI dla małych i średnich firm (MŚP) | OpenMind AI',
    description:
      'Szkolenia AI dla firm 10–250 osób. Warsztaty dla działów sprzedaży, biura, marketingu i produkcji. Wspólne standardy, polityka AI i pilotażowe automatyzacje.',
    h1: 'Szkolenia AI dla małych i średnich firm',
    audienceLd: 'Właściciele i kadra zarządzająca małych i średnich firm, kierownicy działów',
    whyH2: 'Dlaczego program dla całej firmy zamiast pojedynczego szkolenia',
    whyLead:
      'W firmie 10–250 osobowej największy zysk z AI pojawia się wtedy, gdy używają jej wszystkie działy — a nie jedna zapalona osoba. Nasze programy dla MŚP obejmują kolejne zespoły (sprzedaż, biuro, marketing, produkcja, obsługa klienta), wspólną politykę użycia oraz 2-3 pilotażowe automatyzacje wdrożone po szkoleniu. Program rozkładamy w czasie tak, żeby nie sparaliżować bieżącej pracy.',
    whyBullets: [
      'Warsztaty dopasowane do konkretnych działów — nie jeden słajd dla wszystkich',
      'Wspólne standardy pracy z AI dla całej firmy',
      'Pilotażowe automatyzacje uruchamiane w tygodniach po szkoleniu',
      'Mierzalne KPI adopcji i oszczędności czasu',
      'Wsparcie po szkoleniu w formie stałych konsultacji',
    ],
    modules: [
      { name: 'Diagnoza i mapa procesów', desc: 'Warsztat z kadrą zarządzającą — identyfikujemy działy i procesy z największym potencjałem AI.' },
      { name: 'Warsztaty per dział', desc: 'Sprzedaż, biuro, marketing, produkcja — każdy dział dostaje własny półdniowy lub dniowy warsztat.' },
      { name: 'Polityka AI dla firmy', desc: 'Regulamin użycia, zasady bezpieczeństwa, klasyfikacja danych, dopuszczalne narzędzia.' },
      { name: 'Kadry zarządzającej perspektywa', desc: 'Sesja dla właścicieli i menedżerów — jak zarządzać transformacją i mierzyć efekty.' },
      { name: 'Pilotażowe automatyzacje', desc: '2–3 wybrane workflow (raporty, obsługa maili, generowanie ofert) wdrażamy po szkoleniu.' },
      { name: 'Follow-up i community wewnętrzna', desc: 'Konsultacje po miesiącu i po trzech miesiącach, wewnętrzna baza promptów w firmie.' },
    ],
    faq: [
      {
        q: 'Ile trwa taki program w firmie MŚP?',
        a: 'Standardowo od 3 do 8 tygodni w zależności od liczby działów i pracowników. Zaczynamy od warsztatu strategicznego z kadrą zarządzającą, następnie prowadzimy warsztaty per dział, a kończymy wdrożeniem pilotażowych automatyzacji.',
      },
      {
        q: 'Czy da się to zrobić bez wyłączania firmy z pracy?',
        a: 'Tak. Warsztaty prowadzimy w blokach półdniowych albo dziennych, tak aby dział mógł normalnie funkcjonować. Zwykle rozkładamy je na 2-3 tygodnie i przeplatamy zdalną pracą własną uczestników.',
      },
      {
        q: 'Kto powinien uczestniczyć w warsztacie strategicznym?',
        a: 'Właściciel lub prezes, dyrektor operacyjny, kierownicy kluczowych działów i osoba odpowiedzialna za IT lub cyfryzację. Warsztat trwa 3-4 godziny i kończy się gotową mapą wdrożeń na najbliższe pół roku.',
      },
      {
        q: 'Czy pomożecie z bezpieczeństwem danych?',
        a: 'Tak. Wspólnie klasyfikujemy dane firmy, dobieramy narzędzia z odpowiednim reżimem przetwarzania, przygotowujemy politykę AI i klauzule dla pracowników. W razie potrzeby konsultujemy się z Waszym DPO.',
      },
    ],
  },
  {
    slug: 'szkolenia-ai-dla-korporacji',
    path: '/szkolenia-ai-dla-korporacji',
    navLabel: 'Dla korporacji',
    shortDesc:
      'Programy kaskadowe dla dużych firm — webinar dla wszystkich, warsztaty dla zespołów, ścieżki per dział, governance i AI Act.',
    title: 'Szkolenia AI dla korporacji i dużych firm | OpenMind AI',
    description:
      'Programy szkoleniowe AI dla dużych firm i korporacji: webinary, warsztaty, ścieżki per dział, governance, AI Act, RODO, integracja z Copilot. Mierzenie adopcji.',
    h1: 'Szkolenia AI dla korporacji i dużych organizacji',
    audienceLd: 'Duże firmy i korporacje: zarządy, HR, L&D, IT, dyrektorzy działów, pracownicy',
    whyH2: 'Dlaczego korporacja potrzebuje programu, nie pojedynczego szkolenia',
    whyLead:
      'W organizacji powyżej 250 osób pojedyncze szkolenie prowadzone dla wybranej grupy szybko rozmywa się w codziennej pracy. Skuteczne programy AI w korporacjach są kaskadowe: zaczynają się od webinaru dla wszystkich, przechodzą przez warsztaty per dział i kończą wdrożeniem governance. Prowadzimy takie programy zgodnie z wymaganiami RODO, AI Act oraz standardów bezpieczeństwa informacji.',
    whyBullets: [
      'Webinar wprowadzający dla wszystkich pracowników — spójny start',
      'Warsztaty per dział z realnymi case study branżowymi',
      'Governance i polityka AI zgodna z AI Act i RODO',
      'Integracja z narzędziami enterprise (Microsoft 365 Copilot, Google Gemini)',
      'Mierzenie adopcji i raportowanie postępów do zarządu',
    ],
    modules: [
      { name: 'Warsztat strategiczny z zarządem', desc: 'AI jako element strategii, mapa ryzyk i szans, model governance.' },
      { name: 'Webinar dla całej organizacji', desc: 'Wspólny wstęp, terminologia, zasady bezpieczeństwa, przykłady z branży.' },
      { name: 'Ścieżki warsztatowe per dział', desc: 'Osobne programy dla sprzedaży, marketingu, HR, finansów, IT, prawnych, obsługi klienta.' },
      { name: 'Governance i AI Act', desc: 'Klasyfikacja systemów, rejestr AI, procedura DPIA, audyt zewnętrzny.' },
      { name: 'Copilot i narzędzia enterprise', desc: 'Wdrożenie Microsoft 365 Copilot, Gemini for Workspace, ChatGPT Enterprise — z konfiguracją SSO i DLP.' },
      { name: 'Adopcja, KPI, community wewnętrzna', desc: 'Metryki adopcji, sieć ambasadorów AI, wewnętrzna baza wiedzy i promptów.' },
    ],
    faq: [
      {
        q: 'Czy jesteście w stanie przeszkolić 500+ osób?',
        a: 'Tak. Prowadziliśmy programy dla organizacji rzędu 500–3000 pracowników. Standardowa architektura: webinar dla całej organizacji, potem warsztaty w grupach 15-20 osób prowadzone równolegle przez zespół trenerów.',
      },
      {
        q: 'Jak wpisujecie się w AI Act?',
        a: 'Nasz program uwzględnia klasyfikację systemów AI według AI Act (niedopuszczalne / wysokiego ryzyka / ograniczonego ryzyka / minimalnego ryzyka), obowiązki organizacji jako deployera oraz wymogi dokumentacyjne. Wspólnie budujemy rejestr AI i procedurę DPIA.',
      },
      {
        q: 'Czy integracja z Microsoft 365 Copilot jest w zakresie?',
        a: 'Tak. Prowadzimy zarówno warsztaty dla użytkowników końcowych Copilot (Word, Excel, PowerPoint, Outlook, Teams), jak i wsparcie techniczne dla IT: konfiguracja SSO, DLP, uprawnień, Copilot Studio.',
      },
      {
        q: 'Jak mierzycie efekty programu?',
        a: 'Ustalamy KPI z zarządem na starcie — zwykle adopcja narzędzi, oszczędność czasu w wybranych procesach, liczba wdrożonych automatyzacji. Raportujemy po 30, 90 i 180 dniach; korygujemy program w razie potrzeby.',
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
