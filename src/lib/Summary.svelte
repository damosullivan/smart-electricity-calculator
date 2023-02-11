<script>
  import { get } from "svelte/store"

  import { esbData, totalDataPoints } from "../Store.js";


let rows = [];
let total = 0;

console.log(totalDataPoints);

esbData.subscribe((data) => {
  console.log("Recelive data in Summary");
  rows = data;
})

totalDataPoints.subscribe(t => {
  console.log("Recelive total in Summary");
 total = t
});

const uploaded = rows.length > 0;

  $: if (uploaded) {
    console.log("File Uploaded")
  }
</script>

{#if uploaded}
  <h2>Data ({get(totalDataPoints)}):</h2>
  {#each rows as row}
    <p>{row.time} - {row.value}</p>
  {/each}
{/if}
