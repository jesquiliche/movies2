"use client";

import React, { useState,useEffect } from "react";
import ListaPaginada from "@/components/ListaPaginada";
 
import Cabecera from "@/components/Cabecera";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const api_key=process.env.NEXT_PUBLIC_API_KEY;
  
  const handleSearch = async () => {
  try {
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.append("api_key",api_key );
    url.searchParams.append("query", searchQuery);
    url.searchParams.append("language", "es-ES");
    url.searchParams.append("page", currentPage);

    const response = await fetch(url,{ cache: 'no-store' });
    const data = await response.json();

    await setSearchResults(data.results);
    await setTotalPages(data.total_pages);
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleSearch();
  
  };


  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto mt-64">
     <Cabecera/>       
       
        <div className="flex items-center border-b-2 border-blue-500 py-2 mt-5">
          <input
            className="appearance-none bg-white-800 opacity-70 border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-md"
            type="text"
            placeholder="Buscar película..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </form>
      {searchResults && searchResults.length > 0 && (
        <>
          
        
        <ListaPaginada data={searchResults} title="Encontradas" indice={5}></ListaPaginada>
        <div class="flex justify-center mt-10 mb-20">
           <button
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
             onClick={handlePrevPage}
             disabled={currentPage === 1}
           >
             Anterior
           </button>
           <div className="text-dark font-bold mx-2">
                  {currentPage} de {totalPages + " "}
          </div>
          
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
             onClick={handleNextPage}
             disabled={currentPage === totalPages}
           >
             Siguiente
           </button>
         </div>
        </>
      )}
   
    </>
  );
};

export default SearchForm;
