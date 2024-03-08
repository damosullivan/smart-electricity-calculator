import { derived, writable } from "svelte/store";
import moment from "moment";

const sum = (a, b) => a + b;

export const esbData = writable([]);
esbData.subscribe(() => {
  console.log(`Updating esbData...`);
});

export const showCoffee = writable(false);

// Smart
export const peakRate = writable(47.94);
export const dayRate = writable(45);
export const nightRate = writable(24.49);
export const evRate = writable(15);
export const fitRate = writable(20);
export const smartStandingCharge = writable(400);

export const evStartTime = writable(2);
export const evEndTime = writable(5);
export const enableEvRate = writable(false);

export const freeSaturdays = writable(false);
export const freeSundays = writable(false);

// Standard
export const standardRate = writable(43);
export const standardFitRate = writable(21);
export const standingCharge = writable(300);

// Day/Night
export const dnDayRate = writable(43);
export const dnNightRate = writable(23);
export const dnFitRate = writable(22);
export const dnStandingCharge = writable(350);

export const minMoment = derived(esbData, ($d) =>
  moment.min($d.map((e) => e.time))
);
export const maxMoment = derived(esbData, ($d) =>
  moment.max($d.map((e) => e.time))
);
export const totalDays = derived([minMoment, maxMoment], ([$a, $b]) =>
  moment($b).diff(moment($a), "days")
);

// filter days here
export const minPossibleDate = derived(minMoment, ($m) =>
  moment($m).format("YYYY-MM-DD")
);
export const maxPossibleDate = derived(maxMoment, ($m) =>
  moment($m).format("YYYY-MM-DD")
);

export const selectedStartDate = writable("2000-01-01");
export const selectedEndDate = writable("2000-12-31");

minPossibleDate.subscribe((min) => {
  selectedStartDate.set(min);
});
maxPossibleDate.subscribe((min) => {
  selectedEndDate.set(min);
});

export const esbDataTimeFrame = derived(
  [esbData, selectedStartDate, selectedEndDate],
  ([$d, $s, $e]) =>
    $d.filter(
      (e) => e.time.isSameOrAfter($s, "day") && e.time.isSameOrBefore($e, "day")
    )
);
export const totalSelectedDays = derived(
  [selectedStartDate, selectedEndDate],
  ([$s, $e]) => moment($e).diff(moment($s), "days")
);

export const total = derived(esbDataTimeFrame, ($d) => $d.length);

export const importData = derived(esbDataTimeFrame, ($d) =>
  $d.filter((j) => !!j.imported)
);
export const exportedData = derived(esbDataTimeFrame, ($d) =>
  $d.filter((j) => !j.imported)
);

export const totalUnits = derived(importData, ($d) => $d.map((j) => j.kWh));

export const saturdayUnits = derived(importData, ($d) =>
  $d.filter((i) => i.day == 6).map((j) => j.kWh)
);
export const sundayUnits = derived(importData, ($d) =>
  $d.filter((i) => i.day == 0).map((j) => j.kWh)
);

export const chargableImportedData = derived(
  [importData, freeSaturdays, freeSundays],
  ([$d, $freeSat, $freeSun]) =>
    $d.filter((j) => !(j.day === 6 && $freeSat) && !(j.day === 0 && $freeSun))
);

export const dayUnits = derived(chargableImportedData, ($d) =>
  $d
    .filter(
      (i) => (i.hour >= 8 && i.hour < 17) || (i.hour >= 19 && i.hour < 23)
    )
    .map((j) => j.kWh)
);
export const peakUnits = derived(chargableImportedData, ($d) =>
  $d.filter((i) => i.hour >= 17 && i.hour < 19).map((j) => j.kWh)
);
export const nightUnits = derived(chargableImportedData, ($d) =>
  $d.filter((i) => i.hour >= 23 || i.hour < 8).map((j) => j.kWh)
);
export const evUnits = derived(
  [chargableImportedData, evStartTime, evEndTime],
  ([$data, $start, $end]) =>
    $data.filter((i) => i.hour >= $start && i.hour < $end).map((j) => j.kWh)
);

export const dnDayUnits = derived(importData, ($d) =>
  $d.filter((i) => i.hour >= 8 && i.hour < 23).map((j) => j.kWh)
);
export const dnNightUnits = derived(importData, ($d) =>
  $d.filter((i) => i.hour >= 23 || i.hour < 8).map((j) => j.kWh)
);

export const enableFitRate = derived(exportedData, ($d) => $d.length > 0);
export const fitUnits = derived(exportedData, ($d) => $d.map((j) => j.kWh));

export const totalUnitsSum = derived(totalUnits, ($u) => $u.reduce(sum, 0));
export const peakUnitsSum = derived(peakUnits, ($u) => $u.reduce(sum, 0));
export const nightUnitsSum = derived(nightUnits, ($u) => $u.reduce(sum, 0));
export const evUnitsSum = derived(evUnits, ($u) => $u.reduce(sum, 0));
export const dayUnitsSum = derived(dayUnits, ($u) => $u.reduce(sum, 0));
export const fitUnitsSum = derived(fitUnits, ($u) => $u.reduce(sum, 0));
export const saturdayUnitsSum = derived(saturdayUnits, ($u) =>
  $u.reduce(sum, 0)
);
export const sundayUnitsSum = derived(sundayUnits, ($u) => $u.reduce(sum, 0));

export const dnDayUnitsSum = derived(dnDayUnits, ($u) => $u.reduce(sum, 0));
export const dnNightUnitsSum = derived(dnNightUnits, ($u) => $u.reduce(sum, 0));
