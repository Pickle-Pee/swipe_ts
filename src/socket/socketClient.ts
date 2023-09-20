import io, { Socket } from 'socket.io-client';
import { store } from '../store/store';
import { socketConnect, socketDisconnect,IMessage, addMessage, IAddMessage, updateChatInfo, completerMessage, addFullMessage, setMessageAllRead } from '../store/reducers/messageReducer';
import UUIDGenerator from 'react-native-uuid';

interface INewMessage{
    chat_id:number;
    message_content:string;
    message_id:number;
    sender_id:number;
}
export interface ICompleterMessage{
    chat_id:number;
    external_message_id:string;
    id:number;
    sender_id:134;
    status:number;
}
export interface IFullRead{
    chat_id:number;
}
 interface IGetMessage{
    content:string;
    sender_id:number;
    status:number;
    message_id:number;
}
export interface IOnGetMessage{
    chatId:number;
    messages:Array<IGetMessage>
}

 class SocketClient{
    socket!: Socket;
     createSocketConnection(){
        const token = store.getState().user.accessToken?.split(" ")[1];
        const socket=io("ws://193.164.150.223:1025?token="+token,{
            reconnection: false, 
            
          })
        
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
        this.socket.on("completer",(data:ICompleterMessage)=>{
                console.log("completer");  
                console.log(data);
                store.dispatch(completerMessage(data))
            
        })

        this.socket.on("all_messages_read",(data:IFullRead)=>{
            console.log("aLLLREad");
            console.log(data);
            store.dispatch(setMessageAllRead(data.chat_id))
            
            
        })
        this.socket.on("disconnect",(data)=>{
            console.log("disconnect");
            
        })
        this.socket.on("new_message",(data:INewMessage)=>{
            
            this.newMessage(data)
            
        })
        this.socket.on("get_messages",(data:IOnGetMessage)=>{
            console.log(data);
          store.dispatch(addFullMessage(data))
            
        })
    }
    closeSession(){
        this.socket.disconnect()
        
    }
    createSocketEvents(){
        this.socket.on("disconnect",()=>{
            store.dispatch(socketDisconnect());
            //return this.createSocketConnection();
            
           })
        this.socket.on("!!!",()=>{
            this.socket.emit;
        })   
    }

    sendMessage(chatId:number,msg:string,userId:number){
       
       const  message: IMessage={
        msg:msg,
        status:-1,
        userId:userId,
        uuid: UUIDGenerator.v4().toString(),
        id:-1,
       }
        const addMessageInfo:IAddMessage={
            chatId:chatId,
            message:message,
            
        }
      

        const eventData={
            "sender_id":userId,
            "chat_id":chatId,
            "message":msg,
            "external_message_id":message.uuid
        }
        //console.log(eventData);

        store.dispatch(addMessage(addMessageInfo))
        if(store.getState().message.chatInfo[chatId]?.first_name==null){
            store.dispatch(updateChatInfo(chatId))
        }
       this.socket.emit("send_message",eventData)
    }

    newMessage(newMessage:INewMessage){

        const  message: IMessage={
            msg:newMessage.message_content,
            status:1,
            userId:newMessage.sender_id,
            id:newMessage.message_id,
            uuid:"new"
           }

        const addMessageInfo:IAddMessage={
            chatId:newMessage.chat_id,
            message:message,
            
        }
        store.dispatch(addMessage(addMessageInfo))
        if(store.getState().message.chatInfo[newMessage.chat_id]==null){
            store.dispatch(updateChatInfo(newMessage.chat_id))
        }
    }

    getMessagesInChat(chatId:number){
        console.log("senff");
        
        this.socket.emit("get_messages",{chat_id:chatId})
    }

    readingMessageInChat(chatId:number){
        console.log("read");
        
        this.socket.emit("all_messages_read",{chat_id:chatId})
    }

    
}
export const socketClient=new SocketClient()
