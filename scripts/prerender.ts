/**
 * Postbuild prerender — generates per-route static HTML files in dist/
 * so Googlebot sees real titles, descriptions, canonicals and a SEO content
 * snippet inside #root BEFORE the React bundle hydrates.
 *
 * Driven by the existing sitemap-*.xml files (single source of truth for URLs).
 * Does NOT touch vite.config.ts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { voivodeships } from '../src/data/voivodeships';
import { findCityContent } from '../src/data/cityContent/index';
import { digestArticles } from '../src/data/blogArticlesDigest';
import { services as SERVICES_REGISTRY, HUB as SERVICES_HUB, servicesList, type Proto } from '../src/data/services/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.openmindai.pl';

if (!fs.existsSync(DIST)) {
  console.error('[prerender] dist/ not found — run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

// ---------------------------------------------------------------------------
// URL → metadata mapping
// ---------------------------------------------------------------------------
type Meta = {
  title: string;
  description: string;
  h1: string;
  body: string; // HTML inside #root, replaces the default home snippet
  jsonLd?: object; // optional per-route JSON-LD injected into <head>
};

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

const ORG_JSONLD = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'OpenMind AI Consulting',
  url: SITE,
  logo: `${SITE}/og-image.jpg`,
  email: 'biuro@openmindai.pl',
  areaServed: { '@type': 'Country', name: 'Polska' },
  founder: { '@type': 'Person', name: 'Łukasz Czarnecki' },
};

function serviceLd(name: string, description: string, url: string, serviceType: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType,
    provider: ORG_JSONLD,
    areaServed: { '@type': 'Country', name: 'Polska' },
  };
}

const STATIC_META: Record<string, Meta> = {
  '/services': {
    title: 'Usługi AI – Konsulting, Szkolenia, Wdrożenia, Automatyzacja | OpenMind AI',
    description: 'Pełna oferta OpenMind AI: konsulting AI, szkolenia ze sztucznej inteligencji, wdrożenia AI, automatyzacja procesów, agencja kreatywna AI, AI dla szkół, tworzenie stron WWW.',
    h1: 'Wszystkie usługi AI dla firm – konsulting, szkolenia i wdrożenia',
    body: `<p>OpenMind AI Consulting to polski hub technologiczny dostarczający kompleksowe usługi z zakresu sztucznej inteligencji dla firm każdej wielkości, agencji marketingowych, placówek edukacyjnych i instytucji publicznych. Łączymy głęboką wiedzę inżynierską o modelach językowych (ChatGPT, Claude, Gemini, Microsoft Copilot, modele open-source LLaMA i Mistral) z praktycznym doświadczeniem wdrożeniowym w branżach takich jak e-commerce, medycyna, prawo, nieruchomości, finanse i produkcja.</p>
<h2>Konsulting AI</h2>
<p>Strategiczne doradztwo w obszarze sztucznej inteligencji: audyt procesów biznesowych, identyfikacja przypadków użycia o najwyższym ROI, dobór modeli i narzędzi AI, mapa drogowa wdrożenia, analiza kosztów licencji i infrastruktury, zarządzanie zmianą w organizacji.</p>
<h2>Szkolenia AI</h2>
<p>Praktyczne warsztaty dla pracowników i kadry zarządzającej: prompt engineering, ChatGPT i Claude w codziennej pracy, automatyzacja workflow, generatywna AI w marketingu i sprzedaży, narzędzia copywriterskie, asystenci AI dla zespołów obsługi klienta.</p>
<h2>Wdrożenia i automatyzacja</h2>
<p>Łączymy modele AI z platformami no-code/low-code (Make, n8n, Zapier) oraz dedykowanymi API, aby automatyzować obsługę klienta, raportowanie, analizę danych, content marketing, przetwarzanie dokumentów i wewnętrzne procesy administracyjne.</p>
<h2>Agencja kreatywna AI</h2>
<p>Produkcja materiałów reklamowych z wykorzystaniem generatywnej AI: filmy promocyjne (Runway, Sora), obrazy i grafiki (Midjourney, Stable Diffusion), voice-over wielojęzyczny (ElevenLabs), kampanie social media oraz spójne identyfikacje wizualne.</p>
<h2>AI dla szkół i edukacji</h2>
<p>Szkolenia rad pedagogicznych, warsztaty dla uczniów, polityki użycia AI w placówkach, wdrożenia asystentów AI dla nauczycieli oraz integracja narzędzi AI z platformami edukacyjnymi i dziennikami elektronicznymi.</p>
<h2>Tworzenie stron WWW</h2>
<p>Projektujemy i wdrażamy szybkie, dostępne (WCAG) i zoptymalizowane pod SEO strony internetowe z opcjonalnymi modułami AI: chatbot, wyszukiwanie semantyczne, personalizacja treści, integracje z CRM i ERP.</p>
<p>Pierwsza konsultacja jest zawsze bezpłatna i niezobowiązująca. Działamy w całej Polsce — zdalnie oraz stacjonarnie w największych ośrodkach miejskich. Skontaktuj się z nami przez <a href="/contact">formularz kontaktowy</a> lub mailowo: biuro@openmindai.pl.</p>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Usługi AI OpenMind',
      itemListElement: [
        ['Konsulting AI', '/services/konsulting-ai'],
        ['Szkolenia AI', '/services/szkolenia-ai'],
        ['Automatyzacja procesów AI', '/services/automatyzacja-ai'],
        ['Agencja kreatywna AI', '/services/agencja-kreatywna-ai'],
        ['AI dla szkół', '/services/ai-dla-szkol'],
        ['Tworzenie stron WWW', '/services/tworzenie-stron-www'],
      ].map(([name, url], i) => ({
        '@type': 'ListItem', position: i + 1, name, url: SITE + url,
      })),
    },
  },
  '/services/konsulting-ai': {
    title: 'Konsulting AI dla firm – Strategia Sztucznej Inteligencji | OpenMind AI',
    description: 'Konsulting AI dla firm w Polsce. Audyt potrzeb, dobór narzędzi sztucznej inteligencji, mapa wdrożeń, ROI. Doświadczeni eksperci AI z OpenMind AI.',
    h1: 'Konsulting AI – strategiczne wdrożenie sztucznej inteligencji w firmie',
    body: `<p>Konsulting AI OpenMind to kompleksowe doradztwo strategiczne dla organizacji, które chcą efektywnie wdrożyć sztuczną inteligencję w swoich procesach biznesowych. Pomagamy zarządom, dyrektorom operacyjnym i menedżerom transformacji cyfrowej przekuć potencjał AI w mierzalne wyniki: oszczędność czasu, redukcję kosztów operacyjnych, lepsze doświadczenie klienta oraz przewagę konkurencyjną.</p>
<h2>Co obejmuje konsulting AI</h2>
<p>Pracę zaczynamy od audytu obecnych procesów — identyfikujemy wąskie gardła, powtarzalne zadania manualne, miejsca, gdzie dane są niewykorzystane, oraz obszary, w których generatywna AI lub klasyczne modele ML mogą przynieść największą wartość. Następnie tworzymy mapę przypadków użycia uporządkowaną według ROI i trudności wdrożenia.</p>
<h2>Dobór narzędzi i modeli</h2>
<p>Dobieramy konkretne rozwiązania — ChatGPT Enterprise, Claude for Work, Microsoft Copilot, Google Gemini, modele open-source uruchamiane lokalnie (LLaMA, Mistral), narzędzia branżowe oraz dedykowane integracje API. Uwzględniamy wymagania regulacyjne, bezpieczeństwo danych (RODO), koszty licencji i skalowalność.</p>
<h2>Mapa drogowa wdrożenia</h2>
<p>Dostarczamy konkretny plan: priorytety, kamienie milowe, budżet, role w zespole, KPI sukcesu oraz mechanizmy zarządzania zmianą. Wspieramy także zarządy w przygotowaniu komunikacji wewnętrznej i polityki użycia AI w organizacji.</p>
<h2>Dla kogo</h2>
<p>Współpracujemy z firmami produkcyjnymi, e-commerce, kancelariami prawnymi, klinikami medycznymi, biurami nieruchomości, agencjami marketingowymi i instytucjami publicznymi. Każdy projekt zaczynamy od bezpłatnej konsultacji, podczas której rozpoznajemy potrzeby i przedstawiamy realny harmonogram pracy.</p>
<h2>FAQ – konsulting AI</h2>
<h3>Ile trwa projekt konsultingowy?</h3>
<p>Standardowy audyt z mapą wdrożeń trwa od 2 do 6 tygodni, w zależności od skali organizacji i liczby analizowanych procesów. Pierwsze rekomendacje przekazujemy zwykle już po pierwszych warsztatach.</p>
<h3>Czy potrzebujemy własnego zespołu AI?</h3>
<p>Nie. Możemy pełnić rolę zewnętrznego zespołu lub przygotować Twój zespół wewnętrzny do samodzielnego prowadzenia wdrożeń.</p>`,
    jsonLd: serviceLd('Konsulting AI', 'Strategiczne doradztwo w obszarze sztucznej inteligencji: audyt, dobór narzędzi, mapa wdrożeń, ROI.', `${SITE}/services/konsulting-ai.html`, 'AI Consulting'),
  },
  '/services/szkolenia-ai': {
    title: 'Szkolenia AI dla firm i pracowników – ChatGPT, Claude, Copilot | OpenMind AI',
    description: 'Praktyczne szkolenia AI dla firm i pracowników: ChatGPT, Claude, Copilot, Gemini, automatyzacja, prompt engineering. Online i stacjonarnie w całej Polsce.',
    h1: 'Szkolenia AI – praktyczne warsztaty ze sztucznej inteligencji',
    body: `<p>Szkolenia AI OpenMind to praktyczne, warsztatowe programy edukacyjne dedykowane firmom, agencjom, instytucjom i zespołom, które chcą realnie zwiększyć produktywność dzięki sztucznej inteligencji. W odróżnieniu od szkoleń teoretycznych skupiamy się na konkretnych przepływach pracy, gotowych promptach i mierzalnych oszczędnościach czasu.</p>
<h2>Programy szkoleniowe</h2>
<p>Oferujemy modułowe ścieżki dopasowane do roli i poziomu zaawansowania: ChatGPT i Claude w pracy biurowej, prompt engineering dla zaawansowanych, generatywna AI w marketingu i sprzedaży, automatyzacja workflow z Make/n8n/Zapier, Microsoft Copilot w pakiecie Office 365, narzędzia obrazowe (Midjourney, Stable Diffusion) i wideo (Runway, Sora), asystenci AI dla zespołów obsługi klienta.</p>
<h2>Co obejmują szkolenia</h2>
<p>Każde szkolenie zawiera część teoretyczną (jak działają najlepsze modele AI, jak formułować skuteczne prompty), część warsztatową (ćwiczenia na realnych przypadkach uczestników), bibliotekę gotowych promptów branżowych oraz materiały do samodzielnej dalszej nauki. Po szkoleniu uczestnicy otrzymują certyfikaty oraz dostęp do społeczności absolwentów.</p>
<h2>Dla kogo</h2>
<p>Szkolenia kierujemy do zespołów marketingu, sprzedaży, obsługi klienta, HR, finansów, IT, zarządów oraz nauczycieli i wykładowców. Programy dostosowujemy do branży i poziomu zaawansowania uczestników — od osób, które dopiero zaczynają, po zaawansowanych użytkowników budujących własne automatyzacje.</p>
<h2>Format i lokalizacja</h2>
<p>Prowadzimy szkolenia online (Microsoft Teams, Zoom, Google Meet), stacjonarnie w siedzibie klienta w całej Polsce, a także w formacie hybrydowym. Standardowe formaty: warsztat 4-godzinny, intensywny dzień szkoleniowy (8h), ścieżka 3-dniowa dla zaawansowanych. Pierwsze efekty uczestnicy widzą zwykle w ciągu kilku dni od zakończenia szkolenia.</p>
<h2>FAQ – szkolenia AI</h2>
<h3>Ile osób może uczestniczyć w jednym szkoleniu?</h3>
<p>Rekomendujemy grupy 8-15 osób dla maksymalnej interaktywności, ale realizujemy też duże webinary edukacyjne dla 100+ uczestników.</p>
<h3>Czy szkolenie jest dostosowane do mojej branży?</h3>
<p>Tak. Przed każdym szkoleniem przeprowadzamy krótki wywiad, aby dopasować przykłady i prompty do realiów Twojej firmy.</p>`,
    jsonLd: serviceLd('Szkolenia AI', 'Praktyczne warsztaty z ChatGPT, Claude, Copilot, Gemini, prompt engineering i automatyzacji workflow.', `${SITE}/services/szkolenia-ai.html`, 'AI Training'),
  },
  '/services/automatyzacja-ai': {
    title: 'Automatyzacja procesów z AI – Workflow, n8n, Zapier | OpenMind AI',
    description: 'Automatyzacja procesów biznesowych z AI: integracje, workflow, raportowanie, obsługa klienta, generowanie treści. Make, n8n, Zapier + modele językowe.',
    h1: 'Automatyzacja procesów ze sztuczną inteligencją',
    body: `<p>Automatyzacja procesów z AI to dziś najszybsza droga do redukcji kosztów operacyjnych i odciążenia zespołów od powtarzalnych zadań. OpenMind AI łączy najlepsze modele językowe (ChatGPT, Claude, Gemini) z platformami no-code/low-code (Make, n8n, Zapier) oraz dedykowanymi integracjami API, aby projektować end-to-end automatyzacje dopasowane do realiów Twojej organizacji.</p>
<h2>Co automatyzujemy</h2>
<p>Najczęstsze obszary wdrożeń: obsługa zapytań klientów przez e-mail i czat, automatyczne odpowiedzi w skrzynkach mailowych, kategoryzacja i streszczanie wiadomości, generowanie raportów sprzedażowych i finansowych, ekstrakcja danych z dokumentów (faktury, umowy, CV), tworzenie treści marketingowych i social media, monitorowanie mediów i konkurencji, kwalifikacja leadów, onboarding nowych pracowników.</p>
<h2>Stack technologiczny</h2>
<p>Pracujemy w środowiskach Make (Integromat), n8n (self-hosted lub cloud), Zapier, Microsoft Power Automate oraz bezpośrednio na API OpenAI, Anthropic, Google AI Studio. Dla wymagających klientów dostarczamy też rozwiązania self-hosted z modelami open-source (LLaMA, Mistral) — gdy dane nie mogą opuścić infrastruktury firmy.</p>
<h2>Przebieg projektu</h2>
<p>Zaczynamy od warsztatu mapującego procesy, identyfikujemy najlepszych kandydatów do automatyzacji według kryterium częstotliwości × czas × ryzyko błędu. Następnie projektujemy workflow, dostarczamy prototyp, testujemy na realnych danych i wdrażamy produkcyjnie z monitoringiem. Każda automatyzacja jest dokumentowana i przekazywana zespołowi klienta wraz ze szkoleniem.</p>
<h2>Bezpieczeństwo danych</h2>
<p>Wszystkie wdrożenia projektujemy zgodnie z RODO. Stosujemy maskowanie danych wrażliwych, logowanie operacji, kontrolę dostępu i — gdy to konieczne — przetwarzanie wyłącznie w infrastrukturze klienta.</p>
<h2>FAQ – automatyzacja AI</h2>
<h3>Ile kosztuje wdrożenie?</h3>
<p>Małe automatyzacje (1-3 workflow) startują od kilku tysięcy złotych. Większe projekty wyceniamy indywidualnie po warsztacie mapującym.</p>`,
    jsonLd: serviceLd('Automatyzacja procesów AI', 'Workflow z modelami AI w Make, n8n, Zapier, Power Automate oraz dedykowane integracje API.', `${SITE}/services/automatyzacja-ai.html`, 'AI Process Automation'),
  },
  '/services/agencja-kreatywna-ai': {
    title: 'Agencja Kreatywna AI – Wideo AI, Obrazy AI, Reklamy | OpenMind AI',
    description: 'Produkcja kreatywna z AI: wideo AI, obrazy AI, reklamy, animacje, content social media. Najlepsze narzędzia AI dla branży kreatywnej.',
    h1: 'Agencja kreatywna AI – wideo, obrazy i reklamy generatywne',
    body: `<p>Agencja kreatywna AI OpenMind dostarcza pełen zakres produkcji marketingowej i artystycznej z wykorzystaniem najlepszych narzędzi generatywnej sztucznej inteligencji. Tworzymy filmy reklamowe, grafiki, kampanie social media, identyfikacje wizualne oraz materiały edukacyjne — szybciej, taniej i często w jakości nieosiągalnej dla tradycyjnej produkcji.</p>
<h2>Wideo AI</h2>
<p>Realizujemy spoty reklamowe, animacje produktowe, materiały edukacyjne i content na social media z wykorzystaniem topowych narzędzi wideo AI (Runway, Sora, Kling, Luma). Dostarczamy gotowe pliki z dopracowaną kolorystyką, montażem i ścieżką dźwiękową.</p>
<h2>Obrazy i grafika AI</h2>
<p>Generujemy obrazy reklamowe, key visualy kampanii, ilustracje produktowe, infografiki i materiały do druku przy pomocy Midjourney, Stable Diffusion, Flux i DALL-E. Po wygenerowaniu obrazy przechodzą retusz i kompozycję zgodną z księgą znaku klienta.</p>
<h2>Voice i audio</h2>
<p>Tworzymy lektoraty wielojęzyczne (ElevenLabs), dubbingi, podkłady muzyczne i jingle audio. Dla marek międzynarodowych zapewniamy spójny głos brand voice w kilkunastu językach.</p>
<h2>Kampanie i content marketing</h2>
<p>Projektujemy kompleksowe kampanie social media z automatycznym pipeline'em: brief → koncepcja → generacja materiałów → publikacja → analityka. Pracujemy dla marek e-commerce, gastronomii, edukacji, beauty, motoryzacji i B2B.</p>
<h2>FAQ – agencja AI</h2>
<h3>Czy materiały generowane przez AI można wykorzystać komercyjnie?</h3>
<p>Tak — pracujemy wyłącznie na licencjach komercyjnych narzędzi i przekazujemy klientowi pełne prawa do wykorzystania w kampaniach reklamowych.</p>
<h3>Jak szybko dostarczacie pierwsze efekty?</h3>
<p>Pierwsze materiały koncepcyjne przekazujemy zazwyczaj w ciągu kilku dni od briefu.</p>`,
    jsonLd: serviceLd('Agencja Kreatywna AI', 'Wideo AI, obrazy AI, voice-over, kampanie social media i identyfikacje wizualne z generatywną AI.', `${SITE}/services/agencja-kreatywna-ai.html`, 'Creative AI Agency'),
  },
  '/services/ai-dla-szkol': {
    title: 'AI dla Szkół – Szkolenia dla Nauczycieli, Warsztaty | OpenMind AI',
    description: 'Sztuczna inteligencja w edukacji: szkolenia dla nauczycieli, warsztaty dla uczniów, wdrożenie narzędzi AI w szkołach. Cała Polska.',
    h1: 'AI dla szkół – sztuczna inteligencja w edukacji',
    body: `<p>Program AI dla szkół OpenMind to kompleksowe wsparcie placówek edukacyjnych — szkół podstawowych, średnich, uczelni wyższych oraz instytucji edukacji pozaformalnej — we wdrażaniu sztucznej inteligencji w sposób bezpieczny, dydaktycznie wartościowy i zgodny z polityką oświatową.</p>
<h2>Szkolenia rad pedagogicznych</h2>
<p>Prowadzimy warsztaty dla nauczycieli wszystkich przedmiotów: jak wykorzystywać ChatGPT, Claude i Gemini do przygotowywania konspektów lekcji, materiałów dydaktycznych, sprawdzianów i scenariuszy projektowych. Pokazujemy konkretne przepływy pracy oszczędzające godziny tygodniowo.</p>
<h2>Warsztaty dla uczniów</h2>
<p>Prowadzimy lekcje i koła tematyczne dla uczniów: jak odpowiedzialnie korzystać z AI, jak weryfikować informacje generowane przez modele, jak wykorzystywać AI do nauki języków, programowania, projektowania i kreatywnego pisania.</p>
<h2>Polityki użycia AI</h2>
<p>Pomagamy szkołom opracować klarowną politykę użycia AI: jakie narzędzia są dozwolone, jak rozpoznawać prace generowane, jak oceniać projekty wspomagane AI. Polityki są dostosowane do podstawy programowej i polskich realiów.</p>
<h2>Wdrożenia narzędzi</h2>
<p>Wdrażamy asystentów AI dla nauczycieli (generator zadań, ocenianie wypracowań, analiza postępów uczniów) oraz integrujemy narzędzia AI z platformami edukacyjnymi i dziennikami elektronicznymi.</p>
<h2>FAQ – AI w edukacji</h2>
<h3>Czy AI w szkole to nie jest oszukiwanie?</h3>
<p>AI to narzędzie — kluczowe jest, jak nauczyciele i uczniowie się nim posługują. Nasze szkolenia pokazują, jak budować umiejętności krytycznego korzystania z AI, a nie unikania jej.</p>`,
    jsonLd: serviceLd('AI dla szkół', 'Szkolenia dla nauczycieli, warsztaty dla uczniów, polityki użycia AI, wdrożenia asystentów AI w edukacji.', `${SITE}/services/ai-dla-szkol.html`, 'AI for Education'),
  },
  '/services/tworzenie-stron-www': {
    title: 'Tworzenie stron WWW z AI – Nowoczesne Strony Internetowe | OpenMind AI',
    description: 'Projektowanie i wdrożenie nowoczesnych stron WWW z wykorzystaniem AI. SEO, performance, integracje, asystenci AI na stronie.',
    h1: 'Tworzenie stron WWW – nowoczesne strony z AI',
    body: `<p>OpenMind AI projektuje i wdraża nowoczesne strony internetowe — od stron firmowych i landing page'ów po rozbudowane platformy e-commerce i aplikacje webowe. Łączymy nowoczesny design z najwyższą jakością techniczną: szybkie ładowanie, dostępność (WCAG), pełna optymalizacja SEO i opcjonalne moduły AI.</p>
<h2>Co dostarczamy</h2>
<p>Każdy projekt obejmuje: analizę potrzeb biznesowych i grupy docelowej, projekt UX/UI, identyfikację wizualną dopasowaną do marki, wdrożenie techniczne (React, TypeScript, nowoczesny stack), integracje z CMS, CRM i systemami płatności, optymalizację SEO oraz wsparcie powdrożeniowe.</p>
<h2>Moduły AI</h2>
<p>Na życzenie klienta integrujemy moduły AI: chatbot konsultacyjny lub sprzedażowy, wyszukiwarka semantyczna w treści strony, personalizacja contentu względem segmentu użytkownika, automatyczne podsumowania artykułów, generowanie opisów produktów, asystent obsługi klienta 24/7.</p>
<h2>SEO i wydajność</h2>
<p>Każda strona przechodzi audyt SEO (meta tagi, schema.org, sitemapy, hreflang dla wersji wielojęzycznych) oraz audyt Core Web Vitals. Dbamy o ocenę powyżej 90 w Lighthouse i pełną zgodność z wytycznymi Google.</p>
<h2>Dla kogo</h2>
<p>Tworzymy strony dla firm produkcyjnych, usługowych, e-commerce, kancelarii prawnych, klinik medycznych, biur nieruchomości, restauracji, hoteli oraz instytucji publicznych. Pierwsze efekty wdrożenia widać zwykle w ciągu kilku tygodni od startu projektu.</p>`,
    jsonLd: serviceLd('Tworzenie stron WWW', 'Projektowanie i wdrożenie nowoczesnych stron internetowych z optymalizacją SEO i opcjonalnymi modułami AI.', `${SITE}/services/tworzenie-stron-www.html`, 'Web Development'),
  },
  '/about': {
    title: 'O nas – OpenMind AI Consulting | Eksperci AI w Polsce',
    description: 'Poznaj OpenMind AI Consulting – polski hub technologiczny łączący inżynierię AI z kreatywnością. Szkolenia, wdrożenia, generatywne media, automatyzacja.',
    h1: 'O OpenMind AI – polski hub konsultingu sztucznej inteligencji',
    body: `<p>OpenMind AI Consulting to polski hub technologiczny łączący głęboką wiedzę inżynierską o sztucznej inteligencji z kreatywnością i doświadczeniem biznesowym. Powstaliśmy z przekonania, że AI nie powinna być wyłącznie domeną Doliny Krzemowej — polskie firmy, szkoły i instytucje zasługują na partnera, który mówi ich językiem, rozumie realia rynkowe i dostarcza wdrożenia przynoszące mierzalne efekty.</p>
<h2>Misja</h2>
<p>Naszą misją jest demokratyzacja dostępu do najlepszych narzędzi AI w polskich organizacjach. Wierzymy, że sztuczna inteligencja powinna wspierać człowieka — odciążać od powtarzalnych zadań, otwierać nowe możliwości twórcze i podnosić jakość pracy.</p>
<h2>Założyciel</h2>
<p>OpenMind AI Consulting prowadzi <strong>Łukasz Czarnecki</strong> — przedsiębiorca, konsultant AI i edukator z wieloletnim doświadczeniem w transformacji cyfrowej. Łukasz osobiście prowadzi kluczowe projekty wdrożeniowe i szkolenia, dbając o najwyższą jakość każdej współpracy.</p>
<h2>Zespół ekspertów</h2>
<p>Nasz zespół to inżynierowie AI, specjaliści ds. automatyzacji procesów, designerzy, copywriterzy i edukatorzy. Łączy nas pasja do nowych technologii oraz nastawienie na realne wyniki klientów — nie efektowne demo, lecz wdrożenia, które działają w produkcji miesiącami i latami.</p>
<h2>Doświadczenie branżowe</h2>
<p>Realizowaliśmy projekty dla klientów z e-commerce, medycyny, prawa, edukacji, nieruchomości, produkcji, gastronomii, beauty, finansów, marketingu i mediów. To pozwala nam szybko rozpoznawać wzorce, dostarczać sprawdzone rozwiązania i unikać pułapek typowych dla nowych wdrożeń AI.</p>
<h2>Wartości</h2>
<p>Praktyczność — każde rozwiązanie musi przynieść konkretną wartość. Transparentność — uczciwie mówimy o tym, czego AI dziś jeszcze nie potrafi. Bezpieczeństwo — wszystkie wdrożenia zgodne z RODO i dobrymi praktykami branżowymi. Edukacja — przekazujemy wiedzę, a nie tworzymy uzależnienia od konsultanta.</p>
<h2>Skontaktuj się z nami</h2>
<p>Bezpłatna pierwsza konsultacja: <a href="/contact">formularz</a> lub biuro@openmindai.pl. Działamy w całej Polsce.</p>`,
    jsonLd: {
      '@context': 'https://schema.org',
      ...ORG_JSONLD,
      description: 'Polski hub konsultingu sztucznej inteligencji. Szkolenia, wdrożenia, automatyzacja procesów, agencja kreatywna AI i AI dla edukacji.',
    },
  },
  '/contact': {
    title: 'Kontakt – Bezpłatna Konsultacja AI | OpenMind AI',
    description: 'Skontaktuj się z OpenMind AI. Bezpłatna konsultacja: szkolenia AI, wdrożenia AI, automatyzacja, produkcja kreatywna. Odpowiadamy w 24h.',
    h1: 'Kontakt – bezpłatna konsultacja AI',
    body: `<p>Skontaktuj się z OpenMind AI Consulting, aby umówić bezpłatną i niezobowiązującą konsultację. Pomożemy Ci ocenić potencjał wdrożenia sztucznej inteligencji w Twojej firmie, szkole lub instytucji oraz zaproponujemy konkretny plan działania.</p>
<h2>Dane kontaktowe</h2>
<p>E-mail: <strong>biuro@openmindai.pl</strong><br>Odpowiadamy na wszystkie wiadomości w ciągu 24 godzin w dni robocze.</p>
<h2>Formularz kontaktowy</h2>
<p>Najszybszą drogą jest formularz na tej stronie — opisz krótko swoje potrzeby, branżę, wielkość zespołu i preferowany format współpracy (szkolenie, wdrożenie, konsulting, produkcja kreatywna). Wrócimy do Ciebie z propozycją terminu bezpłatnej rozmowy.</p>
<h2>Bezpłatna konsultacja</h2>
<p>Pierwsza rozmowa (online, 30-45 minut) jest bezpłatna. Podczas konsultacji rozpoznajemy potrzeby, omawiamy możliwe scenariusze wdrożenia AI, szacujemy korzyści biznesowe oraz przedstawiamy referencje z podobnych projektów.</p>
<h2>Godziny pracy</h2>
<p>Poniedziałek-piątek: 9:00-17:00. Konsultacje umawiamy także w godzinach wieczornych lub w weekendy — dla klientów, dla których to wygodniejszy termin.</p>
<h2>Zasięg geograficzny</h2>
<p>Działamy w całej Polsce. Szkolenia i konsultacje prowadzimy zdalnie (Microsoft Teams, Zoom, Google Meet) oraz stacjonarnie w siedzibach klientów w największych ośrodkach miejskich — Warszawie, Krakowie, Wrocławiu, Poznaniu, Gdańsku, Łodzi, Katowicach i innych. Pełną listę obsługiwanych lokalizacji znajdziesz w <a href="/">sekcji Gdzie działamy</a>.</p>
<h2>Bezpieczeństwo komunikacji</h2>
<p>Wszystkie informacje przekazane podczas konsultacji traktujemy poufnie. Na życzenie podpisujemy NDA jeszcze przed pierwszą rozmową.</p>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Kontakt – OpenMind AI Consulting',
      url: `${SITE}/contact.html`,
      mainEntity: {
        ...ORG_JSONLD,
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'biuro@openmindai.pl',
          contactType: 'customer support',
          areaServed: 'PL',
          availableLanguage: ['Polish', 'English'],
        },
      },
    },
  },
  '/blog': {
    title: 'Baza Wiedzy o AI – Artykuły, Poradniki, Aktualności | OpenMind AI',
    description: 'Praktyczna baza wiedzy o sztucznej inteligencji: artykuły o ML, automatyzacji, ChatGPT, generatywnej AI, wdrożeniach dla firm, trendach AI.',
    h1: 'Baza Wiedzy o AI – artykuły, poradniki i aktualności',
    body: `<p>Baza Wiedzy OpenMind AI to ponad 110 praktycznych artykułów o sztucznej inteligencji — od podstaw machine learning, przez nowości w największych modelach językowych (ChatGPT, Claude, Gemini, Copilot), po szczegółowe poradniki wdrożeniowe dla biznesu i edukacji.</p>
<h2>Co znajdziesz w bazie</h2>
<p>Publikujemy regularnie artykuły i poradniki o kluczowych obszarach sztucznej inteligencji:</p>
<ul>
<li><strong>LLM</strong> – analizy największych modeli językowych, porównania, nowości od OpenAI, Anthropic, Google i Meta</li>
<li><strong>Agenci AI</strong> – jak działają agenci autonomiczni, jak je wdrożyć w biznesie</li>
<li><strong>Wideo AI</strong> – generatywna produkcja wideo (Runway, Sora, Kling, Luma)</li>
<li><strong>Obrazy AI</strong> – Midjourney, Stable Diffusion, Flux, DALL-E w praktyce</li>
<li><strong>Audio</strong> – synteza mowy (ElevenLabs), muzyka generatywna, transkrypcja</li>
<li><strong>Hardware</strong> – chipy AI (NVIDIA, AMD, Apple Silicon), infrastruktura GPU</li>
<li><strong>Inwestycje</strong> – analizy rynku AI, fundusze venture, IPO firm AI</li>
<li><strong>Regulacje</strong> – AI Act, RODO, polityki użycia AI</li>
<li><strong>Badania</strong> – kluczowe publikacje naukowe wytłumaczone prostym językiem</li>
<li><strong>Zastosowania</strong> – case study wdrożeń AI w polskich i zagranicznych firmach</li>
</ul>
<h2>Dla kogo</h2>
<p>Artykuły piszemy z myślą o przedsiębiorcach, menedżerach, marketerach, edukatorach, deweloperach i wszystkich, którzy chcą zrozumieć i praktycznie wykorzystać sztuczną inteligencję. Stawiamy na jasny język, konkretne przykłady i pełną aktualność informacji.</p>
<h2>Aktualizacje</h2>
<p>Nowe artykuły publikujemy regularnie — śledź naszą bazę wiedzy, aby być na bieżąco z najważniejszymi trendami w świecie AI. Pierwsze 60 artykułów stanowi solidne wprowadzenie do tematu, kolejne 50 to AI Digest 2026 — kompletny przegląd najważniejszych wydarzeń, badań, modeli i premier produktowych.</p>
<h2>Polecane tematy</h2>
<p>Najczęściej czytane kategorie: praktyczne wdrożenia ChatGPT w firmie, automatyzacja workflow z n8n i Make, generatywne wideo dla marketingu, agenci AI w obsłudze klienta, narzędzia AI dla nauczycieli.</p>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Baza Wiedzy o AI – OpenMind AI',
      url: `${SITE}/blog.html`,
      publisher: ORG_JSONLD,
      description: 'Ponad 110 artykułów o sztucznej inteligencji: modele językowe, agenci AI, wideo i obrazy generatywne, automatyzacja, regulacje, inwestycje.',
    },
  },
  '/ai-advisor': {
    title: 'Wirtualny Doradca AI – Darmowy Doradca Sztucznej Inteligencji | OpenMind AI',
    description: 'Bezpłatny wirtualny doradca AI. Odpowiedz na kilka pytań, a nasz inteligentny doradca zaproponuje optymalne rozwiązania AI dla Twojego biznesu, edukacji lub życia codziennego.',
    h1: 'Wirtualny Doradca AI – darmowa konsultacja sztucznej inteligencji',
    body: `<p>Wirtualny Doradca AI OpenMind to bezpłatne, interaktywne narzędzie, które w kilka minut pomoże Ci odkryć, jak sztuczna inteligencja może zrewolucjonizować Twoją firmę, szkołę lub codzienną pracę. Odpowiedz na kilka pytań o swoją branżę, procesy i cele — nasz doradca AI wygeneruje spersonalizowane rekomendacje konkretnych narzędzi i scenariuszy wdrożeniowych.</p>
<h2>Jak działa</h2>
<p>Doradca prowadzi krótką rozmowę: pyta o branżę, wielkość organizacji, główne wyzwania biznesowe, obecne narzędzia oraz cele wdrożenia AI. Na podstawie odpowiedzi generuje raport zawierający rekomendacje narzędzi (ChatGPT, Claude, Copilot, Midjourney, n8n, Zapier i wiele innych), scenariusze automatyzacji oraz szacowane korzyści biznesowe.</p>
<h2>Co otrzymasz</h2>
<p>Spersonalizowany dokument PDF z konkretnymi rekomendacjami: jakie narzędzia AI warto wdrożyć w pierwszej kolejności, jakie procesy zautomatyzować, jakie szkolenia będą najbardziej wartościowe dla zespołu oraz jakie pierwsze efekty można osiągnąć w pierwszych tygodniach.</p>
<h2>Dla kogo</h2>
<p>Doradca AI sprawdzi się dla właścicieli firm, menedżerów, dyrektorów operacyjnych, dyrektorów szkół, marketerów, freelancerów oraz wszystkich, którzy chcą szybko ocenić potencjał sztucznej inteligencji w swoim środowisku zawodowym.</p>
<h2>Bezpieczeństwo</h2>
<p>Rozmowa z doradcą jest anonimowa i bezpieczna. Nie wymagamy rejestracji ani danych kontaktowych do skorzystania z narzędzia. Jeśli chcesz pogłębić temat po otrzymaniu raportu — zapraszamy na bezpłatną konsultację z naszym ekspertem.</p>
<h2>Następne kroki</h2>
<p>Po wygenerowaniu raportu możesz umówić bezpłatną rozmowę konsultacyjną przez <a href="/contact">formularz kontaktowy</a> lub mailowo na biuro@openmindai.pl, aby omówić szczegóły wdrożenia rekomendowanych rozwiązań.</p>`,
  },
  '/privacy': {
    title: 'Polityka Prywatności | OpenMind AI Consulting',
    description: 'Polityka prywatności OpenMind AI Consulting. Przetwarzanie danych osobowych zgodnie z RODO oraz bezpieczeństwem danych.',
    h1: 'Polityka Prywatności OpenMind AI',
    body: `<p>Polityka prywatności OpenMind AI Consulting określa zasady przetwarzania danych osobowych użytkowników serwisu openmindai.pl oraz klientów korzystających z naszych usług konsultingowych, szkoleniowych i wdrożeniowych. Polityka jest zgodna z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).</p>
<h2>Administrator danych</h2>
<p>Administratorem danych osobowych jest OpenMind AI Consulting. Kontakt w sprawach związanych z ochroną danych osobowych: biuro@openmindai.pl.</p>
<h2>Jakie dane przetwarzamy</h2>
<p>Przetwarzamy wyłącznie dane niezbędne do realizacji usług oraz komunikacji z użytkownikami: imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), nazwa firmy, treść wiadomości przesłanej przez formularz kontaktowy. Nie przetwarzamy danych wrażliwych w rozumieniu RODO.</p>
<h2>Cele przetwarzania</h2>
<p>Dane przetwarzamy w celu: udzielenia odpowiedzi na zapytanie, realizacji umowy o świadczenie usług, wystawienia faktury, prowadzenia komunikacji marketingowej (wyłącznie po wyraźnej zgodzie), wypełnienia obowiązków prawnych (księgowość, archiwizacja).</p>
<h2>Prawa użytkownika</h2>
<p>Każdemu użytkownikowi przysługują prawa: dostępu do danych, sprostowania, usunięcia ("prawo do bycia zapomnianym"), ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu wobec przetwarzania oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</p>
<h2>Bezpieczeństwo danych</h2>
<p>Stosujemy techniczne i organizacyjne środki bezpieczeństwa chroniące dane przed nieuprawnionym dostępem, utratą lub modyfikacją: szyfrowanie połączenia (HTTPS/TLS), kontrolę dostępu, regularne kopie zapasowe, logowanie operacji oraz polityki silnych haseł.</p>
<h2>Pliki cookies</h2>
<p>Serwis wykorzystuje pliki cookies w celach analitycznych i funkcjonalnych. Użytkownik może w każdej chwili zmienić ustawienia plików cookies w swojej przeglądarce.</p>
<h2>Przekazywanie danych</h2>
<p>Nie sprzedajemy ani nie udostępniamy danych osobowych podmiotom trzecim w celach marketingowych. Dane mogą być przekazywane wyłącznie podmiotom przetwarzającym dane na nasze zlecenie (hosting, system pocztowy, biuro księgowe) na podstawie odpowiednich umów powierzenia przetwarzania.</p>
<h2>Aktualizacje polityki</h2>
<p>Polityka prywatności może być aktualizowana. Aktualna wersja zawsze dostępna jest na tej stronie.</p>`,
  },
};

const CATEGORY_LABEL: Record<number, { pl: string }> = Object.fromEntries(
  digestArticles.map((a) => [a.id, { pl: a.category.pl }]),
);

// Parse PL translations directly from LanguageContext.tsx.
// First occurrence wins (PL block precedes EN block in the file).
const langSrc = fs.readFileSync(path.join(ROOT, 'src/contexts/LanguageContext.tsx'), 'utf8');
const PL_TRANSLATIONS: Record<string, string> = {};
// Match 'key': '...single-quoted value...' (no escaped quotes inside our blog title/excerpt entries)
for (const m of langSrc.matchAll(/'(blog\.article\d+\.(?:title|excerpt))'\s*:\s*'([^']*)'/g)) {
  if (!(m[1] in PL_TRANSLATIONS)) PL_TRANSLATIONS[m[1]] = m[2];
}

function clip(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}

function blogPublishDate(id: number): string {
  const digest = digestArticles.find((a) => a.id === id);
  if (digest) return new Date(digest.date).toISOString();
  if (id >= 31 && id <= 60) {
    const start = new Date('2025-11-27').getTime();
    const total = (new Date('2025-12-22').getTime() - start) / 86400000;
    const step = total / 29;
    const d = new Date(start);
    d.setDate(d.getDate() + Math.floor((id - 31) * step));
    return d.toISOString();
  }
  const start = new Date('2025-09-01').getTime();
  const total = (new Date('2025-11-26').getTime() - start) / 86400000;
  const step = total / 29;
  const d = new Date(start);
  d.setDate(d.getDate() + Math.floor((id - 1) * step));
  return d.toISOString();
}

function blogMeta(id: number): Meta {
  const cat = CATEGORY_LABEL[id]?.pl;
  const realTitle = PL_TRANSLATIONS[`blog.article${id}.title`];
  const realExcerpt = PL_TRANSLATIONS[`blog.article${id}.excerpt`];
  const catLabel = cat ? ` – ${cat}` : '';
  const title = realTitle || `Artykuł ${id}${catLabel} – Baza Wiedzy AI`;
  const excerpt = realExcerpt || `Artykuł nr ${id} z bazy wiedzy OpenMind AI${cat ? ` w kategorii ${cat}` : ''}. Praktyczne informacje o sztucznej inteligencji.`;
  const datePub = blogPublishDate(id);
  const url = `${SITE}/blog/${id}.html`;

  const body = `<p><strong>${esc(excerpt)}</strong></p>
<h2>O artykule</h2>
<p>Ten materiał należy do <a href="/blog">Bazy Wiedzy OpenMind AI</a>${cat ? ` w kategorii <strong>${esc(cat)}</strong>` : ''} i porusza praktyczne aspekty wykorzystania sztucznej inteligencji w polskich firmach, instytucjach edukacyjnych i pracy codziennej. Publikujemy regularne analizy modeli językowych, narzędzi generatywnych, automatyzacji procesów oraz przeglądy najważniejszych trendów branżowych.</p>
<h2>Dlaczego warto śledzić Bazę Wiedzy AI</h2>
<p>OpenMind AI Consulting publikuje materiały skierowane do osób decyzyjnych — przedsiębiorców, menedżerów, marketerów, dyrektorów szkół oraz specjalistów IT. Każdy artykuł jest tworzony z myślą o praktycznym zastosowaniu: zamiast teoretycznych rozważań pokazujemy konkretne narzędzia, przepływy pracy oraz mierzalne korzyści biznesowe.</p>
<h2>Powiązane usługi</h2>
<p>Jeśli temat Cię zainteresował i chcesz wdrożyć podobne rozwiązania w swojej organizacji, sprawdź nasze usługi: <a href="/services/konsulting-ai">konsulting AI</a>, <a href="/services/szkolenia-ai">szkolenia AI</a>, <a href="/services/automatyzacja-ai">automatyzacja procesów</a>, <a href="/services/agencja-kreatywna-ai">agencja kreatywna AI</a> oraz <a href="/services/ai-dla-szkol">AI dla szkół</a>.</p>
<h2>Bezpłatna konsultacja</h2>
<p>Chcesz omówić wdrożenie AI w swojej firmie? Umów bezpłatną i niezobowiązującą rozmowę z naszym ekspertem przez <a href="/contact">formularz kontaktowy</a> lub mailowo: biuro@openmindai.pl. Odpowiadamy w ciągu 24 godzin.</p>
<h2>Więcej artykułów</h2>
<p>Zobacz pełną listę 110 artykułów w <a href="/blog">Bazie Wiedzy OpenMind AI</a> — od podstaw machine learning po najnowsze premiery modeli i narzędzi generatywnych.</p>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    author: { '@type': 'Person', name: 'Łukasz Czarnecki' },
    publisher: ORG_JSONLD,
    datePublished: datePub,
    dateModified: datePub,
    mainEntityOfPage: url,
    url,
    articleSection: cat || 'Sztuczna inteligencja',
    inLanguage: 'pl-PL',
  };

  return {
    title: `${title} | Baza Wiedzy AI – OpenMind AI`,
    description: clip(excerpt, 155),
    h1: title,
    body,
    jsonLd,
  };
}

function voivMeta(slug: string): Meta | null {
  const v = voivodeships.find((x) => x.slug === slug);
  if (!v) return null;
  const cityCount = v.cities.length;
  const firstFour = v.cities.slice(0, 4).map((c) => c.name).join(', ');
  const canonical = `${SITE}/gdzie-dzialamy/${v.slug}.html`;

  const cityLinks = v.cities
    .map(
      (c) =>
        `<li><a href="/gdzie-dzialamy/${v.slug}/${c.slug}.html">AI w ${esc(c.locative)} – wdrożenia, szkolenia, konsulting</a></li>`,
    )
    .join('');

  const body = `<p>OpenMind AI Consulting świadczy pełen zakres usług z obszaru sztucznej inteligencji dla firm, instytucji publicznych, agencji marketingowych oraz placówek edukacyjnych z województwa ${esc(v.locativeName)}. Obsługujemy ${cityCount} miast regionu — od największych ośrodków (${esc(firstFour)}) po miejscowości powiatowe. Działamy zarówno zdalnie, jak i stacjonarnie na miejscu u klienta.</p>
<p>W województwie ${esc(v.locativeName)} wdrażamy modele językowe (ChatGPT, Claude, Gemini, Microsoft Copilot), automatyzujemy procesy w Make/n8n/Zapier, projektujemy asystentów AI dla obsługi klienta oraz produkujemy materiały reklamowe z wykorzystaniem generatywnej sztucznej inteligencji (wideo AI, obrazy AI, voice-over). Prowadzimy praktyczne szkolenia z prompt engineeringu dla pracowników biurowych, zespołów sprzedażowych, marketingu, HR oraz zarządów.</p>

<h2>Miasta obsługiwane w województwie ${esc(v.name)}</h2>
<p>Pełna lista miast, dla których przygotowaliśmy dedykowane strony z opisem lokalnej gospodarki, kluczowych branż i przykładów wdrożeń sztucznej inteligencji:</p>
<ul>${cityLinks}</ul>

<h2>Zastosowania AI dla firm z województwa ${esc(v.name)}</h2>
<p>Najczęstsze scenariusze wdrożeń w regionie ${esc(v.locativeName)} obejmują: automatyzację obsługi zapytań mailowych i czatów, generowanie ofert handlowych i dokumentów, ekstrakcję danych z faktur i umów, kwalifikację leadów sprzedażowych, raportowanie zarządcze, tworzenie treści marketingowych i social media, wewnętrzne bazy wiedzy oparte o wyszukiwanie semantyczne, a także asystentów AI dla działów HR i obsługi klienta.</p>
<p>Dla przedsiębiorstw produkcyjnych oferujemy analizę danych operacyjnych i predykcyjne utrzymanie ruchu; dla e-commerce – personalizację rekomendacji i automatyczne opisy produktów; dla kancelarii prawnych – analizę umów; dla klinik medycznych – wsparcie dokumentacji. Wszystkie wdrożenia projektujemy zgodnie z RODO, z opcją self-hosted dla danych wrażliwych.</p>

<h2>Szkolenia AI w województwie ${esc(v.name)}</h2>
<p>Prowadzimy szkolenia z ChatGPT, Claude, Gemini i Microsoft Copilot dla firm, instytucji oraz szkół w miastach: ${esc(v.cities.map((c) => c.name).join(', '))}. Warsztaty realizujemy w formatach 4-godzinnych, całodniowych i wielodniowych – online, stacjonarnie w siedzibie klienta lub hybrydowo.</p>

<h2>Skontaktuj się z nami</h2>
<p>Pierwsza konsultacja dla firm z województwa ${esc(v.locativeName)} jest bezpłatna i niezobowiązująca. Napisz na biuro@openmindai.pl lub wypełnij <a href="/contact.html">formularz kontaktowy</a>, a my przygotujemy propozycję dopasowaną do Twojej organizacji.</p>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: `Sztuczna inteligencja (AI) w województwie ${v.name}`,
        description: `Wdrożenia, szkolenia i konsulting AI w województwie ${v.locativeName}. Obsługujemy ${cityCount} miast regionu.`,
        url: canonical,
        provider: ORG_JSONLD,
        serviceType: ['Konsulting AI', 'Szkolenia AI', 'Wdrożenia AI', 'Automatyzacja procesów', 'Agencja Kreatywna AI'],
        areaServed: {
          '@type': 'AdministrativeArea',
          name: `Województwo ${v.name}`,
          containedInPlace: { '@type': 'Country', name: 'Polska' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Gdzie działamy', item: SITE + '/#gdzie-dzialamy' },
          { '@type': 'ListItem', position: 3, name: `Województwo ${v.name}`, item: canonical },
        ],
      },
    ],
  };

  return {
    title: `AI w województwie ${v.name} – Wdrożenia, Szkolenia i Konsulting Sztucznej Inteligencji | OpenMind AI`,
    description: `Sztuczna inteligencja w województwie ${v.locativeName}. Wdrożenia AI, szkolenia z ChatGPT, automatyzacja procesów. Konsulting dla firm z ${cityCount} miast regionu ${v.name}.`.slice(0, 158),
    h1: `AI w województwie ${v.name}`,
    body,
    jsonLd,
  };
}

function cityMeta(voivSlug: string, citySlug: string): Meta | null {
  const v = voivodeships.find((x) => x.slug === voivSlug);
  if (!v) return null;
  const c = v.cities.find((x) => x.slug === citySlug);
  if (!c) return null;
  const content = findCityContent(voivSlug, citySlug);
  const routePath = `/gdzie-dzialamy/${v.slug}/${c.slug}`;
  const canonical = `${SITE}${routePath}.html`;

  let body = '';
  if (content) {
    body += `<p>${esc(content.opisGospodarki)}</p>`;
    if (content.branzeKluczowe?.length) {
      body += `<h2>Kluczowe branże w ${esc(c.locative)}</h2><ul>${content.branzeKluczowe
        .map((b) => `<li>${esc(b)}</li>`)
        .join('')}</ul>`;
    }
    body += `<h2>Zastosowania AI dla firm z ${esc(c.name)}</h2><p>${esc(content.wyzwaniaAI)}</p>`;
    if (content.przykladZastosowania) {
      body += `<h2>Przykładowy scenariusz wdrożenia AI w ${esc(c.locative)}</h2><p>${esc(
        content.przykladZastosowania,
      )}</p>`;
    }
    if (content.czasDojazdu) {
      body += `<h2>Obsługa i dojazd</h2><p>${esc(content.czasDojazdu)}</p>`;
    }
    if (content.faq?.length) {
      body += `<h2>FAQ – sztuczna inteligencja w ${esc(c.locative)}</h2>` +
        content.faq.map((f) => `<h3>${esc(f.pytanie)}</h3><p>${esc(f.odpowiedz)}</p>`).join('');
    }
    body += `<p><a href="/gdzie-dzialamy/${v.slug}">Zobacz pełną listę miast w województwie ${esc(v.name)}</a></p>`;
  } else {
    body = `<p>OpenMind AI świadczy usługi wdrożeń, szkoleń i konsultingu sztucznej inteligencji w ${esc(c.locative)} (województwo ${esc(v.locativeName)}). Pomagamy lokalnym firmom wdrażać ChatGPT, automatyzować procesy oraz tworzyć materiały reklamowe z generatywną AI.</p><p><a href="/gdzie-dzialamy/${v.slug}">Zobacz pełną listę miast w województwie ${esc(v.name)}</a></p>`;
  }

  const graph: object[] = [
    {
      '@type': 'LocalBusiness',
      '@id': `${canonical}#business`,
      name: `OpenMind AI Consulting – ${c.name}`,
      description: `Szkolenia AI w ${c.locative}, wdrożenia sztucznej inteligencji, konsulting i automatyzacja procesów.`,
      url: canonical,
      areaServed: {
        '@type': 'City',
        name: c.name,
        containedInPlace: { '@type': 'AdministrativeArea', name: v.name },
      },
      provider: { '@type': 'Organization', name: 'OpenMind AI Consulting', url: SITE },
      address: {
        '@type': 'PostalAddress',
        addressLocality: c.name,
        addressRegion: v.name,
        addressCountry: 'PL',
      },
      serviceType: [
        'Konsulting AI',
        'Szkolenia AI',
        'Wdrożenia AI',
        'Automatyzacja procesów',
        'Agencja Kreatywna AI',
      ],
    },
  ];
  if (content?.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: content.faq.map((f) => ({
        '@type': 'Question',
        name: f.pytanie,
        acceptedAnswer: { '@type': 'Answer', text: f.odpowiedz },
      })),
    });
  }
  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Gdzie działamy', item: SITE + '/#gdzie-dzialamy' },
      { '@type': 'ListItem', position: 3, name: v.name, item: `${SITE}/gdzie-dzialamy/${v.slug}` },
      { '@type': 'ListItem', position: 4, name: c.name, item: canonical },
    ],
  });

  return {
    title: `AI w ${c.locative} – Wdrożenia, Szkolenia i Konsulting Sztucznej Inteligencji | OpenMind AI`,
    description: `Sztuczna inteligencja w ${c.locative} (województwo ${v.locativeName}). Wdrożenia AI, szkolenia z ChatGPT, automatyzacja procesów, agencja kreatywna AI. Bezpłatna konsultacja.`,
    h1: `Sztuczna inteligencja (AI) w ${c.locative}`,
    body,
    jsonLd: { '@context': 'https://schema.org', '@graph': graph },
  };
}

// ---------------------------------------------------------------------------
// Sitemap parsing
// ---------------------------------------------------------------------------
function readSitemap(file: string): string[] {
  const raw = fs.readFileSync(path.join(ROOT, 'public', file), 'utf8');
  return [...raw.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const allUrls = [
  ...readSitemap('sitemap-main.xml'),
  ...readSitemap('sitemap-blog.xml'),
  ...readSitemap('sitemap-cities.xml'),
];

const HTML_SITEMAP_LASTMOD = '2026-06-12';
const MAIN_HTML_ROUTES = [
  '/services',
  '/services/konsulting-ai',
  '/services/szkolenia-ai',
  '/services/automatyzacja-ai',
  '/services/agencja-kreatywna-ai',
  '/services/ai-dla-szkol',
  '/services/tworzenie-stron-www',
  '/about',
  '/contact',
  '/blog',
  '/ai-advisor',
  '/privacy',
];

function buildHtmlSitemapXml(): string {
  const voivRoutes = voivodeships.map((v) => `/gdzie-dzialamy/${v.slug}`);

  const cityRoutes = voivodeships.flatMap((voivodeship) =>
    voivodeship.cities.map((city) => {
      const route = `/gdzie-dzialamy/${voivodeship.slug}/${city.slug}`;
      findCityContent(voivodeship.slug, city.slug);
      return route;
    }),
  );

  const digestArticleIds = new Set(digestArticles.map((article) => article.id));
  const blogRoutes = Array.from({ length: 110 }, (_, index) => index + 1)
    .filter((id) => id <= 60 || digestArticleIds.has(id))
    .map((id) => `/blog/${id}`);

  const entries = [
    ...voivRoutes.map((route) => ({ route, priority: '0.6' })),
    ...cityRoutes.map((route) => ({ route, priority: '0.5' })),
    ...blogRoutes.map((route) => ({ route, priority: '0.6' })),
    ...MAIN_HTML_ROUTES.map((route) => ({ route, priority: '0.8' })),
  ];

  if (voivRoutes.length !== 16 || cityRoutes.length !== 192 || blogRoutes.length !== 110 || MAIN_HTML_ROUTES.length !== 12 || entries.length !== 330) {
    throw new Error(`[prerender] sitemap-html invalid counts: voiv=${voivRoutes.length}, cities=${cityRoutes.length}, blog=${blogRoutes.length}, main=${MAIN_HTML_ROUTES.length}, total=${entries.length}`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(({ route, priority }) => `  <url><loc>${SITE}${route}.html</loc><lastmod>${HTML_SITEMAP_LASTMOD}</lastmod><priority>${priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`;
}

// ---------------------------------------------------------------------------
// HTML transform
// ---------------------------------------------------------------------------
const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function buildHtml(routePath: string, meta: Meta): string {
  // Canonical always points to the .html variant (matches sitemap), except root.
  const canonical = routePath === '/' ? `${SITE}/` : `${SITE}${routePath}.html`;
  let html = template;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escAttr(meta.title)}</title>`);

  // meta description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escAttr(meta.description)}" />`,
  );

  // canonical (single tag in template)
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`,
  );

  // hreflang (3 tags, all point to canonical for this URL)
  html = html.replace(
    /<link rel="alternate" hreflang="pl"[^>]*>/,
    `<link rel="alternate" hreflang="pl" href="${canonical}" />`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en"[^>]*>/,
    `<link rel="alternate" hreflang="en" href="${canonical}" />`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default"[^>]*>/,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
  );

  // OG/Twitter
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escAttr(meta.title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escAttr(meta.description)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escAttr(meta.title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escAttr(meta.description)}" />`,
  );

  // Replace the SEO snippet inside #root with route-specific content.
  // Match the entire <div id="root">...</div> block (non-greedy, first occurrence).
  const newRoot =
    `<div id="root">\n` +
    `      <h1>${meta.h1}</h1>\n` +
    `      ${meta.body}\n` +
    `      <nav aria-label="Główna nawigacja SEO">\n` +
    `        <a href="/">Strona główna</a>\n` +
    `        <a href="/services">Usługi AI</a>\n` +
    `        <a href="/about">O nas</a>\n` +
    `        <a href="/blog">Blog</a>\n` +
    `        <a href="/contact">Kontakt</a>\n` +
    `      </nav>\n` +
    `    </div>`;
  // The SEO snippet has <section> but no nested <div>, so non-greedy </div> matches the root close.
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, newRoot);

  // Inject URL-cleanup script: after first paint, strip ".html" from the URL
  // so users see a clean path in the address bar; React Router handles bare paths.
  const cleanupScript =
    `<script>(function(){try{var p=location.pathname;if(p.endsWith('.html')){history.replaceState(null,'',p.slice(0,-5)+location.search+location.hash);}}catch(e){}})();</script>`;
  const jsonLdTag = meta.jsonLd
    ? `<script type="application/ld+json" data-page-jsonld>${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`
    : '';
  html = html.replace('</head>', `${jsonLdTag}${cleanupScript}</head>`);

  return html;
}

/**
 * Post-process every prerendered HTML file to rewrite internal links that
 * point to bare section paths (no .html suffix) → .html variant. This catches
 * links coming from markdown-derived content, FAQ blocks, JSON-LD body text
 * or any future component that forgets the suffix.
 *
 * Rules:
 * - Only href values are touched (text content is left alone).
 * - Only the 6 SPA sections + city tree are normalized.
 * - Skips: paths already ending in .html, root paths ("/services"-style that
 *   end with "/" before query/hash), fragments-only, query-only.
 * - Preserves optional https://www.openmindai.pl/ prefix, query string, hash.
 */
