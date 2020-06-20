<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  let icon;
  let dark = false;
  let down = false;
  $: iconName = !dark ? "far fa-sun mr-2" : "far fa-moon mr-2";
  function changeTheme() {
    down = true;
    setTimeout(() => {
      icon.className = iconName;
      dark = !dark;
      down = false;
    }, 300);
  }
</script>

<style>
  h1 {
    font-size: 2rem;
  }
</style>

<svelte:head>
  <style>
    body {
      transition: all 0.3s;
    }
    .bg-white {
      transition: all 0.3s;
    }
    ul li {
      transition: all 0.3s;
    }
    h1 {
      transition: all 0.3s;
    }
    span {
      transition: all 0.3s;
    }
    input {
      transition: all 0.3s;
    }
    button {
      transition: all 0.3s;
    }
  </style>
  {#if dark}
    <style>
      body {
        background: hsl(207, 26%, 17%);
      }
      .bg-white {
        background: hsl(209, 23%, 22%);
        color: hsl(0, 0%, 100%) !important;
      }
      ul li {
        color: hsl(0, 0%, 100%) !important;
      }
      h1 {
        color: hsl(0, 0%, 100%) !important;
      }
      span {
        color: hsl(0, 0%, 100%) !important;
      }
      input {
        color: hsl(0, 0%, 100%) !important;
        background: hsl(209, 23%, 22%);
      }
      button {
        color: hsl(0, 0%, 100%) !important;
      }
    </style>
  {/if}
</svelte:head>
<svelte:body class:name={true} />
<nav class="bg-white py-8 shadow-md overflow-none">
  <div class="container flex justify-between items-center">
    <a href=".">
      <h1 class="font-bold">Where in the world?</h1>
    </a>
    <div
      class="theme text-2xl font-semibold cursor-pointer"
      on:click={changeTheme}>
      {#if !down}
        <i
          class="far fa-moon mr-2"
          bind:this={icon}
          transition:fly={{ y: 20, duration: 300 }} />
      {/if}
      <span class="hidden sm:inline-block">{dark ? 'Light' : 'Dark'} Mode</span>
    </div>
  </div>
</nav>
