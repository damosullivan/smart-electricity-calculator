<script>
  export let days;
  export let rate;
</script>

<tr>
  <td>Standing Charge</td>
  <td />
  <td>{days} days of €{rate}</td>
  <td>€{((rate / 365) * days).toFixed(2)}</td>
</tr>
