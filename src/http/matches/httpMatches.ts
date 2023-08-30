import axios from "axios";
import { UNHUNDLED_EXEPTION } from "../errors/listError";
import { IError } from "../errors/models";
import { axiosMatches, responseTokenInterceptorError } from "./axiosInstance"
import { ISendCode, ISendCodeResponse } from "./models"
import { errorLoger } from "../errors/helpers";
import { IUserTempData } from "../../store/reducers/tempUserDataReducer";
import { store } from "../../store/store";
import { updateUserToken } from "../../store/reducers/userReducer";
import tokenStorage from "../../localStorage/tokenStorage";


interface IInterestResponse{
    interests:Array<{interest_text:string;id:number;}>
}

export interface IInterest{
    interestText:string;
    id:number;
}


export interface ReturnedData{
    code:number;
    message:string;
}

export class UserMatches{

    findMatches=async() : Promise<ReturnedData>=>{

        try {
             //TODO: изменить с query на data
         const requestData={
           
        }

       const response = await axiosMatches.get<ISendCodeResponse>(
           `/match/find_matches`,
       );
       console.log(response.data);
       
       const returnedData : ReturnedData={
           code:0,
           message:""
       }
       
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("matches error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return returnedData;
        }
    }

    listInterestingBase=async() : Promise<Array<IInterest>>=>{

        try {
             //TODO: изменить с query на data
         const requestData={
           
        }

       const response = await axiosMatches.get<IInterestResponse>(
           `/interest/interests_list`,
       );
       console.log(response.data);
       
       const returnedData: Array<IInterest> = response.data.interests.map<IInterest>(el=>{
                  const interes: IInterest={interestText:el.interest_text.toLowerCase(),id:el.id}
                  return interes;
                })
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("base list interesting error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return [];
        }

    }

    
}


