import { derived, writable } from "svelte/store"
import moment from 'moment';

const sum = (a, b) => a +b;


export const esbData = writable([]);
esbData.subscribe(() => {
  console.log(`Updating esbData...`);
});


// Smart
export const peakRate = writable(47.94);
export const dayRate = writable(45);
export const nightRate = writable(24.49);
export const evRate = writable(15);
export const smartStandingCharge = writable(400);

export const evStartTime = writable(2);
export const evEndTime = writable(5);
export const enableEvRate = writable(false);

// Standard
export const standardRate = writable(43);
export const standingCharge = writable(300);

// Day/Night
export const dnDayRate = writable(43);
export const dnNightRate = writable(23);
export const dnStandingCharge = writable(350);



export const total = derived(esbData, $d => $d.length);

export const minMoment = derived(esbData, $d => moment.min($d.map(e => e.time)))
export const maxMoment = derived(esbData, $d => moment.max($d.map(e => e.time)))
export const totalDays = derived([minMoment, maxMoment], ([$a, $b]) => moment($b).diff(moment($a), 'days'))

export const totalUnits = derived(esbData, $d => $d.map(j => j.kWh))
export const peakUnits = derived(esbData, $d => $d.filter(i => i.hour > 17 && i.hour <= 19).map(j => j.kWh))
export const nightUnits = derived(esbData, $d => $d.filter(i => i.hour > 23 || i.hour <= 8).map(j => j.kWh))
export const evUnits = derived([esbData, evStartTime, evEndTime], ([$data, $start, $end]) => $data.filter(i => i.hour > $start && i.hour <= $end).map(j => j.kWh))
export const dayUnits = derived(esbData, $d => $d.filter(i => (i.hour > 8 && i.hour <= 17) || (i.hour > 19 && i.hour <= 23)).map(j => j.kWh))

export const totalUnitsSum = derived(totalUnits, $u => $u.reduce(sum, 0))
export const peakUnitsSum = derived(peakUnits, $u => $u.reduce(sum, 0))
export const nightUnitsSum = derived(nightUnits, $u => $u.reduce(sum, 0))
export const evUnitsSum = derived(evUnits, $u => $u.reduce(sum, 0))
export const dayUnitsSum = derived(dayUnits, $u => $u.reduce(sum, 0))


