import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import LoadingOverlay from "./components/LoadingOverlay";
import { fetchPokemonDetails, fetchPokemonList } from "./services/pokeapi";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const remaining = total - offset;
        const actualLimit = remaining < limit ? remaining : limit;

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

        setPokemonList(detailedPokemon);
      } catch (err) {
        console.error("Failed to fetch Pokemon: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [offset]);

  return (
  <div style={{ padding: "40px", textAlign: "center", position: "relative", minHeight: '100vh'}}>
    {loading && pokemonList.length === 0 ? (
      <LoadingOverlay />
    ) : (
      <>
        {loading && <LoadingOverlay />} {/* This handles mid-pagination loading */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
            opacity: loading ? 0.5 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          {pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
          ))}
        </div>

        <p>
          Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} Pokémon
        </p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setOffset((offset) => Math.max(0, offset - limit))}
            disabled={offset === 0 || loading}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <button
            onClick={() => setOffset(offset + limit)}
            disabled={offset + limit >= total || loading}
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
