import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import LoadingOverlay from "./components/LoadingOverlay";
import { containerStyle, gridStyle } from "./styles/layout";
import { loadPokemon, POKEMON_LIMIT } from "./utils/loadPokemon";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

    loadPokemon({ offset, total, setTotal })
      .then(setPokemonList)
      .catch((err) => console.error("Failed to fetch Pokemon:", err))
      .finally(() => setLoading(false));
  }, [offset]);

  return (
  <div style={{containerStyle}}>
    {loading && pokemonList.length === 0 ? (
      <LoadingOverlay />
    ) : (
      <>
        {loading && <LoadingOverlay />}

        <div
          style={gridStyle(loading)}
        >
          {pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
          ))}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
          Showing {offset + 1}-{Math.min(offset + POKEMON_LIMIT, total)} of {total} Pokémon
        </p>
          <button
            onClick={() => setOffset((offset) => Math.max(0, offset - POKEMON_LIMIT))}
            disabled={offset === 0 || loading}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <button
            onClick={() => setOffset(offset + POKEMON_LIMIT)}
            disabled={offset + POKEMON_LIMIT >= total || loading}
          >
            Next
          </button>
        </div>
      </>
    )}
  </div>
);

}

export default App;
