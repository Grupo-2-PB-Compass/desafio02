import {createSlice} from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        accountId: null,
        sessionId: null,
        isLoggedIn: false,
        isGuest: null,
    },
    reducers: {
        login: (state, action) => {
            state.accountId = action.payload.account_id;
            state.sessionId = action.payload.session_id;
            state.isGuest = action.payload.is_guest;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.accountId = null;
            state.sessionId = null;
            state.isGuest = null;
            state.isLoggedIn = false;
        },
    }
});

export const sessionActions = sessionSlice.actions;

export default sessionSlice.reducer;

export interface SessionState {
    session: {
        accountId: string;
        sessionId: string;
        isLoggedIn: boolean;
        isGuest: boolean;
    };
}
