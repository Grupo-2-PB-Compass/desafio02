import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Menu from "../../components/Menu/Menu";

import "../Movies/Movies.module.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  // Add other properties as needed
}

const Home = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  const getTopRatedMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    console.log(topRatedUrl);
    getTopRatedMovies(topRatedUrl);
  }, []);

  console.log(topMovies);

  return (
    <div>
      <Menu />
      <div className="container">
        <h2 className="title">Coleções de Hallowen</h2>
        <div className="movies-container">
          {topMovies.length > 0 &&
            topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
      <div className="container">
        <h2 className="title">Séries em alta</h2>
        <div className="movies-container">
          {topMovies.length > 0 &&
            topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
      <div className="container">
        <h2 className="title">Filmes em Alta</h2>
        <div className="movies-container">
          {topMovies.length > 0 &&
            topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
