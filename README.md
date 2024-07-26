# ⚡ Smart Electricity Calculator ⚡

> Shop different electricity rates against your actual electricity usage

https://www.smartelectricitycalculator.ie/

## What is this?

This is a project that aims to make it easier to shop electricity rates in Ireland. The idea is to parse [ESB Networks HDF files](https://www.esbnetworks.ie/existing-connections/meters-and-readings/my-smart-data) (`30-minute readings in kW`), and split up the usage into tariff usage (day, night, peak). Then allowing the user to input electricity rates for rach tariff, they could see which rate best suits their usage.

This tool was initially for me, but it is so general that I put it online.

## Features

- Parse the HDF file into dat, night, peak, and ev _buckets_
- Input corresponsding rates for tariff _buckets_
- Understand the difference in Smart, Standard, and Day/Night tariffs
- Filter the calculations to a date window
- Include a demo using an Estimated Annual Bill (EAB).

## Stack

This is built using [Svelt](https://svelte.dev/) (not [SvelteKit](https://kit.svelte.dev/)). It is basic, and does all file operations client side.

If you pull this repo, you can run the following and it should just work:

```bash
npm run dev -- --open
```

## Algorithm

Most of the file/tariff/date logic is in the store: [Store.js](https://github.com/damosullivan/smart-electricity-calculator/blob/main/src/Store.js)

(yes, this got ugly)
