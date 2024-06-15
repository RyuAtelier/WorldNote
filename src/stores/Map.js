import { writable } from 'svelte/store';

export let map = writable(Object);
export let mapContainer = writable(Object);

export let isAddingNote = writable(false);

export let mapZoom = writable(2);
export let mapLng = writable(0);
export let mapLtd = writable(0);

export let lastMouseCoords = writable({});