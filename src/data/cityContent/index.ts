import type { MiastoData } from './types';
import { dolnoslaskieCities } from './dolnoslaskie';
import { kujawskoPomorskieCities } from './kujawsko-pomorskie';
import { lubelskieCities } from './lubelskie';
import { lodzkieCities } from './lodzkie';
import { malopolskieCities } from './malopolskie';
import { mazowieckieCities } from './mazowieckie';
import { opolskieCities } from './opolskie';
import { podkarpackieCities } from './podkarpackie';
import { podlaskieCities } from './podlaskie';
import { pomorskieCities } from './pomorskie';

const allCities: MiastoData[] = [
  ...dolnoslaskieCities,
  ...kujawskoPomorskieCities,
  ...lubelskieCities,
  ...lodzkieCities,
  ...malopolskieCities,
  ...mazowieckieCities,
  ...opolskieCities,
  ...podkarpackieCities,
  ...podlaskieCities,
  ...pomorskieCities,
];

const cityMap = new Map<string, MiastoData>();
allCities.forEach((c) => cityMap.set(`${c.wojewodztwo}/${c.slug}`, c));

export const findCityContent = (
  voivodeshipSlug: string,
  citySlug: string,
): MiastoData | undefined => cityMap.get(`${voivodeshipSlug}/${citySlug}`);

export type { MiastoData, CityFAQ } from './types';
