import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatHttp, IChats } from "../../http/chat/httpChats";
import { store } from "../store";
import { ICompleterMessage, IFullRead, IOnGetMessage } from "../../socket/socketClient";
import Sound from 'react-native-sound';
import UUIDGenerator from 'react-native-uuid';
import fsvoice from "../../fs/voise/fsvoice";
import fsimage from "../../fs/image/fsimage";
Sound.setCategory('Playback');

export enum ETypeMessage{
    text="text",
    voice="voice",
    image="image"
}

export interface IMessage{
    msg:string;
    status:number;
    userId:number;
    uuid:string;
    id:number;
    type:ETypeMessage.text;
}
export interface IVoiceMessage{
    path:string;
    status:number;
    userId:number;
    uuid:string;
    id:number;
    type:ETypeMessage.voice;
    metric:number[];
}
export interface IPatchComplete{
    path:string;
    complete:boolean;
}
export interface IImageMessage{
    paths:IPatchComplete[];
    status:number;
    userId:number;
    uuid:string;
    id:number;
    type:ETypeMessage.image
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
    [chatId: number]: (IMessage|IVoiceMessage|IImageMessage)[]
  };
  type ChatInfo = {
    [chatId: number]: IChatInfo|null;
  };

export enum EDateInfoStatus{
    accepted="accepted",
    declined="declined",
    pending="pending"
}

 export  interface DateInfo{
    sender_id: number;
    status: EDateInfoStatus;
    chat_id:number;

  }

interface SocketState{
    listMessage:ChatData;
    connection:boolean;
    chatInfo:ChatInfo;
    dateInfo: DateInfo[]
}

