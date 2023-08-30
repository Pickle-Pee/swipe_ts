import { Center } from "native-base";
import { FC, useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { IInterest, ReturnedData, UserMatches } from "../../http/matches/httpMatches";
import InterestingScreen from "../InterestingSreen";

const MainLoader:FC=()=>{
    
    const [permissinPage,setPermissionPage]=useState<number>(-1);

    const [listInteresting,setListInteresting]=useState<Array<IInterest>>([])

    const getMatches=async()=>{
     const status: ReturnedData = await  new UserMatches().findMatches();
     if(status.code!=0){
        const listInterest : Array<IInterest> = await new UserMatches().listInterestingBase();
        if(listInterest.length!=0){
            setListInteresting(listInterest);
            setPermissionPage(1);
        }
        
     }
    }

    useEffect(()=>{
        getMatches();
    },[])

    return(
        <SafeAreaView>
            {permissinPage==-1&&
                <Center>
                <Text>Loading</Text>
            </Center>
            }
            {permissinPage==1&&
                <InterestingScreen listInteresting={listInteresting}/>
            }
        </SafeAreaView>
    )
}

export default MainLoader;