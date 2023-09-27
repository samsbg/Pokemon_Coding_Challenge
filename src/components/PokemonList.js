import React, { Component } from 'react';
import { fetchData } from '../utils/api';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      filter: '',
      sort: 'name',
    };
  }

  componentDidMount() {
    fetchData('/pokemon')
      .then(data => {
        this.setState({ pokemon: data.results })})
      .catch(error => console.error(error));
  }

  handleFilterChange = (filter) => {
    this.setState({ filter });
  }

  handleSortChange = (sort) => {
    this.setState({ sort });
  }

 render() {
  const { pokemon, filter, sort } = this.state;
  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter onFilterChange={this.handleFilterChange} onSortChange={this.handleSortChange} />
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={poke => (
          <List.Item>
            <Link to={`/pokemon/id`}>
              <Card
                hoverable
                style={{ borderRadius: '10px', transition: 'all 0.3s ease' }}
                cover={<img alt={poke.name} src={"https://freepngimg.com/download/pokemon/20250-9-pokeball-photo.png"} />}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card.Meta title={poke.name.toUpperCase()} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
}

export default PokemonList;
