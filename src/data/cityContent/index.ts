import type { MiastoData } from './types';
import { dolnoslaskieCities } from './dolnoslaskie';
import { kujawskoPomorskieCities } from './kujawsko-pomorskie';
import { lubelskieCities } from './lubelskie';

const allCities: MiastoData[] = [
  ...dolnoslaskieCities,
  ...kujawskoPomorskieCities,
  ...lubelskieCities,
];

const cityMap = new Map<string, MiastoData>();
allCities.forEach((c) => cityMap.set(`${c.wojewodztwo}/${c.slug}`, c));

export const findCityContent = (
  voivodeshipSlug: string,
  citySlug: string,
): MiastoData | undefined => cityMap.get(`${voivodeshipSlug}/${citySlug}`);

export type { MiastoData, CityFAQ } from './types';
