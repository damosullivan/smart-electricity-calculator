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
export const fitRate = writable(17.59);
export const smartStandingCharge = writable(400);

export const evStartTime = writable(2);
export const evEndTime = writable(5);
export const enableEvRate = writable(false);

export const freeSaturdays = writable(false);
export const freeSundays = writable(false);

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

export const importData = derived(esbData, $d => $d.filter(j => !!j.imported))
export const exportedData = derived(esbData, $d => $d.filter(j => !j.imported))

export const totalUnits = derived(importData, $d => $d.map(j => j.kWh))

export const saturdayUnits = derived(importData, $d => $d.filter(i => i.day == 6).map(j => j.kWh))
export const sundayUnits = derived(importData, $d => $d.filter(i => i.day == 0).map(j => j.kWh))

export const chargableImportedData = derived([importData, freeSaturdays, freeSundays], ([$d, $freeSat, $freeSun]) => $d.filter(j => !(j.day === 6 && $freeSat) && !(j.day === 0 && $freeSun)))

export const dayUnits = derived(chargableImportedData, $d => $d.filter(i => (i.hour > 8 && i.hour <= 17) || (i.hour > 19 && i.hour <= 23)).map(j => j.kWh))
export const peakUnits = derived(chargableImportedData, $d => $d.filter(i => i.hour > 17 && i.hour <= 19).map(j => j.kWh))
export const nightUnits = derived(chargableImportedData, $d => $d.filter(i => i.hour > 23 || i.hour <= 8).map(j => j.kWh))
export const evUnits = derived([chargableImportedData, evStartTime, evEndTime], ([$data, $start, $end]) => $data.filter(i => i.hour > $start && i.hour <= $end).map(j => j.kWh))


export const enableFitRate = derived(exportedData, $d => $d.length > 0);
export const fitUnits = derived(exportedData, $d => $d.map(j => j.kWh))


export const totalUnitsSum = derived(totalUnits, $u => $u.reduce(sum, 0))
export const peakUnitsSum = derived(peakUnits, $u => $u.reduce(sum, 0))
export const nightUnitsSum = derived(nightUnits, $u => $u.reduce(sum, 0))
export const evUnitsSum = derived(evUnits, $u => $u.reduce(sum, 0))
export const dayUnitsSum = derived(dayUnits, $u => $u.reduce(sum, 0))
export const fitUnitsSum = derived(fitUnits, $u => $u.reduce(sum, 0))
export const saturdayUnitsSum = derived(saturdayUnits, $u => $u.reduce(sum, 0))
export const sundayUnitsSum = derived(sundayUnits, $u => $u.reduce(sum, 0))


