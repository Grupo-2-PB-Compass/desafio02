const access_token = import.meta.env.VITE_API_ACCESS_TOKEN;

export async function getPopular(type: string, page: number = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/popular?language=pt-BR&page=${page}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return  resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}