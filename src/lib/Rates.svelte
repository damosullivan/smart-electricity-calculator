<script>
  import {
    dayRate,
    dnDayRate,
    dnNightRate,
    dnStandingCharge,
    enableEvRate,
    enableFitRate,
    evEndTime,
    evRate,
    evStartTime,
    fitRate,
    nightRate,
    peakRate,
    smartStandingCharge,
    standardRate,
    standingCharge,
  } from "../Store.js";
</script>

<form class="content">
  <fieldset>
    <legend>Smart Rates</legend>
    <label for="day">Day Rate (c):</label>
    <input type="text" bind:value={$dayRate} id="day" />
    <label for="night">Night Rate (c):</label>
    <input type="text" bind:value={$nightRate} id="night" />

    <label for="peak">Peak Rate (c):</label>
    <input type="text" bind:value={$peakRate} id="peak" />
    {#if $enableFitRate}
      <label for="fit">Feed In Tarrif (c):</label>
      <input type="text" bind:value={$fitRate} id="fit" />
    {/if}
    <label for="standing">Standing Charge (€):</label>
    <input type="text" bind:value={$smartStandingCharge} id="standing" />
    <label for="enableEvRate">EV Rate:</label>
    <input type="checkbox" bind:checked={$enableEvRate} id="enableEvRate" />
    {#if $enableEvRate}
      <label for="nightboost">Ev Rate (c):</label>
      <input type="text" bind:value={$evRate} id="nightboost" />
      <label for="evStartTime">Ev Start:</label>
      <input type="text" bind:value={$evStartTime} id="evStartTime" />
      <label for="evEndTime">Ev End:</label>
      <input type="text" bind:value={$evEndTime} id="evEndTime" />
    {/if}
  </fieldset>
  <fieldset>
    <legend>Standard Rates</legend>
    <label for="standard">Standard Rate (c):</label>
    <input type="text" bind:value={$standardRate} id="standard" />
    <label for="standing">Standing Charge (€):</label>
    <input type="text" bind:value={$standingCharge} id="standing" />
  </fieldset>
  <fieldset>
    <legend>Day/Night Rates</legend>
    <label for="standard">Standard Rate (c):</label>
    <input type="text" bind:value={$dnDayRate} id="standard" />
    <label for="standard">Standard Rate (c):</label>
    <input type="text" bind:value={$dnNightRate} id="standard" />
    <label for="standing">Standing Charge (€):</label>
    <input type="text" bind:value={$dnStandingCharge} id="standing" />
  </fieldset>
</form>
