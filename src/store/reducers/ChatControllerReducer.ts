import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IImageMessage, IMessage, IVoiceMessage } from "./messageReducer";
import { vibrateShort } from "../../nativeIOS/vibration";

interface IChatControllerState{

  reply:IMessage|IVoiceMessage|IImageMessage|null;
  recorded:boolean;
  deleted:boolean;
}

type PType=IMessage|IVoiceMessage|IImageMessage|null


const initialState:IChatControllerState={
  reply:null,
  recorded:false,
  deleted:false,
}

const chatControllerSlice=createSlice({
    name:"chatControllerSlice",
    initialState,
    reducers:{
        updateReply(state,action: PayloadAction<PType>){
          console.log(action.payload+"REPLYYYYYA");
          
          state.reply=action.payload;
        },
        updateRecorded(state,action:PayloadAction<boolean>){
          state.recorded=action.payload;
        },
        updateDeleted(state,action:PayloadAction<boolean>){
         
          state.deleted=action.payload;
        },
        RESET_CHATCONTROLLER_REDUCER(state){
          state=initialState;
         }
    },
  }

)
export const {updateReply,updateRecorded,updateDeleted,RESET_CHATCONTROLLER_REDUCER}=chatControllerSlice.actions;
export default chatControllerSlice.reducer;