import {configureStore} from "@reduxjs/toolkit";
import sessionReducer from "./session";
import listReducer from "./list";

const store = configureStore({
    reducer: {
        session: sessionReducer,
        list: listReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
