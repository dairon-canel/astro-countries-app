<script>
  export let className;
  export let search;
</script>

<div class={className}>
  <select
    id="regions"
    name="regions"
    aria-label="Regions"
    class="block px-6 h-12 mb-8 w-full text-xs drop-shadow-md bg-white dark:bg-elements-dark-blue rounded-md font-semibold dark:text-gray-300 lg:h-[3.5rem] lg:text-sm"
    value=""
    on:change={e => search(e.target.value)}
  >
    <option value="" selected>Filter by Region</option>
    <option value="africa">Africa</option>
    <option value="americas">America</option>
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
