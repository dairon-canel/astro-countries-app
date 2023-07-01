<script>
  export let className;

  const selectElement = document.getElementById('regions');
</script>

<div class={className}>
  <select
    id="regions"
    class="block px-6 h-12 mb-6 w-full text-xs drop-shadow-md bg-white rounded-md font-semibold"
  >
    <option selected>Filter by Region</option>
    <option value="africa">Africa</option>
    <option value="america">America</option>
    <option value="asia">Asia</option>
    <option value="europe">Europe</option>
    <option value="oceania">Oceania</option>
  </select>
</div>

<style>
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(/arrow_down.svg) 91.5% / 8% no-repeat #fff;
  }

  /* CAUTION: IE hackery ahead */
  select::-ms-expand {
    display: none; /* remove default arrow on ie10 and ie11 */
  }
</style>
