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
           // console.log(response.data);
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
            const response=await axiosChat.get<Array<IChats>>(
                `/communication/get_chats`
            )
            //console.log(response.data);
            return response.data
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

export interface IChats{
    chatId:number;
    user:IChatInfo;
}