<script>
  export let name;
  export let unit;
  export let rate;
  export let percent = true;

  import { totalUnitsSum } from "../../Store.js";

  $: percentage = (unit / $totalUnitsSum) * 100;
</script>

<tr>
  <td
    >{name} Units
    {#if percent}
      <small>({percentage.toFixed(2)}%)</small>
    {/if}
  </td>
  <td>{unit.toFixed(2)}</td>
  <td>{rate}c</td>
  <td>€{((unit * rate) / 100).toFixed(2)}</td>
</tr>

<style>
  small {
    color: lightblue;
  }
</style>
