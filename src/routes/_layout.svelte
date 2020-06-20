<script>
  import Navbar from "../components/Navbar.svelte";
</script>

<style>
  main {
    padding: 4rem 0;
  }
</style>

<Navbar />
<main>
  <slot />
</main>
