import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import { Card } from 'antd';
import ErrorPage from './ErrorPage';
import './PokemonDetail.css';

function PokemonDetail(props) {

  const { match } = props;
  const [ pokemon, setPokemon ] = useState(null);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    fetchData(`/pokemon/${match.params.id}`)
      .then(data => setPokemon(data))
      .catch(error => {
        console.error(error);
        setError(true)
      });
  }, [match.params.id]);

  if (error) {
    return ErrorPage();
  }

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const path = process.env.PUBLIC_URL;
  const image = "/sunburst.jpg"

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card 
        className='detailCard'
        title={capitalizeFirstLetter(pokemon.name)}
        cover={<div style={{height: '260px', margin: '1px'}}>
          <img alt={"background"} src={path + image} style={{position: 'absolute', width: 'inherit'}} />
          <img alt={pokemon.name} src={pokemon.sprites?.front_default} style={{position: 'absolute', width: 'inherit'}} />
        </div>}
      >
        <Card.Meta 
          description={
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <p className='elements-description'>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
              <p className='elements-description'>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
              <p className='elements-description'>Height: {pokemon.height}</p>
              <p className='elements-description'>Weight: {pokemon.weight}</p>
            </div>
          }
        />
      </Card>
    </div>
    );
}

export default PokemonDetail;
