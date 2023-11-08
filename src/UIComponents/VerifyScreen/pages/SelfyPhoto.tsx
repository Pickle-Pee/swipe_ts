import { FC, useState } from "react";
import { Alert, Image, Pressable, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { RNCamera } from "react-native-camera";
import LinearGradient from "react-native-linear-gradient";
import GradientButton from "../../GradientButton/GradientButton";

interface ISelfyPhoto{
    end:()=>void;
    setSelfyPath:(value:string)=>void;
}

const SelfyPhoto:FC<ISelfyPhoto>=({end,setSelfyPath})=>{
    const {width}=useWindowDimensions()
    const [cameraAcive,setCaveraActive]=useState<boolean>(false)
    const [path,setPath]=useState<string>("")
    const takePicture=async(camera:any)=>{
        const options = { quality: 0.5, base64: true };
       const data=await camera.takePictureAsync(options)
       console.log(data.uri);
       setPath(data.uri)
       setSelfyPath(data.uri)
       
      }
    const continuePage=async()=>{

        if(!path){
            Alert.alert("Сделайте селфи!")
        }else{
            console.log(path);
            
            
            end()
        }
    }  
    return(
        <View style={{justifyContent:'space-between',flex:1,alignItems:'center'}}>
            <View style={{flex:1,marginBottom:40,position:'relative',marginHorizontal:20}}>
                           
                <Text style={{marginTop:105, fontFamily:"SF Pro Display",fontWeight:"400",fontSize:24, color:"#1F2937",textAlign:'center',marginBottom:10}}>Сделайте селфи как показано на рисунке</Text>
                {path
                ? <Image source={{uri:path}} style={{flex:1}} borderRadius={10}/>
                :
                cameraAcive
               ? <View style={{borderRadius:10,overflow:'hidden',flex:1}}>
                    <RNCamera 
               style={{flex: 1,
                
                 flexDirection: 'column',
                 backgroundColor: 'black',
               }}
               type={"front"}
               flashMode={"on"}
             >     
                
                {/*@ts-ignore*/}
                  {({ camera, status, recordAudioPermissionStatus }) => {
                     return (
                        <View style={{flex:1}}>
                            
                            <View style={{ position:'absolute',bottom:10,alignItems:'center',width:width-10, }}>
                                <TouchableOpacity onPress={()=>takePicture(camera)} style={{height:50,width:50,borderColor:'white',borderWidth:2,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:40,width:40,backgroundColor:'white',borderRadius:30}}>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                      
                     );
                   }}
               </RNCamera>
               </View>  
               : <Pressable onPress={()=>setCaveraActive(true)} style={{flex:1,backgroundColor:'#f4f4f4',marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:15, color:"#1F2937"}}>Начать</Text>
                </Pressable>
            }
            </View>
            <View>
            {path&&<Pressable onPress={()=>{setPath("");setCaveraActive(true)}} style={{borderColor:"#f4f4f4",borderWidth:2,borderRadius:20,height:42,marginTop:0,marginHorizontal:53,width:width-106,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:15, color:"#1F2937"}}>Изменить</Text>
                    </Pressable>
                    }
                    <View style={{height:40,marginHorizontal:53,marginBottom:10,marginTop:10,width:width-106}}>
                        <GradientButton  onPress={continuePage} p={false}>
                            <View
                                style={{height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}
                            >
                                <Text style={{fontFamily:"SF Pro Display",fontSize:15,fontWeight:"400",color:"black"}}>Готово</Text>
                            </View>
                        </GradientButton>
                    </View>
                    
            </View>
           
        </View>
    )
}

export default SelfyPhoto;