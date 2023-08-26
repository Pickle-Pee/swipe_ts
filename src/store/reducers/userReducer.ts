import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IUser{
    accessToken:string|null;

}

const initialState:IUser={
    accessToken:null,

}

const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        updateUserToken:(state,action:PayloadAction<{token:string}>)=>{
            state.accessToken=action.payload.token;
        }
    }
}
)

export const { updateUserToken } = userSlice.actions;
export default userSlice.reducer;