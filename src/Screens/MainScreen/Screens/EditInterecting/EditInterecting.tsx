import React, { FC, useEffect, useState } from "react";
import { IInterest, UserMatches } from "../../../../http/matches/httpMatches";
import InterestingScreen from "../../../../UIComponents/Interesting/Interesting";

interface IEditInterecting{
    navigation:any;
    route:any
}

const EditInterecting:FC<IEditInterecting>=({navigation,route})=>{
    const list=(route?.params?.list as Array<IInterest>)
    const localNavigation=navigation.goBack
    const [listInteresting,setListInteresting]=useState<Array<IInterest>>([])
    
    const getMatches=async()=>{
    
        const listInterest : Array<IInterest> = await new UserMatches().listInterestingBase();
        if(listInterest.length!=0){
            setListInteresting([...listInteresting,...listInterest]);
         
        }
        
     }
    

    useEffect(()=>{
        getMatches();
    },[])
    return(
        <InterestingScreen listInteresting={listInteresting} initialList={list} navigation={localNavigation}/>
    )
}

export default EditInterecting