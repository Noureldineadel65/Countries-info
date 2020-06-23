<script>
  import { onMount } from "svelte";
  import * as animateScroll from "svelte-scrollto";
  import { fade } from "svelte/transition";
  import axios from "axios";
  import CardList from "../components/CardList.svelte";
  import countriesStore from "../stores/countries-store.js";
  import Waypoint from "svelte-waypoint";
  import Navbar from "../components/Navbar.svelte";
  import Search from "../components/Search.svelte";
  import Filter from "../components/Filter.svelte";
  let filtered = "";
  let selected = "";
  let faded = false;
  axios.get("https://restcountries.eu/rest/v2/all").then(e => {
    countriesStore.setCountries(e.data);
  });
  onMount(() => {
    if (document.querySelector("body").scrollTop >= 600) {
      faded = true;
    } else {
      faded = false;
    }
  });
</script>

<style>
  .getup {
    position: absolute;
    font-size: 4rem;
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    right: 0;
    margin: 2rem 4rem;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.308);
  }
</style>

{#if faded}
  <div
    class="getup bg-white shadow-lg cursor-pointer"
    on:click={() => animateScroll.scrollToTop()}
    transition:fade={{ duration: 300 }}>
    <i class="fas fa-chevron-up" />
  </div>
{/if}
<svelte:body
  on:scroll={e => {
    if (e.originalTarget.scrollTop >= 600) {
      faded = true;
    } else {
      faded = false;
    }
  }} />
<div class="container">

  <div
    class="interactions justify-between items-center flex lg:flex-row flex-col">
    <Search on:search={e => (filtered = e.detail)} />
    <Filter
      on:selected={e => (selected = e.detail)}
      on:resetFilter={() => (selected = '')} />

  </div>
  <CardList {filtered} {selected} />

</div>
