import Menu from "../../components/Menu";
import classes from "./Home.module.css";
import Highlight from "../../components/Highlight/Highlight.tsx";
import {useEffect, useState} from "react";
import Background from "../../components/UI/Background.tsx";
import Loading from "../../components/UI/Loading.tsx";
import {getPopular} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import {MovieProps} from "../Movies";

function Home() {
    const [movie, setMovie] = useState({} as MovieProps);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Início"
        requestHighlitedMovie();
    }, []);

    async function requestHighlitedMovie() {
        setIsLoading(true);
        const popularMovies = await getPopular('movie');
        const choosenMovie = chooseItem(popularMovies.results);
        const movieDetails = await getDetails('movie', choosenMovie.id);
        setMovie(movieDetails);
        setIsLoading(false);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Background
                    image={movie.backdrop_path}
                >
                    <Menu/>
                    <Highlight
                        data={movie}
                        isMovie
                        type={'duration'}
                        descriptionPosition={'top'}
                        hasGenre
                        hasWatchNow
                        hasMoreInfo
                        hasAdd
                        hasFav
                    />
                </Background>

                <div className={classes.carousel}>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                </div>
            </>
    )
}

export default Home;