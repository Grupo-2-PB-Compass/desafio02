import React from "react";
import { Carousel } from "react-responsive-carousel";
import MovieCard from "../MovieCard/MovieCard";
import './MovieCarouse.module.css';

const imagesURL = import.meta.env.VITE_IMG;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCarouselProps {
  movies: Movie[];
  category: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, category }) => {
  return (
    <div className="movie-carousel">
      <h3 className="carousel-title">{category}</h3>
      <Carousel showArrows={true} showThumbs={false} axis="horizontal">
        {movies.map((movie) => (
          <div key={movie.id} className="carousel-card">
            <img
              src={imagesURL + movie.poster_path}
              alt=""
              className="carousel-image"
            />
            <MovieCard movie={movie} showLink={false} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
