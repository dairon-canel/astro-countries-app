<script>
  export let country;
  export let flagImage;
  export let flagAlt;
  export let population;
  export let region;
  export let capital;
</script>

<div>
  <img src={flagImage} alt={flagAlt} />
  <h2>{country}</h2>
  <p>Population: <span>{population}</span></p>
  <p>Region: <span>{region}</span></p>
  <p>Capital: <span>{capital}</span></p>
</div>
