<script>
  import Card from './Card.svelte';
  import SearchBar from './SearchBar.svelte';
  import Select from './Select.svelte';

  async function getCountries() {
    const response = await fetch('http://localhost:3000/api/data.json');
    const countries = await response.json();

    if (response.ok) {
      return countries;
    }

    throw new Error(countries);
  }

  let promise = getCountries();
</script>

<div class="lg:grid lg:grid-cols-2 lg:items-center lg:mx-[5rem] lg:mt-[2.2rem]">
  <SearchBar
    className="mt-6 mb-10 mx-4 lg:-mt-6 lg:mb-0 lg:mx-0 lg:max-w-[30rem]"
  />
  <Select className="w-[12.5rem] mx-4 lg:place-self-end lg:mr-0 lg:mt-3" />
</div>

<div
  class="mx-14 grid sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:mx-[5rem] xl:gap-[4.5rem] 2xl:grid-cols-5 min-[2000px]:grid-cols-6"
>
  {#await promise}
    <p>Loading...</p>
  {:then countries}
    {#each countries as country (country.name)}
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
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
