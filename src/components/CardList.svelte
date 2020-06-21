<script>
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  import Loader from "./Loader.svelte";
  import countriesStore from "../stores/countries-store.js";

  import axios from "axios";
  import Card from "./Card.svelte";

  export let filtered;
  export let selected;
  let filteredCountries = [];
  let selectedCountries = [];
  let limit = 12;
  $: filteredCountries = $countriesStore;
  $: filteredCountries = Boolean(filtered)
    ? $countriesStore.filter(e =>
        e.name.toLowerCase().includes(filtered.toLowerCase())
      )
    : $countriesStore;
  $: selectedCountries = Boolean(selected)
    ? filteredCountries.filter(
        e => e.region.toLowerCase() === selected.toLowerCase()
      )
    : filteredCountries;
</script>

<style>
  .card-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 6rem;
  }
  @media only screen and (max-width: 1280px) {
    .card-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media only screen and (max-width: 1024px) {
    .card-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 560px) {
    .card-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .viewmore {
    transition: all 0.3s;
  }
  .viewmore:active {
    transform: scale(0.9);
  }
  .card-container {
    transition: all 0.3s;
  }
  .card-container:hover {
    transform: translateY(-1rem);
  }
  p {
    color: #fff;
  }
</style>

<div class="card-list my-12 no-overflow">
  {#each selectedCountries.slice(0, limit) as country (country.name)}
    <div
      animate:flip={{ duration: 500 }}
      class="bg-white rounded-md shadow card-container no-overflow">
      <Card {country} />
    </div>
  {:else}
    {#if Boolean(filtered) || Boolean(selected)}
      <p
        class="text-3xl text-center rounded bg-red-600 w-full py-4 px-6 mx-auto
        flex items-center justify-center font-semibold shadow-md">
        No Countries to show
      </p>
    {:else}
      <Loader />
    {/if}
  {/each}
  {#if selectedCountries.length > 12 && limit < selectedCountries.length}
    <button
      class="text-3xl w-full rounded-md shadow-md py-2 px-6 flex justify-center
      items-center border-solid border-4 border-gray-600 mx-auto viewmore"
      on:click={() => (limit += 12)}>
      View More
    </button>
  {/if}
</div>
