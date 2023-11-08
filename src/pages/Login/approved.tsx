import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {sessionActions} from "../../store/session.ts";
import {useDispatch} from "react-redux";
import Loading from "../../components/UI/Loading";
import {createGuestSession, createSession, getAccountID} from "../../api/Login.ts";

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

    return (
        <Loading/>
    );
}

export default ApprovedPage;