import { derived, writable } from "svelte/store"
import moment from 'moment';

export const esbData = writable([]);


// Smart
export const peakRate = writable(47.94);
export const dayRate = writable(45);
export const nightRate = writable(24.49);
export const nightBoostRate = writable(15);
export const smartStandingCharge = writable(400);

export const enableNightBoost = writable(false);

// Standard
export const standardRate = writable(43);
export const standingCharge = writable(300);

// Day/Night
export const dnDayRate = writable(43);
export const dnNightRate = writable(43);
export const dnStandingCharge = writable(350);


esbData.subscribe(() => {
  console.log(`Updating esbData...`);
});

export const total = derived(esbData, $d => $d.length);

export const minMoment = derived(esbData, $d => moment.min($d.map(e => e.time)))
export const maxMoment = derived(esbData, $d => moment.max($d.map(e => e.time)))
export const totalDays = derived([minMoment, maxMoment], ([$a, $b]) => moment($b).diff(moment($a), 'days'))

export const totalUnits = derived(esbData, $d => $d.map(j => j.units))
export const peakUnits = derived(esbData, $d => $d.filter(i => i.hour > 17 && i.hour <= 19).map(j => j.units))
export const nightUnits = derived(esbData, $d => $d.filter(i => i.hour > 23 || i.hour <= 8).map(j => j.units))
export const nightBoostUnits = derived(esbData, $d => $d.filter(i => i.hour > 2 && i.hour <= 4).map(j => j.units))
export const dayUnits = derived(esbData, $d => $d.filter(i => (i.hour > 8 && i.hour <= 17) || (i.hour > 19 && i.hour <= 23)).map(j => j.units))



