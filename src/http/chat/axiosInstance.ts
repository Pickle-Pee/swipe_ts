import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "../../store/store";
import { IError } from "../errors/models";
import httpToken from "../token/httpToken";
import tokenStorage from "../../localStorage/tokenStorage";

const BASE_URL="http://193.164.150.223:1024";

export const axiosChat= axios.create({
    baseURL: BASE_URL,
    headers: {
      'accept': 'application/json',
    },
  });

  //interceptor request
  const requestTokenInterceptor = (config:InternalAxiosRequestConfig) => {
    const token=store.getState().user.accessToken;
    config.headers.Authorization = `${token}`;
    return config;
  };

  axiosChat.interceptors.request.use(
    requestTokenInterceptor,
      error => {
        return Promise.reject(error);
      }
  )

    

 //interceptor response

  
  export const responseTokenInterceptorError = (error:AxiosError) : Promise<IError> => {
   console.log(error.response?.status);
    
    const typedError : IError ={
        data: error.response?.data,
        code:-1,
        statusCode:error.response?.status??10,
        message:error.message,
        type:error.config?.data

    }
   return Promise.reject(typedError);
  };   


  axiosChat.interceptors.response.use(
    (response)=>{

      return response;
    },
    responseTokenInterceptorError,
)

axiosChat.interceptors.response.use(

  (r)=>r,
  async(error:AxiosError)=>{

    const originalRequest = error.config;
    if(error.response?.status==401){
      await httpToken.refreshToken()
      axiosChat(originalRequest!);
    }
  }
  )


