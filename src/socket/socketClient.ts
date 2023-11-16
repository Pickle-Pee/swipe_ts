import io, { Socket } from 'socket.io-client';
import { store } from '../store/store';
import { socketConnect, socketDisconnect,IMessage, addMessage, IAddMessage, updateChatInfo, completerMessage, addFullMessage, setMessageAllRead, ETypeMessage, IVoiceMessage, IImageMessage, IPatchComplete, deleteMessage, DateInfo, addDateInfo } from '../store/reducers/messageReducer';
import UUIDGenerator from 'react-native-uuid';
import { ISendMessageINSocket } from '../Screens/MainScreen/Screens/ChatScreen/helpers/dispatcherMessages';

interface INewMessage{
    message_type:ETypeMessage;
    message?:string;
    media_urls?:string[];
    sender_id:number;
    status:number;
    message_id:number;
    chat_id:number;
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
export interface IOnGetMessage{
    chatId:number;
    messages:Array< INewMessage>
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
            console.log(event,data);
            
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
        this.socket.on("update_verification_status",(data)=>{
            console.log(data);
            
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
        this.socket.on("delete_message",(data:{chat_id:number,message_id:number})=>{
            console.log("deleteEvent/////");
            
            store.dispatch(deleteMessage(data))
        })
        this.socket.on("date_invitation",(data:DateInfo&{action:string})=>{
            console.log("date_invitation");
            
            if(data.action=="invitation_sent"){
                store.dispatch(addDateInfo(data))
            }
            //if()
            
            
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
        type:ETypeMessage.text
       }
        const addMessageInfo:IAddMessage={
            chatId:chatId,
            message:message,
            
        }
      
        console.log("send"+msg);
        
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
    testSendMessage(message:ISendMessageINSocket){
        console.log(message);
        
        this.socket.emit("send_message",message)
    }
    newMessage(newMessage:INewMessage){
        console.log("new mess");
        
        console.log(newMessage);
        
        let message:IMessage|IVoiceMessage|IImageMessage;

        if(newMessage.message_type==ETypeMessage.text){
               const textMessage:IMessage={
                msg:newMessage.message!,
                status:newMessage.status,
                userId:newMessage.sender_id,
                id:newMessage.message_id,
                uuid:UUIDGenerator.v4().toString(),
                type:ETypeMessage.text
            }
           message=textMessage;
        }

        if(newMessage.message_type==ETypeMessage.voice){
            const voiceMessage:IVoiceMessage={
                id:newMessage.message_id,
                status:newMessage.status,
                type:ETypeMessage.voice,
                uuid:UUIDGenerator.v4().toString(),
                userId:newMessage.sender_id,
                path:newMessage.media_urls![0],
                metric:[]
            }
           message=voiceMessage;
      }

       if(newMessage.message_type==ETypeMessage.image){
            const paths:IPatchComplete[]=newMessage.media_urls!.map(el=>({complete:false,path:el}));
            const imageMessage:IImageMessage={
                id:newMessage.message_id,
                status:newMessage.status,
                type:ETypeMessage.image,
                uuid:UUIDGenerator.v4().toString(),
                userId:newMessage.sender_id,
                paths:paths
            }
           message=imageMessage;
      }
  
        
       
        const addMessageInfo:IAddMessage={
            chatId:newMessage.chat_id,
            message:message!,
            
        }
        store.dispatch(addMessage(addMessageInfo))
        if(store.getState().message.chatInfo[newMessage.chat_id]?.first_name==null){
            store.dispatch(updateChatInfo(newMessage.chat_id))
        }
        //корректируем пути сообщения
       // dispatcherMessages.correctionPathVoice(message!.id,newMessage.chat_id);
    }

    deleteMessage(messageId:number,deleteAllL:boolean,chatId:number){
        const eventData={
            message_id:messageId,
            delete_for_both:deleteAllL,
            chat_id:chatId
           
        }
        console.log("event_deleted");
        console.log(eventData);
        
        
        this.socket.emit("delete_message",eventData)
    }
    getMessagesInChat(chatId:number){
      //  console.log("senff");
        
        this.socket.emit("get_messages",{chat_id:chatId})
    }

    readingMessageInChat(chatId:number){
       // console.log("read");
        
        this.socket.emit("all_messages_read",{chat_id:chatId})
    }

    ////date
    sentInventationDate(chatId:number){
        this.socket.emit("send_date_invitation",{chat_id:chatId});
    }

    
}
export const socketClient=new SocketClient()
