<script>
  import moment from "moment";

  import UnitAndRatesRow from "./Components/UnitAndRatesRow.svelte";
  import StandingChargeRow from "./Components/StandingChargeRow.svelte";
  import TotalChargeRow from "./Components/TotalChargeRow.svelte";

  import {
    dayRate,
    dayUnitsSum,
    dnDayUnitsSum,
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
    minPossibleDate,
    maxPossibleDate,
    nightRate,
    dnNightUnitsSum,
    nightUnitsSum,
    peakRate,
    peakUnitsSum,
    saturdayUnitsSum,
    selectedStartDate,
    selectedEndDate,
    smartStandingCharge,
    standardFitRate,
    standardRate,
    standingCharge,
    sundayUnitsSum,
    total,
    totalSelectedDays,
    totalUnitsSum,
  } from "../Store.js";

  const resetDatePickers = () => {
    selectedStartDate.set($minPossibleDate);
    selectedEndDate.set($maxPossibleDate);
  };
</script>

<h2>
  Usage from <input
    disabled={false}
    type="date"
    bind:value={$selectedStartDate}
    min={$minPossibleDate}
    max={moment
      .min([moment($maxPossibleDate), moment($selectedEndDate).add(-1, "d")])
      .format("YYYY-MM-DD")}
  />
  to
  <input
    disabled={false}
    type="date"
    bind:value={$selectedEndDate}
    min={moment
      .max([moment($minPossibleDate), moment($selectedStartDate).add(1, "d")])
      .format("YYYY-MM-DD")}
    max={$maxPossibleDate}
  />
  <small>(<a id="reset" on:click={resetDatePickers}>Reset</a>)</small>
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
    <UnitAndRatesRow
      name="Exported"
      unit={-$fitUnitsSum}
      rate={$fitRate}
      percent={false}
    />
  {/if}

  <StandingChargeRow days={$totalSelectedDays} rate={$smartStandingCharge} />

  <TotalChargeRow
    totals={[
      ($dayUnitsSum * $dayRate) / 100,
      ($peakUnitsSum * $peakRate) / 100,
      (($enableEvRate ? $nightUnitsSum - $evUnitsSum : $nightUnitsSum) *
        $nightRate) /
        100,
      $enableEvRate ? ($evUnitsSum * $evRate) / 100 : 0,
      ($smartStandingCharge / 365) * $totalSelectedDays,
      (-$fitUnitsSum * $fitRate) / 100,
    ]}
  />
</table>

<h3>Standard Tariff</h3>

<table>
  <tr><th /><th>Units</th><th>Rate</th><th>Total</th></tr>

  <UnitAndRatesRow
    name="24 Hour"
    unit={$totalUnitsSum}
    rate={$standardRate}
    percent={false}
  />
  {#if $enableFitRate}
    <UnitAndRatesRow
      name="Exported"
      unit={-$fitUnitsSum}
      rate={$standardFitRate}
      percent={false}
    />
  {/if}

  <StandingChargeRow days={$totalSelectedDays} rate={$standingCharge} />

  <TotalChargeRow
    totals={[
      ($totalUnitsSum * $standardRate) / 100,
      ($standingCharge / 365) * $totalSelectedDays,
      (-$fitUnitsSum * $standardFitRate) / 100,
    ]}
  />
</table>

<h3>Day/Night Tariff</h3>

<table>
  <tr><th /><th>Units</th><th>Rate</th><th>Total</th></tr>
  <UnitAndRatesRow name="Day" unit={$dnDayUnitsSum} rate={$dnDayRate} />
  <UnitAndRatesRow name="Night" unit={$dnNightUnitsSum} rate={$dnNightRate} />

  {#if $enableFitRate}
    <UnitAndRatesRow
      name="Exported"
      unit={-$fitUnitsSum}
      rate={$dnFitRate}
      percent={false}
    />
  {/if}
  <StandingChargeRow days={$totalSelectedDays} rate={$dnStandingCharge} />

  <TotalChargeRow
    totals={[
      ($dnDayUnitsSum * $dnDayRate) / 100,
      ($dnNightUnitsSum * $dnNightRate) / 100,
      ($dnStandingCharge / 365) * $totalSelectedDays,
      (-$fitUnitsSum * $dnFitRate) / 100,
    ]}
  />
</table>

<style>
  #reset {
    cursor: pointer;
  }
</style>
