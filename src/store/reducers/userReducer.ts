import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInterest } from "../../http/matches/httpMatches";
import { IUserProfile } from "../../http/user/httpUser";



interface IUser{
    accessToken:string|null;
    userId:number;
    profile:IUserProfile|null
}

const initialState:IUser={
    accessToken:null,
    userId:-1,
    profile:null

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
        updateUserProfile(state,action:PayloadAction<IUserProfile>){
            state.profile=action.payload
        },
        RESET_USER_REDUCER(state){
            state=initialState;
           }
    }
}
)

export const { updateUserToken,setUserId,updateUserProfile,RESET_USER_REDUCER } = userSlice.actions;
export default userSlice.reducer;