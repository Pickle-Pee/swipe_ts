import axios from "axios";
import { UNHUNDLED_EXEPTION } from "../errors/listError";
import { IError } from "../errors/models";
import { axiosUser, responseTokenInterceptorError } from "./axiosInstance"
import { ISendCode, ISendCodeResponse } from "./models"
import { errorLoger } from "../errors/helpers";
import { IUserTempData } from "../../store/reducers/tempUserDataReducer";
import { store } from "../../store/store";
import { updateUserToken } from "../../store/reducers/userReducer";
import tokenStorage from "../../localStorage/tokenStorage";


interface ITokensResponse{
    access_token:string;
    refresh_token:string;
}

export class UserHttp{

    checkPhoneNumber=async(phone:string) : Promise<ISendCode|null>=>{

        try {
             //TODO: изменить с query на data
         const requestData={
            "phone_number":phone
        }

       const response = await axiosUser.post<ISendCodeResponse>(
           `/api/send-code?phone_number=${phone}`,
           {},
           {
            headers:{
                "type":"register"
            }
        }
       );
       const returnedData : ISendCode={
           verificationCode : response.data.verification_code
       }
       console.log("code "+returnedData.verificationCode);
       
       return returnedData;
        } catch (error) {
            console.log(error);
           return null;
        }

    }

    checkCode = async(phone:string,code:string) : Promise<number>=>{
        try {
                     //TODO: изменить с query на data
         const requestData={
            "phone_number":phone
        }

        const response = await axiosUser.post<ISendCodeResponse>(
            `/api/check-code?phone_number=${phone}&verification_code=${code}`,
            {},
            {
                headers:{
                    "type":"register"
                }
            }
        );
        console.log(response.data);
        
        return 0;

        } catch (error) {
            console.log(error);
            
            
            return -1;
        }
    }

    registration = async (userData:IUserTempData)=>{
        try {        

            const requestData={
            "phone_number":userData.phoneNumber,
            "first_name":userData.firstName,
            "last_name": userData.lastName,
            "date_of_birth": userData.dateOfBirth,
            "gender": userData.gender
        }

        const response = await axiosUser.post<ITokensResponse>(
            `/api/register`,
            
                requestData,
                
            
            {
                data:{
                    customData: 'some value to keep',
                }
            }
            
            
        );  
            console.log(response.data);
            
            
            store.dispatch(updateUserToken({token:response.data?.access_token??""}))
            await tokenStorage.saveRefreshToken(response.data?.refresh_token??"");
            return 0;
        } catch (error) {
            console.log("register error");
            console.log(error);
            
            return -1;
        }
    }
            


        
}