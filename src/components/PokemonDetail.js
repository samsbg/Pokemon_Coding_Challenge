import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import { Card } from 'antd';

function PokemonDetail(props) {

  const { match } = props;
  const [ pokemon, setPokemon ] = useState(null);

  useEffect(() => {
    fetchData(`/pokemon/${match.params.id}`)
      .then(data => setPokemon(data))
      .catch(error => console.error(error));
  }, [match.params.id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card 
        style={{ width: 300 }}
        cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
      >
        <Card.Meta 
          title={pokemon.name} 
          description={
            <>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
            </>
          }
        />
      </Card>
    </div>
    );
}

export default PokemonDetail;
