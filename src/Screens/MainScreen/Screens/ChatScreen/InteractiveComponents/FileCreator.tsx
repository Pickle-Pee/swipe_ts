import { FC } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import dispatcherMessages from "../helpers/dispatcherMessages";
import SvgScrepka from "../svg/Screpka";
interface IFileCreator{
    chatId:number;
    userId:number;
}
const FileCreator:FC<IFileCreator>=({chatId,userId})=>{
    const {width}=useWindowDimensions()

    const goToFile=async()=>{
        const images = await launchImageLibrary({
            mediaType:"photo",
            selectionLimit:5
           });
           const assets :Asset[]|undefined=images.assets;
          dispatcherMessages.addImageMessage(assets,chatId,userId); 
    }
    return(
        <Pressable onPress={goToFile} style={{width:width*0.14,height:75,justifyContent:'center',alignItems:'flex-end',paddingRight:12}}>
            <SvgScrepka/>
         </Pressable>
    )
}

export default FileCreator;