'use client'
import Peliculas from './Peliculas';

const Cartelera = () => {
  const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';

  return <Peliculas apiUrl={apiUrl} title="En Cartelera" />;
};

export default Cartelera;
