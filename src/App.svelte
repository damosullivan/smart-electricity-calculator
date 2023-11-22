<script>
  // import svelteLogo from './assets/svelte.svg'
  import File from "./lib/File.svelte";
  import Summary from "./lib/Summary.svelte";
  import Supporters from "./lib/Supporters.svelte";
  import Rates from "./lib/Rates.svelte";
  import { esbData, showCoffee } from "./Store.js";
</script>

<main>
  <h1>⚡ Smart Electricity Calculator ⚡</h1>
  <div class="card">
    <File />
  </div>
  {#if $esbData.length > 0}
    <div class="card">
      <Rates />
    </div>
    <div class="card">
      <Summary />
    </div>
  {:else}
    <Supporters />
  {/if}
  {#if $showCoffee}
    <div id="coffee-side" title="Buy me a ">
      <a
        href="https://www.buymeacoffee.com/damienos?button=side"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="/buymeacoffeemini.png"
          alt="Buy Me A Coffee"
          style="height: 40px !important;width: 40px !important;"
        />
      </a>
    </div>

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
    text-align: center;
  }

  #footer {
    text-align: center;
  }

  #coffee-side {
    position: fixed;
    right: 0;
    top: 50%;
  }

  #coffee-side img {
    border-radius: 5px;
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
