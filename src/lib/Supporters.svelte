<script>
  import { onMount } from "svelte";

  import TwitterLink from "./Components/TwitterLink.svelte";

  let supporters = [];
  let others = 0;

  onMount(async function () {
    const response = await fetch(
      "https://www.smartelectricitycalculator.ie/supporters"
    );
    const data = await response.json();

    supporters = data.filter((name) => name !== "Someone");
    others = data.filter((name) => name === "Someone").length;
  });
</script>

<div id="supporters">
<h3>❤️ Special thanks to the following for their kind support ❤️</h3>
<ul>
  {#each supporters as supporter_name}
    {#if supporter_name.startsWith("@")}
      <li><TwitterLink name={supporter_name} /></li>
    {:else}
      <li>{supporter_name}</li>
    {/if}
  {/each}
  <li>
    <a
      href="https://www.buymeacoffee.com/damienos"
      target="_blank"
      rel="noreferrer">and {others} more</a
    >
  </li>
</ul>
</div>

<style>
  #supporters {
    border-style: solid;
    border-width: 1px;
  }

h3 {
    text-align: center;
  }

  /* ul {
    -moz-column-count: 4;
    -moz-column-gap: 20px;
    -webkit-column-count: 4;
    -webkit-column-gap: 20px;
    column-count: 4;
    column-gap: 20px;
  } */
</style>
