import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatHttp, IChats } from "../../http/chat/httpChats";
import { store } from "../store";



export interface IMessage{
    msg:string;
    status:number;
    userId:number;
}
export interface IChatInfo{
    first_name:string;
    age: number;
    avatar_url: string;
    status: string;
  
}
type ChatData = {
    [chatId: number]: IMessage[];
  };
  type ChatInfo = {
    [chatId: number]: IChatInfo|null;
  };
interface SocketState{
    listMessage:ChatData;
    connection:boolean;
    chatInfo:ChatInfo
}

const initialState:SocketState={
    listMessage:{},
    connection:false,
    chatInfo:{}
}

interface IUpdateChatInfo{
    chatInfo:IChatInfo|null;
    chatId:number
}
export const updateChatInfo=createAsyncThunk<IUpdateChatInfo,number>(
    "messageSlice/updateLikes",
    async (chatId,_)=>{
        
       const  chatInfo :IChatInfo|null =await new ChatHttp().getChatInfo(chatId)
       if(chatInfo==null){
            return {chatId,chatInfo:null};
       }
       const chatInfoWithChatId:IUpdateChatInfo={chatInfo,chatId}
      return chatInfoWithChatId;
        
    }
  )


const messageSlice=createSlice({
    name:"messageSlice",
    initialState,
    reducers:{
       socketConnect(state){
        state.connection=true;
       },
       socketDisconnect(state){
        state.connection=false;
       },
        addMessage(state,action:PayloadAction<IAddMessage>){
        if( !state.listMessage[action.payload.chatId]){
            state.listMessage[action.payload.chatId]=[]
           
        }
        if(!state.chatInfo[action.payload.chatId]){
            state.chatInfo[action.payload.chatId]=null
        }
         state.listMessage[action.payload.chatId].unshift(action.payload.message)
       },
       addChats(state,action:PayloadAction<Array<IChats>>){
            action.payload.forEach(element => {
                state.chatInfo[element.chatId]=element.user
            });
       }


    },
    extraReducers:(builder)=>{
        builder
            .addCase(updateChatInfo.fulfilled,(state,action:PayloadAction<IUpdateChatInfo>)=>{
               if(action.payload.chatInfo==null){
                //store.dispatch(updateChatInfo(action.payload.chatId))
                return;
               }
               state.chatInfo[action.payload.chatId]=action.payload.chatInfo
            })
    }


}
)
export const {socketConnect,socketDisconnect,addMessage,addChats}=messageSlice.actions;
export default messageSlice.reducer;

export interface IAddMessage{
    chatId:number;
    message:IMessage;
    uuid:string;
    id:number;
}