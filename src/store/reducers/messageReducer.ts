import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatHttp, IChats } from "../../http/chat/httpChats";
import { store } from "../store";
import { ICompleterMessage, IFullRead, IOnGetMessage } from "../../socket/socketClient";
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

export interface IMessage{
    msg:string;
    status:number;
    userId:number;
    uuid:string;
    id:number;
}
export interface IChatInfo{
    first_name?:string;
    age?: number;
    avatar_url?: string;
    userId:number;
    status?: string;
    statusMessage:number;
    lastMessage:string;
    countUnread?:number;
  
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
        if(action.payload.message.id!=-1){
            const wash=new Sound("send.mp3",Sound.MAIN_BUNDLE,(err)=>{
                if(err!=null){
                 console.log('failed to load the sound', err);
                }
                wash.setVolume(0.3);
                wash.play((success) => {
                 if (success) {
                   console.log('successfully finished playing');
                 } else {
                   console.log('playback failed due to audio decoding errors');
                 }
               });
            });
        }
         state.listMessage[action.payload.chatId].unshift(action.payload.message)
            if(!state.chatInfo[action.payload.chatId]){
                state.chatInfo[action.payload.chatId]={
                    lastMessage:action.payload.message.msg,
                    countUnread:1,
                    statusMessage:-1,
                    userId:action.payload.message.userId
                }
                
            }else{
                state.chatInfo[action.payload.chatId]!.lastMessage=action.payload.message.msg
                state.chatInfo[action.payload.chatId]!.statusMessage=-1
                state.chatInfo[action.payload.chatId]!.userId=action.payload.message.userId
                state.chatInfo[action.payload.chatId]!.countUnread!+=1
            }
        
       },
       completerMessage(state,action:PayloadAction<ICompleterMessage>){
            const chatId:number=action.payload.chat_id;
            const uuid:string=action.payload.external_message_id;     

            
                const element:IMessage|undefined= state.listMessage[chatId].find(el=>el.uuid==uuid);
                if(element){
                    element.status=action.payload.status
                    element.id=action.payload.id
               }
               
               const wash=new Sound("sent.mp3",Sound.MAIN_BUNDLE,(err)=>{
                   if(err!=null){
                    console.log('failed to load the sound', err);
                   }
                   wash.setVolume(1);
                   wash.setPan(1);

                   wash.play((success) => {
                    if (success) {
                      console.log('successfully finished playing');
                    } else {
                      console.log('playback failed due to audio decoding errors');
                    }
                  });
               });
               state.chatInfo[chatId]!.statusMessage=1;

       },
       allRead(state,action:PayloadAction<IFullRead>){

       },
       addChats(state,action:PayloadAction<Array<IChats>>){
            action.payload.forEach(element => {
                
                state.chatInfo[element.chatId]=element.chatInfo
  
            });
       },
       addFullMessage(state,action:PayloadAction<IOnGetMessage>){
            const chatId:number=action.payload.chatId;
            const arr:Array<IMessage>=[];
           action.payload.messages.forEach(element=>{
            arr.unshift( {
                id:element.message_id,
                msg:element.content,
                status:element.status,
                userId:element.sender_id,
                uuid:"new"
            })
            })
            state.listMessage[chatId]=arr;
            
       },
       markReadAllMessage(state,action:PayloadAction<number>){
        if(state.chatInfo[action.payload])
            state.chatInfo[action.payload]!.countUnread=0;
       },
       setMessageAllRead(state,action:PayloadAction<number>){
        const chatId:number=action.payload;
            
            state.listMessage[chatId].forEach(element=>{
                
                element.status=2;
            })
            state.chatInfo[chatId]!.statusMessage=2;
       },
       RESET_MESSAGE_REDUCER(state){
        state=initialState;
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
export const 
    {socketConnect,
    setMessageAllRead,
    socketDisconnect,
    addMessage,
    addChats,
    completerMessage,
    allRead,
    addFullMessage,
    markReadAllMessage,
    RESET_MESSAGE_REDUCER
    }=messageSlice.actions;
export default messageSlice.reducer;

export interface IAddMessage{
    chatId:number;
    message:IMessage;
    
}