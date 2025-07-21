import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import { fetchPokemonDetails, fetchPokemonList } from "./services/pokeapi";

function App() {
const [pokemonList, setPokemonList] = useState([])
const [offset, setOffset] = useState(0)
const [total, setTotal] = useState(0)
  
useEffect(() => {
  async function fetchData() {
    try {
      const remaining = total - offset
      const actualLimit = remaining < 10 ? remaining : 10
      
      const data = await fetchPokemonList(actualLimit, offset)
      if (total === 0) setTotal(data.count)

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.url)

          return {
            name: details.name,
            image: details.sprites.front_default
          }
        })
      )

      setPokemonList(detailedPokemon)
    } catch (err) {
      console.error('Failed to fetch Pokemon: ', err)
    }
  }

  fetchData()
}, [offset])

  return (
    <div style={{ padding:'40px', textAlign: 'center'}}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {pokemonList.length === 0 ? (
          <p>Loading Pokemon...</p>
        ) : (
          pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
          ))
        )}
      </div>

      <p>
        Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} Pokemon
      </p>

      <div style={{ marginTop: '20px'}}>
        <button onClick={() => setOffset(offset => Math.max(0, offset - limit))} disabled={offset===0} style={{ marginRight: '10px'}}>
          Previous
        </button>
        <button onClick={() => setOffset(offset+limit)} disabled={offset + limit >= total}>
          Next
        </button>
        </div>
      </div>
  )
}

export default App