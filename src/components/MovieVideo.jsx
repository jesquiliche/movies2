"use client";
import React, { useEffect, useState } from "react";


const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const MovieVideo = ({ id }) => {
  const movieId = id;
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const getMovieVideo = async () => {
      try {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const videos = data.videos.results;
        if (videos.length > 0) {
          setVideoKey(videos[0].key);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la película:", error);
      }
    };

    getMovieVideo();
  }, []);

  if (!videoKey) {
    return <div>Cargando...</div>;
  }

  const videoUrl = `https://www.youtube.com/embed/${videoKey}?showinfo=0`;

  return (
   <div className="relative w-full P-2" style={{ paddingTop: "56.25%" }}>
      <h2>Video de la película</h2>
      <iframe
        loading="lazy"
        src={videoUrl}
        title="Trailer de la película"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
  ></iframe>
    
    
    </div>
  );
};

export default MovieVideo;
