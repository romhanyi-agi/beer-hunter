/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useAuth } from '../Authentication/AuthContext.jsx';
import useApi from '../APICall/useAPI.js';

// eslint-disable-next-line import/prefer-default-export
export const Home = () => {

  const PUNK_API = 'https://api.punkapi.com/v2/beers?page=1&per_page=2';
  const { data, isLoading, isError, error } = useApi(PUNK_API, { method: 'GET' });
  // Test - a wrong call
  // const PUNK_API2 = 'https://api.punkapi.com/v2/beerds?page=2&per_page=2';
  // const second = useApi(PUNK_API2, { method: 'GET' });

  return (
    <div>
      <h1>Welcome and happy beer-hunting!</h1>
      {isLoading
        ? 'LOADING ...'
        : isError
          ? error.message
          : data.map(d => (
            <div key={d.id}>
              <img title={d.name || 'title'} src={d.image_url || ''} alt={d.name || 'title'} height="150" />
              <h3>{d.name || 'No title'}</h3>
              <strong>ABV: {d.abv || 'No abv'}</strong>
              <p>{d.description || 'description missing'}</p>
            </div>
          ))
      }
      <hr />
      {/* <p> Second API call</p>
      {second.isLoading
        ? 'LOADING ...'
        : second.isError
          ? second.error.message
          : second.data.map(d => (
            <div key={d.id}>
              <img title={d.name || 'title'} src={d.image_url || ''} alt={d.name || 'title'} height="150" />
              <h3>{d.name || 'No title'}</h3>
              <strong>ABV: {d.abv || 'No abv'}</strong>
              <p>{d.description || 'description missing'}</p>
            </div>
          ))
      } */}
    </div>
  );
};
