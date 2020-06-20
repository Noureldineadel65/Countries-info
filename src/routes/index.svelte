<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import CardList from "../components/CardList.svelte";
  import countriesStore from "../stores/countries-store.js";

  import Navbar from "../components/Navbar.svelte";
  import Search from "../components/Search.svelte";
  import Filter from "../components/Filter.svelte";
  let filtered = "";
  let selected = "";

  axios.get("https://restcountries.eu/rest/v2/all").then(e => {
    countriesStore.setCountries(e.data);
  });
</script>

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
