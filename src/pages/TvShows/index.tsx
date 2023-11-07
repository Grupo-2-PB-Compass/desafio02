import Background from "../../components/UI/Background.tsx";
import Highlight, {MovieGenres} from "../../components/Highlight/Highlight.tsx";
import Menu from "../../components/Menu";
import {useEffect, useState} from "react";
import {getPopular} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import Loading from "../../components/UI/Loading.tsx";

export interface SerieProps {
    id: number;
    name: string;
    overview: string;
    backdrop_path: string;
    number_of_seasons: number;
    number_of_movies: number;
    vote_average: number;
    first_air_date: string;
    runtime: number;
    genres: MovieGenres[];
}

function TvShows() {
    const [serie, setSerie] = useState({} as SerieProps);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        requestHighlitedSeries();
    }, []);

    async function requestHighlitedSeries() {
        setIsLoading(true);
        const popularSeries = await getPopular('tv');
        const choosenSerie = chooseItem(popularSeries.results);
        const serieDetails = await getDetails('tv', choosenSerie.id);
        setSerie(serieDetails);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Background image={serie.backdrop_path}>
                    <Menu/>
                    <Highlight
                        data={serie}
                        type={'numberOfSeasons'}
                        descriptionPosition={'bottom'}
                        hasGenre
                        hasWatchNow
                        hasTrailer
                        hasAdd
                        hasFav
                    />
                </Background>
            </>
    )
}

export default TvShows;