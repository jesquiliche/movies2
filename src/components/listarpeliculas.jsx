import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import RatingStars from "./ratingstars";
import MovieVideo from "./MovieVideo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MejorValoradas = ({ data, title }) => {
  let peliculas = data.results;
  peliculas = peliculas.slice(0, 12);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Muestra 3 películas en la pantalla al mismo tiempo
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
    <div className="container mx-auto mt-2 ">
      <div className="text-center mt-1 text-dark">
        <p className="text-3xl font-bold text-gray-300 text-center p-10 borde-blue-900">
          {title}
        </p>
      </div>

      <div className="mt-3">
        <Slider {...settings}>
          {peliculas.map((p) => (
            <div key={p.id}>
              <div
                className="bg-white overflow-hidden rounded-lg shadow-lg 
            border border-gray-300 opacity-100"
              >
                <div className="p-2">
                  <MovieVideo id={p.id} />
                  <Link href={`/Detalle/${p.id}`}>
                    <h2 className="text-center font-bold text-md">
                      {p.title}
                      <RatingStars rating={p.vote_average / 2} />
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MejorValoradas;
