import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "../../store/store";
import { IError } from "../errors/models";

const BASE_URL="http://193.164.150.223:1024";

export const axiosUser= axios.create({
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

  axiosUser.interceptors.request.use(
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


  axiosUser.interceptors.response.use(
    (response)=>{

      
      return response;
    },
    responseTokenInterceptorError,
)


