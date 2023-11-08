<script>
  import moment from "moment";

  import UnitAndRatesRow from "./Components/UnitAndRatesRow.svelte";
  import StandingChargeRow from "./Components/StandingChargeRow.svelte";
  import TotalChargeRow from "./Components/TotalChargeRow.svelte";

  import {
    dayRate,
    dayUnitsSum,
    dnDayRate,
    dnFitRate,
    dnNightRate,
    dnStandingCharge,
    enableEvRate,
    enableFitRate,
    evRate,
    evUnitsSum,
    fitRate,
    fitUnitsSum,
    freeSaturdays,
    freeSundays,
    maxMoment,
    minMoment,
    nightRate,
    nightUnitsSum,
    peakRate,
    peakUnitsSum,
    saturdayUnitsSum,
    smartStandingCharge,
    standardFitRate,
    standardRate,
    standingCharge,
    sundayUnitsSum,
    total,
    totalDays,
    totalUnitsSum,
  } from "../Store.js";

  let minDate = moment().format("dddd, MMMM Do YYYY");
  let maxDate = moment().format("dddd, MMMM Do YYYY");

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
  <UnitAndRatesRow name="Day" unit={$dayUnitsSum} rate={$dayRate} />
  <UnitAndRatesRow name="Peak" unit={$peakUnitsSum} rate={$peakRate} />
  <UnitAndRatesRow
    name="Night"
    unit={$enableEvRate ? $nightUnitsSum - $evUnitsSum : $nightUnitsSum}
    rate={$nightRate}
  />

  {#if $freeSaturdays}
    <UnitAndRatesRow name="Saturday" unit={$saturdayUnitsSum} rate={0} />
  {/if}
  {#if $freeSundays}
    <UnitAndRatesRow name="Sunday" unit={$sundayUnitsSum} rate={0} />
  {/if}
  {#if $enableEvRate}
    <UnitAndRatesRow name="Ev" unit={$evUnitsSum} rate={$evRate} />
  {/if}
  {#if $enableFitRate}
    <UnitAndRatesRow name="Exported" unit={-$fitUnitsSum} rate={$fitRate} />
  {/if}

  <StandingChargeRow days={$totalDays} rate={$smartStandingCharge} />

  <TotalChargeRow
    totals={[
      ($dayUnitsSum * $dayRate) / 100,
      ($peakUnitsSum * $peakRate) / 100,
      (($enableEvRate ? $nightUnitsSum - $evUnitsSum : $nightUnitsSum) *
        $nightRate) /
        100,
      $enableEvRate ? ($evUnitsSum * $evRate) / 100 : 0,
      ($smartStandingCharge / 365) * $totalDays,
      (-$fitUnitsSum * $fitRate) / 100,
    ]}
  />
</table>

<h3>Standard Tariff</h3>

<table>
  <tr><th /><th>Units</th><th>Rate</th><th>Total</th></tr>

  <UnitAndRatesRow name="24 Hour" unit={$totalUnitsSum} rate={$standardRate} />
  {#if $enableFitRate}
    <UnitAndRatesRow
      name="Exported"
      unit={-$fitUnitsSum}
      rate={$standardFitRate}
    />
  {/if}

  <StandingChargeRow days={$totalDays} rate={$standingCharge} />

  <TotalChargeRow
    totals={[
      ($totalUnitsSum * $standardRate) / 100,
      ($standingCharge / 365) * $totalDays,
      (-$fitUnitsSum * $standardFitRate) / 100,
    ]}
  />
</table>

<h3>Day/Night Tariff</h3>

<table>
  <tr><th /><th>Units</th><th>Rate</th><th>Total</th></tr>
  <UnitAndRatesRow
    name="Day"
    unit={$dayUnitsSum + $peakUnitsSum}
    rate={$dnDayRate}
  />
  <UnitAndRatesRow name="Night" unit={$nightUnitsSum} rate={$dnNightRate} />

  {#if $enableFitRate}
    <UnitAndRatesRow name="Exported" unit={-$fitUnitsSum} rate={$dnFitRate} />
  {/if}
  <StandingChargeRow days={$totalDays} rate={$dnStandingCharge} />

  <TotalChargeRow
    totals={[
      (($dayUnitsSum + $peakUnitsSum) * $dnDayRate) / 100,
      ($nightUnitsSum * $dnNightRate) / 100,
      ($dnStandingCharge / 365) * $totalDays,
      (-$fitUnitsSum * $dnFitRate) / 100,
    ]}
  />
</table>
