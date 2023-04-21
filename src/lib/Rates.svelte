<script>
  import {
    standardRate,
    peakRate,
    dayRate,
    nightRate,
    nightBoostRate,
    dnDayRate,
    dnNightRate,
    standingCharge,
    smartStandingCharge,
    enableNightBoost,
    dnStandingCharge,
  } from "../Store.js";
</script>

<form class="content">
  <fieldset>
    <legend>Smart Rates</legend>
    <label for="day">Day Rate (c):</label>
    <input type="text" bind:value={$dayRate} id="day" />
    <label for="night">Night Rate (c):</label>
    <input type="text" bind:value={$nightRate} id="night" />
    {#if $enableNightBoost}
      <label for="nightboost">Night Boost Rate (c):</label>
      <input type="text" bind:value={$nightBoostRate} id="nightboost" />
    {/if}
    <label for="peak">Peak Rate (c):</label>
    <input type="text" bind:value={$peakRate} id="peak" />
    <label for="standing">Standing Charge (€):</label>
    <input type="text" bind:value={$smartStandingCharge} id="standing" />
    <label for="enableNightBoost">Night Boost:</label>
    <input
      type="checkbox"
      bind:checked={$enableNightBoost}
      id="enableNightBoost"
    />
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
