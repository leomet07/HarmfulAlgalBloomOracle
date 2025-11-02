import type { LatLngTuple } from 'leaflet';
import { writable } from 'svelte/store';

export const mapCoords = writable<LatLngTuple | undefined>();
export const selectedDateYYYYMMDD = writable<string>("2019-01-04");