import React from "react";
import { Carousel } from "react-responsive-carousel";
import './MovieCarousel.module.css';

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
  return (
    <div className="movie-carousel">
      <Carousel showArrows={true} showThumbs={false}>
        {movies.map((movie) => (
          <div key={movie.id} className="carousel-card">
            <img
              src={imagesURL + movie.poster_path}
              alt=""
              className="carousel-image"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
