import { writable } from 'svelte/store';

export let map = writable();
export let mapContainer = writable();

export let isAddingNote = writable(false);
export let doneAddingNote = writable(false);

export let mapZoom = writable(2);
export let mapLng = writable(0);
export let mapLtd = writable(0);

export let lastMouseCoords = writable({});

export let loadedNotes = writable([]);
export let loadedNoteIds = writable([]);