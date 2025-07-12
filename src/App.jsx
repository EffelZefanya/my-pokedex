import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
const [pokemonList, setPokemonList] = useState([])
  
useEffect(() => {
  async function fetchPokemon() {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      const data = await res.json()

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          const details = await res.json()

          console.log('Fetched:', pokemon.name, details.sprites.front_default)

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
}, [])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: '40px',
      gap: '16px'
    }}>
      {pokemonList.length === 0 ? (
        <p>Loading Pokemon...</p>
      ) : (
        pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
        ))
      )}
    </div>
  )
}

export default App