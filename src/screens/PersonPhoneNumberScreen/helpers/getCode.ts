import { ReturnedData, UserHttp } from "../../../http/user/httpUser";
import { ISendCode } from "../../../http/user/models";

export const getCode = async (phoneNumber:string) : Promise<number> => {
        
    const status : ReturnedData = await new UserHttp().sendCode(phoneNumber);
    return status.code
};