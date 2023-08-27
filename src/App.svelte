<script>
  // import svelteLogo from './assets/svelte.svg'
  import File from "./lib/File.svelte";
  import Summary from "./lib/Summary.svelte";
  import Rates from "./lib/Rates.svelte";
  import { total, showCoffee } from "./Store.js";
</script>

<main>
  <h1>⚡ Smart Electricity Calculator ⚡</h1>
  <div class="card">
    <File />
  </div>
  {#if $total > 0}
    <div class="card">
      <Rates />
    </div>
    <div class="card">
      <Summary />
    </div>
  {/if}
  {#if $showCoffee}
    <div id="coffee">
      <a
        ><img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style="height: 60px !important;width: 217px !important;"
        /></a
      >
    </div>
  {/if}

  <div id="footer">
    <p>
      Made with ❤️ by <a
        href="https://twitter.com/_damienos"
        target="_blank"
        rel="noreferrer">Damien</a
      >
    </p>
  </div>
</main>

<style>
  #coffee {
    text-align: center;
  }

  #footer {
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
