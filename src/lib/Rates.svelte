<script>
  import {
    standardRate,
    peakRate,
    dayRate,
    nightRate,
    standingCharge,
  } from "../Store.js";

  let datRate;
</script>

<form class="content">
  <label for="standard">Standard Rate</label>
  <input type="text" bind:value={$standardRate} id="standard" />
</form>
