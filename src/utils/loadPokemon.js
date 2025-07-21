import { fetchPokemonDetails, fetchPokemonList } from "../services/pokeapi";

const LIMIT = 10;

export const loadPokemon = async ({ offset, total, setTotal }) => {
    const remaining = total - offset;
    const actualLimit = remaining < LIMIT ? remaining : LIMIT;

    const data = await fetchPokemonList(actualLimit, offset);
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
};

export const POKEMON_LIMIT = LIMIT