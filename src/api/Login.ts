const access_token = import.meta.env.VITE_API_ACCESS_TOKEN;
const api_key = import.meta.env.VITE_API_KEY;

export async function requestToken() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        const {request_token} = resData;
        window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/approved`;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function createGuestSession() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        });

        const resData = await response.json();
        const {guest_session_id} = resData;
        return guest_session_id;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function createSession(request_token: string) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + access_token
            },
            body: JSON.stringify({request_token: request_token})
        });

        const resData = await response.json();
        const {session_id} = resData;
        return session_id;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getAccountID(session_id: string) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account?${api_key}&session_id=${session_id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        });

        const resData = await response.json();
        const {id} = resData;
        return id;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}