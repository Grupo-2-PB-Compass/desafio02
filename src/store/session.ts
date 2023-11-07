import {createSlice} from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessionId: null,
        isLoggedIn: false,
        isGuest: null,
    },
    reducers: {
        login: (state, action) => {
            state.sessionId = action.payload.session_id;
            state.isGuest = action.payload.is_guest;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.sessionId = null;
            state.isGuest = null;
            state.isLoggedIn = false;
        },
    }
});

export const sessionActions = sessionSlice.actions;

export default sessionSlice.reducer;