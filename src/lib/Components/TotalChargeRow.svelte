<script>
  import { fitUnitsSum, totalUnitsSum } from "../../Store.js";

  export let totals;

  const resuceSum = (partialSum, a) => partialSum + a;
</script>

<tr
  ><td>Total</td>
  <td>{($totalUnitsSum - $fitUnitsSum).toFixed(2)}</td>
  <td />
  <td>€{totals.reduce(resuceSum, 0).toFixed(2)}</td>
</tr>
