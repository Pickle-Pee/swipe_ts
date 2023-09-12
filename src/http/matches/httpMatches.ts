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
import { IUser } from "../user/httpUser";


interface IInterestResponse{
    user_id?:number;
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

export interface IUserMatch{
    user_id:number;
    match_percentage:number;
    last_name:string;
    first_name:string;
    date_of_birth:string;
    year:Date;
    avatar_url:string;
}

export interface IMatch{
    id: 0,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender: string,
    verify: boolean,
    is_subscription: boolean;
    year:Date;
}

export class UserMatches{

    findMatches=async() : Promise<Array<IUserMatch>>=>{

        try {
             //TODO: изменить с query на data
         const requestData={
           
        }

       const response = await axiosMatches.get<Array<IUserMatch>>(
           `/match/find_matches`,
       );
       const returnedData:Array<IUserMatch> = response.data.map(el=>({...el,year:new Date(Date.parse(el.date_of_birth)) }))
      
       
     
       
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("matches error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return [];
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

    addInteresting=async(interests:Array<number>) : Promise<ReturnedData>=>{

        try {
             //TODO: изменить с query на data
         const requestData={
           "interest_ids":interests
        }

       const response = await axiosMatches.post(
           `/interest/add_interests`,
           requestData
       );
       console.log(response.data);
       
       const returnedData : ReturnedData={
        code: 0,
        message:"succes"
       }
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("add interesting error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return returnedData;
        }

    }

    userInterest=async() : Promise<ReturnedData>=>{

        try {
          
      

       const response = await axiosMatches.get<IInterestResponse>(
           `/interest/user_interests`,
           
       );
       console.log(response.data);
       
       const returnedData : ReturnedData={
        code: 0,
        message:"succes"
       }
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("user interesting error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return returnedData;
        }

    }

    like=async(userId : number) : Promise<ReturnedData>=>{

        try {
       const response = await axiosMatches.post(
           `/likes/like/${userId}`,
       );
       console.log(response.data);
       
       const returnedData : ReturnedData={
        code: 0,
        message:"succes"
       }
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("like is error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return returnedData;
        }

    }

    dislike=async(userId : number) : Promise<ReturnedData>=>{

        try {
       const response = await axiosMatches.post(
           `/likes/dislike/${userId}`,
       );
       console.log(response.data);
       
       const returnedData : ReturnedData={
        code: 0,
        message:"succes"
       }
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("dislike is error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return returnedData;
        }

    }
    likedUsers=async() : Promise<Array<IUser>>=>{

        try {
       const response = await axiosMatches.get<Array<IUser>>(
           `/likes/liked_users`,
       );
      
       console.log(response.data);
       
       const returnedData = response.data.map<IUser>(el=>({...el,birth:new Date(Date.parse(el.date_of_birth))}))
        
        
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("likedUsers error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code??-1,
                message:typedError.data.message
               }
            return [];
        }

    }


}


