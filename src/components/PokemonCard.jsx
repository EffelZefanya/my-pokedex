function PokemonCard({name, image}){
    return (
        <div style={{
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '16px',
            width: '180px',
            textAlign: 'center',
            background: '121212',
            margin: '10px',
        }}>
            <img src={image} alt={name} width="120"/>
            <h3 style={{ marginTop: '10px', textTransform: 'capitalize'}}>{name}</h3>
        </div>
    )
}

export default PokemonCard