import { derived, writable } from "svelte/store"

export const esbData = writable([]);

esbData.subscribe(() => {
  console.log(`Updating esbData...`);
});

export const totalDataPoints = derived(esbData, $d => $d.length);


export const standardRate = writable(43);
export const peakRate = writable(47);
export const dayRate = writable(45);
export const nightRate = writable(20);
export const standingCharge = writable(300);
