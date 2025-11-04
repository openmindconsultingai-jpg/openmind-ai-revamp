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
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.title': 'OpenMind',
    'hero.subtitle': 'AI',
    'hero.description': 'Polski start-up łączący innowacyjność z elastycznością. Dostarczamy zaawansowane rozwiązania AI dostosowane do dynamicznie zmieniającego się rynku.',
    'hero.description2': 'Łączymy lokalne know-how z globalnymi technologiami uczenia maszynowego i przetwarzania języka naturalnego, oferując skuteczne wsparcie dla firm, sektora publicznego i rodzin w codziennym wykorzystaniu inteligentnych systemów.',
    'hero.cta': 'Wkrocz w technologię jutra już dziś',
    
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
    'about.ceo.bio': 'Absolwent Uniwersytetu Mikołaja Kopernika w Toruniu na kierunku bezpieczeństwo wewnętrzne, ze specjalizacją bezpieczeństwa informacji. Doświadczenie zdobywał w administracji publicznej oraz jako manager w międzynarodowej korporacji, realizując projekty dla organizacji takich jak General Electric, Amazon, Macquarie, J.P. Morgan, American Express oraz ONZ. W pracy łączy dyscyplinę operacyjną z orientacją na wynik, kładąc nacisk na zgodność z RODO, minimalizację przetwarzania danych, szyfrowanie i hosting w UE.',
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
    
    // Footer
    'footer.copyright': '© 2025 OpenMind AI Consulting. Wszystkie prawa zastrzeżone.',
    'footer.privacy': 'Polityka prywatności',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Our Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'OpenMind',
    'hero.subtitle': 'AI',
    'hero.description': 'A Polish startup combining innovation with flexibility. We deliver advanced AI solutions tailored to a dynamically changing market.',
    'hero.description2': 'We combine local know-how with global machine learning and natural language processing technologies, offering effective support for businesses, the public sector, and families in everyday use of intelligent systems.',
    'hero.cta': 'Step into tomorrow\'s technology today',
    
    // Features
    'features.title': 'Why OpenMind AI?',
    'features.subtitle': 'Comprehensive approach to digital transformation',
    'features.speed.title': 'Rapid Implementation',
    'features.speed.desc': 'We efficiently deliver AI projects through proven methodologies and ready-made solutions',
    'features.custom.title': 'Personalization',
    'features.custom.desc': 'Every solution tailored to your organization\'s unique needs',
    'features.support.title': '24/7 Support',
    'features.support.desc': 'We\'re with you at every stage - from consultation to implementation and optimization',
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
    'services.consulting.desc': 'We analyze your company\'s real needs and select AI tools that truly work – from automating repetitive tasks, through sales trend prediction, to intelligent big data analysis. AI stops being a buzzword and becomes your daily operational support.',
    'services.consulting.benefit1': 'Process automation',
    'services.consulting.benefit2': 'Predictive data analysis',
    'services.consulting.benefit3': 'Decision optimization',
    'services.training.title': 'AI Training and Workshops',
    'services.training.desc': 'We deliver practical knowledge about what artificial intelligence really is – algorithms that learn from examples and make decisions. We teach effective use of ChatGPT, generative tools, and automation systems for businesses, public institutions, and teams. No theory – just concrete skills.',
    'services.training.benefit1': 'Practical workshops',
    'services.training.benefit2': 'Industry-specific training',
    'services.training.benefit3': 'Ready-to-use scenarios',
    'services.business.title': 'Business with AI in a Week',
    'services.business.desc': 'A comprehensive practical program where we\'re your partner in launching a ready business from scratch. In just seven days, you\'ll handle official formalities, create professional branding (website, visual identity, graphics, reels, stories, e-books, SEO), learn to acquire clients and manage social media – all thanks to artificial intelligence and no-code tools. It\'s a revolution that removes the barrier between average users and coding specialists.',
    'services.business.benefit1': 'Help with official formalities',
    'services.business.benefit2': 'Complete branding and website',
    'services.business.benefit3': 'AI-powered client acquisition strategies',
    'services.social.title': 'Social Media Campaigns with AI Avatars',
    'services.social.desc': 'We create groundbreaking social media campaigns using AI-generated digital avatars. Your AI alter ego, created with deep neural learning, speaks in your voice, in your style, represents your brand 24/7 – on TikTok, Instagram, YouTube, LinkedIn. This isn\'t deepfake, it\'s intelligent synthesis of image and personality that scales your presence without losing authenticity. We\'re talking about a real revolution in content marketing – less production work, more strategy and creativity.',
    'services.social.benefit1': 'Brand-tailored AI avatars',
    'services.social.benefit2': 'Scalable content production',
    'services.social.benefit3': 'Consistent social media presence',
    'services.public.title': 'AI for Public Administration',
    'services.public.desc': 'We prepare the public sector for digital transformation based on artificial intelligence. We implement intelligent citizen service chatbots, automate document and application classification, build predictive systems for budget planning and demographic analysis. AI in public service isn\'t science fiction – these are algorithms that learn from historical data and support administrative decision-making, saving officials\' time and improving service quality for residents. All compliant with GDPR and information security standards.',
    'services.public.benefit1': 'Citizen service automation',
    'services.public.benefit2': 'Intelligent document management',
    'services.public.benefit3': 'Compliance with regulations and GDPR',
    'services.strategy.title': 'Strategic Consulting',
    'services.strategy.desc': 'We build a comprehensive AI implementation strategy for your organization. We show where automation will bring the greatest benefits, how to measure return on investment, and how to conduct digital transformation – step by step, taking into account your business specifics and real technological possibilities.',
    'services.strategy.benefit1': 'Implementation roadmap',
    'services.strategy.benefit2': 'ROI calculation',
    'services.strategy.benefit3': 'Transformation plan',
    'services.custom.title': 'Personalized AI Solutions',
    'services.custom.desc': 'We create dedicated machine learning and natural language processing systems tailored to your needs. Context-understanding chatbots, recommendation systems, intelligent document classification – we show how AI can solve your specific business problems, not just technological ones.',
    'services.custom.benefit1': 'Conversational chatbots',
    'services.custom.benefit2': 'Recommendation systems',
    'services.custom.benefit3': 'Automatic classification',
    'services.optimization.title': 'Process Optimization',
    'services.optimization.desc': 'We analyze your processes and identify where AI can save time and money. We identify repetitive tasks suitable for automation, show the potential of prediction and data analysis. The result? Less routine, more valuable work, concrete operational savings.',
    'services.optimization.benefit1': 'AI potential audit',
    'services.optimization.benefit2': 'Cost reduction',
    'services.optimization.benefit3': 'Team efficiency increase',
    'services.security.title': 'AI Security and Ethics',
    'services.security.desc': 'We support safe and ethical use of artificial intelligence – from personal data protection policies and GDPR compliance to conscious algorithm management. We ensure AI operates in accordance with law and your organization\'s values, building trust with clients and employees.',
    'services.security.benefit1': 'GDPR compliance',
    'services.security.benefit2': 'AI security audit',
    'services.security.benefit3': 'Ethical standards',
    
    // Features (additional)
    'features.personalization.title': 'Personalization and Simplicity',
    'features.personalization.desc': 'We adapt intelligent algorithms to your real challenges – without technical jargon. For us, AI isn\'t an abstraction, but a tool that truly makes everyday work easier and saves time.',
    'features.universal.title': 'For Business, Administration, and Everyday Life',
    'features.universal.desc': 'Artificial intelligence consists of systems that learn from data and make decisions – they automate routine, analyze trends, answer questions. We\'ll show you how to use them effectively, whether you manage a company, public institution, or simply want to act smarter in your life.',
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
    'about.company.desc': 'OpenMind AI designs, implements, and maintains solutions based on advanced language and vision models that genuinely support sales, marketing, and customer service. Our service range includes strategic diagnosis and KPI definition, building conversational chatbots and product assistants, applications created for specific company problems, API integrations with CRM, e-commerce, payment and booking systems, as well as memory and knowledge retrieval layers (RAG) and process automation. We deliver projects in a SaaS model – with a fixed activation fee and predictable, needs-based subscription – developing solutions iteratively, based on performance measurement, A/B testing, and regular reviews. The goal is to sustainably increase valuable inquiries and bookings, reduce response times, decrease returns, and increase customer satisfaction.',
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
    
    // Footer
    'footer.copyright': '© 2025 OpenMind AI Consulting. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
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
