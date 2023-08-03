import Peliculas from './Peliculas';


const MejorValoradas = () => {
  const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated';

  return <Peliculas apiUrl={apiUrl} title="Películas Mejor Valoradas" />;
};

export default MejorValoradas;
