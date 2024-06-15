import { writable } from "svelte/store";

export let state = writable("");
export let version = writable("");
export let clientIp = writable("");

export let isDarkMode = writable(true);
