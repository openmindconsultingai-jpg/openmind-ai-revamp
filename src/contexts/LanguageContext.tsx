import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

type TranslationKey = string;
type Translations = Record<Language, Record<TranslationKey, string>>;

const translations: Translations = {
  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.services': 'Nasze usługi',
    'nav.about': 'O nas',
    'nav.blog': 'Baza wiedzy o AI',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.title': 'OpenMind',
    'hero.subtitle': 'AI',
    'hero.description': 'Polski start-up łączący innowacyjność z elastycznością. Dostarczamy zaawansowane rozwiązania AI dostosowane do dynamicznie zmieniającego się rynku.',
    'hero.description2': 'Łączymy lokalne know-how z globalnymi technologiami uczenia maszynowego i przetwarzania języka naturalnego, oferując skuteczne wsparcie dla firm, sektora publicznego i rodzin w codziennym wykorzystaniu inteligentnych systemów.',
    'hero.cta': 'Wkrocz w technologię jutra już dziś',
    'hero.cta.consultation': 'Umów bezpłatną konsultację',
    
    // Mission Section
    'mission.title': 'Nasza Misja',
    'mission.description1': 'OpenMind AI Consulting to polski startup specjalizujący się w doradztwie i wdrażaniu rozwiązań sztucznej inteligencji dla biznesu, administracji publicznej i życia codziennego. Pomagamy organizacjom każdej wielkości odkryć prawdziwy potencjał AI – od automatyzacji procesów, przez inteligentną analizę danych, po tworzenie chatbotów i asystentów wirtualnych.',
    'mission.description2': 'Wierzymy, że sztuczna inteligencja powinna być dostępna dla każdego. Naszą misją jest przekładanie zaawansowanych technologii uczenia maszynowego i przetwarzania języka naturalnego na praktyczne korzyści – oszczędność czasu, redukcję kosztów i zwiększenie konkurencyjności. Działamy w zgodzie z RODO, stawiając na bezpieczeństwo danych i etyczne wykorzystanie AI.',
    
    // Bento Grid Tiles
    'bento.contact.title': 'Skontaktuj się z nami',
    'bento.contact.desc': 'Masz pytania o wdrożenie AI w swojej firmie? Chcesz dowiedzieć się, jak sztuczna inteligencja może usprawnić Twoje procesy? Wypełnij formularz kontaktowy, a nasi eksperci skontaktują się z Tobą w ciągu 24 godzin.',
    'bento.contact.cta': 'Przejdź do formularza',
    'bento.advisor.title': 'Kreator zastosowań AI',
    'bento.advisor.desc': 'Nie wiesz, jak AI może Ci pomóc? Nasz inteligentny doradca przeanalizuje Twoje potrzeby i zaproponuje optymalne rozwiązania dopasowane do Twojego życia, biznesu, edukacji czy innych dziedzin. Odkryj prawdziwy potencjał sztucznej inteligencji.',
    'bento.advisor.cta': 'Uruchom doradcę AI',
    'bento.advisor.modal.title': 'Doradca AI – Znajdź zastosowanie dla sztucznej inteligencji',
    'bento.advisor.modal.subtitle': 'Odpowiedz na kilka pytań, a nasz AI pomoże Ci odkryć, jak sztuczna inteligencja może usprawnić Twoje życie, biznes lub edukację.',
    
    // Features
    'features.title': 'Dlaczego OpenMind AI?',
    'features.subtitle': 'Kompleksowe podejście do transformacji cyfrowej',
    'features.speed.title': 'Szybkie Wdrożenie',
    'features.speed.desc': 'Efektywnie realizujemy projekty AI dzięki sprawdzonym metodologiom i gotowym rozwiązaniom',
    'features.custom.title': 'Personalizacja',
    'features.custom.desc': 'Każde rozwiązanie dopasowane do unikalnych potrzeb Twojej organizacji',
    'features.support.title': 'Wsparcie 24/7',
    'features.support.desc': 'Jesteśmy z Tobą na każdym etapie - od konsultacji po wdrożenie i optymalizację',
    'features.innovation.title': 'Najnowsze Technologie',
    'features.innovation.desc': 'Wykorzystujemy najnowocześniejsze modele AI i sprawdzone frameworki',
    'features.security.title': 'Bezpieczeństwo',
    'features.security.desc': 'Wszystkie rozwiązania zgodne z RODO i najwyższymi standardami cyberbezpieczeństwa',
    'features.roi.title': 'Wysoki ROI',
    'features.roi.desc': 'Mierzalne efekty biznesowe - automatyzacja, oszczędności, konkurencyjność',
    
    // Services
    'services.title': 'Nasze Usługi',
    'services.subtitle': 'Kompleksowe rozwiązania AI dostosowane do potrzeb nowoczesnych organizacji, sektora publicznego i życia codziennego',
    'services.consulting.title': 'Konsultacje AI dla Biznesu',
    'services.consulting.desc': 'Analizujemy realne potrzeby Twojej firmy i dobieramy narzędzia sztucznej inteligencji, które naprawdę działają – od automatyzacji powtarzalnych zadań, przez predykcję trendów sprzedażowych, po inteligentną analizę dużych zbiorów danych. AI przestaje być buzzwordem, a staje się Twoim codziennym wsparciem operacyjnym.',
    'services.consulting.benefit1': 'Automatyzacja procesów',
    'services.consulting.benefit2': 'Predykcyjna analiza danych',
    'services.consulting.benefit3': 'Optymalizacja decyzji',
    'services.training.title': 'Szkolenia i Warsztaty AI',
    'services.training.desc': 'Przekazujemy praktyczną wiedzę o tym, czym właściwie jest sztuczna inteligencja – algorytmy, które uczą się z przykładów i podejmują decyzje. Uczymy efektywnego wykorzystania ChatGPT, narzędzi generatywnych i systemów automatyzacji dla firm, instytucji publicznych oraz zespołów. Bez teorii – same konkretne umiejętności.',
    'services.training.benefit1': 'Praktyczne warsztaty',
    'services.training.benefit2': 'Szkolenia dostosowane do branży',
    'services.training.benefit3': 'Gotowe scenariusze użycia',
    'services.business.title': 'Działalność z AI w Tydzień',
    'services.business.desc': 'Kompleksowy program praktyczny, w którym jesteśmy Twoim partnerem we wdrożeniu gotowej firmy od zera. W zaledwie siedem dni przejdziesz przez formalności urzędowe, stworzysz profesjonalny branding (stronę www, identyfikację wizualną, grafiki, reels, stories, e-booki, SEO), nauczysz się zdobywać klientów i prowadzić social media – wszystko dzięki sztucznej inteligencji i narzędziom no-code. To rewolucja, która usuwa barierę między przeciętnym użytkownikiem a specjalistami od kodowania.',
    'services.business.benefit1': 'Pomoc w formalnościach urzędowych',
    'services.business.benefit2': 'Kompletny branding i strona WWW',
    'services.business.benefit3': 'Strategie pozyskiwania klientów z AI',
    'services.social.title': 'Kampanie Social Media z AI Awatarami',
    'services.social.desc': 'Tworzymy przełomowe kampanie w mediach społecznościowych z wykorzystaniem cyfrowych awatarów generowanych przez sztuczną inteligencję. Twoje AI alter ego, stworzone z głębokiego uczenia neuronowego, mówi Twoim głosem, w Twoim stylu, reprezentuje Twoją markę 24/7 – na TikToku, Instagramie, YouTube, LinkedIn. To nie deepfake, to inteligentna synteza wizerunku i osobowości, która skaluje Twoją obecność bez utraty autentyczności. Rozmawiamy o realnej rewolucji w content marketingu – mniej pracy produkcyjnej, więcej strategii i kreatywności.',
    'services.social.benefit1': 'AI awatary dopasowane do marki',
    'services.social.benefit2': 'Skalowalna produkcja contentu',
    'services.social.benefit3': 'Konsystentna obecność w social media',
    'services.public.title': 'AI dla Administracji Publicznej',
    'services.public.desc': 'Przygotowujemy sektor publiczny na cyfrową transformację opartą na sztucznej inteligencji. Wdrażamy inteligentne chatboty obsługi obywateli, automatyzujemy klasyfikację dokumentów i wniosków, budujemy systemy predykcyjne do planowania budżetu czy analiz demograficznych. AI w służbie publicznej to nie science fiction – to algorytmy, które uczą się z danych historycznych i wspierają podejmowanie decyzji administracyjnych, oszczędzając czas urzędników i poprawiając jakość usług dla mieszkańców. Wszystko zgodnie z RODO i normami bezpieczeństwa informacji.',
    'services.public.benefit1': 'Automatyzacja obsługi obywateli',
    'services.public.benefit2': 'Inteligentne zarządzanie dokumentami',
    'services.public.benefit3': 'Zgodność z przepisami i RODO',
    'services.strategy.title': 'Doradztwo Strategiczne',
    'services.strategy.desc': 'Budujemy kompleksową strategię wdrożenia AI w Twojej organizacji. Pokazujemy, gdzie automatyzacja przyniesie największe korzyści, jak zmierzyć zwrot z inwestycji i jak przeprowadzić transformację cyfrową – krok po kroku, z uwzględnieniem specyfiki Twojego biznesu i realnych możliwości technologicznych.',
    'services.strategy.benefit1': 'Mapa drogowa wdrożenia',
    'services.strategy.benefit2': 'Kalkulacja ROI',
    'services.strategy.benefit3': 'Plan transformacji',
    'services.custom.title': 'Personalizowane Rozwiązania AI',
    'services.custom.desc': 'Tworzymy dedykowane systemy uczenia maszynowego i przetwarzania języka naturalnego szyte na miarę Twoich potrzeb. Chatboty rozumiejące kontekst, systemy rekomendacji, inteligentna klasyfikacja dokumentów – pokazujemy, jak AI może rozwiązać Twoje konkretne problemy biznesowe, nie tylko technologiczne.',
    'services.custom.benefit1': 'Chatboty konwersacyjne',
    'services.custom.benefit2': 'Systemy rekomendacji',
    'services.custom.benefit3': 'Automatyczna klasyfikacja',
    'services.optimization.title': 'Optymalizacja Procesów',
    'services.optimization.desc': 'Prześwietlamy Twoje procesy i wskazujemy, gdzie AI może zaoszczędzić czas i pieniądze. Identyfikujemy powtarzalne zadania nadające się do automatyzacji, pokazujemy potencjał predykcji i analizy danych. Wynik? Mniej rutyny, więcej wartościowej pracy, konkretne oszczędności operacyjne.',
    'services.optimization.benefit1': 'Audyt potencjału AI',
    'services.optimization.benefit2': 'Redukcja kosztów',
    'services.optimization.benefit3': 'Wzrost efektywności zespołu',
    'services.security.title': 'Bezpieczeństwo i Etyka AI',
    'services.security.desc': 'Wspieramy w bezpiecznym i etycznym wykorzystaniu sztucznej inteligencji – od polityk ochrony danych osobowych i zgodności z RODO, po świadome zarządzanie algorytmami. Dbamy o to, żeby AI działała zgodnie z prawem i wartościami Twojej organizacji, budując zaufanie klientów i pracowników.',
    'services.security.benefit1': 'Compliance z RODO',
    'services.security.benefit2': 'Audyt bezpieczeństwa AI',
    'services.security.benefit3': 'Etyczne standardy',
    
    // Features (additional)
    'features.personalization.title': 'Personalizacja i prostota',
    'features.personalization.desc': 'Dopasowujemy inteligentne algorytmy do Twoich realnych wyzwań – bez technicznego żargonu. AI to dla nas nie abstrakcja, ale narzędzie, które naprawdę ułatwia codzienną pracę i oszczędza czas.',
    'features.universal.title': 'Dla biznesu, administracji i życia codziennego',
    'features.universal.desc': 'Sztuczna inteligencja to systemy, które uczą się z danych i podejmują decyzje – automatyzują rutynę, analizują trendy, odpowiadają na pytania. Pokażemy Ci, jak używać ich efektywnie, niezależnie czy zarządzasz firmą, instytucją publiczną, czy po prostu chcesz działać mądrzej w swoim życiu.',
    'features.knowhow.title': 'Polskie know-how + globalne technologie',
    'features.knowhow.desc': 'Wykorzystujemy najnowsze modele językowe i narzędzia uczenia maszynowego od liderów branży, dostosowując je do lokalnych potrzeb. Przekładamy światową innowację na praktyczne korzyści dla polskich organizacji i użytkowników.',
    
    // Privacy Policy
    'privacy.title': 'Polityka Prywatności',
    'privacy.subtitle': 'Twoje dane są bezpieczne. Zobowiązujemy się do ochrony Twojej prywatności.',
    'privacy.admin.title': '1. Administrator danych',
    'privacy.admin.desc': 'Administratorem danych osobowych jest OpenMind AI Consulting z siedzibą w Polsce. Kontakt z administratorem możliwy jest pod adresem email: biuro@openmind.pl',
    'privacy.scope.title': '2. Zakres przetwarzania danych',
    'privacy.scope.desc': 'Przetwarzamy następujące dane osobowe:',
    'privacy.scope.item1': 'Imię i nazwisko - w celu identyfikacji klienta i personalizacji komunikacji',
    'privacy.scope.item2': 'Adres email - w celu komunikacji i odpowiedzi na zapytania',
    'privacy.scope.item3': 'Numer telefonu - opcjonalnie, w celu kontaktu telefonicznego',
    'privacy.scope.item4': 'Treść wiadomości - zawartość zapytań i komunikacji z klientem',
    'privacy.legal.title': '3. Podstawa prawna i cel przetwarzania',
    'privacy.legal.desc': 'Dane osobowe przetwarzane są na podstawie:',
    'privacy.legal.item1': 'Art. 6 ust. 1 lit. a RODO - zgoda na przetwarzanie danych w celu kontaktu i świadczenia usług',
    'privacy.legal.item2': 'Art. 6 ust. 1 lit. b RODO - wykonanie umowy lub podjęcie działań przed zawarciem umowy',
    'privacy.legal.item3': 'Art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes administratora w postaci marketingu produktów i usług',
    'privacy.rights.title': '4. Twoje prawa',
    'privacy.rights.desc': 'Zgodnie z RODO przysługują Ci następujące prawa:',
    'privacy.rights.access': 'Prawo dostępu',
    'privacy.rights.access.desc': 'Do swoich danych osobowych',
    'privacy.rights.rectification': 'Prawo sprostowania',
    'privacy.rights.rectification.desc': 'Poprawiania nieprawidłowych danych',
    'privacy.rights.erasure': 'Prawo usunięcia',
    'privacy.rights.erasure.desc': 'Danych osobowych',
    'privacy.rights.withdraw': 'Prawo do cofnięcia zgody',
    'privacy.rights.withdraw.desc': 'W dowolnym momencie',
    'privacy.retention.title': '5. Okres przechowywania danych',
    'privacy.retention.desc': 'Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, w jakich zostały zebrane, lub do momentu wycofania zgody. W przypadku umów i dokumentów księgowych - zgodnie z przepisami prawa (minimum 5 lat).',
    'privacy.datasecurity.title': '6. Bezpieczeństwo danych',
    'privacy.datasecurity.desc': 'Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo przetwarzanych danych osobowych, w tym ochronę przed ich nieprawidłowym przetwarzaniem, utratą, uszkodzeniem lub zniszczeniem.',
    'privacy.questions.title': 'Pytania dotyczące polityki prywatności?',
    'privacy.questions.desc': 'W przypadku pytań dotyczących przetwarzania danych osobowych, skontaktuj się z nami:',
    'privacy.effective': 'Polityka prywatności obowiązuje od: 03.10.2025',
    
    // About
    'about.title': 'O nas',
    'about.ceo.name': 'Łukasz Czarnecki',
    'about.ceo.title': 'CEO & Founder',
    'about.ceo.bio': 'Absolwent Uniwersytetu Mikołaja Kopernika w Toruniu na kierunku bezpieczeństwo wewnętrzne, ze specjalizacją bezpieczeństwa informacji. Doświadczenie zdobywał w administracji publicznej oraz jako manager w międzynarodowej korporacji, realizując projekty dla organizacji takich jak General Electric, Amazon, Macquarie, J.P. Morgan, American Express oraz ONZ. W pracy łączy dyscyplinę operacyjną z orientacją na wynik, kładąc nacisk na zgodność z RODO, minimalizację przetwarzania danych i bezpieczeństwo.',
    'about.company.desc': 'OpenMind AI projektuje, wdraża i utrzymuje rozwiązania oparte na zaawansowanych modelach językowych i obrazowych, które realnie wspierają sprzedaż, marketing i obsługę klienta. Zakres usług obejmuje strategiczną diagnozę i definiowanie KPI, budowę chatbotów konwersacyjnych oraz asystentów produktowych, aplikacji tworzonych pod specyficzne problemy firm, integracje API z systemami CRM, e-commerce, płatności i rezerwacji, a także warstwę pamięci i wyszukiwania wiedzy (RAG) oraz automatyzacje procesów. Projekty realizujemy w modelu SaaS – ze stałą opłatą aktywacyjną i przewidywalnym, dostosowanym do potrzeb abonamentem – rozwijając rozwiązania iteracyjnie, w oparciu o pomiar efektywności, testy A/B i regularne przeglądy. Celem jest trwałe zwiększanie liczby wartościowych zapytań i rezerwacji, skracanie czasu odpowiedzi, redukcja zwrotów oraz wzrost satysfakcji klientów.',
    'about.expertise.title': 'Ekspertyza',
    'about.expertise.desc': 'Głęboka wiedza o możliwościach AI i jej praktycznym zastosowaniu',
    'about.precision.title': 'Precyzja',
    'about.precision.desc': 'Dopasowane rozwiązania, które rzeczywiście odpowiadają na Twoje potrzeby',
    'about.innovation.title': 'Innowacja',
    'about.innovation.desc': 'Najnowsze technologie w służbie praktycznych zastosowań',
    
    // Contact
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Gotowy na rozmowę o przyszłości? Skontaktuj się z nami już dziś',
    'contact.email': 'Email',
    'contact.phone': 'Telefon',
    'contact.location': 'Lokalizacja',
    'contact.locationValue': 'Polska',
    'contact.hours': 'Godziny pracy',
    'contact.hours.weekdays': 'Poniedziałek - Piątek: 9:00 - 17:00',
    'contact.hours.weekend': 'Sobota - Niedziela: Zamknięte',
    'contact.form.name': 'Imię i nazwisko',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Numer telefonu',
    'contact.form.message': 'Wiadomość',
    'contact.form.submit': 'Wyślij wiadomość',
    'contact.form.sending': 'Wysyłanie...',
    'contact.form.success': 'Wiadomość wysłana pomyślnie!',
    'contact.form.error': 'Wystąpił błąd podczas wysyłania wiadomości',
    
    // Blog
    'blog.subtitle': 'Praktyczna wiedza o sztucznej inteligencji, uczeniu maszynowym i automatyzacji',
    'blog.readMore': 'Czytaj więcej',
    
    // Article 1
    'blog.article1.title': 'Konstytucyjna Konwencja AI: Jak Warsztaty w Dartmouth w 1956 Roku Zdefiniowały Przyszłość Cywilizacji',
    'blog.article1.excerpt': 'Latem 1956 roku na spokojnym kampusie Dartmouth College narodziła się AI jako odrębna dyscyplina naukowa. To wydarzenie określane jest mianem "Konstytucyjnej Konwencji Sztucznej Inteligencji".',
    'blog.article1.content': `Latem 1956 roku, na spokojnym kampusie Dartmouth College w Hanoverze, New Hampshire, miało miejsce wydarzenie, które w encyklopediach i podręcznikach informatyki określane jest mianem „Konstytucyjnej Konwencji Sztucznej Inteligencji". To właśnie tam, podczas ośmiotygodniowych warsztatów badawczych (Dartmouth Summer Research Project on Artificial Intelligence), narodziła się AI jako odrębna dyscyplina naukowa, oddzielając się od cybernetyki, teorii automatów i neuronauki. Konferencja ta nie była jedynie spotkaniem akademickim, lecz momentem krystalizacji nowej dziedziny nauki, gdzie zdefiniowano fundamentalne założenie, że każdą cechę inteligencji można opisać precyzyjnie matematycznie – założenie, które napędza rozwój AI do dziś.

Inicjatorami tego przedsięwzięcia byli czterej wizjonerzy, których nazwiska stały się synonimem postępu technologicznego: John McCarthy z Dartmouth College (twórca terminu "Artificial Intelligence"), Marvin Minsky z Harvardu, Nathaniel Rochester z IBM oraz Claude Shannon z Bell Telephone Laboratories. W swojej propozycji badawczej z 1955 roku postawili oni śmiałą, wręcz prowokacyjną hipotezę: „Każdy aspekt uczenia się lub jakakolwiek inna cecha inteligencji może być co do zasady tak precyzyjnie opisana, że można stworzyć maszynę, która ją symuluje". To zdanie stało się dogmatem, który przetrwał dekady, mimo licznych „zim AI" i zmian paradygmatów.

W warsztatach wzięła udział elita intelektualna tamtych czasów, w tym Allen Newell i Herbert Simon, którzy przywieźli ze sobą Logic Theorist – pierwszy w historii program komputerowy zdolny do automatycznego dowodzenia twierdzeń matematycznych. Był to namacalny dowód na to, że komputery mogą operować na symbolach logicznych, a nie tylko na liczbach, co otworzyło drogę do symbolicznego AI (GOFAI – Good Old-Fashioned AI). Program ten potrafił udowodnić 38 z 52 twierdzeń zawartych w monumentalnym dziele Principia Mathematica Russella i Whiteheada, a w jednym przypadku znalazł dowód bardziej elegancki niż ten stworzony przez ludzi.

Analiza przebiegu konferencji ujawnia jednak fascynujący paradoks, który zaważył na losach dziedziny na kolejne pół wieku. Z jednej strony, uczestnicy byli przekonani, że stworzenie maszyny o inteligencji człowieka to kwestia „jednego lata" lub maksymalnie kilku lat. Ten hurraoptymizm doprowadził później do rozczarowań inwestorów. Z drugiej strony, to właśnie tam zdefiniowano kluczowe problemy, z którymi zmagamy się do dziś: przetwarzanie języka naturalnego (NLP), sieci neuronowe, kreatywność maszynową i samodoskonalenie się systemów. Ustanowiono terminologię i kierunki badań, które doprowadziły nas od prostych algorytmów grających w warcaby (Arthur Samuel) do współczesnych modeli generatywnych. Dartmouth 1956 to lekcja o sile wizji, ale także o pokorze wobec złożoności ludzkiego umysłu – wizjonerzy z 1956 roku poprawnie zidentyfikowali co trzeba zrobić, ale drastycznie nie docenili jak trudne to będzie.`,
    
    // Article 2
    'blog.article2.title': 'Od "Gigantycznych Mózgów" do Testu Turinga: Ewolucja Pojęcia Myślącej Maszyny (1921-1950)',
    'blog.article2.excerpt': 'Zrozumienie współczesnej AI wymaga cofnięcia się do czasów przedcyfrowych. Historia ta nie zaczyna się w laboratoriach Doliny Krzemowej, lecz na deskach teatru w Pradze i w gabinetach matematyków w Bletchley Park.',
    'blog.article2.content': `Zrozumienie współczesnej AI wymaga cofnięcia się do czasów przedcyfrowych. Historia ta nie zaczyna się w laboratoriach Doliny Krzemowej, lecz na deskach teatru w Pradze i w gabinetach matematyków w Bletchley Park. Zanim powstały pierwsze krzemowe procesory, fundamenty sztucznej inteligencji zostały wylane w literaturze, filozofii i matematyce teoretycznej, a praca Alana Turinga z 1950 roku ostatecznie przeniosła debatę z sfery "czy to możliwe" do sfery "jak to sprawdzić".

Już w 1921 roku Karel Čapek w sztuce R.U.R. (Rossum's Universal Robots) wprowadził do globalnego słownika słowo „robot", wywodzące się od czeskiego słowa oznaczającego przymusową pracę pańszczyźnianą. Był to pierwszy kulturowy sygnał, że ludzkość zaczyna oswajać się z ideą sztucznych bytów wykonujących ludzkie zadania, choć u Čapka były to byty biologiczne, a nie mechaniczne. Ten kulturowy zeitgeist przygotował grunt pod naukowe rozważania.

Kluczowy fundament naukowy podłożył w 1943 roku duet: neurofizjolog Warren McCulloch i logik Walter Pitts. Ich praca A Logical Calculus of the Ideas Immanent in Nervous Activity po raz pierwszy zaproponowała matematyczny model neuronu, sugerując, że funkcje mózgu można opisać za pomocą bramek logicznych (AND, OR, NOT). Był to moment narodzin koneksjonizmu – idei, że inteligencja wyłania się z sieci prostych elementów przetwarzających informacje, co stanowi bezpośredniego przodka dzisiejszych sieci Deep Learning.

Punktem zwrotnym był rok 1950 i publikacja Alana Turinga Computing Machinery and Intelligence. Turing, ojciec współczesnej informatyki, zamiast pytać „Czy maszyny mogą myśleć?" – co uważał za pytanie zbyt obciążone semantycznie i filozoficznie – zaproponował operacyjny test, znany dziś jako Test Turinga (The Imitation Game). Jeśli człowiek nie potrafi odróżnić w rozmowie tekstowej maszyny od innego człowieka, maszynę należy uznać za inteligentną. Turing wprowadził pojęcie, które do dziś jest "Świętym Graalem" AI: oddzielenie fizycznej budowy maszyny od jej intelektualnych możliwości.

Turing wyprzedził swoją epokę o dziesięciolecia, przewidując, że komputery będą ewoluować od wykonywania sztywnych instrukcji do uczenia się i adaptacji. Jego wizja, w połączeniu z wcześniejszymi pracami nad maszynami takimi jak ENIAC czy Atanasoff-Berry Computer (pierwszy komputer wykorzystujący system binarny), stworzyła podwaliny pod erę cyfrową. Dzisiejsze modele LLM, takie jak GPT-4, są w istocie próbą ostatecznego zdania Testu Turinga, realizując wizję nakreśloną ponad 70 lat temu. Co ciekawe, Turing przewidział również istnienie "maszyny dziecka" – programu, który zamiast posiadać wiedzę wgraną od razu, uczy się jej od podstaw, co jest istotą dzisiejszego Machine Learningu.`,
    
    // Article 3
    'blog.article3.title': 'Raport Lighthilla i Anatomia Zim AI: Kiedy Obietnice Zderzają się z Rzeczywistością',
    'blog.article3.excerpt': 'Historia rozwoju sztucznej inteligencji nie jest linią prostą wznoszącą się ku osobliwości. Przypomina raczej sinusoidę ekscytacji i głębokiego rozczarowania. Okresy te, zwane „Zimami AI", niosą kluczową lekcję dla dzisiejszych inwestorów.',
    'blog.article3.content': `Historia rozwoju sztucznej inteligencji nie jest linią prostą wznoszącą się ku osobliwości. Przypomina raczej sinusoidę ekscytacji i głębokiego rozczarowania. Okresy te, zwane „Zimami AI" (AI Winters), niosą kluczową lekcję dla dzisiejszych inwestorów i decydentów. Najbardziej spektakularnym przykładem takiego załamania był rok 1973 i publikacja raportu sir Jamesa Lighthilla w Wielkiej Brytanii. Zimy AI nie są wynikiem braku postępu naukowego, lecz efektem rozbieżności między wygórowanymi oczekiwaniami a twardymi ograniczeniami obliczeniowymi.

W latach 50. i 60. pionierzy AI obiecywali szybkie stworzenie maszyn o ludzkich zdolnościach poznawczych. Finansowanie płynęło szerokim strumieniem, zwłaszcza z amerykańskiej agencji DARPA, która liczyła na automatyczne tłumaczenie rosyjskich dokumentów w czasie Zimnej Wojny. Jednak Lighthill, wybitny matematyk, na zlecenie brytyjskiego Science Research Council (SRC) przeprowadził audyt, który brutalnie zweryfikował te obietnice. Jego głównym wnioskiem było stwierdzenie, że AI poniosła „całkowitą porażkę" w realizacji swoich „wielkich celów" (grandiose objectives).

Lighthill zidentyfikował barierę, której ówczesna nauka nie potrafiła przeskoczyć: „eksplozję kombinatoryczną". Problem polegał na tym, że algorytmy, które świetnie radziły sobie w uproszczonych mikro-światach (tzw. toy problems, jak gra w szachy na małej planszy czy proste dowody logiczne), stawały się bezużyteczne przy próbie skalowania do problemów rzeczywistych. Wzrost liczby zmiennych o kilka jednostek powodował wykładniczy wzrost czasu obliczeń, czyniąc rozwiązania niepraktycznymi nawet dla najszybszych ówczesnych superkomputerów.

Raport ten miał dewastujący wpływ. Doprowadził do drastycznych cięć funduszy w Wielkiej Brytanii, gdzie zlikwidowano większość zespołów badawczych poza trzema uniwersytetami. Echa raportu dotarły do USA, dając argumenty krytykom w Kongresie do obcięcia funduszy DARPA, zamrażając badania na niemal dekadę (pierwsza zima AI). Analiza historyczna pokazuje, że zimy AI są mechanizmem rynkowej korekty. Występują, gdy „hype" (szum medialny i marketingowy) odrywa się od fundamentów inżynieryjnych. W 2025 roku, w obliczu debaty na temat granic skalowania modeli językowych i ich energochłonności, Raport Lighthilla pozostaje ostrzeżeniem: technologia musi dostarczać realną wartość ekonomiczną, a nie tylko naukowe ciekawostki, aby przetrwać próbę czasu.`,
    
    // Article 4
    'blog.article4.title': 'Spór o Perceptrony: Jak Minsky i Papert Zahamowali Rozwój Sieci Neuronowych',
    'blog.article4.excerpt': 'W historii nauki rzadko zdarza się, by jedna publikacja niemal całkowicie zatrzymała rozwój całej gałęzi badawczej. Tak stało się w przypadku książki Perceptrons (1969) autorstwa Minsky\'ego i Paperta.',
    'blog.article4.content': `W historii nauki rzadko zdarza się, by jedna publikacja niemal całkowicie zatrzymała rozwój całej gałęzi badawczej. Tak stało się w przypadku książki Perceptrons (1969) autorstwa Marvina Minsky'ego i Seymoura Paperta z MIT. Publikacja ta demonstruje, jak matematyczny dowód na ograniczenia konkretnej architektury może zostać błędnie zinterpretowany jako dowód na bezużyteczność całego paradygmatu badawczego, opóźniając rozwój Deep Learningu o dziesięciolecia.

Aby zrozumieć wagę tego wydarzenia, musimy wrócić do 1958 roku, kiedy Frank Rosenblatt zaprezentował Perceptron Mark I – maszynę zdolną do uczenia się rozpoznawania prostych kształtów. Perceptron był modelem jednowarstwowej sieci neuronowej, inspirowanym biologią. Rosenblatt udowodnił, że potrafi on uczyć się funkcji logicznych takich jak AND (koniunkcja) czy OR (alternatywa) poprzez dostosowywanie wag połączeń na podstawie błędów. Entuzjazm był ogromny – wierzono, że to klucz do budowy elektronicznego mózgu, a prasa pisała o maszynach, które będą „chodzić, mówić, widzieć, pisać, reprodukować się i być świadome swojego istnienia".

Minsky i Papert, zwolennicy podejścia symbolicznego, wylali kubeł zimnej wody na te nadzieje. Wykazali z matematyczną precyzją, że jednowarstwowy perceptron nie jest w stanie rozwiązać problemu XOR (Exclusive OR – alternatywa wykluczająca). Problem XOR jest nieliniowo separowalny – nie da się oddzielić poprawnych odpowiedzi od błędnych jedną prostą linią na płaszczyźnie. Tabela prawdy dla XOR (gdzie 1 i 1 daje 0, a 0 i 0 daje 0) była dla perceptronu nie do przeskoczenia.

Krytyka ta była precyzyjna i merytoryczna w odniesieniu do sieci jednowarstwowych. Autorzy zasugerowali jednak, że problem ten może dotyczyć również sieci wielowarstwowych, a nawet jeśli nie, to ich trenowanie zajmie nieskończoność czasu. Niestety, ta sugestia została odebrana przez agencje finansujące jako wyrok śmierci dla wszystkich sieci neuronowych. Choć wiedziano, że dodanie warstw ukrytych (Multilayer Perceptrons) teoretycznie rozwiązuje problem XOR, brakowało wówczas efektywnego algorytmu ich uczenia (Backpropagation został spopularyzowany dopiero w 1986 roku). Ten "błąd w ocenie potencjału" spowodował, że finansowanie popłynęło niemal wyłącznie w stronę systemów symbolicznych (Knowledge-Based Systems), a sieci neuronowe musiały czekać na swój renesans aż do lat 80., a pełny rozkwit aż do przełomu lat 2010.`,
    
    // Article 5
    'blog.article5.title': 'Deep Blue i Koniec Szachowej Dominacji Człowieka: Analiza Meczu z 1997 Roku',
    'blog.article5.excerpt': '11 maja 1997 roku superkomputer IBM Deep Blue pokonał urzędującego mistrza świata w szachach, Garriego Kasparowa. Zwycięstwo to było triumfem brutalnej siły obliczeniowej nad intuicją.',
    'blog.article5.content': `11 maja 1997 roku w Nowym Jorku doszło do wydarzenia, które wstrząsnęło światową opinią publiczną i na zawsze zmieniło postrzeganie relacji człowiek-maszyna. Superkomputer IBM Deep Blue pokonał urzędującego mistrza świata w szachach, Garriego Kasparowa, wynikiem 3.5 do 2.5 w sześciopartiowym meczu. Zwycięstwo Deep Blue było triumfem brutalnej siły obliczeniowej nad intuicją, symbolicznie kończąc epokę, w której szachy były uważane za ostateczny test ludzkiego intelektu.

Deep Blue nie był systemem "inteligentnym" w dzisiejszym rozumieniu AI (nie używał sieci neuronowych ani uczenia maszynowego typu Deep Learning). Był to majstersztyk inżynierii sprzętowej i algorytmicznej typu "brute force" (siłowe przeszukiwanie). System składał się z klastra RS/6000 SP z 32 dedykowanymi procesorami szachowymi VLSI, zdolnymi do analizy 200 milionów pozycji szachowych na sekundę. Jego moc obliczeniowa wynosiła 11.38 GFLOPS, co w tamtych czasach było wartością astronomiczną, choć dziś jest osiągalne dla smartfona.

Kluczowy moment nastąpił w drugiej partii meczu. Kasparow, poddając partię w pozycji, którą później analizy komputerowe uznały za możliwą do zremisowania, uległ presji psychologicznej. Mistrz świata przyznał później, że maszyna "grała jak Bóg" w pewnych momentach, a w innych wykonywała ruchy tak ludzkie i nielogiczne dla komputera, że podejrzewał interwencję arcymistrzów po stronie IBM. Paradoksalnie, to nie perfekcja, ale nieprzewidywalność maszyny (wynikająca z błędu w kodzie, który spowodował losowy ruch w bezpiecznej sytuacji) zdestabilizowała Kasparowa, który uznał to za objaw "wyższej inteligencji".

Mecz ten miał ogromne implikacje biznesowe i społeczne. Wartość rynkowa IBM wzrosła o miliardy dolarów w ciągu tygodnia, a marka zyskała wizerunek lidera innowacji. Technologia rozwinięta na potrzeby Deep Blue znalazła zastosowanie w modelowaniu finansowym, analizie ryzyka i "data mining". Jednak z perspektywy nauki o AI, zwycięstwo to pokazało, że zadania uważane za wymagające "myślenia" (jak szachy) można rozwiązać za pomocą wystarczająco szybkiego przeszukiwania. To wywołało debatę: czy Deep Blue myślał, czy tylko liczył? Odpowiedź na to pytanie („liczył") zmusiła badaczy do poszukiwania nowych metod (takich jak sieci neuronowe), które wykraczałyby poza czystą kalkulację i zbliżały się do prawdziwego rozumienia.`,
    
    // Article 6
    'blog.article6.title': 'LeNet-5: Jak Yann LeCun Nauczył Komputery Widzieć (1989-1998)',
    'blog.article6.excerpt': 'Pod koniec lat 80., zespół pod kierownictwem Yanna LeCuna pracował nad automatycznym rozpoznawaniem odręcznie pisanych cyfr. Wynikiem tych prac była architektura LeNet-5, która zdefiniowała paradygmat współczesnego widzenia komputerowego.',
    'blog.article6.content': `Pod koniec lat 80., w laboratoriach AT&T Bell Labs, zespół pod kierownictwem Yanna LeCuna pracował nad rozwiązaniem problemu, który wydawał się trywialny dla ludzi, a niemożliwy dla maszyn: automatycznego rozpoznawania odręcznie pisanych cyfr na kopertach i czekach. Wynikiem tych prac była seria architektur sieci neuronowych, z których najsłynniejszą stała się LeNet-5, zaprezentowana w 1998 roku. LeNet-5 nie był po prostu kolejną siecią neuronową; był architekturą, która zdefiniowała paradygmat współczesnego widzenia komputerowego (Computer Vision), wprowadzając konwolucję i pooling jako standardowe operacje.

Przed erą LeNet, rozpoznawanie obrazów opierało się na "ręcznym inżynierowaniu cech" (hand-crafted features). Naukowcy musieli manualnie programować detektory krawędzi, pętli czy krzywizn, co było procesem żmudnym, podatnym na błędy i mało odpornym na zmienność danych (np. inny charakter pisma). LeCun wprowadził rewolucyjną ideę: uczenie end-to-end. Zamiast mówić maszynie, jak wygląda cyfra "5", pozwolił sieci samej nauczyć się odpowiednich filtrów bezpośrednio z surowych pikseli obrazu, wykorzystując algorytm wstecznej propagacji błędu.

Architektura LeNet-5 wprowadziła trzy kluczowe innowacje, które są fundamentem dzisiejszych potężnych modeli CNN (Convolutional Neural Networks):

1. Warstwy Konwolucyjne (Convolutional Layers): Zastosowanie małych filtrów (kerneli), które przesuwają się po obrazie, wykrywając lokalne cechy (np. linie pionowe, poziome). Dzięki mechanizmowi współdzielenia wag (weight sharing), sieć potrzebowała znacznie mniej parametrów niż klasyczne sieci w pełni połączone, co umożliwiało jej trenowanie na ówczesnym sprzęcie.

2. Subsampling (Pooling): Warstwy redukujące wymiarowość obrazu (uśrednianie), co czyniło sieć odporną na niewielkie przesunięcia, skalowanie i zniekształcenia wejściowego obrazu (niezmienniczość translacyjna).

3. Hierarchiczność: Sieć uczyła się cech od prostych (krawędzie) w pierwszych warstwach do złożonych (całe kształty cyfr) w głębszych warstwach, naśladując działanie kory wzrokowej ssaków.

LeNet-5 osiągnął komercyjny sukces, będąc wykorzystywanym w bankomatach i systemach pocztowych w USA do czytania milionów czeków dziennie (baza danych MNIST wywodzi się z tych prac). To właśnie ta architektura stała się "przodkiem" systemów takich jak AlexNet (2012), które zapoczątkowały obecną rewolucję Deep Learningu, udowadniając, że sieci neuronowe mogą rozwiązywać problemy percepcyjne lepiej niż jakakolwiek inna metoda.`,
    
    // Article 7
    'blog.article7.title': 'AlphaGo i Ruch 37: Moment, w Którym AI Przekroczyła Ludzką Kreatywność',
    'blog.article7.excerpt': 'W marcu 2016 roku system AlphaGo zmierzył się z Lee Sedolem, 18-krotnym mistrzem świata w Go. Ruch 37 w drugiej partii meczu jest historycznym dowodem na to, że AI potrafi generować oryginalną wiedzę.',
    'blog.article7.content': `W marcu 2016 roku w Seulu odbył się pojedynek, który wielu ekspertów uważało za niemożliwy do rozstrzygnięcia na korzyść maszyny przez kolejną dekadę. System AlphaGo firmy Google DeepMind zmierzył się z Lee Sedolem, 18-krotnym mistrzem świata w Go. Gra Go, ze względu na swoją astronomiczną liczbę możliwych kombinacji (więcej niż atomów w obserwowalnym wszechświecie: 10 do potęgi 170) i oparcie na intuicji oraz strategii terytorialnej, była ostatnim bastionem ludzkiej supremacji intelektualnej nad maszynami. Ruch 37 w drugiej partii meczu jest historycznym dowodem na to, że sztuczna inteligencja nie jest ograniczona do naśladowania ludzkich wzorców, lecz potrafi generować nową, oryginalną wiedzę.

Momentem, który zdefiniował ten mecz – i być może całą przyszłość AI – był Ruch 37 w drugiej partii. AlphaGo wykonał zagranie czarnym kamieniem na tzw. piątą linię ("shoulder hit"). W tradycyjnej teorii Go, rozwijanej przez mistrzów w Azji przez ponad 2500 lat, taki ruch na tym etapie gry był uważany za błąd, zagranie zbyt otwarte i ryzykowne. Komentatorzy byli zszokowani, sądząc początkowo, że operator maszyny popełnił błąd przy kładzeniu kamienia. Sam Lee Sedol musiał wyjść z sali, by ochłonąć – potrzebował aż 15 minut na sformułowanie odpowiedzi.

Późniejsza analiza logów AlphaGo wykazała, że maszyna oceniła prawdopodobieństwo wykonania takiego ruchu przez człowieka na 1 do 10 000. Dla algorytmu opartego na naśladowaniu ludzi byłby to ruch niemożliwy. Jednak AlphaGo, trenowany nie tylko na partiach ludzkich, ale przede wszystkim metodą uczenia przez wzmacnianie (Reinforcement Learning) grając miliony partii sam ze sobą (self-play), "widział" coś, czego ludzie nie dostrzegali. Ruch ten zapewnił mu kontrolę nad środkiem planszy w dalszej części gry i ostatecznie doprowadził do zwycięstwa.

Ruch 37 stał się symbolem "nieludzkiej kreatywności" (alien creativity). W przeciwieństwie do Deep Blue, który wygrał dzięki szybkości obliczeń, AlphaGo wygrał dzięki zrozumieniu i innowacji strategicznej. To wydarzenie zmieniło postrzeganie AI z narzędzia optymalizacyjnego na narzędzie odkrywcze. Udowodniło, że AI może nas uczyć nowych rzeczy w dziedzinach, które wydawały się nam w pełni poznane. Dziś te same metody są stosowane do odkrywania nowych leków, struktur białek (AlphaFold) czy optymalizacji zużycia energii, gdzie AI znajduje rozwiązania wykraczające poza ludzkie heurystyki.`,
    
    // Article 8
    'blog.article8.title': 'Ojcowie Chrzestni Deep Learningu: Hinton, Bengio, LeCun i Ng – Architekci Nowego Świata',
    'blog.article8.excerpt': 'Współczesna eksplozja AI jest wynikiem dekad upartej pracy małej grupy badaczy. Geoffrey Hinton, Yann LeCun, Yoshua Bengio oraz Andrew Ng są powszechnie uznawani za "Ojców Chrzestnych" tej rewolucji.',
    'blog.article8.content': `Współczesna eksplozja AI, którą obserwujemy od 2012 roku, nie jest dziełem przypadku, lecz wynikiem dekad upartej pracy małej grupy badaczy. Wbrew głównemu nurtowi nauki lat 90. i 2000., który był skupiony na metodach symbolicznych i statystycznych, wierzyli oni w potencjał sieci neuronowych. Geoffrey Hinton, Yann LeCun, Yoshua Bengio (laureaci Nagrody Turinga z 2018 roku, zwaną "Noblem informatyki") oraz Andrew Ng są powszechnie uznawani za "Ojców Chrzestnych" tej rewolucji. Ich historia to dowód na to, że naukowy nonkonformizm zmienia świat.

Geoffrey Hinton (Uniwersytet w Toronto/Google) odegrał kluczową rolę w popularyzacji algorytmu wstecznej propagacji błędu (backpropagation) w 1986 roku, co umożliwiło trenowanie sieci wielowarstwowych. Przez lata był ignorowany, a jego prace odrzucane przez prestiżowe konferencje. Dopiero w 2012 roku jego zespół stworzył AlexNet – model, który zmiażdżył konkurencję w konkursie ImageNet, redukując błąd rozpoznawania obrazów o połowę i udowadniając ostateczną wyższość Deep Learningu.

Yann LeCun (NYU/Meta AI) jest pionierem konwolucyjnych sieci neuronowych (CNN), inspirowanych budową kory wzrokowej kota. Jego prace nad architekturą LeNet (czytanie czeków) były jednymi z pierwszych komercyjnych wdrożeń sieci neuronowych w latach 90. Obecnie LeCun jest głównym orędownikiem uczenia samonadzorowanego (Self-Supervised Learning) i krytykiem straszenia "egzystencjalnym ryzykiem" AI, twierdząc, że systemy powinny uczyć się świata z obserwacji, jak dzieci.

Yoshua Bengio (Uniwersytet w Montrealu) położył podwaliny pod modelowanie sekwencji i języka, co doprowadziło do rozwoju NLP i dzisiejszych Transformerów. Jego prace nad reprezentacją wiedzy (word embeddings) i generatywnymi sieciami przeciwstawnymi (GAN) są fundamentalne dla generatywnego AI. Bengio jest również silnym głosem w debacie etycznej, nawołującym do ostrożności i regulacji AI.

Andrew Ng (Stanford/Google Brain/Baidu) odegrał inną, ale równie ważną rolę inżynieryjną i edukacyjną. Zrozumiał, że paliwem dla sieci neuronowych są ogromne dane i moc obliczeniowa (GPU). Jako twórca Google Brain (słynny eksperyment z 2012 r., gdzie sieć sama nauczyła się rozpoznawać koty na YouTube) udowodnił skalowalność tych metod. Jako współzałożyciel Coursera, zdemokratyzował wiedzę o AI, szkoląc miliony inżynierów na całym świecie i tworząc globalną kadrę, która dziś buduje systemy AI.`,
    
    // Article 9
    'blog.article9.title': 'Od Turinga do Transformers: Krótka Historia Modeli Językowych',
    'blog.article9.excerpt': 'Ewolucja przetwarzania języka naturalnego przeszła długą drogę od prostych reguł gramatycznych do architektur Transformer, osiągając zdolność rozumienia kontekstu na poziomie zbliżonym do ludzkiego.',
    'blog.article9.content': `Ewolucja przetwarzania języka naturalnego (NLP) przeszła długą drogę od prostych reguł gramatycznych do statystycznych modeli n-gramowych, by ostatecznie, dzięki architekturze Transformer, osiągnąć zdolność do rozumienia kontekstu i generowania spójnych narracji na poziomie zbliżonym do ludzkiego. Marzenie o maszynie, z którą można rozmawiać, jest tak stare jak sama informatyka i stanowiło jeden z głównych celów AI od samego początku.

Pierwsze próby, takie jak ELIZA Josepha Weizenbauma z 1966 roku, opierały się na prostym dopasowywaniu wzorców (pattern matching) i sztywnych regułach. ELIZA symulowała psychoterapeutę, odbijając pytania użytkownika ("Dlaczego tak myślisz?"), co dawało iluzję rozmowy, ale nie wiązało się z żadnym zrozumieniem tekstu. Przez dekady NLP zmagało się z problemem wieloznaczności języka i brakiem pamięci kontekstowej – systemy gubiły wątek po kilku zdaniach.

Przełom nastąpił w latach 90. i 2000. wraz z wprowadzeniem metod statystycznych i sieci rekurencyjnych (RNN) oraz LSTM (Long Short-Term Memory). Potrafiły one przetwarzać sekwencje słów, ale miały problem z długimi tekstami (tzw. problem zanikającego gradientu) i nie dało się ich trenować równolegle, co spowalniało rozwój. Prawdziwa rewolucja wybuchła w 2017 roku wraz z publikacją pracy "Attention Is All You Need" przez badaczy Google. Wprowadzili oni architekturę Transformer, która odrzuciła sekwencyjne przetwarzanie (słowo po słowie) na rzecz mechanizmu atencji (Self-Attention).

Mechanizm atencji pozwala modelowi "skupić się" na wszystkich słowach w zdaniu jednocześnie, ważąc ich znaczenie względem siebie. Dzięki temu model rozumie, że w zdaniu "Zamek był zamknięty, więc nie weszliśmy do środka", słowo "zamek" odnosi się do budowli, a nie do suwaka, ponieważ analizuje relację ze słowem "weszliśmy". Co kluczowe, Transformery umożliwiły niespotykane wcześniej zrównoleglenie obliczeń na kartach GPU, co pozwoliło na trenowanie modeli na całym internecie. To doprowadziło do powstania gigantycznych modeli LLM (Large Language Models) jak GPT-3, GPT-4 czy Claude. W 2025 roku rozwój ten wchodzi w nową fazę, skupiając się na efektywności (np. architektury MatMul-free LLM) i zdolnościach rozumowania, a nie tylko generowania tekstu.`,
    
    // Article 10
    'blog.article10.title': 'Etyka AI w Działaniach Wojennych: Autonomiczne Systemy Uzbrojenia i Dylemat Odpowiedzialności',
    'blog.article10.excerpt': 'Wprowadzenie zaawansowanego AI do systemów uzbrojenia budzi kontrowersje dotykające fundamentalnych kwestii moralnych i prawnych. Czy decyzja o odebraniu życia może być kiedykolwiek delegowana algorytmowi?',
    'blog.article10.content': `Współczesne pole walki ulega bezprecedensowej cyfryzacji i automatyzacji. Drony, systemy obrony przeciwrakietowej i autonomiczne pojazdy stają się standardem w armiach świata. Jednak wprowadzenie zaawansowanego AI do systemów uzbrojenia (Lethal Autonomous Weapons Systems - LAWS) budzi kontrowersje, które wykraczają poza technologię, dotykając fundamentalnych kwestii moralnych i prawnych. Czy decyzja o odebraniu życia może być kiedykolwiek delegowana algorytmowi?

Debata toczy się między dwiema skrajnie różnymi wizjami. Zwolennicy, tacy jak emerytowany generał Jack Shanahan (były szef Joint Artificial Intelligence Center w USA), argumentują, że AI może uczynić wojnę "bardziej humanitarną". Precyzja maszyn pozwala drastycznie ograniczyć straty wśród cywilów (Collateral Damage). Ponadto, AI nie odczuwa strachu, gniewu, zmęczenia ani żądzy zemsty – emocji, które często prowadzą do zbrodni wojennych (jak masakry cywilów). Maszyny mogą podejmować decyzje w ułamkach sekund, chroniąc własnych żołnierzy przed atakiem roju dronów czy pocisków hipersonicznych.

Przeciwnicy, w tym organizacje humanitarne (Human Rights Watch) i etycy, wskazują na niebezpieczeństwo problemu "black box" i braku odpowiedzialności. Algorytmy Deep Learning są nieprzejrzyste – często nie wiemy, dlaczego podjęły daną decyzję. Kto odpowiada, gdy autonomiczny dron popełni błąd (np. z powodu błędnej klasyfikacji obiektu przez sieć neuronową) i zaatakuje szkołę zamiast bazy wojskowej? Programista? Dowódca, który go uruchomił? Czy sam algorytm, który nie ma osobowości prawnej? Istnieje też ryzyko "flash wars" – konfliktów wybuchających w milisekundach w wyniku błędu algorytmicznego, oraz obniżenia progu wejścia w konflikt, ponieważ wojna prowadzona przez maszyny jest politycznie "tańsza" (brak trumien z żołnierzami wracających do kraju).

W 2025 roku, w obliczu wyścigu zbrojeń AI między mocarstwami (USA, Chiny, Rosja), kluczowym wyzwaniem jest stworzenie międzynarodowych ram prawnych. Koncepcja "Meaningful Human Control" (znaczącej kontroli ludzkiej) zakłada, że człowiek musi być zawsze ostatecznym decydentem w pętli decyzyjnej (Human-in-the-loop), zwłaszcza przy użyciu siły letalnej. Jednak presja szybkości pola walki sprawia, że rola człowieka może zostać zredukowana do "Human-on-the-loop" (nadzorcy) lub nawet wyeliminowana ("Human-out-of-the-loop"), co stanowi jeden z najpoważniejszych dylematów cywilizacyjnych naszej ery.`,
    
    // Articles 11-60 Polish content will be added here
    
    // Footer
    'footer.copyright': '© 2025 OpenMind AI Consulting. Wszystkie prawa zastrzeżone.',
    'footer.privacy': 'Polityka prywatności',
    'footer.rodo': 'RODO',
    'footer.cta': 'Zacznijmy Projekt',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Our Services',
    'nav.about': 'About Us',
    'nav.blog': 'AI Knowledge Base',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'OpenMind',
    'hero.subtitle': 'AI',
    'hero.description': 'A Polish startup combining innovation with flexibility. We deliver advanced AI solutions tailored to a dynamically changing market.',
    'hero.description2': 'We combine local know-how with global machine learning and natural language processing technologies, offering effective support for businesses, the public sector, and families in everyday use of intelligent systems.',
    'hero.cta': "Step into tomorrow's technology today",
    'hero.cta.consultation': 'Book a free consultation',
    
    // Mission Section
    'mission.title': 'Our Mission',
    'mission.description1': 'OpenMind AI Consulting is a Polish startup specializing in artificial intelligence consulting and implementation for business, public administration, and everyday life. We help organizations of all sizes discover the true potential of AI – from process automation, through intelligent data analysis, to creating chatbots and virtual assistants.',
    'mission.description2': 'We believe artificial intelligence should be accessible to everyone. Our mission is to translate advanced machine learning and natural language processing technologies into practical benefits – time savings, cost reduction, and increased competitiveness. We operate in compliance with GDPR, prioritizing data security and ethical AI use.',
    
    // Bento Grid Tiles
    'bento.contact.title': 'Contact Us',
    'bento.contact.desc': 'Have questions about implementing AI in your company? Want to learn how artificial intelligence can streamline your processes? Fill out the contact form, and our experts will reach out within 24 hours.',
    'bento.contact.cta': 'Go to form',
    'bento.advisor.title': 'AI Application Creator',
    'bento.advisor.desc': "Not sure how AI can help you? Our intelligent advisor will analyze your needs and suggest optimal solutions tailored to your life, business, education, or other areas. Discover the true potential of artificial intelligence.",
    'bento.advisor.cta': 'Launch AI Advisor',
    'bento.advisor.modal.title': 'AI Advisor – Find Applications for Artificial Intelligence',
    'bento.advisor.modal.subtitle': 'Answer a few questions, and our AI will help you discover how artificial intelligence can improve your life, business, or education.',
    
    // Features
    'features.title': 'Why OpenMind AI?',
    'features.subtitle': 'Comprehensive approach to digital transformation',
    'features.speed.title': 'Rapid Implementation',
    'features.speed.desc': 'We efficiently deliver AI projects through proven methodologies and ready-made solutions',
    'features.custom.title': 'Personalization',
    'features.custom.desc': "Every solution tailored to your organization's unique needs",
    'features.support.title': '24/7 Support',
    'features.support.desc': "We're with you at every stage - from consultation to implementation and optimization",
    'features.innovation.title': 'Latest Technologies',
    'features.innovation.desc': 'We utilize cutting-edge AI models and proven frameworks',
    'features.security.title': 'Security',
    'features.security.desc': 'All solutions comply with GDPR and the highest cybersecurity standards',
    'features.roi.title': 'High ROI',
    'features.roi.desc': 'Measurable business results - automation, savings, competitiveness',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive AI solutions tailored to the needs of modern organizations, the public sector, and everyday life',
    'services.consulting.title': 'AI Business Consulting',
    'services.consulting.desc': "We analyze your company's real needs and select AI tools that truly work – from automating repetitive tasks, through sales trend prediction, to intelligent big data analysis. AI stops being a buzzword and becomes your daily operational support.",
    'services.consulting.benefit1': 'Process automation',
    'services.consulting.benefit2': 'Predictive data analysis',
    'services.consulting.benefit3': 'Decision optimization',
    'services.training.title': 'AI Training and Workshops',
    'services.training.desc': 'We deliver practical knowledge about what artificial intelligence really is – algorithms that learn from examples and make decisions. We teach effective use of ChatGPT, generative tools, and automation systems for businesses, public institutions, and teams. No theory – just concrete skills.',
    'services.training.benefit1': 'Practical workshops',
    'services.training.benefit2': 'Industry-specific training',
    'services.training.benefit3': 'Ready-to-use scenarios',
    'services.business.title': 'Business with AI in a Week',
    'services.business.desc': "A comprehensive practical program where we're your partner in launching a ready business from scratch. In just seven days, you'll handle official formalities, create professional branding (website, visual identity, graphics, reels, stories, e-books, SEO), learn to acquire clients and manage social media – all thanks to artificial intelligence and no-code tools. It's a revolution that removes the barrier between average users and coding specialists.",
    'services.business.benefit1': 'Help with official formalities',
    'services.business.benefit2': 'Complete branding and website',
    'services.business.benefit3': 'AI-powered client acquisition strategies',
    'services.social.title': 'Social Media Campaigns with AI Avatars',
    'services.social.desc': "We create groundbreaking social media campaigns using AI-generated digital avatars. Your AI alter ego, created with deep neural learning, speaks in your voice, in your style, represents your brand 24/7 – on TikTok, Instagram, YouTube, LinkedIn. This isn't deepfake, it's intelligent synthesis of image and personality that scales your presence without losing authenticity. We're talking about a real revolution in content marketing – less production work, more strategy and creativity.",
    'services.social.benefit1': 'Brand-tailored AI avatars',
    'services.social.benefit2': 'Scalable content production',
    'services.social.benefit3': 'Consistent social media presence',
    'services.public.title': 'AI for Public Administration',
    'services.public.desc': "We prepare the public sector for digital transformation based on artificial intelligence. We implement intelligent citizen service chatbots, automate document and application classification, build predictive systems for budget planning and demographic analysis. AI in public service isn't science fiction – these are algorithms that learn from historical data and support administrative decision-making, saving officials' time and improving service quality for residents. All compliant with GDPR and information security standards.",
    'services.public.benefit1': 'Citizen service automation',
    'services.public.benefit2': 'Intelligent document management',
    'services.public.benefit3': 'Compliance with regulations and GDPR',
    'services.strategy.title': 'Strategic Consulting',
    'services.strategy.desc': 'We build a comprehensive AI implementation strategy for your organization. We show where automation will bring the greatest benefits, how to measure return on investment, and how to conduct digital transformation – step by step, taking into account your business specifics and real technological possibilities.',
    'services.strategy.benefit1': 'Implementation roadmap',
    'services.strategy.benefit2': 'ROI calculation',
    'services.strategy.benefit3': 'Transformation plan',
    'services.custom.title': 'Personalized AI Solutions',
    'services.custom.desc': "We create dedicated machine learning and natural language processing systems tailored to your needs. Context-understanding chatbots, recommendation systems, intelligent document classification – we show how AI can solve your specific business problems, not just technological ones.",
    'services.custom.benefit1': 'Conversational chatbots',
    'services.custom.benefit2': 'Recommendation systems',
    'services.custom.benefit3': 'Automatic classification',
    'services.optimization.title': 'Process Optimization',
    'services.optimization.desc': 'We analyze your processes and identify where AI can save time and money. We identify repetitive tasks suitable for automation, show the potential of prediction and data analysis. The result? Less routine, more valuable work, concrete operational savings.',
    'services.optimization.benefit1': 'AI potential audit',
    'services.optimization.benefit2': 'Cost reduction',
    'services.optimization.benefit3': 'Team efficiency increase',
    'services.security.title': 'AI Security and Ethics',
    'services.security.desc': "We support safe and ethical use of artificial intelligence – from personal data protection policies and GDPR compliance to conscious algorithm management. We ensure AI operates in accordance with law and your organization's values, building trust with clients and employees.",
    'services.security.benefit1': 'GDPR compliance',
    'services.security.benefit2': 'AI security audit',
    'services.security.benefit3': 'Ethical standards',
    
    // Features (additional)
    'features.personalization.title': 'Personalization and Simplicity',
    'features.personalization.desc': "We adapt intelligent algorithms to your real challenges – without technical jargon. For us, AI isn't an abstraction, but a tool that truly makes everyday work easier and saves time.",
    'features.universal.title': 'For Business, Administration, and Everyday Life',
    'features.universal.desc': "Artificial intelligence consists of systems that learn from data and make decisions – they automate routine, analyze trends, answer questions. We'll show you how to use them effectively, whether you manage a company, public institution, or simply want to act smarter in your life.",
    'features.knowhow.title': 'Polish Know-how + Global Technologies',
    'features.knowhow.desc': 'We use the latest language models and machine learning tools from industry leaders, adapting them to local needs. We translate global innovation into practical benefits for Polish organizations and users.',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Your data is safe. We are committed to protecting your privacy.',
    'privacy.admin.title': '1. Data Controller',
    'privacy.admin.desc': 'The personal data controller is OpenMind AI Consulting based in Poland. You can contact the controller at: biuro@openmind.pl',
    'privacy.scope.title': '2. Scope of Data Processing',
    'privacy.scope.desc': 'We process the following personal data:',
    'privacy.scope.item1': 'Name and surname - for client identification and communication personalization',
    'privacy.scope.item2': 'Email address - for communication and responding to inquiries',
    'privacy.scope.item3': 'Phone number - optionally, for telephone contact',
    'privacy.scope.item4': 'Message content - content of inquiries and client communication',
    'privacy.legal.title': '3. Legal Basis and Purpose of Processing',
    'privacy.legal.desc': 'Personal data is processed based on:',
    'privacy.legal.item1': 'Art. 6(1)(a) GDPR - consent to data processing for contact and service provision',
    'privacy.legal.item2': 'Art. 6(1)(b) GDPR - contract performance or taking steps before entering into a contract',
    'privacy.legal.item3': 'Art. 6(1)(f) GDPR - legitimate interest of the controller in marketing products and services',
    'privacy.rights.title': '4. Your Rights',
    'privacy.rights.desc': 'Under GDPR, you have the following rights:',
    'privacy.rights.access': 'Right of Access',
    'privacy.rights.access.desc': 'To your personal data',
    'privacy.rights.rectification': 'Right to Rectification',
    'privacy.rights.rectification.desc': 'Correcting incorrect data',
    'privacy.rights.erasure': 'Right to Erasure',
    'privacy.rights.erasure.desc': 'Of personal data',
    'privacy.rights.withdraw': 'Right to Withdraw Consent',
    'privacy.rights.withdraw.desc': 'At any time',
    'privacy.retention.title': '5. Data Retention Period',
    'privacy.retention.desc': 'Personal data will be stored for the period necessary to achieve the purposes for which it was collected, or until consent is withdrawn. In the case of contracts and accounting documents - in accordance with legal regulations (minimum 5 years).',
    'privacy.datasecurity.title': '6. Data Security',
    'privacy.datasecurity.desc': 'We implement appropriate technical and organizational measures to ensure the security of processed personal data, including protection against improper processing, loss, damage, or destruction.',
    'privacy.questions.title': 'Questions about the privacy policy?',
    'privacy.questions.desc': 'If you have questions about personal data processing, please contact us:',
    'privacy.effective': 'Privacy policy effective from: October 3, 2025',
    
    // About
    'about.title': 'About Us',
    'about.ceo.name': 'Łukasz Czarnecki',
    'about.ceo.title': 'CEO & Founder',
    'about.ceo.bio': 'Graduate of Nicolaus Copernicus University in Toruń in Internal Security with a specialization in Information Security. Gained experience in public administration and as a manager in an international corporation, delivering projects for organizations such as General Electric, Amazon, Macquarie, J.P. Morgan, American Express, and the United Nations. Combines operational discipline with results orientation, emphasizing GDPR compliance, data processing minimization, encryption, and EU hosting.',
    'about.company.desc': "OpenMind AI designs, implements, and maintains solutions based on advanced language and vision models that genuinely support sales, marketing, and customer service. Our service range includes strategic diagnosis and KPI definition, building conversational chatbots and product assistants, applications created for specific company problems, API integrations with CRM, e-commerce, payment and booking systems, as well as memory and knowledge retrieval layers (RAG) and process automation. We deliver projects in a SaaS model – with a fixed activation fee and predictable, needs-based subscription – developing solutions iteratively, based on performance measurement, A/B testing, and regular reviews. The goal is to sustainably increase valuable inquiries and bookings, reduce response times, decrease returns, and increase customer satisfaction.",
    'about.expertise.title': 'Expertise',
    'about.expertise.desc': 'Deep knowledge of AI capabilities and its practical application',
    'about.precision.title': 'Precision',
    'about.precision.desc': 'Tailored solutions that truly meet your needs',
    'about.innovation.title': 'Innovation',
    'about.innovation.desc': 'Latest technologies in service of practical applications',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Ready for a conversation about the future? Contact us today',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.locationValue': 'Poland',
    'contact.hours': 'Business Hours',
    'contact.hours.weekdays': 'Monday - Friday: 9:00 AM - 5:00 PM',
    'contact.hours.weekend': 'Saturday - Sunday: Closed',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'An error occurred while sending the message',
    
    // Blog
    'blog.subtitle': 'Practical knowledge about artificial intelligence, machine learning, and automation',
    'blog.readMore': 'Read more',
    
    // Article 1
    'blog.article1.title': 'The Constitutional Convention of AI: How the 1956 Dartmouth Workshops Defined the Future of Civilization',
    'blog.article1.excerpt': 'In the summer of 1956, on the peaceful campus of Dartmouth College, AI was born as a distinct scientific discipline. This event is referred to as the "Constitutional Convention of Artificial Intelligence".',
    'blog.article1.content': `In the summer of 1956, on the peaceful campus of Dartmouth College in Hanover, New Hampshire, an event took place that is described in encyclopedias and computer science textbooks as the "Constitutional Convention of Artificial Intelligence." It was there, during eight weeks of research workshops (Dartmouth Summer Research Project on Artificial Intelligence), that AI was born as a distinct scientific discipline, separating from cybernetics, automata theory, and neuroscience. This conference was not merely an academic meeting, but a moment of crystallization for a new field of science, where the fundamental assumption was defined that every feature of intelligence can be precisely described mathematically – an assumption that drives AI development to this day.

The initiators of this enterprise were four visionaries whose names became synonymous with technological progress: John McCarthy from Dartmouth College (creator of the term "Artificial Intelligence"), Marvin Minsky from Harvard, Nathaniel Rochester from IBM, and Claude Shannon from Bell Telephone Laboratories. In their 1955 research proposal, they put forward a bold, even provocative hypothesis: "Every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it." This sentence became a dogma that has survived decades, despite numerous "AI winters" and paradigm shifts.

The workshops were attended by the intellectual elite of the time, including Allen Newell and Herbert Simon, who brought with them Logic Theorist – the first computer program in history capable of automatically proving mathematical theorems. This was tangible proof that computers could operate on logical symbols, not just numbers, opening the path to symbolic AI (GOFAI – Good Old-Fashioned AI). This program could prove 38 of the 52 theorems contained in the monumental work Principia Mathematica by Russell and Whitehead, and in one case found a proof more elegant than the one created by humans.

Analysis of the conference proceedings reveals a fascinating paradox that determined the field's fate for the next half century. On one hand, participants were convinced that creating a machine with human intelligence was a matter of "one summer" or at most a few years. This excessive optimism later led to investor disappointment. On the other hand, it was there that key problems were defined that we still grapple with today: natural language processing (NLP), neural networks, machine creativity, and self-improvement of systems. Terminology and research directions were established that led us from simple checkers-playing algorithms (Arthur Samuel) to modern generative models. Dartmouth 1956 is a lesson about the power of vision, but also about humility toward the complexity of the human mind – the visionaries of 1956 correctly identified what needed to be done, but drastically underestimated how difficult it would be.`,
    
    // Article 2
    'blog.article2.title': 'From "Giant Brains" to the Turing Test: The Evolution of the Thinking Machine Concept (1921-1950)',
    'blog.article2.excerpt': 'Understanding modern AI requires going back to pre-digital times. This history does not begin in Silicon Valley laboratories, but on theater stages in Prague and in the offices of mathematicians at Bletchley Park.',
    'blog.article2.content': `Understanding modern AI requires going back to pre-digital times. This history does not begin in Silicon Valley laboratories, but on theater stages in Prague and in the offices of mathematicians at Bletchley Park. Before the first silicon processors were created, the foundations of artificial intelligence were laid in literature, philosophy, and theoretical mathematics, and Alan Turing's 1950 work finally moved the debate from the realm of "is it possible" to "how do we test it."

As early as 1921, Karel Čapek in the play R.U.R. (Rossum's Universal Robots) introduced the word "robot" to the global vocabulary, derived from the Czech word meaning forced serf labor. This was the first cultural signal that humanity was beginning to come to terms with the idea of artificial beings performing human tasks, although in Čapek's work they were biological rather than mechanical entities. This cultural zeitgeist prepared the ground for scientific considerations.

The key scientific foundation was laid in 1943 by the duo: neurophysiologist Warren McCulloch and logician Walter Pitts. Their work "A Logical Calculus of the Ideas Immanent in Nervous Activity" first proposed a mathematical model of the neuron, suggesting that brain functions could be described using logic gates (AND, OR, NOT). This was the moment of birth of connectionism – the idea that intelligence emerges from networks of simple information-processing elements, which is the direct ancestor of today's Deep Learning networks.

The turning point was 1950 and Alan Turing's publication "Computing Machinery and Intelligence." Turing, the father of modern computer science, instead of asking "Can machines think?" – which he considered too semantically and philosophically loaded a question – proposed an operational test, known today as the Turing Test (The Imitation Game). If a human cannot distinguish a machine from another human in a text conversation, the machine should be considered intelligent. Turing introduced a concept that remains the "Holy Grail" of AI to this day: separating the physical construction of the machine from its intellectual capabilities.

Turing was decades ahead of his time, predicting that computers would evolve from executing rigid instructions to learning and adapting. His vision, combined with earlier work on machines such as ENIAC or the Atanasoff-Berry Computer (the first computer using the binary system), created the foundations for the digital era. Today's LLM models, such as GPT-4, are essentially an attempt to finally pass the Turing Test, realizing the vision outlined over 70 years ago. Interestingly, Turing also predicted the existence of a "child machine" – a program that, instead of having knowledge pre-loaded, learns from scratch, which is the essence of today's Machine Learning.`,
    
    // Article 3
    'blog.article3.title': 'The Lighthill Report and the Anatomy of AI Winters: When Promises Collide with Reality',
    'blog.article3.excerpt': 'The history of artificial intelligence development is not a straight line ascending toward singularity. It resembles rather a sinusoid of excitement and deep disappointment. These periods, called "AI Winters," carry a crucial lesson for today\'s investors.',
    'blog.article3.content': `The history of artificial intelligence development is not a straight line ascending toward singularity. It resembles rather a sinusoid of excitement and deep disappointment. These periods, called "AI Winters," carry a crucial lesson for today's investors and decision-makers. The most spectacular example of such a collapse was 1973 and the publication of Sir James Lighthill's report in Great Britain. AI winters are not the result of lack of scientific progress, but the effect of divergence between excessive expectations and hard computational limitations.

In the 1950s and 1960s, AI pioneers promised rapid creation of machines with human cognitive abilities. Funding flowed broadly, especially from the American DARPA agency, which counted on automatic translation of Russian documents during the Cold War. However, Lighthill, an eminent mathematician, conducted an audit on behalf of the British Science Research Council (SRC) that brutally verified these promises. His main conclusion was that AI had suffered "complete failure" in achieving its "grandiose objectives."

Lighthill identified a barrier that contemporary science could not overcome: "combinatorial explosion." The problem was that algorithms that worked excellently in simplified micro-worlds (so-called toy problems, like chess on a small board or simple logical proofs) became useless when attempting to scale to real-world problems. An increase of a few variables caused exponential growth in computation time, making solutions impractical even for the fastest supercomputers of the time.

This report had a devastating impact. It led to drastic funding cuts in Great Britain, where most research teams were eliminated except at three universities. Echoes of the report reached the USA, giving arguments to critics in Congress to cut DARPA funding, freezing research for almost a decade (the first AI winter). Historical analysis shows that AI winters are a mechanism of market correction. They occur when "hype" (media and marketing noise) detaches from engineering fundamentals. In 2025, in the face of debate about the limits of scaling language models and their energy consumption, the Lighthill Report remains a warning: technology must deliver real economic value, not just scientific curiosities, to survive the test of time.`,
    
    // Article 4
    'blog.article4.title': 'The Perceptron Controversy: How Minsky and Papert Halted the Development of Neural Networks',
    'blog.article4.excerpt': 'In the history of science, it rarely happens that a single publication almost completely stops the development of an entire branch of research. This happened with the book Perceptrons (1969) by Minsky and Papert.',
    'blog.article4.content': `In the history of science, it rarely happens that a single publication almost completely stops the development of an entire branch of research. This happened with the book "Perceptrons" (1969) by Marvin Minsky and Seymour Papert of MIT. This publication demonstrates how a mathematical proof of limitations of a specific architecture can be misinterpreted as proof of the uselessness of an entire research paradigm, delaying the development of Deep Learning by decades.

To understand the significance of this event, we must go back to 1958, when Frank Rosenblatt presented the Perceptron Mark I – a machine capable of learning to recognize simple shapes. The Perceptron was a model of a single-layer neural network, inspired by biology. Rosenblatt proved that it could learn logical functions such as AND (conjunction) or OR (disjunction) by adjusting connection weights based on errors. Enthusiasm was enormous – it was believed to be the key to building an electronic brain, and the press wrote about machines that would "walk, talk, see, write, reproduce, and be conscious of their existence."

Minsky and Papert, proponents of the symbolic approach, poured cold water on these hopes. They demonstrated with mathematical precision that a single-layer perceptron cannot solve the XOR problem (Exclusive OR). The XOR problem is non-linearly separable – you cannot separate correct answers from incorrect ones with a single straight line on a plane. The truth table for XOR (where 1 and 1 gives 0, and 0 and 0 gives 0) was insurmountable for the perceptron.

This criticism was precise and substantive regarding single-layer networks. However, the authors suggested that this problem might also apply to multi-layer networks, and even if not, training them would take infinity. Unfortunately, this suggestion was received by funding agencies as a death sentence for all neural networks. Although it was known that adding hidden layers (Multilayer Perceptrons) theoretically solves the XOR problem, there was no efficient algorithm for training them at the time (Backpropagation was only popularized in 1986). This "error in assessing potential" caused funding to flow almost exclusively toward symbolic systems (Knowledge-Based Systems), and neural networks had to wait for their renaissance until the 1980s, and full flourishing until the breakthrough of the 2010s.`,
    
    // Article 5
    'blog.article5.title': 'Deep Blue and the End of Human Chess Dominance: Analysis of the 1997 Match',
    'blog.article5.excerpt': 'On May 11, 1997, IBM supercomputer Deep Blue defeated reigning world chess champion Garry Kasparov. This victory was a triumph of brute computational force over intuition.',
    'blog.article5.content': `On May 11, 1997, in New York, an event took place that shook world public opinion and forever changed the perception of the human-machine relationship. IBM supercomputer Deep Blue defeated reigning world chess champion Garry Kasparov by a score of 3.5 to 2.5 in a six-game match. Deep Blue's victory was a triumph of brute computational force over intuition, symbolically ending an era in which chess was considered the ultimate test of human intellect.

Deep Blue was not an "intelligent" system in today's understanding of AI (it did not use neural networks or Deep Learning-type machine learning). It was a masterpiece of hardware and algorithmic engineering of the "brute force" type (exhaustive search). The system consisted of an RS/6000 SP cluster with 32 dedicated VLSI chess processors, capable of analyzing 200 million chess positions per second. Its computational power was 11.38 GFLOPS, which at the time was an astronomical value, though today it is achievable by a smartphone.

The key moment came in the second game of the match. Kasparov, resigning in a position that later computer analyses deemed drawable, succumbed to psychological pressure. The world champion later admitted that the machine "played like God" at certain moments, and at others made moves so human and illogical for a computer that he suspected intervention by grandmasters on IBM's side. Paradoxically, it was not perfection, but the unpredictability of the machine (resulting from a code bug that caused a random move in a safe situation) that destabilized Kasparov, who saw it as a sign of "higher intelligence."

This match had enormous business and social implications. IBM's market value rose by billions of dollars within a week, and the brand gained an image as an innovation leader. Technology developed for Deep Blue found applications in financial modeling, risk analysis, and data mining. However, from the perspective of AI science, this victory showed that tasks considered to require "thinking" (like chess) can be solved by sufficiently fast searching. This sparked debate: did Deep Blue think, or just calculate? The answer to this question ("calculated") forced researchers to seek new methods (such as neural networks) that would go beyond pure calculation and approach true understanding.`,
    
    // Article 6
    'blog.article6.title': 'LeNet-5: How Yann LeCun Taught Computers to See (1989-1998)',
    'blog.article6.excerpt': 'In the late 1980s, a team led by Yann LeCun worked on automatic recognition of handwritten digits. The result was the LeNet-5 architecture, which defined the paradigm of modern computer vision.',
    'blog.article6.content': `In the late 1980s, at AT&T Bell Labs, a team led by Yann LeCun worked on solving a problem that seemed trivial for humans but impossible for machines: automatic recognition of handwritten digits on envelopes and checks. The result of this work was a series of neural network architectures, of which the most famous became LeNet-5, presented in 1998. LeNet-5 was not just another neural network; it was an architecture that defined the paradigm of modern computer vision (Computer Vision), introducing convolution and pooling as standard operations.

Before the LeNet era, image recognition was based on "hand-crafted features." Scientists had to manually program edge, loop, or curve detectors, which was a tedious process, error-prone, and not very resistant to data variability (e.g., different handwriting styles). LeCun introduced a revolutionary idea: end-to-end learning. Instead of telling the machine what the digit "5" looks like, he let the network learn the appropriate filters directly from raw image pixels, using the backpropagation algorithm.

The LeNet-5 architecture introduced three key innovations that are the foundation of today's powerful CNN (Convolutional Neural Networks) models:

1. Convolutional Layers: Application of small filters (kernels) that slide across the image, detecting local features (e.g., vertical, horizontal lines). Thanks to the weight sharing mechanism, the network needed significantly fewer parameters than classic fully connected networks, enabling training on contemporary hardware.

2. Subsampling (Pooling): Layers reducing image dimensionality (averaging), making the network resistant to small shifts, scaling, and distortions of the input image (translational invariance).

3. Hierarchy: The network learned features from simple (edges) in the first layers to complex (whole digit shapes) in deeper layers, mimicking the operation of the mammalian visual cortex.

LeNet-5 achieved commercial success, being used in ATMs and postal systems in the USA to read millions of checks daily (the MNIST database derives from this work). It was this architecture that became the "ancestor" of systems like AlexNet (2012), which launched the current Deep Learning revolution, proving that neural networks can solve perceptual problems better than any other method.`,
    
    // Article 7
    'blog.article7.title': 'AlphaGo and Move 37: The Moment AI Transcended Human Creativity',
    'blog.article7.excerpt': 'In March 2016, AlphaGo faced Lee Sedol, 18-time world champion in Go. Move 37 in the second game is historical proof that AI can generate original knowledge.',
    'blog.article7.content': `In March 2016 in Seoul, a duel took place that many experts considered impossible to resolve in favor of a machine for another decade. Google DeepMind's AlphaGo system faced Lee Sedol, 18-time world champion in Go. The game of Go, due to its astronomical number of possible combinations (more than atoms in the observable universe: 10 to the power of 170) and reliance on intuition and territorial strategy, was the last bastion of human intellectual supremacy over machines. Move 37 in the second game of the match is historical proof that artificial intelligence is not limited to imitating human patterns, but can generate new, original knowledge.

The moment that defined this match – and perhaps the entire future of AI – was Move 37 in the second game. AlphaGo made a play with a black stone on the so-called fifth line ("shoulder hit"). In traditional Go theory, developed by masters in Asia for over 2,500 years, such a move at this stage of the game was considered a mistake, a play too open and risky. Commentators were shocked, initially thinking the machine operator had made an error placing the stone. Lee Sedol himself had to leave the room to cool down – he needed 15 minutes to formulate a response.

Later analysis of AlphaGo's logs showed that the machine estimated the probability of a human making such a move at 1 in 10,000. For an algorithm based on imitating humans, this would have been an impossible move. However, AlphaGo, trained not only on human games but primarily through reinforcement learning by playing millions of games against itself (self-play), "saw" something humans didn't perceive. This move secured control of the center of the board later in the game and ultimately led to victory.

Move 37 became a symbol of "alien creativity." Unlike Deep Blue, which won through computational speed, AlphaGo won through understanding and strategic innovation. This event changed the perception of AI from an optimization tool to a discovery tool. It proved that AI can teach us new things in fields that seemed fully explored. Today, the same methods are applied to discovering new drugs, protein structures (AlphaFold), or optimizing energy consumption, where AI finds solutions beyond human heuristics.`,
    
    // Article 8
    'blog.article8.title': 'The Godfathers of Deep Learning: Hinton, Bengio, LeCun, and Ng – Architects of a New World',
    'blog.article8.excerpt': 'The modern AI explosion is the result of decades of persistent work by a small group of researchers. Geoffrey Hinton, Yann LeCun, Yoshua Bengio, and Andrew Ng are widely recognized as the "Godfathers" of this revolution.',
    'blog.article8.content': `The modern AI explosion that we have observed since 2012 is not a matter of chance, but the result of decades of persistent work by a small group of researchers. Against the mainstream of science in the 1990s and 2000s, which focused on symbolic and statistical methods, they believed in the potential of neural networks. Geoffrey Hinton, Yann LeCun, Yoshua Bengio (recipients of the 2018 Turing Award, called the "Nobel of computer science"), and Andrew Ng are widely recognized as the "Godfathers" of this revolution. Their story is proof that scientific nonconformity changes the world.

Geoffrey Hinton (University of Toronto/Google) played a key role in popularizing the backpropagation algorithm in 1986, which enabled training multi-layer networks. For years he was ignored, and his papers were rejected by prestigious conferences. Only in 2012 did his team create AlexNet – a model that crushed the competition in the ImageNet contest, reducing image recognition error by half and proving the ultimate superiority of Deep Learning.

Yann LeCun (NYU/Meta AI) is a pioneer of convolutional neural networks (CNN), inspired by the structure of the cat's visual cortex. His work on the LeNet architecture (reading checks) was one of the first commercial deployments of neural networks in the 1990s. Currently, LeCun is the main proponent of self-supervised learning and a critic of scaremongering about AI's "existential risk," arguing that systems should learn about the world through observation, like children.

Yoshua Bengio (University of Montreal) laid the foundations for sequence and language modeling, which led to the development of NLP and today's Transformers. His work on knowledge representation (word embeddings) and generative adversarial networks (GAN) are fundamental to generative AI. Bengio is also a strong voice in the ethical debate, calling for caution and AI regulation.

Andrew Ng (Stanford/Google Brain/Baidu) played a different but equally important engineering and educational role. He understood that the fuel for neural networks is massive data and computational power (GPU). As creator of Google Brain (the famous 2012 experiment where the network learned to recognize cats on YouTube by itself), he proved the scalability of these methods. As co-founder of Coursera, he democratized AI knowledge, training millions of engineers worldwide and creating a global workforce that today builds AI systems.`,
    
    // Article 9
    'blog.article9.title': 'From Turing to Transformers: A Brief History of Language Models',
    'blog.article9.excerpt': 'The evolution of natural language processing has come a long way from simple grammatical rules to Transformer architectures, achieving the ability to understand context at a level approaching human.',
    'blog.article9.content': `The evolution of natural language processing (NLP) has come a long way from simple grammatical rules to statistical n-gram models, ultimately reaching, thanks to the Transformer architecture, the ability to understand context and generate coherent narratives at a level approaching human. The dream of a machine you could talk to is as old as computer science itself and has been one of the main goals of AI from the very beginning.

Early attempts, such as Joseph Weizenbaum's ELIZA from 1966, were based on simple pattern matching and rigid rules. ELIZA simulated a psychotherapist by reflecting the user's questions ("Why do you think so?"), which gave the illusion of conversation but involved no understanding of the text. For decades, NLP struggled with the problem of language ambiguity and lack of contextual memory – systems lost the thread after a few sentences.

The breakthrough came in the 1990s and 2000s with the introduction of statistical methods and recurrent networks (RNN) and LSTM (Long Short-Term Memory). They could process word sequences but had problems with long texts (the so-called vanishing gradient problem) and couldn't be trained in parallel, which slowed development. The real revolution erupted in 2017 with the publication of the paper "Attention Is All You Need" by Google researchers. They introduced the Transformer architecture, which rejected sequential processing (word by word) in favor of the attention mechanism (Self-Attention).

The attention mechanism allows the model to "focus" on all words in a sentence simultaneously, weighing their importance relative to each other. Thanks to this, the model understands that in the sentence "The lock was locked, so we didn't go inside," the word "lock" refers to the mechanism, not a castle, because it analyzes the relationship with the word "go." Crucially, Transformers enabled unprecedented parallelization of computations on GPUs, allowing models to be trained on the entire internet. This led to the emergence of giant LLM (Large Language Models) like GPT-3, GPT-4, or Claude. In 2025, this development enters a new phase, focusing on efficiency (e.g., MatMul-free LLM architectures) and reasoning capabilities, not just text generation.`,
    
    // Article 10
    'blog.article10.title': 'AI Ethics in Warfare: Autonomous Weapons Systems and the Dilemma of Responsibility',
    'blog.article10.excerpt': 'The introduction of advanced AI into weapons systems raises controversies touching fundamental moral and legal issues. Can the decision to take a life ever be delegated to an algorithm?',
    'blog.article10.content': `The modern battlefield is undergoing unprecedented digitization and automation. Drones, missile defense systems, and autonomous vehicles are becoming standard in world armies. However, the introduction of advanced AI into weapons systems (Lethal Autonomous Weapons Systems - LAWS) raises controversies that go beyond technology, touching fundamental moral and legal issues. Can the decision to take a life ever be delegated to an algorithm?

The debate takes place between two radically different visions. Proponents, such as retired General Jack Shanahan (former head of the Joint Artificial Intelligence Center in the USA), argue that AI can make war "more humane." Machine precision allows drastic reduction of civilian casualties (Collateral Damage). Moreover, AI does not feel fear, anger, fatigue, or desire for revenge – emotions that often lead to war crimes (like civilian massacres). Machines can make decisions in fractions of seconds, protecting their own soldiers from swarm drone attacks or hypersonic missiles.

Opponents, including humanitarian organizations (Human Rights Watch) and ethicists, point to the danger of the "black box" problem and lack of accountability. Deep Learning algorithms are opaque – we often don't know why they made a given decision. Who is responsible when an autonomous drone makes an error (e.g., due to misclassification of an object by a neural network) and attacks a school instead of a military base? The programmer? The commander who launched it? Or the algorithm itself, which has no legal personality? There is also the risk of "flash wars" – conflicts erupting in milliseconds due to algorithmic error, and lowering the threshold for entering conflict, because war waged by machines is politically "cheaper" (no coffins with soldiers returning home).

In 2025, in the face of the AI arms race between great powers (USA, China, Russia), the key challenge is creating international legal frameworks. The concept of "Meaningful Human Control" assumes that a human must always be the ultimate decision-maker in the decision loop (Human-in-the-loop), especially when using lethal force. However, the pressure of battlefield speed means that the human role may be reduced to "Human-on-the-loop" (supervisor) or even eliminated ("Human-out-of-the-loop"), which constitutes one of the most serious civilizational dilemmas of our era.`,
    
    // Articles 11-60 English content will be added here
    
    // Footer
    'footer.copyright': '© 2025 OpenMind AI Consulting. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.rodo': 'GDPR',
    'footer.cta': "Let's Start a Project",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'en' || stored === 'pl') ? stored : 'pl';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
