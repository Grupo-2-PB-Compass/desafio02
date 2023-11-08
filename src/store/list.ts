import {createSlice} from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "list",
    initialState: {
        favoriteMovies: [] as number[],
        favoriteTvShows: [] as number[],
        toWatchMovies: [] as number[],
        toWatchTvShows: [] as number[],
    },
    reducers: {
        setFavoriteMovies: (state, action) => {
            state.favoriteMovies = action.payload;
        },
        setFavoriteTvShows: (state, action) => {
            state.favoriteTvShows = action.payload;
        },
        setToWatchMovies: (state, action) => {
            state.toWatchMovies = action.payload;
        },
        setToWatchTvShows: (state, action) => {
            state.toWatchTvShows = action.payload;
        },
        addFavoriteMovie: (state, action) => {
            state.favoriteMovies.push(action.payload.id);
        },
        addFavoriteTvShow: (state, action) => {
            state.favoriteTvShows.push(action.payload.id);
        },
        addToWatchMovie: (state, action) => {
            state.toWatchMovies.push(action.payload.id);
        },
        addToWatchTvShow: (state, action) => {
            state.toWatchTvShows.push(action.payload.id);
        },
        removeFavoriteMovie: (state, action) => {
            state.favoriteMovies = state.favoriteMovies.filter((id) => id !== action.payload.id);
        },
        removeFavoriteTvShow: (state, action) => {
            state.favoriteTvShows = state.favoriteTvShows.filter((id) => id !== action.payload.id);
        },
        removeToWatchMovie: (state, action) => {
            state.toWatchMovies = state.toWatchMovies.filter((id) => id !== action.payload.id);
        },
        removeToWatchTvShow: (state, action) => {
            state.toWatchTvShows = state.toWatchTvShows.filter((id) => id !== action.payload.id);
        },
    },
});


export const listActions = listSlice.actions;

export default listSlice.reducer;

export interface ListState {
    list: {
        favoriteMovies: number[];
        favoriteTvShows: number[];
        toWatchMovies: number[];
        toWatchTvShows: number[];
    };
}