const initialState:SocketState={
    listMessage:{},
    connection:false,
    chatInfo:{},
    dateInfo:[]
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
            // const wash=new Sound("send.mp3",Sound.MAIN_BUNDLE,(err)=>{
            //     if(err!=null){
            //      console.log('failed to load the sound', err);
            //     }
            //     wash.setVolume(0.3);
            //     wash.play((success) => {
            //      if (success) {
            //        console.log('successfully finished playing');
            //      } else {
            //        console.log('playback failed due to audio decoding errors');
            //      }
            //    });
            // });
        }
        
         state.listMessage[action.payload.chatId].unshift(action.payload.message)

         const lastMessage=
         action.payload.message.type=="text"
             ?action.payload.message.msg
             :action.payload.message.type=="image"
                 ?"Фото":"Голосовое сообщение"

            if(!state.chatInfo[action.payload.chatId]){

                const lastMessage=
                    action.payload.message.type=="text"
                        ?action.payload.message.msg
                        :action.payload.message.type=="image"
                            ?"Фото":"Голосовое сообщение"

                state.chatInfo[action.payload.chatId]={
                    lastMessage,
                    countUnread:1,
                    statusMessage:-1,
                    userId:action.payload.message.userId
                }
                
            }else{
                state.chatInfo[action.payload.chatId]!.lastMessage=lastMessage,
                state.chatInfo[action.payload.chatId]!.statusMessage=-1
                state.chatInfo[action.payload.chatId]!.userId=action.payload.message.userId
                state.chatInfo[action.payload.chatId]!.countUnread!+=1
            }
        
       },
       completerMessage(state,action:PayloadAction<ICompleterMessage>){
            const chatId:number=action.payload.chat_id;
            const uuid:string=action.payload.external_message_id;     

            
                const element:IMessage|IImageMessage|IVoiceMessage|undefined= state.listMessage[chatId].find(el=>el.uuid==uuid);
                if(element){
                    element.status=action.payload.status
                    element.id=action.payload.id
               }
               
            //    const wash=new Sound("sent.mp3",Sound.MAIN_BUNDLE,(err)=>{
            //        if(err!=null){
            //         console.log('failed to load the sound', err);
            //        }
            //        wash.setVolume(1);
            //        wash.setPan(1);

            //        wash.play((success) => {
            //         if (success) {
            //           console.log('successfully finished playing');
            //         } else {
            //           console.log('playback failed due to audio decoding errors');
            //         }
            //       });
            //    });
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
            const arr:Array<IMessage|IVoiceMessage|IImageMessage>=[];
           action.payload.messages.forEach(element=>{
            
                if(element.message_type==ETypeMessage.text){
                    const textMessage:IMessage={
                        id:element.message_id,
                        msg:element.message!,
                        status:element.status,
                        userId:element.sender_id,
                        uuid:UUIDGenerator.v4().toString(),
                        type:ETypeMessage.text
                    };
                    arr.unshift(textMessage);
                }
                if(element.message_type==ETypeMessage.voice){
                    const voiceMessage:IVoiceMessage={
                        id:element.message_id,
                        status:element.status,
                        type:ETypeMessage.voice,
                        uuid:UUIDGenerator.v4().toString(),
                        userId:element.sender_id,
                        path:element.media_urls![0],
                        metric:[]
                    }
                    arr.unshift(voiceMessage);
                }
                if(element.message_type==ETypeMessage.image){
                    const paths:IPatchComplete[]=element.media_urls!.map(el=>({complete:false,path:el}));
                    const imageMessage:IImageMessage={
                        id:element.message_id,
                        status:element.status,
                        type:ETypeMessage.image,
                        uuid:UUIDGenerator.v4().toString(),
                        userId:element.sender_id,
                        paths:paths
                    }
                    arr.unshift(imageMessage);
              }
            });
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
       updateStatusImage(state,action:PayloadAction<IUpdateStatusImage>){
            state.listMessage[action.payload.chatId]
            let isUpdate=false;
            for( let chatItem of state.listMessage[action.payload.chatId]){
                    if(chatItem.type=="image"){
                        chatItem.paths.forEach((element)=>{
                            if(element.path==action.payload.path){
                                element.complete=true;
                                isUpdate=true;
                               return;
                            }
                        })
                    }
                    if(isUpdate) break;
            }
       },
       deleteMessage(state,action:PayloadAction<{chat_id:number,message_id:number}>){
           const list= state.listMessage[action.payload.chat_id];
           for (let i=0;i<list.length;i++){
             if(list[i].id==action.payload.message_id){
                console.log("find message!!");
                console.log(i+"_index");
                const currentMessage=list[i];
                const next=list[i+1];
                if(!next){
                    state.chatInfo[action.payload.chat_id]!.lastMessage="";
                }else{
                    switch(next.type){
                        case ETypeMessage.text:
                            state.chatInfo[action.payload.chat_id]!.lastMessage=next.msg;
                            break;
                        case ETypeMessage.voice:
                            state.chatInfo[action.payload.chat_id]!.lastMessage="Голосовое сообщение";
                            break;
                        case ETypeMessage.image:
                            state.chatInfo[action.payload.chat_id]!.lastMessage="Картинка";
                            break;
                                    
                    } 
                }
                    
                    
              
                
                if( currentMessage.type==ETypeMessage.image){
                    console.log("this image");
                    
                    currentMessage.paths.forEach(el=>{
                        fsimage.deleteImage(el.path)
                    })
                    
                }else if(currentMessage.type==ETypeMessage.voice){
                    fsvoice.deleteVoice(currentMessage.path)
                }
                break;
             }
           }
           
           
           state.listMessage[action.payload.chat_id]=state.listMessage[action.payload.chat_id].filter(el=>el.id!=action.payload.message_id)
       },
       addDateInfo(state,action:PayloadAction<DateInfo>){
        state.dateInfo.push(action.payload)
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
    updateStatusImage,
    deleteMessage,
    addDateInfo,
    RESET_MESSAGE_REDUCER
    }=messageSlice.actions;
export default messageSlice.reducer;

export interface IAddMessage{
    chatId:number;
    message:IMessage|IVoiceMessage|IImageMessage;
    
}

export interface IUpdateStatusImage{
    chatId:number,
    path:string;
}