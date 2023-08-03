import Peliculas from './Peliculas';

const Proximas = () => {
  const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming';

  return <Peliculas apiUrl={apiUrl} title="Próximas Películas" />;
};

export default Proximas;
