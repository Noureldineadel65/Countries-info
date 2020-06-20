<script context="module">
  import axios from "axios";
  export async function preload({ params }) {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/name/${params.slug}`
    );
    return { country: res.data[0] };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  export let country;
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders
  } = country;
  let borderCountries = [];
  console.log(borders);
  Promise.all(
    borders.map(e => axios.get(`https://restcountries.eu/rest/v2/alpha/${e}`))
  ).then(e => {
    borderCountries = e.map(e => e.data.name);
  });
</script>

<style>
  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 6rem;
    grid-column-gap: 10rem;
    align-items: center;
  }
  @media only screen and (max-width: 1024px) {
    .content {
      grid-template-columns: repeat(1, 1fr);
      grid-row-gap: 6rem;
    }
  }
  .details-list {
    height: 17rem;
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 640px) {
    .details-list {
      height: 100%;
    }
  }
  .details-list li {
    margin-bottom: 0.5rem;
  }
  .borders li:not(:last-of-type) {
    margin-right: 0.5rem;
  }
  .borders ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-template-rows: 3rem;
    grid-row-gap: 1rem;
    align-items: stretch;
    width: 100%;
    text-align: center;
  }
  .borders span {
    display: inline-block;
    width: 15rem;
  }
  .flag {
    justify-self: center;
  }
</style>

<div class="container">
  <a
    class="back text-2xl bg-white shadow py-2 px-12 inline-flex rounded-lg
    cursor-pointer items-center"
    href=".">
    <i class="fas fa-arrow-left mr-4" />
    <span>Back</span>
  </a>
  <div class="content">
    <div class="flag">
      <img src={flag} alt="{name}'s flag" />
    </div>
    <div class="details">
      <h1 class="text-5xl font-bold">{name}</h1>
      <ul class="text-2xl my-10 details-list flex flex-col">
        <li>
          <span class="font-semibold">Native Name:</span>
          {nativeName}
        </li>
        <li>
          <span class="font-semibold">Population:</span>
          {new Intl.NumberFormat().format(population)}
        </li>
        <li>
          <span class="font-semibold">Region:</span>
          {region}
        </li>
        <li>
          <span class="font-semibold">Sub Region:</span>
          {subregion}
        </li>
        <li>
          <span class="font-semibold">Capital:</span>
          {capital}
        </li>
        <li>
          <span class="font-semibold">Top Level Domain:</span>
          {topLevelDomain[0]}
        </li>
        <li>
          <span class="font-semibold">Currencies:</span>
          {currencies.map(e => e.name).join(', ')}
        </li>
        <li>
          <span class="font-semibold">Languages:</span>
          {languages.map(e => e.name).join(', ')}
        </li>
      </ul>
      <div class="borders flex sm:items-center text-xl flex-col sm:flex-row">
        {#if borders.length}
          <span class="font-semibold mr-2 mb-4 sm:mb-0">Border Countries:</span>
          <ul class="items-end">
            {#each borderCountries as border, i (border)}
              <li
                class="bg-white shadow rounded-lg px-4 py-2 cursor-pointer
                overflow-hidden">
                {border}
              </li>
            {/each}

          </ul>
        {:else}
          <span class="font-semibold mr-2 uppercase">No border countries</span>
        {/if}
      </div>
    </div>
  </div>
</div>
