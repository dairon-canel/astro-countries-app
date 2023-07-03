<script>
  import { selectedRegion } from '../store';

  export let className = '';
  export let country;
  export let flagImage;
  export let flagAlt;
  export let population;
  export let region;
  export let capital;

  let filterRegion = 'all';

  selectedRegion.subscribe(value => {
    filterRegion = value;
  });
</script>

{#if filterRegion === region.toLowerCase() || filterRegion === 'all'}
  <div
    class={className +
      ' bg-white dark:bg-elements-dark-blue drop-shadow-md rounded-md pb-11'}
  >
    <img
      class="rounded-t-md aspect-[16_/_9.7] object-cover drop-shadow-md"
      src={flagImage}
      alt={flagAlt}
    />
    <h2 class="dark:text-white mt-[1.4rem] pl-6 text-lg font-bold leading-6">
      {country}
    </h2>
    <p class="dark:text-white mt-[0.825rem] pl-6 font-semibold text-[0.915rem]">
      Population: <span class="font-normal"
        >{population.toLocaleString().replaceAll('.', ',')}</span
      >
    </p>
    <p class="dark:text-white mt-[0.12rem] pl-6 font-semibold text-[0.915rem]">
      Region: <span class="font-normal">{region}</span>
    </p>
    {#if capital}
      <p
        class="dark:text-white mt-[0.12rem] pl-6 font-semibold text-[0.915rem]"
      >
        Capital: <span class="font-normal">{capital}</span>
      </p>
    {/if}
  </div>
{/if}
