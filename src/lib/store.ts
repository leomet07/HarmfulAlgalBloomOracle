import type { LatLngTuple } from 'leaflet';
import { writable } from 'svelte/store';

export const mapCoords = writable<LatLngTuple | undefined>();
export const selectedDateIndex = writable<number>(2); // index in array of dates
export const simpleRasterDates_filtered = writable<Date[]>([]);