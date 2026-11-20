export type FundingBannerLanguage = 'pl' | 'en';

export interface FundingBannerCity {
  name: string;
  locative: string;
}

const FUNDING_SERVICE_PATHS = new Set([
  '/szkolenia-ai',
  '/szkolenia-ai-stacjonarne',
  '/szkolenia-ai-online',
  '/szkolenia-ai-indywidualne',
  '/szkolenia-microsoft-copilot',
  '/ai-dla-szkol',
  '/konsultacje-ai',
  '/automatyzacja-ai',
  '/zakladanie-firmy-z-ai',
]);

/** Routes with the inline BUR banner; the floating funding popup is suppressed there. */
export function hasFundingBanner(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (path === '/services' || path === '/lokalizacje') return true;
  if (/^\/gdzie-dzialamy\/[^/]+(?:\/[^/]+)?$/.test(path)) return true;
  return FUNDING_SERVICE_PATHS.has(path) || /^\/szkolenia-ai-dla-[^/]+$/.test(path);
}

export function getFundingBannerCopy(
  language: FundingBannerLanguage,
  city?: FundingBannerCity,
) {
  if (language === 'en') {
    return {
      label: 'PARP · DEVELOPMENT SERVICES DATABASE',
      heading: 'AI training and consulting with up to 80% funding',
      body: `OpenMind AI Consulting is listed in the PARP Development Services Database (BUR). Companies, especially SMEs, can fund our AI training and consulting${city ? ` in ${city.name}` : ''} through regional European Funds programmes. We will help you check how much funding you can receive.`,
      primaryCta: 'Check funding',
      secondaryCta: 'How it works',
      ariaLabel: 'PARP Development Services Database and funding',
    };
  }

  return {
    label: 'PARP · BAZA USŁUG ROZWOJOWYCH',
    heading: 'Szkolenia i doradztwo AI z dofinansowaniem nawet do 80%',
    body: `OpenMind AI Consulting jest wpisany do Bazy Usług Rozwojowych PARP. Firmy, zwłaszcza z sektora MŚP, mogą sfinansować nasze szkolenia i doradztwo${city ? ` w ${city.locative}` : ''} ze środków regionalnych programów Fundusze Europejskie. Pomożemy sprawdzić, ile możesz otrzymać.`,
    primaryCta: 'Sprawdź dofinansowanie',
    secondaryCta: 'Jak to działa',
    ariaLabel: 'Baza Usług Rozwojowych PARP i dofinansowanie',
  };
}
