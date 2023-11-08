import {FaPlay} from "react-icons/fa";
import ButtonSecondary from "../UI/ButtonSecondary.tsx";
import {RiInformationFill} from "react-icons/ri";
import ButtonOutlined from "../UI/ButtonOutlined.tsx";
import ButtonCircle from "../UI/ButtonCircle.tsx";
import {IoMdStar} from "react-icons/io";
import {IoAddOutline} from "react-icons/io5";
import classes from "./Highlight.module.css";
import {useEffect, useState} from "react";
import {BsCheck2} from "react-icons/bs";
import {
    getDuration,
    getGenres,
    getNumberOfMovies,
    getNumberOfSeasons, getRating,
    getReleaseYear
} from "../../utils/Details.tsx";
import HighlightDescription from "./HighlightDescription.tsx";
import {SerieProps} from "../../pages/TvShows";
import {MovieProps} from "../../pages/Movies";
import {manageFavorite, manageToWatchList} from "../../api/Account.ts";
import {useDispatch, useSelector} from "react-redux";
import {SessionState} from "../../store/session.ts";
import {listActions, ListState} from "../../store/list.ts";

export interface HighlightProps {
    data: MovieProps | SerieProps,
    isMovie?: boolean,
    type: string,
    descriptionPosition: string,
    hasGenre?: boolean,
    hasWatchNow?: boolean,
    hasTrailer?: boolean,
    hasMoreInfo?: boolean,
    hasAdd?: boolean,
    hasFav?: boolean,
}

function Highlight(props: HighlightProps) {
    const releaseYear = getReleaseYear(props.isMovie ? (props.data as MovieProps).release_date : (props.data as SerieProps).first_air_date);
    const duration = getDuration(props.data.runtime);
    const genres = getGenres(props.data.genres);
    const numberOfSeasons = getNumberOfSeasons(props.data.number_of_seasons);
    const numberOfMovies = getNumberOfMovies(props.data.number_of_movies);
    const rating = getRating(props.data.vote_average);
    const [favorite, setFavorite] = useState(false);
    const [added, setAdded] = useState(false);
    const account_id = useSelector((state: SessionState) => state.session.accountId);
    const favoriteData = useSelector((state: ListState) => props.isMovie ? state.list.favoriteMovies : state.list.favoriteTvShows);
    const toWatchListData = useSelector((state: ListState) => props.isMovie ? state.list.toWatchMovies : state.list.toWatchTvShows);
    const dispatch = useDispatch();

    useEffect(() => {
        if (favoriteData && favoriteData.includes(props.data.id)) {
            setFavorite(true);
        }

        if (toWatchListData && toWatchListData.includes(props.data.id)) {
            setAdded(true);
        }
    }, []);

    function secondParameter() {
        switch (props.type) {
            case 'numberOfSeasons':
                return numberOfSeasons;
            case 'duration':
                return duration;
            case 'numberOfMovies':
                return numberOfMovies;
            case 'rating':
                return rating;
            default:
                return '';
        }
    }

    async function toggleFavorite() {
        const id: number = props.data.id;
        const poster_path: string = props.data.poster_path;
        await manageFavorite(account_id, props.isMovie ? 'movie' : 'tv', id, !favorite)

        if (!favorite) {
            dispatch(
                props.isMovie
                    ? listActions.addFavoriteMovie({id, poster_path})
                    : listActions.addFavoriteTvShow({id, poster_path})
            );
        } else {
            dispatch(
                props.isMovie
                    ? listActions.removeFavoriteMovie({id, poster_path})
                    : listActions.removeFavoriteTvShow({id, poster_path})
            );
        }
        setFavorite((prevState) => !prevState);
    }

    async function toggleAdded() {
        const id: number = props.data.id;
        const poster_path: string = props.data.poster_path;
        await manageToWatchList(account_id, props.isMovie ? 'movie' : 'tv', id, !added)

        if (!added) {
            dispatch(
                props.isMovie
                    ? listActions.addToWatchMovie({id, poster_path})
                    : listActions.addToWatchTvShow({id, poster_path})
            );
        } else {
            dispatch(
                props.isMovie
                    ? listActions.removeToWatchMovie({id, poster_path})
                    : listActions.removeToWatchTvShow({id, poster_path})
            );
        }
        setAdded((prevState) => !prevState);
    }

    return (
        <section className={classes['section-highlight']}>
            <div className={classes.info}>
                <h1>{props.isMovie ? (props.data as MovieProps).title : (props.data as SerieProps).name}</h1>
                <p className="body-regular">{releaseYear} • {secondParameter()}</p>
                {props.hasGenre && <p className="caption">{genres}</p>}
            </div>

            {props.descriptionPosition === 'top' ?
                <HighlightDescription description={props.data.overview}/>
                : null}

            <div className={classes.actions}>
                {props.hasWatchNow && <ButtonSecondary><FaPlay/> ver agora</ButtonSecondary>}
                {props.hasTrailer && <ButtonOutlined>trailer</ButtonOutlined>}
                {props.hasMoreInfo && <ButtonOutlined><RiInformationFill/>mais informações</ButtonOutlined>}

                {props.hasFav &&
                    <ButtonCircle
                        type="button"
                        favoriteOrAdded={added}
                        onClick={toggleAdded}
                    >
                        {added ? <BsCheck2/> : <IoAddOutline/>}
                    </ButtonCircle>
                }

                {props.hasAdd &&
                    <ButtonCircle
                        type="button"
                        onClick={toggleFavorite}
                        favoriteOrAdded={favorite}
                    >
                        {favorite ? <BsCheck2/> : <IoMdStar/>}
                    </ButtonCircle>
                }
            </div>

            {props.descriptionPosition === 'bottom' ?
                <HighlightDescription description={props.data.overview}/>
                : null}
        </section>
    )
}

export default Highlight;