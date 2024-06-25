<script>
  // @ts-ignore
  import moment from "moment";

  // @ts-ignore
  import UnitAndRatesRow from "./Components/UnitAndRatesRow.svelte";
  // @ts-ignore
  import StandingChargeRow from "./Components/StandingChargeRow.svelte";
  // @ts-ignore
  import TotalChargeRow from "./Components/TotalChargeRow.svelte";

  import {
    // @ts-ignore
    esbDataTimeFrame,
    // @ts-ignore
    dayRate,
    // @ts-ignore
    dayUnitsSum,
    // @ts-ignore
    dnDayRate,
    // @ts-ignore
    dnFitRate,
    // @ts-ignore
    dnNightRate,
    // @ts-ignore
    dnStandingCharge,
    // @ts-ignore
    enableEvRate,
    // @ts-ignore
    enableFitRate,
    // @ts-ignore
    evRate,
    // @ts-ignore
    evUnitsSum,
    // @ts-ignore
    fitRate,
    // @ts-ignore
    fitUnitsSum,
    // @ts-ignore
    freeSaturdays,
    // @ts-ignore
    freeSundays,
    // @ts-ignore
    minPossibleDate,
    // @ts-ignore
    maxPossibleDate,
    // @ts-ignore
    nightRate,
    // @ts-ignore
    nightUnitsSum,
    // @ts-ignore
    peakRate,
    // @ts-ignore
    peakUnitsSum,
    // @ts-ignore
    saturdayUnitsSum,
    // @ts-ignore
    selectedStartDate,
    // @ts-ignore
    selectedEndDate,
    // @ts-ignore
    smartStandingCharge,
    // @ts-ignore
    standardFitRate,
    // @ts-ignore
    standardRate,
    // @ts-ignore
    standingCharge,
    // @ts-ignore
    sundayUnitsSum,
    // @ts-ignore
    total,
    totalSelectedDays,
    totalUnitsSum,
  } from "../Store.js";

  const estimatedUnits = (($totalUnitsSum / $totalSelectedDays) * 365).toFixed(
    2
  );
  // @ts-ignore
  const suggestedArray = (Math.floor(estimatedUnits / 500) * 500) / 1000;
  const suggestedPanelsMax = Math.ceil((suggestedArray * 1000) / 400);
  const suggestedPanelsMin = Math.floor((suggestedArray * 1000) / 450);
</script>

<h2>Solar Panel Guide</h2>

<p>Are you considering solar panels?</p>
<p>
  If so, here is some information, based on <strong>your HDF data</strong>, that
  can be used to determine<br /> <strong>your</strong> solar system needs:
</p>

<h3>Panels</h3>
<table>
  <tr>
    <th>Estimated annual usage:</th>
    <td><small>(total units / number of days x 365)</small></td>
    <td>{estimatedUnits} kWh</td>
  </tr>
  <tr>
    <th>Suggested solar array:</th>
    <td><small>(annual usage / 1000)</small></td>
    <td>{suggestedArray} kWp</td>
  </tr>
  <tr>
    <th>No. of solar panels:</th>
    <td><small>(solar array / 400w - 450w panels)</small></td>
    <td>{suggestedPanelsMin} - {suggestedPanelsMax} panels</td>
  </tr>
  <tr>
    <th>Guide price:</th>
    <td><small>(€1000/kWp for solar panels)</small></td>
    <td>€{suggestedArray * 1000}</td>
  </tr>
</table>

<h3>Batteries <small>(100% optional)</small></h3>
<table>
  <tr>
    <th>Suggested battery size:</th>
    <td><small>(2 x <code>solar array</code> for evening users,<br />1.5 x <code>solar array</code> for daytime users)</small></td>
    <td>{suggestedArray * 1.5} - {suggestedArray * 2} kWh</td>
  </tr>
  <tr>
    <th>Guide price:</th>
    <td><small>(€420/kWh for battery)</small></td>
    <td>€{suggestedArray * 1.5 * 420} - €{suggestedArray * 2 * 420}</td>
  </tr>

</table>


<style>
  table {
    text-align: right;
  }

  th{
    text-align: left;

  }
</style>
