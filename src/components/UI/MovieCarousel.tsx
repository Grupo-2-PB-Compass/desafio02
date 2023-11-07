import { Carousel } from 'react-responsive-carousel';
import MovieCard from '../MovieCard/MovieCard';

const imagesURL = import.meta.env.VITE_IMG;

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }
  

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  return (
    <Carousel showArrows={true}>
      {movies.map((movie) => (
        <div key={movie.id}>
            <img src={imagesURL + movie.poster_path} alt={movie.title}/>
          <MovieCard movie={movie} showLink={false} />
        </div>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;

