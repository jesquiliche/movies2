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
    const response = await fetch(`${url}?${params});

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
    <>
      <ListaPeliculas data={peliculas} title="Detrás de las escenas" />
    </>
  );
};

export default CargarPopulares;
