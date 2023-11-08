import {Genres} from "../pages/Movies";

export function getGenres(genres: Genres[]) {
    if (!genres) {
        return "";
    }

    const genresArray = genres.map((genre) => {
        return genre.name;
    });

    if (genres.length === 1) {
        return genresArray[0];
    }

    const lastGenre = genresArray.pop();
    return genresArray.join(', ') + ' & ' + lastGenre;
}

export function getReleaseYear(date: string) {
    if (!date) {
        return "";
    }

    return date.split('-')[0];
}

export function getDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours} h ${minutes} min`;
}

export function getNumberOfSeasons(numberOfSeasons: number) {
    if (!numberOfSeasons) {
        return "";
    }

    return `${numberOfSeasons} Temporada${numberOfSeasons > 1 ? 's' : ''}`;
}

export function getNumberOfMovies(numberOfMovies: number) {
    if (!numberOfMovies) {
        return "";
    }

    return `${numberOfMovies} Filme${numberOfMovies > 1 ? 's' : ''}`;
}

export function getRating(rating: number) {
    if (!rating) {
        return "";
    }

    return `${rating} `;
}

