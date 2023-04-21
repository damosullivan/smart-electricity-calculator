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
    nightBoostUnits,
    peakRate,
    dnDayRate,
    dnNightRate,
    dayRate,
    nightRate,
    nightBoostRate,
    standingCharge,
    standardRate,
    enableNightBoost,
  } from "../Store.js";

  let totalUnitsSum = 0;
  let peakUnitsSum = 0;
  let dayUnitsSum = 0;
  let nightUnitsSum = 0;
  let nightBoostUnitsSum = 0;

  let minDate = moment().format("dddd, MMMM Do YYYY");
  let maxDate = moment().format("dddd, MMMM Do YYYY");

  const formatUnitsAndRates = (name, unit, rate) =>
    `${name} Units: ${unit.toFixed(2)} @ ${rate}c = €${(
      (unit * rate) /
      100
    ).toFixed(2)}`;
  const formatUnitsAndRatesTable = (name, unit, rate) =>
    `<tr>
      <td>${name} Units</td>
      <td>${unit.toFixed(2)}</td>
      <td>${rate}c</td>
      <td>€${((unit * rate) / 100).toFixed(2)}</td>
    </tr>`;

  const formatStandingCharge = (days, rate) =>
    `Standing Charge: ${days} Days of €${rate} = €${(
      (rate / 365) *
      days
    ).toFixed(2)}`;
  const formatStandingChargeTable = (days, rate) =>
    `<tr>
      <td>Standing Charge<td>
      <td></td>
      <td>${days} Days of €${rate}</td>
      <td>€${((rate / 365) * days).toFixed(2)}</td>
    </tr>`;

  const formatTotalCharge = (totals) =>
    `Total: €${totals.reduce(resuceSum, 0).toFixed(2)}`;
  const formatTotalChargeTable = (totals) =>
    `<tr><td>Total</td><td></td><td></td><td>€${totals.reduce(resuceSum, 0).toFixed(2)}</td></tr>`;

  const resuceSum = (partialSum, a) => partialSum + a;

  totalUnits.subscribe((v) => {
    totalUnitsSum = v.reduce(resuceSum, 0);
  });
  peakUnits.subscribe((v) => {
    peakUnitsSum = v.reduce(resuceSum, 0);
  });
  dayUnits.subscribe((v) => {
    dayUnitsSum = v.reduce(resuceSum, 0);
  });
  nightUnits.subscribe((v) => {
    nightUnitsSum = v.reduce(resuceSum, 0);
  });
  nightBoostUnits.subscribe((v) => {
    nightBoostUnitsSum = v.reduce(resuceSum, 0);
  });
  minMoment.subscribe((v) => {
    minDate = moment(v).format("MMMM Do YYYY");
  });
  maxMoment.subscribe((v) => {
    maxDate = moment(v).format("MMMM Do YYYY");
  });
</script>

<h2>
  From <br /><strong>{minDate}</strong> to <strong>{maxDate}</strong>
  <br /><small>({$total} data points)</small>, you used:
</h2>

<h3>Smart Tariff</h3>

<ul>
  <li>{formatUnitsAndRates("Day", dayUnitsSum, $dayRate)}</li>
  <li>{formatUnitsAndRates("Peak", peakUnitsSum, $peakRate)}</li>
  <li>
    {formatUnitsAndRates(
      "Night",
      $enableNightBoost ? nightUnitsSum - nightBoostUnitsSum : nightUnitsSum,
      $nightRate
    )}
  </li>
  {#if $enableNightBoost}
    <li>
      {formatUnitsAndRates("Night Boost", nightBoostUnitsSum, $nightBoostRate)}
    </li>
  {/if}

  <li>{formatStandingCharge($totalDays, $standingCharge)}</li>

  <li>
    {formatTotalCharge([
      (dayUnitsSum * $dayRate) / 100,
      (peakUnitsSum * $peakRate) / 100,
      ((enableNightBoost ? nightUnitsSum - nightBoostUnitsSum : nightUnitsSum) *
        $nightRate) /
        100,
      $enableNightBoost ? (nightBoostUnitsSum * $nightBoostRate) / 100 : 0,
      ($standingCharge / 365) * $totalDays,
    ])}
  </li>
</ul>

<h3>Standard Tariff</h3>

<ul>
  <li>{formatUnitsAndRates("24 Hour", totalUnitsSum, $standardRate)}</li>
  <li>{formatStandingCharge($totalDays, $standingCharge)}</li>
  <li>
    {formatTotalCharge([
      (totalUnitsSum * $standardRate) / 100,
      ($standingCharge / 365) * $totalDays,
    ])}
  </li>
</ul>

<h3>Day/Night Tariff</h3>

<ul>
  <li>{formatUnitsAndRates("Day", dayUnitsSum + peakUnitsSum, $dnDayRate)}</li>
  <li>{formatUnitsAndRates("Night", nightUnitsSum, $dnNightRate)}</li>
  <li>{formatStandingCharge($totalDays, $standingCharge)}</li>
  <li>
    {formatTotalCharge([
      ((dayUnitsSum + peakUnitsSum) * $dnDayRate) / 100,
      (nightUnitsSum * $dnNightRate) / 100,
      ($standingCharge / 365) * $totalDays,
    ])}
  </li>
</ul>
