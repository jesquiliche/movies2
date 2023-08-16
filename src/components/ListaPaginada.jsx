import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import RatingStars from "./ratingstars";
import Animacion from "./animacion";

const ListaPaginada = ({ data, indice }) => {
  return (
    <Animacion>
      <div
        className={`grid grid-cols-1 sm:grid-cols-${indice} md:grid-cols-5 lg:grid-cols-${indice} xl:grid-cols-${indice} gap-4 mx-2 `}
      >
        {data.map((p) => (
          <Animacion 
            key={p.id}
            className="bg-white overflow-hidden rounded-lg shadow-lg border
             border-gray-300 opacity-100 transform transition-transform duration-500 hover:scale-110"
          >
            <div className="p-2">
              <Link href={`/Detalle/${p.id}`}>
                <img
                  loading="lazy"
                  onError={(e) => {
                    e.target.remove();
                  }}
                  src={`https://image.tmdb.org/t/p/w154${p.poster_path}`}
                  alt={p.title}
                  className="w-full h-auto cursor-pointer rounded-lg"
                />
              </Link>
              <div className="relative -top-5 right-4 ml-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                  <span className="text-white text-xs font-bold">
                    {parseInt(p.vote_average*10)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 -mt-7">
              <RatingStars rating={p.vote_average / 2} />
              <h6 className="text-md font-medium">
                <Link href={`/Detalle/${p.id}`}>{p.title}</Link>
              </h6>
              <p className="text-sm text-gray-600">
                {p.release_date &&
                  "Fecha de estreno: " +
                    format(new Date(p.release_date), "dd/MM/yyyy")}
              </p>
            </div>
          </Animacion>
        ))}
      </div>
    </Animacion>
  );
};

export default ListaPaginada;
