import axios from "axios";
import { UNHUNDLED_EXEPTION } from "../errors/listError";
import { IError } from "../errors/models";
import { axiosUser, responseTokenInterceptorError } from "./axiosInstance"
import { ISendCode, ISendCodeResponse } from "./models"
import { errorLoger } from "../errors/helpers";
import { IUserTempData } from "../../store/reducers/tempUserDataReducer";
import { store } from "../../store/store";
import { EVerifyStatus, setUserGender, setUserId, setUserSubsription, updateUserToken } from "../../store/reducers/userReducer";
import tokenStorage from "../../localStorage/tokenStorage";


interface ITokensResponse{
    access_token:string;
    refresh_token:string;
}

export interface ReturnedData{
    code:number;
    message:string;
}

export interface IUserProfile{
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    birth:Date;
    gender: string;
    verify: boolean;
    is_subscription: boolean;
    city_id: string;
    city_name:string;
    is_favorite: boolean,
    about_me: string;
    status: string;
    avatar_url: string;
    score: number;
    interests: {interest_id: number, interest_text:string}[];
}

export interface IUserProfileUpdate{
    first_name: string;
    date_of_birth: string;
    gender: string;
    city_name:string;
    about_me: string;
}

export class UserHttp{

    sendCode=async(phone:string) : Promise<ReturnedData>=>{

        try {
             //TODO: изменить с query на data
         const requestData={
            "phone_number":phone
        }

       const response = await axiosUser.post<ISendCodeResponse>(
           `/auth/send_code?phone_number=${phone}`,
           {},
           {
            headers:{
                "type":"register"
            }
        }
       );
       console.log(response.data.verification_code);
       
       const returnedData : ReturnedData={
           code:0,
           message:""
       }
       
       
       return returnedData;
        } catch (error) {
            const typedError = error as IError;

            console.log("send-code-number");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code,
                message:typedError.data.message
               }
            return returnedData;
        }

    }

    checkCode = async(phone:string,code:string) : Promise<number>=>{
        try {
                     //TODO: изменить с query на data
         const requestData={
            "phone_number":phone
        }

        const response = await axiosUser.post<ISendCodeResponse>(
            `/auth/check_code?phone_number=${phone}&verification_code=${code}`,
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
            "gender": userData.gender,
            "city_name": "Москва"

        }

        const response = await axiosUser.post<ITokensResponse>(
            `/auth/register`,
            requestData,          
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

    async checkMobile(phoneNumber: string):Promise<ReturnedData>{
        try {
                //TODO изменить с query на data
            const requestData={
                "phone_number":phoneNumber,

            }
            const response = await axiosUser.post<ITokensResponse>(
                `/auth/check_phone?phone_number=${phoneNumber}`,
                        
            );  
                console.log(response.data);

               const returnedData : ReturnedData={
                code: 0,
                message:"succes"
               }
                return returnedData;
        } catch  (error ) {
            const typedError = error as IError;

            console.log("check-number");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code,
                message:typedError.data.detail
               }
            return returnedData;
        }
    }     
    

    login = async (phoneNumber:string,code:string):Promise<ReturnedData>=>{
        try {       
                //TODO query->data
            const requestData={
            "phone_number":phoneNumber,
            "code":code
        }

        const response = await axiosUser.post<ITokensResponse>(
            `/auth/login?phone_number=${phoneNumber}&code=${code}`,         
        );  
            console.log(response.data);
            
            
            store.dispatch(updateUserToken({token:response.data?.access_token??""}))
            await tokenStorage.saveRefreshToken(response.data?.refresh_token??"");
            const returnedData : ReturnedData={
                code:0,
                message:""
            }
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("login");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code,
                message:typedError.data.message
               }
            return returnedData;
        }
    }
    
    whoami = async ():Promise<ReturnedData>=>{
        try {       
            
        const response = await axiosUser.get<{id:number,is_subscribtion:boolean,gender:EGender}>(
            `/auth/whoami`,         
        );  
            console.log(response.data);
            console.log("whoami");
            
            
      
            const returnedData : ReturnedData={
                code:0,
                message:"",
            }
            store.dispatch(setUserId(response.data.id))
            store.dispatch(setUserSubsription(response.data.is_subscribtion))
            store.dispatch(setUserGender(response.data.gender))
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("whoami error");
            console.log(error);
                const returnedData : ReturnedData={
                code: typedError.data.code,
                message:typedError.data.message
               }
            return returnedData;
        }
    } 
    userInfo = async (userId:number):Promise<IUserProfile|null>=>{
        try {       
            
        const response = await axiosUser.get<IUserProfile>(
            `/user/${userId}`,         
        );  
           
            
            
            const returnedData=response.data;
            returnedData.birth=new Date(Date.parse(returnedData.date_of_birth))
            
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("userInfo error");
            console.log(error);
                
            return null;
        }
    } 

    meInfo = async ():Promise<IUserProfile|null>=>{
        try {       
            
        const response = await axiosUser.get<IUserProfile>(
            `/user/me`,         
        );  
           
            
            
            const returnedData=response.data;
            console.log(returnedData);
            
            returnedData.birth=new Date(Date.parse(returnedData.date_of_birth))
            
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("userInfo error");
            console.log(error);
                
            return null;
        }
    } 
    updateUser = async (profile:IUserProfileUpdate):Promise<number>=>{
        try {       
            
        const response = await axiosUser.put(
            `/user/update_user`,      
            profile 
        );  
           
            
            
            const returnedData=response.data;
            console.log(returnedData);
            
            return 0;
        } catch (error) {
            const typedError = error as IError;
            console.log("update user error");
            console.log(error);
                
            return -1;
        }
    } 
    uploadUserPhoto = async (photo:FormData,is_avatar:boolean):Promise<{file_key:string,id:number}|null>=>{
        try {       
            
        const response = await axiosUser.post<{file_key:string,id:number}>(
            `/service/upload/profile_photo?is_avatar=${is_avatar}`,      
            photo 
        );  
           
            
            
            const returnedData=response.data;
            console.log(returnedData);
            
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("update user error");
            console.log(error);
                
            return null;
        }
    } 
    getUserPhoto = async ():Promise<IUserPhotos[]>=>{
        try {       
            console.log("requestUserPhoto...");
            
        const response = await axiosUser.get<{photos:IUserPhotos[]}>(
            `/user/user/photos`,       
        );  
           
            const returnedData=response.data.photos;
            console.log("userPhoto:");
            
            console.log(returnedData);
            
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("update user error");
            console.log(error);
                
            return [];
        }
    } 
    setFCMToken = async (token:string):Promise<number>=>{
        try {       
            console.log("requestUserPhoto...");
            const requestData={
                token
            }
            
        const response = await axiosUser.post(
            `/user/add_token`,  
            requestData     
        );  
           
            const returnedData=response.data.photos;
            console.log("userPhoto:");
            
            console.log(returnedData);
            
            return 0;
        } catch (error) {
            const typedError = error as IError;
            console.log("set fcm error");
            console.log(error);
                
            return -1;
        }
    } 
    getCity = async (city:string):Promise<Array<string>>=>{
        try {           
        const response = await axiosUser.get<Array<string>>(
            `/service/cities?query=${city}`,  
                 
        );  
           
            const returnedData=response.data;
            console.log(returnedData);
            
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("set fcm error");
            console.log(error);
                
            return [];
        }
    } 
    checkVerify = async ():Promise<EVerifyStatus|null>=>{
        try {           
        const response = await axiosUser.get<{verify:EVerifyStatus}>(
            `/user/verify/check_verify`,  
                 
        );  
           
            const returnedData=response.data.verify;
            console.log("verify_status");
            console.log(returnedData);
            
            return returnedData;
        } catch (error) {
            const typedError = error as IError;
            console.log("verify status error");
            console.log(error);
                
            return null;
        }
    } 
    uploadUserVerify = async (data:FormData):Promise<number>=>{
        try {       
            
        const response = await axiosUser.post(
            `/auth/upload_verify_photos`,      
            data,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        );  
           
            
            
            const returnedData=response.data;
            console.log(returnedData);
            
            return 0;
        } catch (error) {
            const typedError = error as IError;
            console.log("verify error");
            console.log(error);
                
            return -1;
        }
    } 
}


export enum EGender{
    male="male",
    famale="famale",
    none="none"
}

export interface IUserPhotos{
    id: number;
    photo_url: string;
    is_avatar: boolean;
}