import AsyncStorage from "@react-native-async-storage/async-storage"
import {  axiosToken, responseTokenInterceptorError } from "./axiosInstance"
import { IRefresh, IRefreshResponse } from "./models";
import { store } from "../../store/store";
import { updateUserToken } from "../../store/reducers/userReducer";
import axios, { AxiosRequestConfig } from "axios";
import { IError } from "../errors/models";
import { UNHUNDLED_EXEPTION } from "../errors/listError";
import { errorLoger } from "../errors/helpers";
import { ReturnedData } from "../user/httpUser";




class TokenHttp{

    refreshToken=async():Promise<ReturnedData>=>{

      try {
          //TODO: изменить с query на data
          const token:string|null =await AsyncStorage.getItem("refresh_token");
          const requestData={
              "refresh_token":token??""
          }
          
          const response =await axiosToken.post<IRefreshResponse>(
              `/auth/refresh_token?refresh_token=${token??""}`,
              {
                "type":"refresh"
              },
              
          )
          const tokens:IRefresh={
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
          }
          AsyncStorage.setItem("refresh_token",tokens.refreshToken)
          store.dispatch(updateUserToken({token:tokens.accessToken}))
       
          console.log(tokens);
          const retyrnedData : ReturnedData={
            code:0,
            message:""
          }
          return  retyrnedData; 
      } catch (error) {

        const typedError = error as IError;
            console.log("refresh-token");
            console.log(typedError.message);
                const returnedData : ReturnedData={
                code: typedError.data?.code??-1,
                message:typedError.data?.message??typedError.message
               }
            return returnedData;
      }   

    }
}

export default new TokenHttp();