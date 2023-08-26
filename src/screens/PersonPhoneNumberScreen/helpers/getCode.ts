import { UserHttp } from "../../../http/user/httpUser";
import { ISendCode } from "../../../http/user/models";

export const getCode = async (phoneNumber:string) : Promise<number> => {
        
    const code : ISendCode|null = await new UserHttp().checkPhoneNumber(phoneNumber);
    if(code===null){
        return -1;
    }else{
        return 0;
    }
};