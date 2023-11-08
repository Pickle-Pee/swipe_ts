import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import tempUserDataReducer from "./reducers/tempUserDataReducer";
import likesReducer from "./reducers/likesReducer";
import messageReducer from "./reducers/messageReducer";
import ChatControllerReducer from "./reducers/ChatControllerReducer";

const rootReducer=combineReducers({
    user:userReducer,
    tempUser:tempUserDataReducer,
    like:likesReducer,
    message:messageReducer,
    chatController:ChatControllerReducer
})

export const store=configureStore({
    reducer:rootReducer
})

    

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch