<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1 {
    font-size: 10rem;
  }
  i {
    font-size: 12rem;
  }
  p {
    font-size: 5rem;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>
<div class="container flex justify-center flex-col items-center">
  <i class="far fa-frown" />
  <h1>{status}</h1>

  <p class="uppercase">{error.message}</p>
</div>
