import { writable } from "svelte/store";

export let state = writable("");
export let version = writable("");
export let clientIp = writable("");

export let isDarkMode = writable(true);

// TODO: "process" is not defined error
//export let isProd = (process?.env?.ENV && process?.env?.ENV == "prod") || false;