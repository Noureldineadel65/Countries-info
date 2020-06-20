<script>
  export let country;
</script>

<style>
  li {
    color: hsl(200, 15%, 8%);
  }

  .image {
    max-height: 23rem;
    /* height: 50%; */
  }
  @media only screen and (max-width: 640px) {
    .image {
      max-height: none;
      width: 100%;
    }
  }
</style>

<a
  class="card bg-white rounded-md shadow cursor-pointer"
  href="/country/{country.name}">
  <div class="card-image">
    <img src={country.flag} alt="" class="object-contain image" />
  </div>
  <div class="card-description p-8">
    <div class="card-title text-2xl font-bold">{country.name}</div>
    <ul class="text-xl mt-4">
      <li class="mb-2">
        <span class="font-semibold">Population:</span>
        <span>{new Intl.NumberFormat().format(country.population)}</span>
      </li>
      <li class="mb-2">
        <span class="font-semibold">Region:</span>
        <span>{country.region}</span>
      </li>
      <li>
        <span class="font-semibold">Capital:</span>
        <span>{country.capital}</span>
      </li>
    </ul>
  </div>
</a>