const INTERNAL_LINK_RE =
  /href="((?:https:\/\/www\.openmindai\.pl)?)\/(services|about|contact|blog|ai-advisor|privacy|gdzie-dzialamy)((?:\/[^"#?\s]*)?)((?:[?#][^"\s]*)?)"/g;

function fixInternalLinks(html: string): string {
  return html.replace(INTERNAL_LINK_RE, (match, prefix, root, rest, query) => {
    // rest is "" or "/segment[/segment...]"
    if (rest.endsWith('.html')) return match;          // already correct
    if (rest.endsWith('/')) return match;              // trailing slash variant — leave alone
    // Build canonical .html path
    const fixedPath = '/' + root + rest + '.html';
    return `href="${prefix}${fixedPath}${query}"`;
  });
}

function writeRoute(routePath: string, html: string) {
  // routePath like "/services/konsulting-ai"
  // Write BOTH variants so Lovable hosting can match the exact request path:
  //   1) dist/services/konsulting-ai/index.html  (for trailing-slash URLs)
  //   2) dist/services/konsulting-ai.html        (for clean URLs without slash)
  // Lovable hosting serves the file matching the request path verbatim and
  // only falls back to root index.html if no file matches — so we need both.
  const finalHtml = fixInternalLinks(html);
  const rel = routePath.replace(/^\/+/, '');
  const dir = path.join(DIST, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), finalHtml, 'utf8');

  // Flat sibling .html — most static hosts map "/foo/bar" → "/foo/bar.html"
  const parent = path.join(DIST, path.dirname(rel));
  fs.mkdirSync(parent, { recursive: true });
  fs.writeFileSync(path.join(DIST, rel + '.html'), finalHtml, 'utf8');
}

