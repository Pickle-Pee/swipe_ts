import AsyncStorage from "@react-native-async-storage/async-storage"
import {  axiosToken, responseTokenInterceptorError } from "./axiosInstance"
import { IRefresh, IRefreshResponse } from "./models";
import { store } from "../../store/store";
import { updateUserToken } from "../../store/reducers/userReducer";
import axios, { AxiosRequestConfig } from "axios";
import { IError } from "../errors/models";
import { UNHUNDLED_EXEPTION } from "../errors/listError";
import { errorLoger } from "../errors/helpers";




class TokenHttp{

    refreshToken=async():Promise<number>=>{

      try {
          //TODO: изменить с query на data
          const token:string|null =await AsyncStorage.getItem("refresh_token");
          const requestData={
              "refresh_token":token??""
          }
          
          const response =await axiosToken.post<IRefreshResponse>(
              `/refresh-token?refresh_token=${token??""}`,
              {
                "type":"refresh"
              },
              
          )
          const retyrnedData:IRefresh={
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
          }
          AsyncStorage.setItem("refresh_token",retyrnedData.refreshToken)
          store.dispatch(updateUserToken({token:retyrnedData.accessToken}))
       
          console.log(retyrnedData);
          return  0; 
      } catch (error) {

        let typedError: IError;
        if (axios.isAxiosError(error)) {
            typedError = responseTokenInterceptorError(error);
          }else{
            typedError=UNHUNDLED_EXEPTION;
          }
          errorLoger(typedError);
        return -1
      }   

    }
}

