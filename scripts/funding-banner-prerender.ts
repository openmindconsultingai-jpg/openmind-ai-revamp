import { voivodeships } from '../src/data/voivodeships';
import { getFundingBannerCopy, hasFundingBanner } from '../src/lib/fundingBanner';

const esc = (value: string) => value.replace(/[&<>"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
}[character] ?? character));

/** Static, readable BUR copy injected before the existing prerendered content. */
export function fundingBannerPrerender(routePath: string): string {
  if (!hasFundingBanner(routePath)) return '';

  const cityMatch = routePath.match(/^\/gdzie-dzialamy\/([^/]+)\/([^/]+)$/);
  const voivodeship = cityMatch
    ? voivodeships.find((item) => item.slug === cityMatch[1])
    : undefined;
  const city = voivodeship?.cities.find((item) => item.slug === cityMatch?.[2]);
  const copy = getFundingBannerCopy('pl', city);

  return `<aside data-funding-banner aria-label="${esc(copy.ariaLabel)}"><h2>${esc(copy.heading)}</h2><p>${esc(copy.body)}</p><p><a href="/contact">${esc(copy.primaryCta)}</a> <a href="/aktualnosci/wpis-do-bazy-uslug-rozwojowych">${esc(copy.secondaryCta)}</a></p></aside>`;
}
