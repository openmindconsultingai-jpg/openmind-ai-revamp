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
