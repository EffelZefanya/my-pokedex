import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemonList}) {
    if (!pokemonList || pokemonList.length === 0){
        return <p>Loading Pokemon...</p>
    }

    return(
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
    </div>
    )
}