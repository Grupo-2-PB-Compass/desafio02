import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  // Add other properties as needed
}

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const [movies, setMovies] = useState<Movie[]>([]);

  const getSearchedMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Search;
