import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {sessionActions} from "../../store/session.ts";
import {useDispatch} from "react-redux";
import Loading from "../../components/UI/Loading";
import {createGuestSession, createSession, getAccountID} from "../../api/Login.ts";
import {getFavorite, getToWatchList} from "../../api/Account.ts";
import {listActions} from "../../store/list.ts";

function ApprovedPage() {
    const [queryParameters] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSession() {
            try {
                if (!queryParameters.get('request_token')) {
                    const guest_session_id = await createGuestSession();
                    setSession(null, guest_session_id, true);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                } else {
                    const session_id = await createSession(queryParameters.get('request_token')!);
                    const account_id = await getAccountID(session_id);
                    setSession(account_id, session_id, false);
                    const favoriteMovies = await getFavorite(account_id, 'movies');
                    const favoriteTvShows = await getFavorite(account_id, 'tv');
                    const toWacthListMovies = await getToWatchList(account_id, 'movies');
                    const toWacthListTvShows = await getToWatchList(account_id, 'tv');
                    setLists(favoriteMovies, favoriteTvShows, toWacthListMovies, toWacthListTvShows);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchSession();
    }, []);

    function setSession(account_id: string | null, session_id: string, is_guest: boolean) {
        dispatch(sessionActions.login({account_id, session_id, is_guest}));
    }

    function setLists(favoriteMovies: any, favoriteTvShows: any, toWacthListMovies: any, toWacthListTvShows: any) {
        dispatch(listActions.setFavoriteMovies(favoriteMovies.map((movie: any) => movie.id)));
        dispatch(listActions.setFavoriteTvShows(favoriteTvShows.map((tvShow: any) => tvShow.id)));
        dispatch(listActions.setToWatchMovies(toWacthListMovies.map((movie: any) => movie.id)));
        dispatch(listActions.setToWatchTvShows(toWacthListTvShows.map((tvShow: any) => tvShow.id)));
    }

    return (
        <Loading/>
    );
}

export default ApprovedPage;