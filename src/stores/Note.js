import { writable } from 'svelte/store';

export let noteHovered = writable(Object);
export let lastNoteMarkerHovered = writable();
export let lastNotePopupHovered = writable();

export let likedNoteId = writable(String);