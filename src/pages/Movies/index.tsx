import { useEffect, useState } from "react";
import Menu from "../../components/Menu/index";
import MovieCarousel from "../../components/UI/MovieCarousel";
import './Movies.module.css'

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
  const categories = [
    { title: "Lançamentos", endpoint: "now_playing" },
    { title: "Populares", endpoint: "popular" },
    { title: "Mais bem avaliados", endpoint: "top_rated" },
    { title: "Em breve", endpoint: "upcoming" },
  ];

  const getMovies = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}top_rated?${apiKey}`;
    getMovies(movieUrl);
  }, []);

  return (
    <div>
      <Menu />
      {categories.map((category) => (
        <div className="container" key={category.title}>
          <h2 className="title">{category.title}</h2>
          <div className="movies-container">
            <MovieCarousel movies={movies} category={category.title}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movie;
