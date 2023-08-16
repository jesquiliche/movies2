import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import RatingStars from "./ratingstars";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Animacion from "./animacion";

const MejorValoradas = ({ data, title }) => {
  let peliculas = data.results;
  //peliculas = peliculas.slice(0, 12);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 8, // Muestra 3 películas en la pantalla al mismo tiempo
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
        prevArrow: <button className="slick-prev">Previous</button>,
  nextArrow: <button className="slick-next">Next</button>,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-5 ">
      
      <div className="mt-3">
        <Slider {...settings}>
          {peliculas.map((p) => (
            <div key={p.id}>
              <div
                className="bg-white overflow-hidden rounded-lg shadow-lg 
            border border-gray-300 opacity-100 m-1"
              >
                <Animacion>
                <div className="p-2">
                  <Link href={`/Detalle/${p.id}`}>
                  
                <img
                
                  onError={(e) => {
                    e.target.remove();
                  }}
                  src={`https://image.tmdb.org/t/p/w154${p.poster_path}`}
                  alt={p.title}
                  className="w-full h-auto cursor-pointer rounded-lg"
                />
              
                    <h2 className="text-center font-bold text-md">
                      
                      <RatingStars rating={p.vote_average / 2} />
                    </h2>
                  </Link>
                  </div>
                </Animacion>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MejorValoradas;
