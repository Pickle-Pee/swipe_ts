import { Asset, launchImageLibrary } from "react-native-image-picker";
import UUIDGenerator from 'react-native-uuid';
import { store } from "../../../../../store/store";
import { IUploadImage, LoadFileHttp } from "../../../../../http/loadFile/httpLoadFile";
import { socketClient } from "../../../../../socket/socketClient";
import fsvoice from "../../../../../fs/voise/fsvoice";
import { ETypeMessage, IAddMessage, IImageMessage, IMessage, IPatchComplete, IUpdateStatusImage, IVoiceMessage, addMessage, updateChatInfo, updateStatusImage } from "../../../../../store/reducers/messageReducer";
class DispatcherFileMessage{

    //static FileVariable;

    addTextMessage(chatId:number,msg:string,userId:number){

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
            const eventData={
                "sender_id":userId,
                "chat_id":chatId,
                "message_content":msg,
                "external_message_id":message.uuid
            }
            //console.log(eventData);
    
            store.dispatch(addMessage(addMessageInfo))
            this.correctionChatInformation(chatId);
            this.sendSocketMessage(addMessageInfo);
    }
    async addVoiceMessage(chatId:number,userId:number,path:string,pathFull:string){
        

        const newVoiceMessage:IVoiceMessage={
            path,
            id:-1,
            uuid: UUIDGenerator.v4().toString(),
            status:-1,
            type:ETypeMessage.voice,
            userId
        }
    
        const messageToStore:IAddMessage={
            chatId,
            message:newVoiceMessage
        }
        store.dispatch(addMessage(messageToStore));
        this.correctionChatInformation(chatId);

        const formData = new FormData();
    
        
            formData.append(
                "file",{
                    uri:pathFull,
                    type:"audio/m4.a",
                    name:path
                }
            );

           // console.log("загрузка звука");
            
            let isCompleted:number=0;
            let error:number=0;

        this.uploadVoice(chatId,formData).then(value=>{
          //  console.log("compl_"+value);
            
            if(value==-2){
                error+=1;
            }else{
                isCompleted+=1;
            }
            if(isCompleted==1){
             //   console.log("COMPLETED VOICE"+isCompleted);
                
                this.sendSocketMessage(messageToStore,[path])
            }
        })
    }

    async addImageMessage(assets:Asset[]|undefined,chatId:number,userId:number):Promise<number>{

      //  console.log(assets);
        if(!assets){
            return -1;
        }
        let paths:IPatchComplete[]=[];
        assets.map(el=>{
           // console.log(el);
            
            paths.push({
                path:el.uri!,
                complete:false
            });
           

        });
        
        const newImageMessage:IImageMessage={
            paths,
            id:-1,
            uuid: UUIDGenerator.v4().toString(),
            status:-1,
            type:ETypeMessage.image,
            userId
        }   
    
        const messageToStore:IAddMessage={
            chatId,
            message:newImageMessage
        }

        store.dispatch(addMessage(messageToStore));
        this.correctionChatInformation(chatId);
        let isCompleted:number=0;
        let error=0;
        let socketPath:string[]=[];
        assets.map(el=>{
            const formData = new FormData();
            formData.append(
                "file",{
                    uri:el.uri,
                    type:el.type,
                    name:"hui"
                    // name:el.type?.split("/")[1]
                }
            );

            this.uploadImage(chatId,formData,el.uri!).then((status)=>{
              //  console.log("COMPLETE");
                
                if(status==-2){
                    error+=1;
                }else{
                    isCompleted+=1;
                   // console.log("COMPLETE"+isCompleted);
                    const key =status as string;
                    socketPath.push(key);
                }
                if(isCompleted==assets.length){
                    this.sendSocketMessage(messageToStore,socketPath)
                }
            });

        });

       return 0;
    }

    async uploadImage(chatId:number,formData:FormData,path:string):Promise<number|string>{

        const keyFile:number|IUploadImage =await  new LoadFileHttp().uploadImage(chatId,formData);
        if(keyFile == -2){
            return -2;
        }
        const key= keyFile as IUploadImage;
        const updatestatusImage:IUpdateStatusImage={
            chatId,
            path
        }
        store.dispatch(updateStatusImage(updatestatusImage))
      
        
     return key.file_key;
    }
    async uploadVoice(chatId:number,formData:FormData):Promise<number>{

        const keyFile:number|IUploadImage =await  new LoadFileHttp().uploadVoice(chatId,formData);
        if(keyFile == -2){
            return -2;
        }
        // const updatestatusImage:IUpdateStatusImage={
        //     chatId,
        //     path
        // }
      // store.dispatch(updateStatusImage(updatestatusImage))
      
        
     return 0;
    }

    sendSocketMessage(message:IAddMessage,pathsImages?:string[]){
        const typeMessage:string=message.message.type;
        //console.log(typeMessage);
        
        if(typeMessage==ETypeMessage.image){
            const current=message.message as IImageMessage;
            
            const sendMessage:ISendMessageINSocket={
                sender_id:current.userId,
                chat_id:message.chatId,
                message_type:current.type,
                external_message_id:current.uuid,
                media_urls:pathsImages
            }
            socketClient.testSendMessage(sendMessage);
            return;
        }
        if(typeMessage==ETypeMessage.text){
            const current=message.message as IMessage;
            const sendMessage:ISendMessageINSocket={
                sender_id:current.userId,
                chat_id:message.chatId,
                message_type:current.type,
                external_message_id:current.uuid,
                message:current.msg
            }
            socketClient.testSendMessage(sendMessage);
            return;
        }
        if(typeMessage==ETypeMessage.voice){
            const current=message.message as IVoiceMessage;
            const sendMessage:ISendMessageINSocket={
                sender_id:current.userId,
                chat_id:message.chatId,
                message_type:current.type,
                external_message_id:current.uuid,
                media_urls:pathsImages
            }
            socketClient.testSendMessage(sendMessage);
            return;
        }
    }

    correctionChatInformation(chatId:number){
        if(store.getState().message.chatInfo[chatId]?.first_name==null){
            store.dispatch(updateChatInfo(chatId))
        }
    }

    ////download
    async checkVoice(path:string){
       return await fsvoice.checkVoiceInDirectory(path);
    }
}

export interface ISendMessageINSocket {
    sender_id: number;
    chat_id: number;
    message_type: ETypeMessage;
    external_message_id: string;
    media_urls?: string[];
    message?:string;
}

export default new DispatcherFileMessage()

/*
статусы
-1 нет пути или файл поврежден
-2 не удалось загрузить файл
*/ 
