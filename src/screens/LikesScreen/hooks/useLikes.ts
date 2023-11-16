import { useFocusEffect } from "@react-navigation/native";
import { updateLikes } from "../../../store/reducers/likesReducer";
import { useAppDispatch, useAppSelector } from "../../../store/typesHooks"
import { useState } from "react";
import { IUser } from "../../../http/user/httpUser";

interface IReturnedUseLikes{
    likes:IUser[];
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