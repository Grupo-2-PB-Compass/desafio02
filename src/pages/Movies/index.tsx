import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/index";
import MovieCarousel from "../../components/UI/MovieCarousel";
import Background from "../../components/UI/Background.tsx";
import Loading from "../../components/UI/Loading.tsx";
import classes from "./Movies.module.css";
import { getPopular } from "../../api/Lists.ts";
import { chooseItem } from "../../utils/Lists.ts";
import { getDetails } from "../../api/Details.ts";
import ButtonRounded from "../../components/UI/ButtonRounded.tsx";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface Genres {
  id: number;
  name: string;
}

interface MovieProps {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  genres: Genres[];
  overview: string;
  backdrop_path: string;
  number_of_seasons: number;
  number_of_movies: number;
  vote_average: number;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState({} as MovieProps);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { title: "Lançamentos", endpoint: "now_playing" },
    { title: "Populares", endpoint: "popular" },
    { title: "Mais bem avaliados", endpoint: "top_rated" },
    { title: "Em breve", endpoint: "upcoming" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMovies = async () => {
    try {
      const data = await getPopular("movie");
      setMovies(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const requestHighlitedMovie = async () => {
    setIsLoading(true);
    const popularMovies = await getPopular("movie");
    const choosenMovie = chooseItem(popularMovies.results);
    const movieDetails = await getDetails("movie", choosenMovie.id);
    setMovie(movieDetails);
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = "Filmes";
    requestHighlitedMovie();
    getMovies();
  }, []);


  return (
    isLoading ? <Loading/> :
    <>
      <Background image={movie.backdrop_path}>
        <Menu />
        <div className={classes.title}>
          <h2>Filmes</h2>
          <ButtonRounded>Gêneros</ButtonRounded>
        </div>
        <MovieCarousel movies={movies} />
      </Background>
      {categories.map((category) => (
        <div className="container" key={category.title}>
          <h2 className="title">{category.title}</h2>
          <div className="movies-container">
            <MovieCarousel movies={movies} category={category.title} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Movies;
