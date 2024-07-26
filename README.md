# ⚡ Smart Electricity Calculator ⚡

https://www.smartelectricitycalculator.ie/

> Shop different electricity rates against your actual electricity usage


[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />](https://www.buymeacoffee.com/damienos)

## What is this?

This is a project that aims to make it easier to shop electricity rates in Ireland. The idea is to parse [ESB Networks HDF files](https://www.esbnetworks.ie/existing-connections/meters-and-readings/my-smart-data) (`30-minute readings in kW`), and split up the usage into tariff _buckets_ (day, night, peak, and ev). Then allowing the user to input electricity rates for rach tariff, they can easily see which rate best suits their usage.

This tool was initially for me, but it is so general that I put it online.

## Features

- Parse the HDF file into day, night, peak, and ev _buckets_
- Input corresponsding rates for tariff _buckets_
- Adjustable EV times (vary by supplier)
- Understand the difference in Smart, Standard, and Day/Night tariffs
- Filter the calculations to a date window
- Include a demo using an [Estimated Annual Bill (EAB)](https://www.bonkers.ie/guides/gas-electricity/national-average-energy-consumption/)
- (unrelated) Show a list of supporters on the landing page ☕


## Stack

This is built using [Svelt](https://svelte.dev/) (not [SvelteKit](https://kit.svelte.dev/)). It is basic, and does all file operations client side.

If you pull this repo, you can run the following command:

```bash
npm run dev -- --open
```

## Future

This tool is pretty much redundant these days. There are far better solutions available now. However, I will keep this tool online.

I recommend checking out https://www.energypal.ie/ as a much more powerful alternative.
