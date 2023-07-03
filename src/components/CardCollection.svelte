<script>
  import Card from './Card.svelte';
  import SearchBar from './SearchBar.svelte';
  import { onMount } from 'svelte';
  import Select from './Select.svelte';

  let allCountries,
    filteredCountries = [];
  let filters = {
    s: '',
    page: 1,
  };

  let lastPage = 0;
  const perPage = 10;

  onMount(async () => {
    const response = await fetch('http://localhost:3000/api/data.json');
    const data = await response.json();
    allCountries = data;
    filteredCountries = data.slice(0, filters.page * perPage);
    lastPage = Math.ceil(data.length / perPage);
  });

  const filtersChanged = () => {
    let countries = allCountries.filter(
      p =>
        p.name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
        p.region.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
        p.subRegion.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
        (p.capital ?? '').toLowerCase().indexOf(filters.s.toLowerCase()) >= 0,
    );

    lastPage = Math.ceil(countries.length / perPage);
    filteredCountries = countries.slice(0, filters.page * perPage);
  };

  const search = s => {
    filters.s = s;
    filters.page = 1;
    filtersChanged();
  };

  const loadMore = () => {
    filters.page++;
    filtersChanged();
  };
</script>

<div class="lg:grid lg:grid-cols-2 lg:items-center lg:mx-[5rem] lg:mt-[2.2rem]">
  <SearchBar
    className="mt-6 mb-10 mx-4 lg:-mt-6 lg:mb-0 lg:mx-0 lg:max-w-[30rem]"
    {search}
  />

  <Select
    className="w-[12.5rem] mx-4 lg:place-self-end lg:mr-0 lg:mt-3"
    {search}
  />
</div>

<div
  class="mx-14 grid sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:mx-[5rem] xl:gap-[4.5rem] 2xl:grid-cols-5 min-[2000px]:grid-cols-6"
>
  {#each filteredCountries as country (country.name)}
    <a class="hover:cursor-pointer" href={`/country/${country.name}`}>
      <Card
        className="mb-10 md:h-[21rem] lg:h-[18rem] xl:h-[21.1rem] lg:mx-0 lg:mb-0 2xl:md:h-[19rem]"
        country={country.name}
        flagImage={country.flag}
        flagAlt={`${country.name} Flag`}
        population={country.population}
        region={country.region}
        capital={country.capital}
      />
    </a>
  {/each}
</div>
{#if filters.page < lastPage}
  <div class="w-10 h-10 bg-red-700">
    <button on:click={loadMore}>Load More</button>
  </div>
{/if}
