import { Writable, writable } from 'svelte/store';

export type Region =
  | 'all'
  | 'africa'
  | 'americas'
  | 'asia'
  | 'europe'
  | 'oceania';

export const selectedRegion: Writable<Region> = writable('all');
