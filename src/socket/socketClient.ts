import io, { Socket } from 'socket.io-client';
import { store } from '../store/store';
import { socketConnect, socketDisconnect,IMessage, addMessage, IAddMessage, updateChatInfo } from '../store/reducers/messageReducer';
import UUIDGenerator from 'react-native-uuid';

interface INewMessage{
    chat_id:number;
    message_content:string;
    message_id:number;
    sender_id:number;
}

 class SocketClient{
    socket!: Socket;
     createSocketConnection(){
        const token = store.getState().user.accessToken?.split(" ")[1];
        const socket=io("ws://193.164.150.223:1025?token="+token)
        console.log("Stoken="+token);
        
        this.socket=socket;
        this.socket.on('connect',()=>{
            console.log('Успешно подключено к соксету');
            store.dispatch(socketConnect())
            this.createSocketEvents();
        })
        this.socket.onAny((event,data)=>{
            //console.log(event);
            
        })
        this.socket.on("completer",(data)=>{
            //console.log(data);
            
        })
        this.socket.on("new_message",(data:INewMessage)=>{
            
            this.newMessage(data)
            
        })
    }

    createSocketEvents(){
        this.socket.on("disconnect",()=>{
            store.dispatch(socketDisconnect());
            return this.createSocketConnection();
            
           })
        this.socket.on("!!!",()=>{
            this.socket.emit;
        })   
    }

    sendMessage(chatId:number,msg:string,userId:number){
       
       const  message: IMessage={
        msg:msg,
        status:-1,
        userId:userId
       }
        const addMessageInfo:IAddMessage={
            chatId:chatId,
            message:message,
            uuid: UUIDGenerator.v4().toString(),
            id:-1,
        }
      

        const eventData={
            "sender_id":userId,
            "chat_id":chatId,
            "message":msg,
            "external_message_id":addMessageInfo.uuid
        }
        //console.log(eventData);

        store.dispatch(addMessage(addMessageInfo))
        if(store.getState().message.chatInfo[chatId]==null){
            store.dispatch(updateChatInfo(chatId))
        }
       this.socket.emit("send_message",eventData)
    }

    newMessage(newMessage:INewMessage){

        const  message: IMessage={
            msg:newMessage.message_content,
            status:1,
            userId:newMessage.sender_id
           }

        const addMessageInfo:IAddMessage={
            chatId:newMessage.chat_id,
            message:message,
            uuid: UUIDGenerator.v4().toString(),
            id:newMessage.message_id,
            
        }
        store.dispatch(addMessage(addMessageInfo))
        if(store.getState().message.chatInfo[newMessage.chat_id]==null){
            store.dispatch(updateChatInfo(newMessage.chat_id))
        }
    }

    
}
export const socketClient=new SocketClient()
