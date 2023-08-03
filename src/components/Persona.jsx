"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const api_key=process.env.NEXT_PUBLIC_API_KEY;

const fetchPersonDetails = async (personId) => {
  try {
    const url = `https://api.themoviedb.org/3/person/${personId}`;
    const params = {
      api_key: api_key,
      language: "es-ES",
    };

    const response = await axios.get(url, { params });
    const personData = response.data;
    return personData;
  } catch (error) {
    console.error("Error fetching person details:", error);
    return null;
  }
};

const fetchMoviesByActor = async (actorId) => {
  try {
    const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits`;
    const params = {
      api_key: api_key,
      language: "es-ES",
    };

    const response = await axios.get(url, { params });
    const data = response.data;
    const movies = data.cast.map((movie) => ({
      ...movie,
      image_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
    return movies;
  } catch (error) {
    console.error("Error fetching movies by actor:", error);
    return [];
  }
};

const Persona = ({ id }) => {
  const [persona, setPersona] = useState({});
  const [peliculas, setPeliculas] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formatter = new Intl.DateTimeFormat("es-ES", options);

    return formatter.format(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPersonDetails(id);
      const p = await fetchMoviesByActor(id);
      setPersona(data);
      setPeliculas(p);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-screen mt-20 border border-gray-400 rounded-lg shadow-lg w-scream mx-auto p-4 w-11/12">
        <div className="col-span-3 sm:col-span-1">
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${persona.profile_path}`}
            alt="foto"
            className="w-full h-auto rounded-lg mx-auto"
          />
        </div>
        <div className="sm:col-span-2">
          <h2 className="text-3xl font-bold">{persona.name}</h2>
          <b>Biografía:</b>
          <p>{persona.biography}</p>
          <b className="mt-5">Películas</b>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-4 mt-2">
            {peliculas.slice(0, 18).map((pe) => (
              <div
                key={pe.id}
                className="transform transition-transform duration-500 hover:scale-125"
              >
                <Link href={`/Detalle/${pe.id}`}>
                  <img
                    loading="lazy"
                    src={pe.image_url}
                    alt={pe.title}
                    onError={(e) => {
                      e.target.remove();
                    }}
                    className="h-36 rounded-lg mx-auto"
                  />

                  <b className="text-center text-md">{pe.title}</b>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
};

export default Persona;
