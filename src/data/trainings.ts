export interface TrainingModule {
  title: string;
  desc: string;
}

export interface TrainingFAQ {
  q: string;
  a: string;
}

export interface TrainingData {
  slug: string;
  path: string;
  /** Prefix used before city names in the ServiceAreas listing */
  anchorPrefix: string;
  /** SEO title (<=60 chars ideally) */
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  /** Visible H1 */
  h1: string;
  /** One-liner under H1 */
  lead: string;
  /** 2-3 paragraphs of body copy for SEO (justified rendering) */
  intro: string[];
  modules: TrainingModule[];
  audience: string[];
  outcomes: string[];
  faq: TrainingFAQ[];
  /** Optional href to CTA (defaults to /contact.html) */
  ctaHref?: string;
}

export const trainings: Record<string, TrainingData> = {
  'szkolenia-ai': {
    slug: 'szkolenia-ai',
    path: '/szkolenia-ai',
    anchorPrefix: 'Szkolenia AI',
    metaTitle: 'Szkolenia AI — kompleksowe programy sztucznej inteligencji | OpenMind AI',
    metaDescription:
      'Szkolenia AI dla firm, zespołów i instytucji. Praktyczne warsztaty ze sztucznej inteligencji: ChatGPT, Claude, Copilot, automatyzacja. Cała Polska — zdalnie i stacjonarnie.',
    keywords:
      'szkolenia AI, szkolenia ze sztucznej inteligencji, warsztaty AI, kurs AI, szkolenia ChatGPT, szkolenia AI dla firm, szkolenia AI dla szkół, OpenMind AI',
    h1: 'Szkolenia AI',
    lead: 'Kompleksowe programy szkoleniowe ze sztucznej inteligencji dla firm, zespołów i instytucji edukacyjnych.',
    intro: [
      'Prowadzimy praktyczne szkolenia AI, które przekładają najnowsze narzędzia sztucznej inteligencji na realne oszczędności czasu i wzrost efektywności zespołów. Każdy program budujemy wokół procesów Twojej organizacji – nie uczymy teorii, tylko konkretnych zastosowań, z którymi uczestnicy wychodzą gotowi do pracy już następnego dnia.',
      'Nasi trenerzy łączą kompetencje wdrożeniowe z doświadczeniem dydaktycznym. Pracujemy z najlepszymi narzędziami AI dostępnymi na rynku – od modeli językowych, przez generatory grafiki i wideo, po platformy do automatyzacji. Szkolenia realizujemy zdalnie oraz stacjonarnie na terenie całej Polski.',
      'W ofercie znajdziesz zarówno szkolenia ogólne dla całych zespołów, jak i dedykowane ścieżki dla firm, szkół oraz warsztaty specjalistyczne z ChatGPT i pozostałych narzędzi generatywnej AI.',
    ],
    modules: [
      { title: 'Podstawy generatywnej AI', desc: 'Modele językowe, promptowanie, ograniczenia i mocne strony – od zera do świadomego użytkownika.' },
      { title: 'AI w codziennej pracy', desc: 'Automatyzacja maili, raportów, prezentacji, notatek i researchu w oparciu o narzędzia klasy enterprise.' },
      { title: 'Bezpieczeństwo i prywatność', desc: 'Zasady RODO, dane wrażliwe, polityki wewnętrzne i bezpieczne wzorce korzystania z AI w firmie.' },
      { title: 'Warsztat wdrożeniowy', desc: 'Sesja praktyczna – uczestnicy budują własne prompty, szablony i mini-automatyzacje pod swoje stanowiska.' },
    ],
    audience: [
      'Firmy szukające pierwszego, sensownego wdrożenia AI w zespołach.',
      'Instytucje edukacyjne i szkoły średnie budujące kompetencje przyszłości.',
      'Działy marketingu, sprzedaży, HR, obsługi klienta i administracji.',
      'Zarządy chcące zrozumieć, jak strategicznie wykorzystać sztuczną inteligencję.',
    ],
    outcomes: [
      'Uczestnicy potrafią sprawnie i bezpiecznie korzystać z narzędzi AI w codziennej pracy.',
      'Zespół zyskuje wspólny język i standardy pracy ze sztuczną inteligencją.',
      'Pierwsze efekty widoczne w skróceniu czasu wykonywania rutynowych zadań.',
      'Organizacja otrzymuje mapę dalszych, sensownych wdrożeń AI.',
    ],
    faq: [
      { q: 'Ile trwa szkolenie?', a: 'Standardowe formaty to 4h (intro), 8h (warsztat) lub cykl 2–3 spotkań. Dopasowujemy zakres do potrzeb i tempa zespołu.' },
      { q: 'Zdalnie czy stacjonarnie?', a: 'Oba formaty działają równie skutecznie. Stacjonarnie realizujemy szkolenia na terenie całej Polski.' },
      { q: 'Czy uczestnicy muszą mieć doświadczenie z AI?', a: 'Nie. Każde szkolenie zaczynamy od diagnozy poziomu grupy i dobieramy tempo tak, żeby korzyść była realna dla każdego.' },
      { q: 'Co dostaje uczestnik po szkoleniu?', a: 'Materiały, zestaw sprawdzonych promptów, szablony automatyzacji oraz imienny certyfikat ukończenia.' },
    ],
  },
  'szkolenia-ai-dla-firm': {
    slug: 'szkolenia-ai-dla-firm',
    path: '/szkolenia-ai/dla-firm',
    anchorPrefix: 'Szkolenia AI dla firm',
    metaTitle: 'Szkolenia AI dla firm — praktyczne wdrożenia w zespołach | OpenMind AI',
    metaDescription:
      'Szkolenia AI dla firm dopasowane do procesów Twojej organizacji. Warsztaty ChatGPT, Claude, Copilot, automatyzacje. Realne oszczędności czasu. Cała Polska.',
    keywords:
      'szkolenia AI dla firm, szkolenia AI dla zespołów, szkolenia AI dla korporacji, szkolenia ChatGPT dla firm, warsztaty AI dla pracowników, sztuczna inteligencja w firmie',
    h1: 'Szkolenia AI dla firm',
    lead: 'Praktyczne warsztaty AI szyte na miarę zespołów – od zarządu po pierwszy szczebel operacyjny.',
    intro: [
      'Szkolenia AI dla firm w OpenMind AI to programy budowane pod konkretną organizację. Zaczynamy od krótkiego audytu procesów, żeby nie uczyć „AI w ogóle”, tylko tego, co realnie skraca czas pracy Twoich zespołów. Efekt: uczestnicy wychodzą z gotowymi scenariuszami użycia w swoich stanowiskach.',
      'Pracujemy z działami marketingu, sprzedaży, HR, obsługi klienta, finansów i administracji. Wspieramy również zarządy, którym potrzebna jest strategiczna perspektywa – jak wpleść sztuczną inteligencję w model operacyjny firmy bez ryzyka i chaosu.',
      'Realizujemy szkolenia zdalnie i stacjonarnie w całej Polsce. Możemy poprowadzić jednorazowy warsztat lub cykl obejmujący wdrożenie, mentoring i mierzalne KPI.',
    ],
    modules: [
      { title: 'Audyt procesów pod AI', desc: 'Wybieramy procesy o największym potencjale zwrotu i budujemy pod nie plan szkolenia.' },
      { title: 'Warsztat dla zespołu', desc: 'Praktyczna sesja – uczestnicy pracują na własnych, realnych dokumentach i zadaniach.' },
      { title: 'Playbook dla firmy', desc: 'Dokument standardów, promptów i polityk bezpieczeństwa dopasowany do organizacji.' },
      { title: 'Follow-up i mentoring', desc: 'Sesje kontrolne po 30/60 dniach – utrwalamy nawyki i domykamy wątpliwości.' },
    ],
    audience: [
      'Firmy 20–2000 osób planujące pierwsze poważne wdrożenie AI.',
      'Zespoły marketingu, sprzedaży i obsługi klienta.',
      'Działy HR i administracji szukające automatyzacji rutynowych zadań.',
      'Zarządy i managerowie odpowiedzialni za transformację.',
    ],
    outcomes: [
      'Konkretne, zmierzone oszczędności czasu w wybranych procesach.',
      'Zespoły pracujące na jednym standardzie i wspólnych narzędziach.',
      'Playbook AI, który zostaje w firmie i skaluje się na nowych pracowników.',
      'Mniejsze ryzyko wycieku danych dzięki jasnym politykom użycia.',
    ],
    faq: [
      { q: 'Czy dopasowujecie treść do naszej branży?', a: 'Tak. Przed szkoleniem przechodzimy przez wasze procesy i przygotowujemy przykłady, prompty i scenariusze użycia typowe dla waszej branży.' },
      { q: 'Jaka jest minimalna i maksymalna wielkość grupy?', a: 'Optymalna grupa to 8–16 osób. Dla większych organizacji dzielimy program na kohorty i ścieżki działowe.' },
      { q: 'Czy wystawiacie fakturę i certyfikaty?', a: 'Tak. Każdy uczestnik otrzymuje imienny certyfikat, a firma – fakturę VAT i pakiet materiałów wewnętrznych.' },
      { q: 'Ile kosztuje szkolenie?', a: 'Wycena zależy od wielkości grupy, formy i zakresu. Bezpłatnie przygotowujemy ofertę po krótkiej rozmowie diagnostycznej.' },
    ],
  },
  'szkolenia-ai-dla-szkol': {
    slug: 'szkolenia-ai-dla-szkol',
    path: '/szkolenia-ai/dla-szkol',
    anchorPrefix: 'Szkolenia AI dla szkół',
    metaTitle: 'Szkolenia AI dla szkół i nauczycieli — kompetencje przyszłości | OpenMind AI',
    metaDescription:
      'Szkolenia AI dla szkół podstawowych, średnich i uczelni. Warsztaty dla nauczycieli i uczniów. Praktyczne, bezpieczne i zgodne z podstawą programową. Cała Polska.',
    keywords:
      'szkolenia AI dla szkół, szkolenia AI dla nauczycieli, sztuczna inteligencja w edukacji, AI w szkole, warsztaty AI dla uczniów, ChatGPT dla nauczycieli, OpenMind AI edukacja',
    h1: 'Szkolenia AI dla szkół',
    lead: 'Programy dla nauczycieli, dyrekcji i uczniów – nowoczesna edukacja bez lęku przed sztuczną inteligencją.',
    intro: [
      'Wspieramy szkoły podstawowe, ponadpodstawowe i uczelnie w oswojeniu sztucznej inteligencji. Zamiast straszyć albo zachwycać się bezkrytycznie, pokazujemy, jak wykorzystać AI etycznie, bezpiecznie i realnie pomocnie – zarówno w pracy nauczyciela, jak i w rozwoju ucznia.',
      'Nasze warsztaty dla nauczycieli koncentrują się na przygotowaniu materiałów dydaktycznych, personalizacji zadań, ocenianiu formatywnym i pracy z uczniem o specjalnych potrzebach. Dla uczniów prowadzimy zajęcia rozwijające krytyczne myślenie i świadome korzystanie z AI – jako narzędzia, a nie zamiennika myślenia.',
      'Wszystkie programy są zgodne z podstawą programową i wytycznymi MEN dotyczącymi bezpieczeństwa cyfrowego oraz ochrony danych uczniów.',
    ],
    modules: [
      { title: 'AI dla nauczycieli — podstawy', desc: 'Jak wykorzystać ChatGPT i inne narzędzia w przygotowaniu lekcji, sprawdzianów i materiałów pomocniczych.' },
      { title: 'AI dla ucznia — świadome korzystanie', desc: 'Krytyczne myślenie, wykrywanie błędów modelu, granice zaufania do AI i etyka pracy.' },
      { title: 'Warsztat dla dyrekcji', desc: 'Polityka szkolna wobec AI, komunikacja z rodzicami, zapisy w statutach i regulaminach.' },
      { title: 'AI w projekcie edukacyjnym', desc: 'Uczniowie wykorzystują AI do stworzenia realnego projektu klasowego – od pomysłu po prezentację.' },
    ],
    audience: [
      'Szkoły podstawowe (klasy 7–8) i ponadpodstawowe.',
      'Uczelnie wyższe i szkoły językowe.',
      'Rady pedagogiczne i zespoły nauczycielskie.',
      'Dyrekcje planujące spójną politykę szkoły wobec AI.',
    ],
    outcomes: [
      'Nauczyciele oszczędzają czas na przygotowaniu materiałów dydaktycznych.',
      'Uczniowie korzystają z AI świadomie i etycznie, zamiast „ściągać”.',
      'Szkoła zyskuje spójną, aktualną politykę wobec sztucznej inteligencji.',
      'Rodzice mają jasny komunikat, jak szkoła podchodzi do nowoczesnych narzędzi.',
    ],
    faq: [
      { q: 'Czy szkolenia są zgodne z RODO i wytycznymi MEN?', a: 'Tak. Wszystkie rekomendacje są zgodne z RODO oraz aktualnymi wytycznymi dotyczącymi cyfryzacji szkół i ochrony danych uczniów.' },
      { q: 'Czy prowadzicie zajęcia z uczniami?', a: 'Tak. Prowadzimy zarówno rady pedagogiczne dla nauczycieli, jak i lekcje/warsztaty dla uczniów – dostosowane do wieku.' },
      { q: 'Ile trwa program dla szkoły?', a: 'Od jednorazowej rady pedagogicznej (4h) po cykl kilku spotkań z ewaluacją. Zakres ustalamy z dyrekcją.' },
      { q: 'Czy dostajemy materiały dla nauczycieli?', a: 'Tak. Nauczyciele otrzymują pakiet gotowych scenariuszy lekcji, promptów i szablonów do własnej pracy.' },
    ],
  },
  'szkolenia-chatgpt': {
    slug: 'szkolenia-chatgpt',
    path: '/szkolenia-ai/chatgpt',
    anchorPrefix: 'Szkolenia z ChatGPT',
    metaTitle: 'Szkolenia z ChatGPT — praktyczne warsztaty dla firm i osób | OpenMind AI',
    metaDescription:
      'Szkolenia z ChatGPT: promptowanie, wtyczki, GPT-y własne, automatyzacja pracy. Warsztaty dla firm i osób prywatnych – online i stacjonarnie w całej Polsce.',
    keywords:
      'szkolenia ChatGPT, warsztaty ChatGPT, kurs ChatGPT, szkolenia z ChatGPT dla firm, promptowanie ChatGPT, GPT dla firm, OpenMind AI',
    h1: 'Szkolenia z ChatGPT',
    lead: 'Od pierwszego prompta po własne GPT – dedykowany warsztat dla osób i zespołów, które chcą wycisnąć z ChatGPT maksimum.',
    intro: [
      'Szkolenia z ChatGPT prowadzimy dla osób, które codziennie pracują z tekstem, dokumentami, analizą lub obsługą klienta. Uczymy nie „chwytów”, tylko myślenia – jak konstruować prompty, kiedy używać modeli szybszych, a kiedy zaawansowanych, jak pracować z długim kontekstem i plikami.',
      'W programie znajduje się zaawansowane promptowanie, praca z Custom Instructions, tworzenie własnych GPT-ów dla firmy, integracja z plikami, arkuszami i pocztą, a także wprowadzenie do automatyzacji z użyciem ChatGPT i narzędzi zewnętrznych.',
      'Uczestnicy pracują na swoich realnych zadaniach – wychodzą z sesji z gotowymi promptami, szablonami i mini-workflowami, które od razu wdrażają w firmie.',
    ],
    modules: [
      { title: 'Zaawansowane promptowanie', desc: 'Techniki: role, kontekst, przykłady, łańcuchy myśli, ograniczanie halucynacji.' },
      { title: 'Custom Instructions i pamięć', desc: 'Jak trwale spersonalizować ChatGPT pod własny styl pracy i firmowy kontekst.' },
      { title: 'Własne GPT-y', desc: 'Budowa dedykowanego GPT dla działu, produktu lub klienta – bez kodowania.' },
      { title: 'ChatGPT + pliki i dane', desc: 'Analiza plików, PDF-ów, arkuszy i raportów – bezpiecznie i powtarzalnie.' },
    ],
    audience: [
      'Zespoły marketingu, sprzedaży, obsługi klienta i administracji.',
      'Analitycy, konsultanci i osoby pracujące z dużą ilością tekstu.',
      'Managerowie i przedsiębiorcy chcący pracować szybciej.',
      'Osoby prywatne, które chcą świadomie korzystać z ChatGPT w pracy.',
    ],
    outcomes: [
      'Krótszy czas przygotowania standardowych dokumentów i maili.',
      'Wyższa jakość odpowiedzi ChatGPT dzięki lepszym promptom.',
      'Firma zyskuje własne GPT-y wielokrotnego użytku.',
      'Uczestnicy pracują pewniej i bez ryzyka związanego z danymi.',
    ],
    faq: [
      { q: 'Czy potrzebuję konta Plus/Enterprise?', a: 'Dla pełnej korzyści polecamy plan Plus lub firmowy. Podczas szkolenia pokazujemy, kiedy warto zainwestować, a kiedy wystarczy plan darmowy.' },
      { q: 'Czy uczycie także innych modeli?', a: 'Tak. W kontekście porównania pokazujemy Claude, Gemini i Copilot – aby uczestnik wiedział, kiedy który model daje najlepszy efekt.' },
      { q: 'Czy szkolenie jest online?', a: 'Prowadzimy zarówno online (Teams/Zoom), jak i stacjonarnie w całej Polsce.' },
      { q: 'Czy mogę zamówić szkolenie 1:1?', a: 'Tak. Oferujemy sesje indywidualne dla managerów, przedsiębiorców i specjalistów – w formie krótkich, intensywnych bloków.' },
    ],
  },
};

export const trainingsList: TrainingData[] = Object.values(trainings);
