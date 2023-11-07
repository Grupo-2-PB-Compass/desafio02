import { Link } from "react-router-dom";
import "./MovieCard.module.css";
const imagesURL = import.meta.env.VITE_IMG;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
  showLink?: boolean;
}

const MovieCard = ({ movie = true }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img src={imagesURL + movie.poster_path} alt={movie.title} />
      {showLink && (
        <Link to={`/movie/${movie.id}`} className="movie-details-link">
          Detalhes
        </Link>
      )}
    </div>
  );
};

export default MovieCard;
