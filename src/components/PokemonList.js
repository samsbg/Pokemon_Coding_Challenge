import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData(`/pokemon?offset=${(currentPage-1)*pageSize}&limit=${pageSize}`)
      .then(data => {
        setPokemon(data.results);
        setCount(data.count);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }, [currentPage, pageSize]);

  if (error) {
    return ErrorPage();
  }

  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter onFilterChange={setFilter} onSortChange={setSort} />
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={poke => (
          <List.Item>
            <Link to={`/pokemon/${poke.url.split('/')[6]}`}>
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
      <div>
        
      </div>
      <Pagination 
        style={{display: "flex", justifyContent: "center"}}
        total={count} 
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        defaultPageSize={pageSize}
        current={currentPage}
        
        onChange={(newCurrent, newPageSize) => {
          const pageSizeChange = pageSize !== newPageSize;
          if (pageSizeChange) {
            setPageSize(newPageSize);
          } else {
            setCurrentPage(newCurrent);
          }
        }}
      />
    </div>
  );
}

export default PokemonList;
