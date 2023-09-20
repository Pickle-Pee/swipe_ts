import { IChatInfo } from "../../store/reducers/messageReducer";
import { IError } from "../errors/models";
import { ReturnedData } from "../matches/httpMatches";
import { axiosChat } from "./axiosInstance";



export class ChatHttp{

   async createChat(userId:number):Promise<number>{
    try {

       const requestData={
        "user_id":userId
       }

       const response=await axiosChat.post(
            "/communication/create_chat",
            requestData
        )

            return response.data["chat_id"] as number;

    } catch (error) {
        const typedError = error as IError;

        console.log("likedUsers error");
        console.log(error);
            const returnedData : ReturnedData={
            code: typedError.data.code??-1,
            message:typedError.data.message
           }
           return -1;
    }

    }

    async getChatInfo(chatId:number):Promise<IChatInfo | null>{
        
        try {
            const response=await axiosChat.get<IChatInfo>(
                `/communication/${chatId}`
            )
            console.log("ChatINFo");
           console.log(response.data);
            return response.data;
        } catch (error) {
            const typedError = error as IError;

            console.log("chatInfo error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
               return null;
        }
    }
    async getChats():Promise<Array<IChats>|null>{
        try {
            const response=await axiosChat.get<Array<IChatsNoCast>>(
                `/communication/get_chats`
            )
            console.log(response.data);
            
            
            const chat: Array<IChats> = response.data.map(element=>{
                    return ({
                        chatId:element.chat_id,
                        chatInfo:{
                            statusMessage:element.last_message_status,
                            userId:element.last_message_sender_id,
                            age:20,
                            avatar_url:element.user.avatar_url,
                            countUnread:element.unread_count,
                            first_name:element.user.first_name,
                            lastMessage:element.last_message,
                            status:"online"
                        },

                    })
            }) 
            return chat
        } catch (error) {
            const typedError = error as IError;

            console.log("getchats error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
               return null;
        }
    }
}
    interface IUserInChats{
        userId:number;
        first_name:string;
        avatar_url:string;
        status:string
        
    }
 interface IChatsNoCast{
    user:IUserInChats;
    chat_id:number;
    last_message:string;
    unread_count:number;
    last_message_status:number;
    last_message_sender_id:number;

}

export interface IChats{
    chatId:number;
    chatInfo:IChatInfo
}