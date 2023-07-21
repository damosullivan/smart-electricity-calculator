<script>
  import moment from "moment";
  import { esbData } from "../Store.js";

  let files;
  let fileReader = new FileReader();

  const processFileData = (fileData) => {
    console.log("Processing File Data");
    let rowData;
    const parsedData = fileData
      .split("\n")
      .slice(1)
      .filter((r) => r !== "")
      .map((row) => {
        rowData = row.split(",");
        return {
          // MPRN,Meter Serial Number,Read Value,Read Type,Read Date and End Time
          mprn: rowData[0],
          serial: rowData[1],
          kW: parseFloat(rowData[2]),
          kWh: parseFloat(rowData[2]) * 0.5,
          imported: rowData[3].includes("Import") ? true : false,
          readType: rowData[3],
          time: moment(rowData[4], "DD-MM-YYYY hh:mm"),
          // 09-02-2023 23:30
          hour: moment(rowData[4], "DD-MM-YYYY hh:mm").hour(),
          day: moment(rowData[4], "DD-MM-YYYY hh:mm").day(),
        };
      });
    esbData.set(parsedData);
  };

  const readFile = () => {
    console.log("Reading File");
    processFileData(fileReader.result);
  };

  fileReader.onload = readFile;

  $: if (files) {
    fileReader.readAsText(files[0]);
  }
</script>

<label for="hdf">To begin, upload your <a rel="noreferrer" target="_blank" href="https://www.esbnetworks.ie/existing-connections/meters-and-readings/my-smart-data">ESB Networks HDF file</a>:</label>
<input accept="text/csv" bind:files id="hdf" name="hdf" type="file" />
<p><small>Note: this file does not leave your computer. All calculations happen in your browser.</small></p>

<!-- {#if files}
  <h2>Selected files:</h2>
  {#each Array.from(files) as file}
    <p>{file.name} ({file.size} bytes)</p>
  {/each}
{/if} -->
