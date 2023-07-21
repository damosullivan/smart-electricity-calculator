<script>
  import moment from "moment";

  import {
    dayRate,
    dayUnitsSum,
    dnDayRate,
    dnNightRate,
    dnStandingCharge,
    enableEvRate,
    freeSaturdays,
    freeSundays,
    saturdayUnitsSum,
    sundayUnitsSum,
    enableFitRate,
    evRate,
    evUnitsSum,
    fitRate,
    fitUnitsSum,
    maxMoment,
    minMoment,
    nightRate,
    nightUnitsSum,
    peakRate,
    peakUnitsSum,
    smartStandingCharge,
    standardRate,
    standingCharge,
    total,
    totalDays,
    totalUnitsSum,
  } from "../Store.js";

  let minDate = moment().format("dddd, MMMM Do YYYY");
  let maxDate = moment().format("dddd, MMMM Do YYYY");

  const formatUnitsAndRatesTable = (name, unit, rate) =>
    `<tr>
      <td>${name} Units</td>
      <td>${unit.toFixed(2)}</td>
      <td>${rate}c</td>
      <td>€${((unit * rate) / 100).toFixed(2)}</td>
    </tr>`;

  const formatStandingChargeTable = (days, rate) =>
    `<tr>
      <td>Standing Charge</td>
      <td></td>
      <td>${days} days of €${rate}</td>
      <td>€${((rate / 365) * days).toFixed(2)}</td>
    </tr>`;

  const formatTotalFitChargeTable = (totals) =>
    `<tr><td>Total</td><td>${($totalUnitsSum - $fitUnitsSum).toFixed(
      2
    )}</td><td></td><td>€${totals.reduce(resuceSum, 0).toFixed(2)}</td></tr>`;
  const formatTotalChargeTable = (totals) =>
    `<tr><td>Total</td><td>${$totalUnitsSum.toFixed(
      2
    )}</td><td></td><td>€${totals.reduce(resuceSum, 0).toFixed(2)}</td></tr>`;

  const resuceSum = (partialSum, a) => partialSum + a;

  minMoment.subscribe((v) => {
    minDate = moment(v).format("YYYY-MM-DD");
  });
  maxMoment.subscribe((v) => {
    maxDate = moment(v).format("YYYY-MM-DD");
  });
</script>

<h2>
  Summary from <input
    disabled={true}
    type="date"
    value={minDate}
    min={minDate}
    max={maxDate}
  />
  to
  <input
    disabled={true}
    type="date"
    value={maxDate}
    min={minDate}
    max={maxDate}
  />
</h2>
<p><small>({$total} data points)</small></p>

<h3>Smart Tariff</h3>

<table>
  <tr><th /><th>Units</th><th>Rate</th><th>Total</th></tr>
  {@html formatUnitsAndRatesTable("Day", $dayUnitsSum, $dayRate)}
  {@html formatUnitsAndRatesTable("Peak", $peakUnitsSum, $peakRate)}

  {@html formatUnitsAndRatesTable(
    "Night",
    $enableEvRate ? $nightUnitsSum - $evUnitsSum : $nightUnitsSum,
    $nightRate
  )}

  {#if $freeSaturdays}
    {@html formatUnitsAndRatesTable("Saturday", $saturdayUnitsSum, 0)}
  {/if}
  {#if $freeSundays}
    {@html formatUnitsAndRatesTable("Sunday ", $sundayUnitsSum, 0)}
  {/if}
  {#if $enableEvRate}
    {@html formatUnitsAndRatesTable("Ev", $evUnitsSum, $evRate)}
  {/if}
  {#if $enableFitRate}
    {@html formatUnitsAndRatesTable("Exported", -$fitUnitsSum, $fitRate)}
  {/if}

  {@html formatStandingChargeTable($totalDays, $smartStandingCharge)}

  {@html formatTotalFitChargeTable([
    ($dayUnitsSum * $dayRate) / 100,
    ($peakUnitsSum * $peakRate) / 100,
    (($enableEvRate ? $nightUnitsSum - $evUnitsSum : $nightUnitsSum) *
      $nightRate) /
      100,
    $enableEvRate ? ($evUnitsSum * $evRate) / 100 : 0,
    ($smartStandingCharge / 365) * $totalDays,
    (-$fitUnitsSum * $fitRate) / 100,
  ])}
</table>

<h3>Standard Tariff</h3>

<table>
  <tr><th /><th>Units</th><th>Rate</th><th>Total</th></tr>

  {@html formatUnitsAndRatesTable("24 Hour", $totalUnitsSum, $standardRate)}
  {@html formatStandingChargeTable($totalDays, $standingCharge)}

  {@html formatTotalChargeTable([
    ($totalUnitsSum * $standardRate) / 100,
    ($standingCharge / 365) * $totalDays,
  ])}
</table>

<h3>Day/Night Tariff</h3>

<table>
  <tr><th /><th>Units</th><th>Rate</th><th>Total</th></tr>

  {@html formatUnitsAndRatesTable(
    "Day",
    $dayUnitsSum + $peakUnitsSum,
    $dnDayRate
  )}
  {@html formatUnitsAndRatesTable("Night", $nightUnitsSum, $dnNightRate)}
  {@html formatStandingChargeTable($totalDays, $dnStandingCharge)}

  {@html formatTotalChargeTable([
    (($dayUnitsSum + $peakUnitsSum) * $dnDayRate) / 100,
    ($nightUnitsSum * $dnNightRate) / 100,
    ($dnStandingCharge / 365) * $totalDays,
  ])}
</table>
