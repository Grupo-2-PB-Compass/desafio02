import {useEffect, useState} from "react";
import {MovieProps} from "../Movies";
import {getPopular} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import Loading from "../../components/UI/Loading.tsx";
import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import Highlight from "../../components/Highlight/Highlight.tsx";
import classes from "../Home/Home.module.css";

function Actors(){
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState({} as MovieProps);

    useEffect(() => {
        document.title = "Celebridades"
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

export default Actors;
