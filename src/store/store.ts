import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import tempUserDataReducer from "./reducers/tempUserDataReducer";

const rootReducer=combineReducers({
    user:userReducer,
    tempUser:tempUserDataReducer
})

export const store=configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch