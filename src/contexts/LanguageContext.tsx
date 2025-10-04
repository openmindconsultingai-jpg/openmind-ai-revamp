import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pl' | 'en' | 'it';

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
    'features.1.title': 'Personalizacja i prostota',
    'features.1.desc': 'Dopasowujemy inteligentne algorytmy do Twoich realnych wyzwań – bez technicznego żargonu. AI to dla nas nie abstrakcja, ale narzędzie, które naprawdę ułatwia codzienną pracę i oszczędza czas.',
    'features.2.title': 'Dla biznesu, administracji i życia codziennego',
    'features.2.desc': 'Sztuczna inteligencja to systemy, które uczą się z danych i podejmują decyzje – automatyzują rutynę, analizują trendy, odpowiadają na pytania. Pokażemy Ci, jak używać ich efektywnie, niezależnie czy zarządzasz firmą, instytucją publiczną, czy po prostu chcesz działać mądrzej w swoim życiu.',
    'features.3.title': 'Polskie know-how + globalne technologie',
    'features.3.desc': 'Wykorzystujemy najnowsze modele językowe i narzędzia uczenia maszynowego od liderów branży, dostosowując je do lokalnych potrzeb. Przekładamy światową innowację na praktyczne korzyści dla polskich organizacji i użytkowników.',
    
    // Services
    'services.title': 'Nasze Usługi',
    'services.subtitle': 'Kompleksowe rozwiązania AI dostosowane do potrzeb nowoczesnych organizacji, sektora publicznego i życia codziennego',
    'services.1.title': 'Konsultacje AI dla Biznesu',
    'services.1.desc': 'Analizujemy realne potrzeby Twojej firmy i dobieramy narzędzia sztucznej inteligencji, które naprawdę działają – od automatyzacji powtarzalnych zadań, przez predykcję trendów sprzedażowych, po inteligentną analizę dużych zbiorów danych. AI przestaje być buzzwordem, a staje się Twoim codziennym wsparciem operacyjnym.',
    'services.1.benefit1': 'Automatyzacja procesów',
    'services.1.benefit2': 'Predykcyjna analiza danych',
    'services.1.benefit3': 'Optymalizacja decyzji',
    'services.2.title': 'Szkolenia i Warsztaty AI',
    'services.2.desc': 'Przekazujemy praktyczną wiedzę o tym, czym właściwie jest sztuczna inteligencja – algorytmy, które uczą się z przykładów i podejmują decyzje. Uczymy efektywnego wykorzystania ChatGPT, narzędzi generatywnych i systemów automatyzacji dla firm, instytucji publicznych oraz zespołów. Bez teorii – same konkretne umiejętności.',
    'services.2.benefit1': 'Praktyczne warsztaty',
    'services.2.benefit2': 'Szkolenia dostosowane do branży',
    'services.2.benefit3': 'Gotowe scenariusze użycia',
    'services.3.title': 'Działalność z AI w Tydzień',
    'services.3.desc': 'Kompleksowy program praktyczny, w którym jesteśmy Twoim partnerem we wdrożeniu gotowej firmy od zera. W zaledwie siedem dni przejdziesz przez formalności urzędowe, stworzysz profesjonalny branding (stronę www, identyfikację wizualną, grafiki, reels, stories, e-booki, SEO), nauczysz się zdobywać klientów i prowadzić social media – wszystko dzięki sztucznej inteligencji i narzędziom no-code. To rewolucja, która usuwa barierę między przeciętnym użytkownikiem a specjalistami od kodowania.',
    'services.3.benefit1': 'Pomoc w formalnościach urzędowych',
    'services.3.benefit2': 'Kompletny branding i strona WWW',
    'services.3.benefit3': 'Strategie pozyskiwania klientów z AI',
    'services.4.title': 'Kampanie Social Media z AI Awatarami',
    'services.4.desc': 'Tworzymy przełomowe kampanie w mediach społecznościowych z wykorzystaniem cyfrowych awatarów generowanych przez sztuczną inteligencję. Twoje AI alter ego, stworzone z głębokiego uczenia neuronowego, mówi Twoim głosem, w Twoim stylu, reprezentuje Twoją markę 24/7 – na TikToku, Instagramie, YouTube, LinkedIn. To nie deepfake, to inteligentna synteza wizerunku i osobowości, która skaluje Twoją obecność bez utraty autentyczności. Rozmawiamy o realnej rewolucji w content marketingu – mniej pracy produkcyjnej, więcej strategii i kreatywności.',
    'services.4.benefit1': 'AI awatary dopasowane do marki',
    'services.4.benefit2': 'Skalowalna produkcja contentu',
    'services.4.benefit3': 'Konsystentna obecność w social media',
    'services.5.title': 'AI dla Administracji Publicznej',
    'services.5.desc': 'Przygotowujemy sektor publiczny na cyfrową transformację opartą na sztucznej inteligencji. Wdrażamy inteligentne chatboty obsługi obywateli, automatyzujemy klasyfikację dokumentów i wniosków, budujemy systemy predykcyjne do planowania budżetu czy analiz demograficznych. AI w służbie publicznej to nie science fiction – to algorytmy, które uczą się z danych historycznych i wspierają podejmowanie decyzji administracyjnych, oszczędzając czas urzędników i poprawiając jakość usług dla mieszkańców. Wszystko zgodnie z RODO i normami bezpieczeństwa informacji.',
    'services.5.benefit1': 'Automatyzacja obsługi obywateli',
    'services.5.benefit2': 'Inteligentne zarządzanie dokumentami',
    'services.5.benefit3': 'Zgodność z przepisami i RODO',
    'services.6.title': 'Doradztwo Strategiczne',
    'services.6.desc': 'Budujemy kompleksową strategię wdrożenia AI w Twojej organizacji. Pokazujemy, gdzie automatyzacja przyniesie największe korzyści, jak zmierzyć zwrot z inwestycji i jak przeprowadzić transformację cyfrową – krok po kroku, z uwzględnieniem specyfiki Twojego biznesu i realnych możliwości technologicznych.',
    'services.6.benefit1': 'Mapa drogowa wdrożenia',
    'services.6.benefit2': 'Kalkulacja ROI',
    'services.6.benefit3': 'Plan transformacji',
    'services.7.title': 'Personalizowane Rozwiązania AI',
    'services.7.desc': 'Tworzymy dedykowane systemy uczenia maszynowego i przetwarzania języka naturalnego szyte na miarę Twoich potrzeb. Chatboty rozumiejące kontekst, systemy rekomendacji, inteligentna klasyfikacja dokumentów – pokazujemy, jak AI może rozwiązać Twoje konkretne problemy biznesowe, nie tylko technologiczne.',
    'services.7.benefit1': 'Chatboty konwersacyjne',
    'services.7.benefit2': 'Systemy rekomendacji',
    'services.7.benefit3': 'Automatyczna klasyfikacja',
    'services.8.title': 'Optymalizacja Procesów',
    'services.8.desc': 'Prześwietlamy Twoje procesy i wskazujemy, gdzie AI może zaoszczędzić czas i pieniądze. Identyfikujemy powtarzalne zadania nadające się do automatyzacji, pokazujemy potencjał predykcji i analizy danych. Wynik? Mniej rutyny, więcej wartościowej pracy, konkretne oszczędności operacyjne.',
    'services.8.benefit1': 'Audyt potencjału AI',
    'services.8.benefit2': 'Redukcja kosztów',
    'services.8.benefit3': 'Wzrost efektywności zespołu',
    'services.9.title': 'Bezpieczeństwo i Etyka AI',
    'services.9.desc': 'Wspieramy w bezpiecznym i etycznym wykorzystaniu sztucznej inteligencji – od polityk ochrony danych osobowych i zgodności z RODO, po świadome zarządzanie algorytmami. Dbamy o to, żeby AI działała zgodnie z prawem i wartościami Twojej organizacji, budując zaufanie klientów i pracowników.',
    'services.9.benefit1': 'Compliance z RODO',
    'services.9.benefit2': 'Audyt bezpieczeństwa AI',
    'services.9.benefit3': 'Etyczne standardy',
    
    // About
    'about.title': 'O nas',
    'about.subtitle': 'Jesteśmy zespołem pasjonatów technologii AI, którzy wierzą w demokratyzację dostępu do innowacyjnych narzędzi.',
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
    'contact.form.message': 'Wiadomość',
    'contact.form.submit': 'Wyślij wiadomość',
    'contact.form.sending': 'Wysyłanie...',
    'contact.form.success': 'Wiadomość wysłana pomyślnie!',
    'contact.form.error': 'Wystąpił błąd podczas wysyłania wiadomości',
    
    // Privacy
    'privacy.title': 'Polityka Prywatności',
    'privacy.subtitle': 'Twoje dane są bezpieczne. Zobowiązujemy się do ochrony Twojej prywatności.',
    
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
    'features.1.title': 'Personalization and Simplicity',
    'features.1.desc': 'We adapt intelligent algorithms to your real challenges – without technical jargon. For us, AI is not an abstraction, but a tool that truly facilitates daily work and saves time.',
    'features.2.title': 'For Business, Administration and Everyday Life',
    'features.2.desc': 'Artificial intelligence is systems that learn from data and make decisions – automate routine, analyze trends, answer questions. We\'ll show you how to use them effectively, whether you manage a company, a public institution, or simply want to act smarter in your life.',
    'features.3.title': 'Polish Know-How + Global Technologies',
    'features.3.desc': 'We use the latest language models and machine learning tools from industry leaders, adapting them to local needs. We translate global innovation into practical benefits for Polish organizations and users.',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive AI solutions tailored to the needs of modern organizations, the public sector, and everyday life',
    'services.1.title': 'AI Business Consulting',
    'services.1.desc': 'We analyze your company\'s real needs and select AI tools that truly work – from automating repetitive tasks, through sales trend prediction, to intelligent big data analysis. AI stops being a buzzword and becomes your daily operational support.',
    'services.1.benefit1': 'Process automation',
    'services.1.benefit2': 'Predictive data analysis',
    'services.1.benefit3': 'Decision optimization',
    'services.2.title': 'AI Training and Workshops',
    'services.2.desc': 'We provide practical knowledge about what AI really is – algorithms that learn from examples and make decisions. We teach effective use of ChatGPT, generative tools, and automation systems for businesses, public institutions, and teams. No theory – just concrete skills.',
    'services.2.benefit1': 'Practical workshops',
    'services.2.benefit2': 'Industry-specific training',
    'services.2.benefit3': 'Ready-to-use scenarios',
    'services.3.title': 'Business with AI in a Week',
    'services.3.desc': 'A comprehensive practical program where we are your partner in implementing a ready-made business from scratch. In just seven days, you\'ll go through official formalities, create professional branding (website, visual identity, graphics, reels, stories, e-books, SEO), learn to acquire clients and run social media – all thanks to artificial intelligence and no-code tools. It\'s a revolution that removes the barrier between the average user and coding specialists.',
    'services.3.benefit1': 'Help with official formalities',
    'services.3.benefit2': 'Complete branding and website',
    'services.3.benefit3': 'AI-powered client acquisition strategies',
    'services.4.title': 'Social Media Campaigns with AI Avatars',
    'services.4.desc': 'We create breakthrough social media campaigns using AI-generated digital avatars. Your AI alter ego, created through deep neural learning, speaks with your voice, in your style, represents your brand 24/7 – on TikTok, Instagram, YouTube, LinkedIn. This is not deepfake, it\'s intelligent image and personality synthesis that scales your presence without losing authenticity. We\'re talking about a real revolution in content marketing – less production work, more strategy and creativity.',
    'services.4.benefit1': 'Brand-matched AI avatars',
    'services.4.benefit2': 'Scalable content production',
    'services.4.benefit3': 'Consistent social media presence',
    'services.5.title': 'AI for Public Administration',
    'services.5.desc': 'We prepare the public sector for AI-based digital transformation. We implement intelligent citizen service chatbots, automate document and application classification, build predictive systems for budget planning and demographic analysis. AI in public service is not science fiction – it\'s algorithms that learn from historical data and support administrative decision-making, saving officials\' time and improving service quality for residents. Everything in compliance with GDPR and information security standards.',
    'services.5.benefit1': 'Citizen service automation',
    'services.5.benefit2': 'Intelligent document management',
    'services.5.benefit3': 'GDPR compliance',
    'services.6.title': 'Strategic Consulting',
    'services.6.desc': 'We build a comprehensive AI implementation strategy for your organization. We show where automation will bring the greatest benefits, how to measure return on investment, and how to carry out digital transformation – step by step, taking into account the specifics of your business and real technological possibilities.',
    'services.6.benefit1': 'Implementation roadmap',
    'services.6.benefit2': 'ROI calculation',
    'services.6.benefit3': 'Transformation plan',
    'services.7.title': 'Personalized AI Solutions',
    'services.7.desc': 'We create dedicated machine learning and natural language processing systems tailored to your needs. Context-understanding chatbots, recommendation systems, intelligent document classification – we show how AI can solve your specific business problems, not just technological ones.',
    'services.7.benefit1': 'Conversational chatbots',
    'services.7.benefit2': 'Recommendation systems',
    'services.7.benefit3': 'Automatic classification',
    'services.8.title': 'Process Optimization',
    'services.8.desc': 'We screen your processes and point out where AI can save time and money. We identify repetitive tasks suitable for automation, show the potential of prediction and data analysis. Result? Less routine, more valuable work, concrete operational savings.',
    'services.8.benefit1': 'AI potential audit',
    'services.8.benefit2': 'Cost reduction',
    'services.8.benefit3': 'Team efficiency growth',
    'services.9.title': 'AI Security and Ethics',
    'services.9.desc': 'We support the safe and ethical use of artificial intelligence – from personal data protection policies and GDPR compliance to conscious algorithm management. We ensure that AI works in accordance with the law and the values of your organization, building trust among customers and employees.',
    'services.9.benefit1': 'GDPR compliance',
    'services.9.benefit2': 'AI security audit',
    'services.9.benefit3': 'Ethical standards',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'We are a team of AI technology enthusiasts who believe in democratizing access to innovative tools.',
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
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'An error occurred while sending the message',
    
    // Privacy
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Your data is safe. We are committed to protecting your privacy.',
    
    // Footer
    'footer.copyright': '© 2025 OpenMind AI Consulting. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
  },
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'I Nostri Servizi',
    'nav.about': 'Chi Siamo',
    'nav.contact': 'Contatti',
    
    // Hero
    'hero.title': 'OpenMind',
    'hero.subtitle': 'AI',
    'hero.description': 'Una startup polacca che combina innovazione e flessibilità. Forniamo soluzioni AI avanzate adattate a un mercato in rapida evoluzione.',
    'hero.description2': 'Combiniamo il know-how locale con le tecnologie globali di machine learning e natural language processing, offrendo un supporto efficace per aziende, settore pubblico e famiglie nell\'uso quotidiano di sistemi intelligenti.',
    'hero.cta': 'Entra nella tecnologia di domani oggi',
    
    // Features
    'features.1.title': 'Personalizzazione e Semplicità',
    'features.1.desc': 'Adattiamo algoritmi intelligenti alle tue sfide reali – senza gergo tecnico. Per noi l\'AI non è un\'astrazione, ma uno strumento che facilita davvero il lavoro quotidiano e fa risparmiare tempo.',
    'features.2.title': 'Per Business, Amministrazione e Vita Quotidiana',
    'features.2.desc': 'L\'intelligenza artificiale è un sistema che impara dai dati e prende decisioni – automatizza la routine, analizza le tendenze, risponde alle domande. Ti mostreremo come usarla efficacemente, che tu gestisca un\'azienda, un\'istituzione pubblica o semplicemente voglia agire in modo più intelligente nella tua vita.',
    'features.3.title': 'Know-How Polacco + Tecnologie Globali',
    'features.3.desc': 'Utilizziamo i più recenti modelli linguistici e strumenti di machine learning dei leader del settore, adattandoli alle esigenze locali. Traduciamo l\'innovazione globale in vantaggi pratici per le organizzazioni e gli utenti polacchi.',
    
    // Services
    'services.title': 'I Nostri Servizi',
    'services.subtitle': 'Soluzioni AI complete adattate alle esigenze delle organizzazioni moderne, del settore pubblico e della vita quotidiana',
    'services.1.title': 'Consulenza AI per il Business',
    'services.1.desc': 'Analizziamo le reali esigenze della tua azienda e selezioniamo strumenti di intelligenza artificiale che funzionano davvero – dall\'automazione di compiti ripetitivi, alla previsione delle tendenze di vendita, all\'analisi intelligente dei big data. L\'AI smette di essere un termine di moda e diventa il tuo supporto operativo quotidiano.',
    'services.1.benefit1': 'Automazione dei processi',
    'services.1.benefit2': 'Analisi predittiva dei dati',
    'services.1.benefit3': 'Ottimizzazione delle decisioni',
    'services.2.title': 'Formazione e Workshop AI',
    'services.2.desc': 'Forniamo conoscenze pratiche su cosa sia realmente l\'AI – algoritmi che imparano dagli esempi e prendono decisioni. Insegniamo l\'uso efficace di ChatGPT, strumenti generativi e sistemi di automazione per aziende, istituzioni pubbliche e team. Niente teoria – solo competenze concrete.',
    'services.2.benefit1': 'Workshop pratici',
    'services.2.benefit2': 'Formazione specifica per settore',
    'services.2.benefit3': 'Scenari pronti all\'uso',
    'services.3.title': 'Business con AI in una Settimana',
    'services.3.desc': 'Un programma pratico completo in cui siamo il tuo partner nell\'implementazione di un\'attività pronta da zero. In soli sette giorni, passerai attraverso le formalità ufficiali, creerai un branding professionale (sito web, identità visiva, grafiche, reels, stories, e-book, SEO), imparerai ad acquisire clienti e gestire i social media – tutto grazie all\'intelligenza artificiale e agli strumenti no-code. È una rivoluzione che rimuove la barriera tra l\'utente medio e gli specialisti di codifica.',
    'services.3.benefit1': 'Assistenza con formalità ufficiali',
    'services.3.benefit2': 'Branding completo e sito web',
    'services.3.benefit3': 'Strategie di acquisizione clienti con AI',
    'services.4.title': 'Campagne Social Media con Avatar AI',
    'services.4.desc': 'Creiamo campagne rivoluzionarie sui social media utilizzando avatar digitali generati dall\'AI. Il tuo alter ego AI, creato attraverso il deep neural learning, parla con la tua voce, nel tuo stile, rappresenta il tuo brand 24/7 – su TikTok, Instagram, YouTube, LinkedIn. Questo non è deepfake, è una sintesi intelligente di immagine e personalità che scala la tua presenza senza perdere autenticità. Parliamo di una vera rivoluzione nel content marketing – meno lavoro di produzione, più strategia e creatività.',
    'services.4.benefit1': 'Avatar AI abbinati al brand',
    'services.4.benefit2': 'Produzione di contenuti scalabile',
    'services.4.benefit3': 'Presenza coerente sui social media',
    'services.5.title': 'AI per la Pubblica Amministrazione',
    'services.5.desc': 'Prepariamo il settore pubblico per la trasformazione digitale basata sull\'AI. Implementiamo chatbot intelligenti per il servizio ai cittadini, automatizziamo la classificazione di documenti e richieste, costruiamo sistemi predittivi per la pianificazione del budget e l\'analisi demografica. L\'AI nel servizio pubblico non è fantascienza – sono algoritmi che imparano dai dati storici e supportano il processo decisionale amministrativo, risparmiando tempo ai funzionari e migliorando la qualità dei servizi per i residenti. Tutto in conformità con il GDPR e gli standard di sicurezza delle informazioni.',
    'services.5.benefit1': 'Automazione del servizio ai cittadini',
    'services.5.benefit2': 'Gestione intelligente dei documenti',
    'services.5.benefit3': 'Conformità GDPR',
    'services.6.title': 'Consulenza Strategica',
    'services.6.desc': 'Costruiamo una strategia completa di implementazione AI per la tua organizzazione. Mostriamo dove l\'automazione porterà i maggiori vantaggi, come misurare il ritorno sull\'investimento e come effettuare la trasformazione digitale – passo dopo passo, tenendo conto delle specificità del tuo business e delle reali possibilità tecnologiche.',
    'services.6.benefit1': 'Roadmap di implementazione',
    'services.6.benefit2': 'Calcolo del ROI',
    'services.6.benefit3': 'Piano di trasformazione',
    'services.7.title': 'Soluzioni AI Personalizzate',
    'services.7.desc': 'Creiamo sistemi dedicati di machine learning e natural language processing su misura per le tue esigenze. Chatbot che comprendono il contesto, sistemi di raccomandazione, classificazione intelligente dei documenti – mostriamo come l\'AI può risolvere i tuoi problemi aziendali specifici, non solo tecnologici.',
    'services.7.benefit1': 'Chatbot conversazionali',
    'services.7.benefit2': 'Sistemi di raccomandazione',
    'services.7.benefit3': 'Classificazione automatica',
    'services.8.title': 'Ottimizzazione dei Processi',
    'services.8.desc': 'Analizziamo i tuoi processi e indichiamo dove l\'AI può risparmiare tempo e denaro. Identifichiamo compiti ripetitivi adatti all\'automazione, mostriamo il potenziale della previsione e dell\'analisi dei dati. Risultato? Meno routine, più lavoro di valore, risparmi operativi concreti.',
    'services.8.benefit1': 'Audit del potenziale AI',
    'services.8.benefit2': 'Riduzione dei costi',
    'services.8.benefit3': 'Crescita dell\'efficienza del team',
    'services.9.title': 'Sicurezza ed Etica dell\'AI',
    'services.9.desc': 'Supportiamo l\'uso sicuro ed etico dell\'intelligenza artificiale – dalle politiche di protezione dei dati personali e conformità GDPR alla gestione consapevole degli algoritmi. Assicuriamo che l\'AI funzioni in conformità con la legge e i valori della tua organizzazione, costruendo fiducia tra clienti e dipendenti.',
    'services.9.benefit1': 'Conformità GDPR',
    'services.9.benefit2': 'Audit di sicurezza AI',
    'services.9.benefit3': 'Standard etici',
    
    // About
    'about.title': 'Chi Siamo',
    'about.subtitle': 'Siamo un team di appassionati di tecnologia AI che credono nella democratizzazione dell\'accesso a strumenti innovativi.',
    'about.expertise.title': 'Competenza',
    'about.expertise.desc': 'Conoscenza approfondita delle capacità dell\'AI e della sua applicazione pratica',
    'about.precision.title': 'Precisione',
    'about.precision.desc': 'Soluzioni su misura che soddisfano veramente le tue esigenze',
    'about.innovation.title': 'Innovazione',
    'about.innovation.desc': 'Tecnologie più recenti al servizio di applicazioni pratiche',
    
    // Contact
    'contact.title': 'Contatti',
    'contact.subtitle': 'Pronto per una conversazione sul futuro? Contattaci oggi',
    'contact.email': 'Email',
    'contact.phone': 'Telefono',
    'contact.location': 'Posizione',
    'contact.locationValue': 'Polonia',
    'contact.hours': 'Orari di Lavoro',
    'contact.hours.weekdays': 'Lunedì - Venerdì: 9:00 - 17:00',
    'contact.hours.weekend': 'Sabato - Domenica: Chiuso',
    'contact.form.name': 'Nome Completo',
    'contact.form.email': 'Email',
    'contact.form.message': 'Messaggio',
    'contact.form.submit': 'Invia Messaggio',
    'contact.form.sending': 'Invio in corso...',
    'contact.form.success': 'Messaggio inviato con successo!',
    'contact.form.error': 'Si è verificato un errore durante l\'invio del messaggio',
    
    // Privacy
    'privacy.title': 'Politica sulla Privacy',
    'privacy.subtitle': 'I tuoi dati sono al sicuro. Ci impegniamo a proteggere la tua privacy.',
    
    // Footer
    'footer.copyright': '© 2025 OpenMind AI Consulting. Tutti i diritti riservati.',
    'footer.privacy': 'Politica sulla Privacy',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'en' || stored === 'pl' || stored === 'it') ? stored : 'pl';
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
