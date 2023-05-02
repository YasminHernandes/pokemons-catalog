const pokemonList = document.querySelector('.pokemon-list');
const loadingMoreButton = document.querySelector('.loadingMore')
let offset = 0
let limit = 10

const populatePokemonList = (pokemonDetail) => {
  const pokemon = new Pokemon()
  pokemon.id = pokemonDetail.id
  pokemon.name = pokemonDetail.name

  const types = pokemonDetail.types.map(type => type.type.name)
  const [type] = types
  
  pokemon.types = types
  pokemon.type = type
  pokemon.img = pokemonDetail.sprites.other.dream_world.front_default

  return pokemonList.insertAdjacentHTML('beforeend', `
    <li class="pokemon-block ${pokemon.type}">
      <span class="pokemon-id">#${pokemon.id}</span>
      <span class="pokemon-name">${pokemon.name}</span>
      <div class="detail">
        <ul class="types">
          ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
        </ul>
        <img class="pokemon-image" src="${pokemon.img}" alt="${pokemon.name}">
      </div>
    </li>
  `)
}

const loadMorePokemons = () => {
  offset += limit
  pokeApi.getPokemons(offset, limit).then((pokemon = []) => {
    const newPokemonBlock = pokemon.map(populatePokemonList).join('')
    pokemonList.innerHTML += newPokemonBlock
  })
}

loadingMoreButton.addEventListener('click', loadMorePokemons)