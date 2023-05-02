const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then(response => response.json())
  .then(populatePokemonList)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeApi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  
  return fetch(url)
  .then(response => response.json())
  .then(response => response.results)
  .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
}


pokeApi.getPokemons(offset, limit)