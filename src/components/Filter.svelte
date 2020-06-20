<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { fly } from "svelte/transition";
  let listOn = false;
  let selected = "Filter by Region";
  function dispatchSelection(e) {
    dispatch("selected", e.target.textContent);
    selected = e.target.textContent;
    setTimeout(() => {
      listOn = false;
    }, 0);
  }
</script>

<style>
  .selections {
    bottom: -17.5rem;
    z-index: 10;
  }
  .rotate {
    transform: rotate(180deg);
  }
  .fa-angle-down {
    transition: all 0.3s;
  }
</style>

<svelte:body
  on:click={e => {
    if (listOn) listOn = false;
  }} />
<div
  class="filter lg:w-1/6 font-semibold text-xl relative w-full"
  on:click|stopPropagation>
  <div
    class="dropdown flex items-center justify-between bg-white w-fulltext-xl p-6
    px-10 rounded-md shadow cursor-pointer"
    on:click={e => {
      console.log(e.target.classList);
      if (e.target.classList.contains('close-filter')) {
        selected = 'Filter by Region';
        dispatch('resetFilter');
      } else {
        listOn = !listOn;
      }
    }}>
    <div class="current-selected">{selected}</div>
    {#if selected !== 'Filter by Region'}
      <i class="fas fa-times close-filter" />
    {:else}
      <i class="fas fa-angle-down" class:rotate={listOn} />
    {/if}

  </div>
  {#if listOn}
    <ul
      class="bg-white static mt-4 lg:mt-0 lg:absolute w-full p-8 rounded-md
      shadow selections"
      transition:fly={{ y: -20, duration: 200 }}
      on:click|stopPropagation={() => (listOn = true)}>
      <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Africa
      </li>
      <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Americas
      </li>
      <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Asia
      </li>
      <li
        class="mb-2 cursor-pointer selection-item"
        on:click={dispatchSelection}>
        Europe
      </li>
      <li class="cursor-pointer selection-item" on:click={dispatchSelection}>
        Oceania
      </li>
    </ul>
  {/if}
</div>
