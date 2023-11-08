const access_token = import.meta.env.VITE_API_ACCESS_TOKEN;

export async function manageFavorite(account_id: string, media_type: string, media_id: number, favorite: boolean) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + access_token
            },
            body: JSON.stringify({media_type: media_type, media_id: media_id, favorite: favorite})
        });

        return await response.json();
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function manageToWatchList(account_id: string, media_type: string, media_id: number, watchlist: boolean) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + access_token
            },
            body: JSON.stringify({media_type: media_type, media_id: media_id, watchlist: watchlist})
        });

        return await response.json();
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getFavorite(account_id: number, type: string) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite/${type}?language=pt-BR&page=1&sort_by=created_at.asc`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData.results;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getToWatchList(account_id: number, type: string) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist/${type}?language=pt-BR&page=1&sort_by=created_at.asc`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData.results;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}