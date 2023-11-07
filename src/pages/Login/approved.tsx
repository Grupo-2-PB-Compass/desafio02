import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {sessionActions} from "../../store/session.ts";
import {useDispatch} from "react-redux";
import Loading from "../../components/UI/Loading";

function ApprovedPage() {
    const [queryParameters] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!queryParameters.get('request_token')) {
            createGuestSession();
        } else {
            createSession(queryParameters.get('request_token')!);
        }
    }, []);

    function setSessionId(session_id: string, is_guest: string) {
        dispatch(sessionActions.login({session_id, is_guest}));
    }

    async function createGuestSession() {
        try {
            const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
                }
            });

            const resData = await response.json();
            const {guest_session_id} = resData;
            setSessionId(guest_session_id, 'guest');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (e: any) {
            throw new Error(e.statusText);
        }
    }

    async function createSession(request_token: string) {
        try {
            const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
                },
                body: JSON.stringify({request_token: request_token})
            });

            const resData = await response.json();
            const {session_id} = resData;

            if (session_id) {
                setSessionId(session_id, 'user');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (e: any) {
            throw new Error(e.statusText);
        }
    }

    return (
        <Loading/>
    );
}

export default ApprovedPage;