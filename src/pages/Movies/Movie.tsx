import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import TopBarWireframe from "../../components/UI/TopBarWireframe";
import MovieCarousel from "../../components/UI/MovieCarousel";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const Movie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}top_rated?${apiKey}`;
    getMovies(movieUrl);
  }, []);

  return (
    <div>
      <Menu />
      <TopBarWireframe />
      <div className="container">
        <h2 className="title">Lançamentos</h2>
        <div className="movies-container">
          { movies.length > 0 && <MovieCarousel movies={movies}/> }
        </div>
      </div>
      <div className="container">
        <h2 className="title">Populares</h2>
        <div className="movies-container">
          { movies.length > 0 && <MovieCarousel movies={movies}/> }
        </div>
      </div>
      <div className="container">
        <h2 className="title">Mais bem avaliados</h2>
        <div className="movies-container">
          { movies.length > 0 && <MovieCarousel movies={movies}/> }
        </div>
      </div>
      <div className="container">
        <h2 className="title">Em breve</h2>
        <div className="movies-container">
          { movies.length > 0 && <MovieCarousel movies={movies}/> }
        </div>
      </div>
    </div>
  );
};

export default Movie;
