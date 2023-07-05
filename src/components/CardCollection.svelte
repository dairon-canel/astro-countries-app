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

<div
  class="dark:filters-container filters-container sticky top-[4.9rem] -mt-8 bg-bg-very-light-gray dark:bg-bg-very-dark-blue z-10 lg:grid lg:grid-cols-2 lg:items-center lg:px-[5rem] lg:pt-[1.5rem]"
>
  <SearchBar
    className="mt-6 mb-10 mx-4 lg:mb-6 lg:mx-0 lg:max-w-[30rem]"
    {search}
  />

  <Select
    className="w-[12.5rem] mx-4 -mb-4 lg:place-self-end lg:mr-0 lg:mt-0 lg:-mb-2"
    {search}
  />
</div>

<div
  class="mt-[2.9rem] lg:mt-[3.4rem] mx-14 grid gap-10 md:gap-6 lg:mx-[5rem] xl:gap-[4.7rem]"
  class:grid-cols-[repeat(auto-fit,_minmax(min(198px,_50%),_1fr))]={filteredCountries.length >=
    4}
>
  {#each filteredCountries as country (country.name)}
    <a
      class="hover:cursor-pointer border border-transparent transition-colors hover:border-bg-very-dark-blue hover:shadow-inner rounded-md hover:border"
      class:max-w-[16.5rem]={filteredCountries.length < 4}
      href={`/country/${country.name}`}
    >
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
  <div class="my-10 w-full grid">
    <button
      class="dark:bg-elements-dark-blue drop-shadow-lg w-32 h-10 rounded-md hover:bg-bg-very-dark-blue hover:text-white dark:hover:text-bg-very-dark-blue dark:hover:bg-white bg-white text-bg-very-dark-blue dark:text-white place-self-center"
      on:click={loadMore}>Load More</button
    >
  </div>
{/if}

<style>
  .filters-container::before {
    content: '';
    position: absolute;
    top: 10.9rem;
    width: 100%;
    z-index: 10;
    height: 1.25rem;
    background-image: linear-gradient(to bottom, hsl(0 0% 98%), transparent);
    opacity: 1;
    transition: all 0.2s;
  }

  :is(.dark .dark\:filters-container)::before {
    background-image: linear-gradient(to bottom, hsl(0 0% 98%), transparent);
    opacity: 0;
  }

  .filters-container::after {
    content: '';
    position: absolute;
    top: 10.9rem;
    width: 100%;
    z-index: 10;
    height: 1.25rem;
    background-image: linear-gradient(to bottom, hsl(207 26% 17%), transparent);
    opacity: 0;
    transition: all 0.2s;
  }

  :is(.dark .dark\:filters-container)::after {
    background-image: linear-gradient(to bottom, hsl(207 26% 17%), transparent);
    opacity: 1;
  }

  @media screen and (min-width: 1024px) {
    .filters-container:before,
    .filters-container:after {
      position: absolute;
      top: 7.9rem;
    }
  }
</style>
