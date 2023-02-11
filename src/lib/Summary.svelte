<script>
  import { get } from "svelte/store";
  import moment from "moment";

  import {
    total,
    minMoment,
    maxMoment,
    peakUnits,
    totalDays,
    dayUnits,
    totalUnits,
    nightUnits,
    peakRate,
    dayRate,
    nightRate,
    standingCharge,
    standardRate,
  } from "../Store.js";

  let totalValue = 0;
  let totalUnitsValue = 0;
  let peakUnitsValue = 0;
  let dayUnitsValue = 0;
  let totalDaysValue = 0;
  let nightUnitsValue = 0;
  let peakRateValue = 0;
  let dayRateValue = 0;
  let nightRateValue = 0;
  let standingChargeValue = 0;
  let standardRateValue = 0;
  let minDate = moment().format("dddd, MMMM Do YYYY");
  let maxDate = moment().format("dddd, MMMM Do YYYY");

  const formatUnitsAndRates = (name, unit, rate) => `${name} Units: ${unit.toFixed(2)} @ ${rate}c = €${(unit * rate).toFixed(2)}`;
  const formatStandingCharge = (days, rate) => `Standing Charge: ${days} Days of €${rate} = €${(rate / 365 * days).toFixed(2)}`;

  const resuceSum = (partialSum, a) => partialSum + a;

  total.subscribe((v) => {
    totalValue = v;
  });
  peakRate.subscribe((v) => {
    peakRateValue = v;
  });
  dayRate.subscribe((v) => {
    dayRateValue = v;
  });
  nightRate.subscribe((v) => {
    nightRateValue = v;
  });
  standingCharge.subscribe((v) => {
    standingChargeValue = v;
  });
  standardRate.subscribe((v) => {
    standardRateValue = v;
  });
  totalDays.subscribe((v) => {
    totalDaysValue = v;
  });
  totalUnits.subscribe((v) => {
    totalUnitsValue = v.reduce(resuceSum, 0);
  });
  peakUnits.subscribe((v) => {
    console.log(v);
    peakUnitsValue = v.reduce(resuceSum, 0);
  });
  dayUnits.subscribe((v) => {
    console.log(v);
    dayUnitsValue = v.reduce(resuceSum, 0);
  });
  nightUnits.subscribe((v) => {
    nightUnitsValue = v.reduce(resuceSum, 0);
  });
  minMoment.subscribe((v) => {
    minDate = moment(v).format("MMMM Do YYYY");
  });
  maxMoment.subscribe((v) => {
    maxDate = moment(v).format("MMMM Do YYYY");
  });
</script>

<h2>
  From <br /><strong>{minDate}</strong> to <strong>{maxDate}</strong
  > <br /><small>({totalValue} data points)</small>, you used:
</h2>

<h3>Smart Tariff</h3>

<ul>
  <li>{formatUnitsAndRates("Day", dayUnitsValue, dayRateValue )}</li>
  <li>{formatUnitsAndRates("Peak", peakUnitsValue, peakRateValue )}</li>
  <li>{formatUnitsAndRates("Night", nightUnitsValue, nightRateValue )}</li>
  <li>{formatStandingCharge(totalDaysValue, standingChargeValue )}</li>
  <li>Total: €{((dayUnitsValue * dayRateValue) + (peakUnitsValue * peakRateValue) + (nightUnitsValue * nightRateValue) + (standingChargeValue / 365 * totalDaysValue)).toFixed(2)}</li>
</ul>

<h3>Standard Tariff</h3>

<ul>
  <li>{formatUnitsAndRates("24 Hour", totalUnitsValue, standardRateValue )}</li>
  <li>{formatStandingCharge(totalDaysValue, standingChargeValue )}</li>
  <li>Total: €{((totalUnitsValue * standardRateValue) + (standingChargeValue / 365 * totalDaysValue)).toFixed(2)}</li>

</ul>

