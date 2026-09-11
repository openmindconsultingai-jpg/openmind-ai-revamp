import type { TowerCategory, TowerTheme } from '../components/openmind-tower';

// Replace ONLY section selectors / labels / actions to match the existing client page.
// Keep these arrays and objects outside the React render function.
export const towerCategories: TowerCategory[] = [
  { id: 'konsultacje', label: 'Konsultacje AI', section: '#konsultacje', at: 0 },
  { id: 'szkolenia', label: 'Szkolenia AI', section: '#szkolenia', at: .2 },
  { id: 'strony', label: 'Strony WWW i branding', section: '#strony', at: .4 },
  { id: 'wideo', label: 'Teledyski i wideo AI', section: '#wideo', at: .6 },
  { id: 'rozwoj', label: 'Zakładanie i rozwój firmy z AI', section: '#rozwoj', at: .8 },
  { id: 'automatyzacje', label: 'Automatyzacje i agenci AI', section: '#automatyzacje', at: 1 },
];
export const towerTheme: TowerTheme = {
  accent: '#16ded0', shift: '6vw', scale: '.9',
  'mobile-shift': '3vw', 'mobile-scale': '.94',
  'stage-z': '0', 'ui-z': '30',
};
export const towerConfig = {
  video: '/tower/tower.mp4',
  poster: '/tower/poster.png',
  videoBytes: 15258268,
  categories: towerCategories,
  theme: towerTheme,
  damping: .22,
  headerOffset: 0,
};
