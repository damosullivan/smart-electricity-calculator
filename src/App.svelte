<script>
  import File from "./lib/File.svelte";
  import Summary from "./lib/Summary.svelte";
  import Solar from "./lib/Solar.svelte";
  import Supporters from "./lib/Supporters.svelte";
  import Rates from "./lib/Rates.svelte";
  import { esbData, showCoffee, total, enableFitRate } from "./Store.js";
</script>

<main>
  <h1>⚡ Smart Electricity Calculator ⚡</h1>
  <div class="card">
    <File />
  </div>
  {#if $esbData.length > 0}
    <div class="card rates">
      <Rates />
    </div>
    <div class="card summary">
      <Summary />
    </div>
    {#if !$enableFitRate && $total > 1000}
      <div class="card solar">
        <Solar />
      </div>
    {/if}
  {:else}
    <Supporters />
  {/if}
  {#if $showCoffee}
    <div id="coffee">
      <a
        href="https://www.buymeacoffee.com/damienos?button=bottom"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style="height: 60px !important;width: 217px !important;"
        />
      </a>
    </div>
  {/if}

  <div id="footer">
    <p>
      Made with ☕ by <a
        href="https://www.linkedin.com/in/damienosullivans/"
        target="_blank"
        rel="noreferrer">Damien</a
      >
    </p>
    <p>
      <small>
        <a
          href="https://share.hsforms.com/1PAd45iIRQLaxNYDyF5AMxw4m14q"
          target="_blank"
          rel="noreferrer">Contact me</a
        >
        |
        <a
          href="https://share.hsforms.com/1PAd45iIRQLaxNYDyF5AMxw4m14q"
          target="_blank"
          rel="noreferrer">Report a bug</a
        >
        |
        <a
          href="https://share.hsforms.com/1PAd45iIRQLaxNYDyF5AMxw4m14q"
          target="_blank"
          rel="noreferrer">Request a feature</a
        >
      </small>
    </p>
  </div>
</main>

<style>
  #coffee {
    margin-top: 50px;
    text-align: center;
  }

  #footer {
    text-align: center;
  }

  .summary,
  .solar {
    border: 1px solid #ccc;
  }

  .rates {
    padding: 0;
  }

  .card {
    margin-top: 50px;
  }

  h1{
    text-align: center;
  }

  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>
