import { IError } from "./models";

export const errorLoger=(error:IError)=>{
    console.log("///////////////");
    console.log(error.message);
    console.log(error.type);
    console.log("///////////////");
}