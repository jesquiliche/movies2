'use client'
import ListaPeliculas from "@/components/listarpeliculas";

const fetchPeliculas = async () => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular`;
  const params = new URLSearchParams({
    api_key: api_key,
    language: "es-ES",
    page: 1,
  });

  try {
    const response = await fetch(`${url}?${params}`,{cache:'no-store'}); // Añade el backtick aquí

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const CargarPopulares = async () => {
  const peliculas = await fetchPeliculas();

  return (
    <div className="container w-11/12">
      <ListaPeliculas data={peliculas} title="Detrás de las escenas" />
    </div>
  );
};

export default CargarPopulares;
