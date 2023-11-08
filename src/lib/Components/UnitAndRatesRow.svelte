<script>
  export let name;
  export let unit;
  export let rate;
</script>

<tr>
  <td>{name} Units</td>
  <td>{unit.toFixed(2)}</td>
  <td>{rate}c</td>
  <td>€{((unit * rate) / 100).toFixed(2)}</td>
</tr>
