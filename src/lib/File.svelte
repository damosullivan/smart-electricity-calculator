<script>
  import moment from 'moment';
  import { esbData } from "../Store.js";

  let files;
  let fileReader = new FileReader();

  const processFileData = (fileData) => {
    console.log("Processing File Data");
    let rowData;
    const parsedData = fileData.split("\n").slice(1).filter(r => r !== "").map(row => {
      rowData = row.split(',');
      return {
      // MPRN,Meter Serial Number,Read Value,Read Type,Read Date and End Time
      mprn: rowData[0],
      serial: rowData[1],
      kW: parseFloat(rowData[2]),
      kWh: parseFloat(rowData[2]) * 0.5,
      readType: rowData[3],
      time: moment(rowData[4], "DD-MM-YYYY hh:mm"),
      // 09-02-2023 23:30
      hour: moment(rowData[4], "DD-MM-YYYY hh:mm").hour(),
    }})
    esbData.set(parsedData)
  }

  const readFile = () => {
    console.log("Reading File");
    processFileData(fileReader.result);
  };


  fileReader.onload = readFile;

  $: if (files) {
    fileReader.readAsText(files[0])
  }
</script>

<label for="hdf">Upload ESB Networks usage file:</label>
<input accept="text/csv" bind:files id="hdf" name="hdf" type="file" />

<!-- {#if files}
  <h2>Selected files:</h2>
  {#each Array.from(files) as file}
    <p>{file.name} ({file.size} bytes)</p>
  {/each}
{/if} -->
