import { FC, useState } from "react";
import { Alert, Image, Pressable, Text, View, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Asset, launchImageLibrary,launchCamera } from 'react-native-image-picker';
import GradientButton from "../../GradientButton/GradientButton";
interface IProfilePhoto{
    toPage:()=>void;
    setPhotoProfile:(value:Asset)=>void
}

const ProfilePhoto:FC<IProfilePhoto>=({toPage,setPhotoProfile})=>{
    const {width}=useWindowDimensions()

    const [path,setPath]=useState<Asset>({})

    const getPhoto=async()=>{
        const data=await launchImageLibrary({
            mediaType:"photo",
            selectionLimit:1
        })
        const uri=data.assets![0]
        if(uri){
            setPath(uri)
        }
       
    }

    const continuePage=()=>{
            if(!path.uri){
                Alert.alert("Выберите фото")
            }else{
                setPhotoProfile(path)
                toPage()
            }
    }

    return(
        <View style={{justifyContent:'space-between',flex:1,alignItems:'center'}}>
            <View style={{flex:1,marginBottom:40}}>
                <Text style={{marginTop:105, fontFamily:"SF Pro Display",fontWeight:"400",fontSize:24, color:"#1F2937"}}>Выберите фото профиля</Text>
               {path.uri
               ?    <Image source={{uri:path.uri}} style={{flex:1,marginTop:20}} resizeMode="contain"/>
               : <Pressable onPress={getPhoto} style={{flex:1,backgroundColor:'#f4f4f4',marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:15, color:"#1F2937"}}>Выбрать</Text>
                </Pressable>
            }
           
            </View>
            <View>
            {path.uri&&<Pressable onPress={getPhoto} style={{borderColor:"#f4f4f4",borderWidth:2,borderRadius:20,height:42,marginTop:0,marginHorizontal:53,width:width-106,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:15, color:"#1F2937"}}>Изменить</Text>
                    </Pressable>
                    }
                    <View style={{height:40,marginHorizontal:53,marginBottom:10,marginTop:10,width:width-106}}>
                        <GradientButton  onPress={continuePage} p={false}>
                            <View
                                style={{height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}
                            >
                                <Text style={{fontFamily:"SF Pro Display",fontSize:15,fontWeight:"400",color:"black"}}>Продолжить</Text>
                            </View>
                        </GradientButton>
                    </View>
                    
            </View>
           
        </View>
    )
}

export default ProfilePhoto;