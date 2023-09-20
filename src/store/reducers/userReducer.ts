import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IUser{
    accessToken:string|null;
    userId:number;
}

const initialState:IUser={
    accessToken:null,
    userId:-1

}

const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        updateUserToken:(state,action:PayloadAction<{token:string}>)=>{
            state.accessToken=action.payload.token;
        },
        setUserId(state,action:PayloadAction<number>){
            state.userId=action.payload
        },
        RESET_USER_REDUCER(state){
            state=initialState;
           }
    }
}
)

export const { updateUserToken,setUserId,RESET_USER_REDUCER } = userSlice.actions;
export default userSlice.reducer;