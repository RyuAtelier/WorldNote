import { writable } from 'svelte/store';

export let mapStore = writable(Object);
export let lastMouseCoords = writable({});