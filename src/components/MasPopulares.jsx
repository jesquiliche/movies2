'use client'
import React from 'react';
import Peliculas from './Peliculas';

const MasPopulares = () => {
  const apiUrl = 'https://api.themoviedb.org/3/movie/popular';

  return <Peliculas apiUrl={apiUrl} title="Películas más populares" />;
};

export default MasPopulares;
