"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import RatingStars from "./ratingstars";
import Animacion from "./animacion";

const api_key=process.env.NEXT_PUBLIC_API_KEY;;

const ObtenerDetalle = ({ id }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: api_key,
              append_to_response: "videos",
              language: "es-ES",
            },
          }
        );

        setMovieDetails(response.data);
      } catch (error) {
        console.error(error);
        setMovieDetails(null);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            params: {
              api_key: api_key,
              language: "es-ES",
            },
          }
        );

        setCredits(response.data);
      } catch (error) {
        console.error(error);
        setCredits(null);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formatter = new Intl.DateTimeFormat("es-ES", options);

    return formatter.format(date);
  };

  const getVideoUrl = () => {
    if (movieDetails?.videos?.results.length > 0) {
      return `https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`;
    }

    return null;
  };

  const getDirectors = () => {
    if (credits) {
      return credits.cast
        .filter((persona) => persona.known_for_department === "Directing")
        .map((person) => person.name);
    }

    return [];
  };

  const getActors = () => {
    if (credits) {
      return credits.cast
        .filter((person) => person.known_for_department === "Acting")
        .slice(0, 12)
        .map((person) => ({
          name: person.name,
          profilePath: person.profile_path,
          id: person.id,
        }));
    }

    return [];
  };

  const renderActors = () => {
    const actors = getActors();

    return (
      <div className="grid  grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-4 mt-2 ">
        {actors.map((actor) => (
          <div
            key={actor.name}
            className="transform transition-transform duration-500 hover:scale-125"
          >
            <Link href={`/Personas/${actor.id}`}>
              <div>
                {actor.profilePath && (
                  <img
                    loading="lazy"
                    onError={(e) => {
                      e.target.remove();
                    }}
                    src={`https://image.tmdb.org/t/p/w185/${actor.profilePath}`}
                    alt={actor.name}
                    className="mx-auto h-36"
                  />
                )}
              </div>

              <p className="text-center font-bold text-md">{actor.name}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Animacion>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-screen mt-20 border border-gray-400 rounded-lg shadow-lg w-scream mx-auto p-4 w-11/12">
        <div className="col-span-3 sm:col-span-1">
        
          <img
            
           
            src={`https://image.tmdb.org/t/p/w342/${movieDetails?.poster_path}`}
            alt={movieDetails?.title}
            className="w-full h-auto rounded-lg mx-auto"
          />
          <div className="relative -top-11 right-5 ml-2">
                  <div className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full">
                    <span className="text-white text-sm font-bold">
                      {movieDetails?.vote_average * 10}%
                    </span>
                  </div>
                </div>
        </div>
        <div className="sm:col-span-2">
          <div>
            <h4 className="text-dark font-bold text-3xl mb-5">
              {movieDetails?.title}
        

              <RatingStars rating={movieDetails?.vote_average/2}/>
            
                  
            </h4>
            
          </div>
          <b>Fecha:</b> {movieDetails && formatDate(movieDetails.release_date)}{" "}
          <b>Géneros:</b> {movieDetails?.genres.map((g) => g.name).join(" ")}
          <br />
          <b>Descripción:</b>
          <br />
          <p>{movieDetails?.overview}</p>
          <b>Director:</b> {getDirectors().join(", ")}
          <br />
          <b>Actores:</b>
          {renderActors()}
        </div>
        <div className="col-span-3">
          <div className="mt-5 mb-5 flex justify-center z-index-0">
            {getVideoUrl() && (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  loading="lazy"
                  src={getVideoUrl()}
                  title="Trailer de la película"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </Animacion>
  );
};

export default ObtenerDetalle;
