<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let value = "";
</script>

<style>
  .input-search {
    color: hsl(0, 0%, 52%);
  }
  .fa-search {
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
  }
</style>

<div class="input-search relative lg:w-2/5 w-full mb-4 lg:mb-0">
  <i class="fas fa-search text-2xl absolute align-middle" />
  <input
    type="text"
    id="search"
    placeholder="Search for a country..."
    class="p-4 text-2xl pl-24 w-full rounded-md shadow"
    on:keyup={() => {
      dispatch('search', value);
    }}
    bind:value
    autocomplete="off" />
</div>
