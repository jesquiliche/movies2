'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Personas = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [actualiza, setActualiza] = useState(false);


  const fetchPopularCharacters = async (pageNumber = 1, pageSize = 20) => {
    try {
      const url = 'https://api.themoviedb.org/3/search/person';
      const api_key=process.env.NEXT_PUBLIC_API_KEY;
      const language = 'es-ES';
      const region = 'ES';

      const params = {
        api_key: api_key,
        page: pageNumber,
        language: language,
        region: region,
        page_size: pageSize,
        query: searchQuery
      };

      const queryParams = new URLSearchParams(params).toString();
      const fullUrl = `${url}?${queryParams}`;

      const response = await fetch(fullUrl);
      const data = await response.json();

      const characters = data.results;
      const totalPages = data.total_pages;

      setCharacters(characters);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching popular characters:', error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    setCurrentPage(1);
    setActualiza(!actualiza);
    await fetchPopularCharacters(1, 20);
  };

  useEffect(() => {
    fetchPopularCharacters(currentPage, 20);
  }, [currentPage]);

  useEffect(() => {
    console.log("entro");
  }, [actualiza]);

  return (
    <>
      <h1 className="text-2xl font-bold mt-20">Actores</h1>
      <form className="mt-4 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar actor"
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded-md"
        >
          Buscar
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-5 rounded-lg shadow-lg w-scream mx-auto p-4 w-11/12">
        {characters.map((character) => (
          <div key={character.id} className="mx-auto transform transition-transform duration-500 hover:scale-110">
            <Link href={`/Personas/${character.id}`}>
              <img loading='lazy'
               onError={(e) => {
                e.target.remove();
              }}
                src={`https://image.tmdb.org/t/p/w500${character.profile_path}`}
                alt={character.name}
              />
              <h2 className="text-center font-bold">{character.name}</h2>
            </Link>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
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
      )}
    </>
  );
};

export default Personas;
