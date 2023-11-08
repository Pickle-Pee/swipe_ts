import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  UserMatches } from "../../http/matches/httpMatches";
import { IUserProfile } from "../../http/user/httpUser";


  interface ILikes{
   likes:Array<IUserProfile>,
   depricated:boolean
}

const initialState:ILikes={
    likes:[],
    depricated:true

}


  export const updateLikes=createAsyncThunk<IUserProfile[]>(
    "likesSlice/updateLikes",
    async (_,thunkAPI)=>{
       const  data :Array<IUserProfile>=await new UserMatches().likedUsers();
        return data;
    }
  ) 




const likesSlice=createSlice({
    name:"likesSlice",
    initialState,
    reducers:{
        updateDepricated(state,action: PayloadAction<boolean>){
          state.depricated=action.payload;
        },
        RESET_LIKE_REDUCER(state){
          state=initialState;
         }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(updateLikes.fulfilled,(state,action:PayloadAction<Array<IUserProfile>>)=>{
                state.likes=action.payload;
                state.depricated=false;
            })
    }
}
)
export const {updateDepricated,RESET_LIKE_REDUCER}=likesSlice.actions;
export default likesSlice.reducer;