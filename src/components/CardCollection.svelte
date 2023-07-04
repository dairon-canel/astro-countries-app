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
  class="sticky top-[4.9rem] -mt-8 bg-bg-very-light-gray dark:bg-bg-very-dark-blue z-10 lg:grid lg:grid-cols-2 lg:items-center lg:px-[5rem] lg:pt-[1.5rem] before:absolute before:top-[10.9rem] before:lg:top-[7.9rem] before:w-full before:z-10 before:h-5 before:bg-gradient-to-b before:from-bg-very-light-gray before:dark:from-bg-very-dark-blue before:to-transparent transition-colors"
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
  class="mt-[2.9rem] lg:mt-[3.4rem] mx-14 grid grid-cols-[repeat(auto-fit,_minmax(min(200px,_100%),_1fr))] gap-10 md:gap-6 lg:mx-[5rem] xl:gap-[4.7rem]"
>
  {#each filteredCountries as country (country.name)}
    <a
      class="hover:cursor-pointer border border-transparent transition-colors hover:border-bg-very-dark-blue hover:shadow-inner rounded-md hover:border"
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
  <div class="w-10 h-10 bg-red-700">
    <button on:click={loadMore}>Load More</button>
  </div>
{/if}

<style>
  /* CSS class with gradient styles */
  .gradient-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-image: linear-gradient(
      to bottom,
      var(--from-color),
      var(--to-color)
    );
    opacity: 0;
  }

  /* Animation keyframes */
  @keyframes gradientFade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Sticky container styles */
  .sticky-container {
    position: sticky;
    top: 4.9rem;
    margin-top: -2px;
    background-color: var(--bg-color);
    z-index: 10;
    padding: 1.5rem 0;
  }

  /* Sticky content styles */
  .sticky-content {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 0 5rem;
  }

  /* Apply the gradient effect to the before pseudo-element */
  .sticky-container:before {
    content: '';
    position: absolute;
    top: 12rem;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: 10;
    animation: gradientFade 0.3s ease-in-out;
  }

  /* Dark theme styles */
  .sticky-container.dark {
    background-color: var(--dark-bg-color);
  }

  .sticky-container.dark:before {
    background-image: linear-gradient(
      to bottom,
      var(--dark-from-color),
      var(--dark-to-color)
    );
  }
</style>
