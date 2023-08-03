'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import ListaPaginada from "./ListaPaginada";

const Peliculas = ({ apiUrl, title }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categorias, setCategorias] = useState([]);
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroValoracion, setFiltroValoracion] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroActor, setFiltroActor] = useState("");
  const [actores, setActores] = useState([]);

  const api_key=process.env.NEXT_PUBLIC_API_KEY;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


const fetchActores = async () => {
  try {
    let actoresTemp = [];

    for (let x = 0; x < 20; x++) {
      const respuesta = await axios.get("https://api.themoviedb.org/3/person/popular", {
        params: {
          api_key: api_key,
          language: "es-ES",
          page: 1,
        },
      });

      actoresTemp = actoresTemp.concat(respuesta.data.results);
    }

    setActores(actoresTemp);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchActores();
}, []);



const fetchCategorias = async () => {
  try {
    const url = new URL("https://api.themoviedb.org/3/genre/movie/list");
    url.searchParams.append("api_key", api_key);
    url.searchParams.append("language", "es-ES");

    const respuesta = await fetch(url);
    const data = await respuesta.json();

    setCategorias(data.genres);
  } catch (error) {
    console.log(error);
  }
};

  const fetchPeliculas = async () => {
    try {
      const url = new URL(apiUrl);
      url.searchParams.append("api_key", api_key);
      url.searchParams.append("language", "es-ES");
      url.searchParams.append("page", currentPage);

      if (filtroFechaDesde) {
        url.searchParams.append("primary_release_date.gte", filtroFechaDesde);
      }
      if (filtroFechaHasta) {
        url.searchParams.append("primary_release_date.lte", filtroFechaHasta);
      }
      if (filtroGenero) {
        url.searchParams.append("with_genres", filtroGenero);
      }
      if (filtroValoracion) {
        url.searchParams.append("vote_average.gte", filtroValoracion);
      }
      if (filtroFecha) {
        url.searchParams.append("primary_release_year", filtroFecha);
      }
      if (filtroActor) {
        url.searchParams.append("with_cast", filtroActor);
      }

      const respuesta = await fetch(url, { cache: 'no-store' });
      const data = await respuesta.json();

      setSearchResults(data.results);
      setTotalPages(data.total_pages);
      console.log(url.href);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFiltroFechaDesde("");
    setFiltroFechaHasta("");
    setFiltroGenero("");
    setFiltroValoracion("");
    setFiltroFecha("");
    setFiltroActor("");
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchPeliculas();
    fetchCategorias();
  }, [
    currentPage,
    filtroFechaDesde,
    filtroFechaHasta,
    filtroGenero,
    filtroValoracion,
    filtroFecha,filtroActor
  ]);

  const handleFiltroValoracionChange = (e) => {
    setFiltroValoracion(e.target.value);
  };

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mt-20">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 m-2 mx-auto w-11/12 mt-5">
        <div className="col-span-1 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fechaDesde"
              >
                Fecha de Estreno Desde:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fechaDesde"
                type="date"
                value={filtroFechaDesde}
                onChange={(e) => setFiltroFechaDesde(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fechaHasta"
              >
                Fecha de Estreno Hasta:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fechaHasta"
                type="date"
                value={filtroFechaHasta}
                onChange={(e) => setFiltroFechaHasta(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="genero"
              >
                Género:
              </label>
              <select
                className="text-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="genero"
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
              >
                <option value="">Selecciona un género</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="valoracion"
              >
                Valoración mínima:
              </label>
              <select
                className="text-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="valoracion"
                value={filtroValoracion}
                onChange={handleFiltroValoracionChange}
              >
                <option value="">Seleccione una valoración mínima</option>
                <option value="7">7+</option>
                <option value="8">8+</option>
                <option value="9">9+</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fecha"
              >
                Año de estreno:
              </label>
              <select
                className="text-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha"
                value={filtroFecha}
                onChange={handleFiltroFechaChange}
              >
                <option value="">Seleccione un año de estreno</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="actor"
              >
                Actor:
              </label>
              <select
                className="text-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actor"
                value={filtroActor}
                onChange={(e) => setFiltroActor(e.target.value)}
              >
                <option value="">Selecciona un actor</option>
                {actores.map((actor) => (
                  <option key={actor.id} value={actor.id}>
                    {actor.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset
            </button>
          </form>
        </div>
        <div className="col-span-10">
          <ListaPaginada data={searchResults} title={title} indice={5} />
          <div className="flex justify-center mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <div className="text-dark font-bold mx-2">
              {currentPage} de {totalPages}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Peliculas;
