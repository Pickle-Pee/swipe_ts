import { useFocusEffect } from "@react-navigation/native";
import { updateLikes } from "../../../../../store/reducers/likesReducer";
import { IUserProfile } from "../../../../../http/user/httpUser";
import { useAppDispatch, useAppSelector } from "../../../../../store/typesHooks/typesHooks";

interface IReturnedUseLikes{
    likes:IUserProfile[];
    update:()=>void;
   
}


export const useLikes=():IReturnedUseLikes=>{
 
   const {likes,depricated}= useAppSelector(state=>state.like);
   const dispatch=useAppDispatch();
   
   const update=()=>{
   
        dispatch(updateLikes())
    
   }

   useFocusEffect(()=>{ 
    if(depricated){
        update();
    }
        
})


   return {likes,update}
}