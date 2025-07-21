import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import LoadingOverlay from "./components/LoadingOverlay";
import PaginationControls from "./components/PaginationControls";
import SearchBar from "./components/SearchBar";
import { containerStyle, gridStyle } from "./styles/layout";
import { loadPokemon, POKEMON_LIMIT } from "./utils/loadPokemon";
import { fetchPokemonByName } from "./services/pokeapi";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searching) return; // Don’t run pagination fetch when searching

    setLoading(true);
    loadPokemon({ offset, total, setTotal })
      .then(setPokemonList)
      .catch((err) => console.error("Failed to fetch Pokémon:", err))
      .finally(() => setLoading(false));
  }, [offset, searching]);

  const handleSearch = async (name) => {
    if (!name) {
      setSearching(false);
      setOffset(0);
      return;
    }

    setLoading(true);
    setSearching(true);
    try {
      const result = await fetchPokemonByName(name);
      setPokemonList([result]);
    } catch (err) {
      alert("Pokémon not found!");
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <SearchBar onSearch={handleSearch} />

      {loading && pokemonList.length === 0 ? (
        <LoadingOverlay />
      ) : (
        <>
          {loading && <LoadingOverlay />}

          <div style={gridStyle(loading)}>
            {pokemonList.map((pokemon, index) => (
              <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
            ))}
          </div>

          {!searching && (
            <>
              <p>
                Showing {offset + 1}-{Math.min(offset + POKEMON_LIMIT, total)} of {total} Pokémon
              </p>

              <PaginationControls
                offset={offset}
                total={total}
                limit={POKEMON_LIMIT}
                loading={loading}
                onPrevious={() => setOffset((offset) => Math.max(0, offset - POKEMON_LIMIT))}
                onNext={() => setOffset(offset + POKEMON_LIMIT)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
