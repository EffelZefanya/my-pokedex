import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
const [pokemonList, setPokemonList] = useState([])
const [offset, setOffset] = useState(0)
const [total, setTotal] = useState(0)
const limit = 10
  
useEffect(() => {
  async function fetchPokemon() {
    try {
      const remaining = total-offset
      const actualLimit = remaining < 10 ? remaining : 10
      
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${actualLimit}&offset=${offset}`)
      const data = await res.json()

      setTotal(data.count)

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          const details = await res.json()

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

  fetchPokemon()
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