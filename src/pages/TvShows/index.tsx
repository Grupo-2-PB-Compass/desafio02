import Background from "../../components/UI/Background.tsx";
import Highlight from "../../components/Highlight/Highlight.tsx";
import Menu from "../../components/Menu";
import {useEffect, useState} from "react";
import {getPopular} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import Loading from "../../components/UI/Loading.tsx";
import classes from "../Movies/Movies.module.css";
import ButtonRounded from "../../components/UI/ButtonRounded.tsx";
import {Genres} from "../Movies";

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
    genres: Genres[];
}

function TvShows() {
    const [serie, setSerie] = useState({} as SerieProps);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Séries"
        requestHighlitedSeries();
    }, []);

    async function requestHighlitedSeries() {
        setIsLoading(true);
        const popularSeries = await getPopular('tv');
        const choosenSerie = chooseItem(popularSeries.results);
        const serieDetails = await getDetails('tv', choosenSerie.id);
        setSerie(serieDetails);
        setIsLoading(false);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Background image={serie.backdrop_path}>
                    <Menu/>

                    <div className={classes.title}>
                        <h2>Séries</h2>
                        <ButtonRounded>Gêneros</ButtonRounded>
                    </div>

                    <Highlight
                        data={serie!}
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