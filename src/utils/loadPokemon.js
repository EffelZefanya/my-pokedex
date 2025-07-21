// utils/loadPokemon.js
import { fetchPokemonList, fetchPokemonDetails } from "../services/pokeapi";

export const POKEMON_LIMIT = 10;

export async function loadPokemon({ offset, total, setTotal }) {
  const data = await fetchPokemonList(POKEMON_LIMIT, offset);
  
  // Set total count only once
  if (total === 0) setTotal(data.count);

  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon) => {
      const details = await fetchPokemonDetails(pokemon.url);
      return {
        name: details.name,
        image: details.sprites.front_default,
      };
    })
  );

  return detailedPokemon;
}
