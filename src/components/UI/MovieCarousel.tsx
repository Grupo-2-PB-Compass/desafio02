import React from "react";
//@ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./MovieCarousel.module.css";

const imagesURL = import.meta.env.VITE_IMG;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCarouselProps {
  movies: Movie[];
  category?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const splideOptions = {
    type: "loop",
    perPage: 10,
    gap: "1rem",
  };

  return (
    <div className="catalogo">
      <Splide options={splideOptions}>
        {movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <div className="carousel-card">
              <img
                src={imagesURL + movie.poster_path}
                alt=""
                className="carousel-image"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieCarousel;
