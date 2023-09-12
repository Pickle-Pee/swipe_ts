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
}
