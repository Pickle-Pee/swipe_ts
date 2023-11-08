import { IChatInfo } from "../../store/reducers/messageReducer";
import { IError } from "../errors/models";
import { ReturnedData } from "../matches/httpMatches";
import { axiosLoadFile } from "./axiosInstance";



export class LoadFileHttp{

    async downloadFile(path:string):Promise<number[]|null>{

      try {
        const imageBlob=await axiosLoadFile.get(
            "/service/get_file/"+path,
            { responseType: 'arraybuffer'}
         )
         const blob =  imageBlob.data;
         console.log(blob);
         
         return blob;
      } catch (error) {
        console.log("dowload image error");
        console.log(error);
        return null;
      }
    }

    async uploadImage(chatId:number,data:FormData):Promise<IUploadImage|number>{
        try {
            console.log(chatId);
            
            const response=await axiosLoadFile.post<IUploadImage>(
                `/service/upload/message_image/${chatId}`,
                data,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
        
            
            return response.data;
        } catch (error) {
            console.log("error upload image");
            console.log(error);
            return -2;
        }
    }

    async uploadVoice(chatId:number,data:FormData):Promise<IUploadImage|number>{
        try {
            console.log(chatId);
            
            const response=await axiosLoadFile.post<IUploadImage>(
                `/service/upload/message_voice/${chatId}`,
                data,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
        
            
            return response.data;
        } catch (error) {
            console.log("error upload voice");
            console.log(error);
            return -2;
        }
    }
    
}

export interface IUploadImage{
    file_key:string;
}