// Also normalize the homepage HTML (links in default index.html body)
try {
  const homePath = path.join(DIST, 'index.html');
  if (fs.existsSync(homePath)) {
    const homeHtml = fs.readFileSync(homePath, 'utf8');
    fs.writeFileSync(homePath, fixInternalLinks(homeHtml), 'utf8');
  }
} catch (e) {
  console.warn('[prerender] could not normalize home index.html links', e);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
let written = 0;
let skipped = 0;
const missing: string[] = [];

for (const url of allUrls) {
  const u = new URL(url);
  // Sitemap URLs end with ".html" (except root). Strip it for meta lookup
  // and route matching; canonical/file-write will re-add it.
  let routePath = u.pathname.replace(/\/+$/, '') || '/';
  if (routePath.endsWith('.html')) routePath = routePath.slice(0, -5) || '/';

  if (routePath === '/') {
    // Home is already correct in dist/index.html
    skipped++;
    continue;
  }

  let meta: Meta | null = null;

  if (STATIC_META[routePath]) {
    meta = STATIC_META[routePath];
  } else if (/^\/blog\/(\d+)$/.test(routePath)) {
    const id = Number(routePath.match(/^\/blog\/(\d+)$/)![1]);
    meta = blogMeta(id);
  } else if (/^\/gdzie-dzialamy\/[^/]+$/.test(routePath)) {
    const slug = routePath.split('/')[2];
    meta = voivMeta(slug);
  } else if (/^\/gdzie-dzialamy\/[^/]+\/[^/]+$/.test(routePath)) {
    const [, , v, c] = routePath.split('/');
    meta = cityMeta(v, c);
  }

  if (!meta) {
    missing.push(routePath);
    continue;
  }

  writeRoute(routePath, buildHtml(routePath, meta));
  written++;
}

// Write llms.txt for AI crawlers (LLM-friendly site map)
const llmsTxt = `# OpenMind AI Consulting

OpenMind AI Consulting — polski lider wdrożeń sztucznej inteligencji dla firm, agencji i szkół. Konsulting strategiczny, szkolenia AI z ChatGPT/Claude/Gemini/Copilot, automatyzacja procesów, agencja kreatywna AI (wideo i obrazy generowane przez AI), AI dla edukacji.

## Najważniejsze
- Strona główna: ${SITE}/
- Wszystkie usługi: ${SITE}/services
- Konsulting AI: ${SITE}/services/konsulting-ai
- Szkolenia AI: ${SITE}/services/szkolenia-ai
- Automatyzacja AI: ${SITE}/services/automatyzacja-ai
- Agencja kreatywna AI: ${SITE}/services/agencja-kreatywna-ai
- AI dla szkół: ${SITE}/services/ai-dla-szkol
- Baza wiedzy AI (110 artykułów): ${SITE}/blog
- O nas: ${SITE}/about
- Kontakt: ${SITE}/contact

## Sitemapy
- ${SITE}/sitemap-index.xml
- ${SITE}/sitemap-main.xml
- ${SITE}/sitemap-cities.xml
- ${SITE}/sitemap-blog.xml

## Zasięg geograficzny
192 miasta w 16 województwach Polski. Pełna lista w sitemap-cities.xml.

## Kontakt
biuro@openmindai.pl • ${SITE}/contact
`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llmsTxt, 'utf8');

const htmlSitemapXml = buildHtmlSitemapXml();
fs.writeFileSync(path.join(DIST, 'sitemap-html.xml'), htmlSitemapXml, 'utf8');

// NOTE (2026-06-12): the former "extensionless leaf files" post-processing
// pass was ROLLED BACK. Lovable CDN serves extensionless files as
// application/octet-stream with `x-content-type-options: nosniff`, so Google
// treated bare URLs as binary downloads and de-indexed them. We now ship ONLY
// dist/{route}.html and dist/{route}/index.html; bare URLs fall through to the
// SPA shell and canonicals/sitemaps point at the .html variants.

console.log(`[prerender] wrote ${written} static HTML files + llms.txt + sitemap-html.xml (skipped: ${skipped}, missing: ${missing.length})`);
if (missing.length) {
  console.log('[prerender] no metadata for:\n' + missing.slice(0, 10).map((p) => '  ' + p).join('\n'));
}
