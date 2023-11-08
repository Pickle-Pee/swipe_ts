import { FC, useEffect, useState } from "react";
import { Alert, ProgressBarAndroidBase, Text, View, useWindowDimensions } from "react-native";
import SVGProtected from "../../SVG/SVGProtected";
import LinearGradient from "react-native-linear-gradient";
import MainVerify from "./pages/MainVerify";
import ProfilePhoto from "./pages/ProfilePhoto";
import { Asset } from "react-native-image-picker";
import SelfyPhoto from "./pages/SelfyPhoto";
import { UserHttp } from "../../http/user/httpUser";
import { useAppDispatch, useAppSelector } from "../../store/typesHooks/typesHooks";
import InProgress from "./pages/InProgress";
import { EVerifyStatus, updateUserVerifyStatus } from "../../store/reducers/userReducer";
import { AuthNavigationName } from "../../Screens/AuthScreens/AuthScreen";
import ReactNativeModal from "react-native-modal";
import * as Progress from 'react-native-progress';
interface IVerifyScreen{
    navigation:any
}
const VerifyScreen:FC<IVerifyScreen>=({navigation})=>{
   
    
    const {width}=useWindowDimensions()
    const [page,setPage]=useState<number>(0)
    //required data
    const [photoProfilePath,setPhotoProfilePath]=useState<Asset>();
    const [selfyPath,setSelfyPath]=useState<string>("")
    const [load,setLoad]=useState<boolean>(false)
    const {verifyStatus}=useAppSelector(state=>state.user)
    const dispatch=useAppDispatch()
    const toPage=(newPage:number)=>{
        setPage(newPage)
    }

    useEffect(()=>{
        console.log(verifyStatus);
        
    },[verifyStatus])
    const end=async()=>{
        setLoad(true)
        try {
            console.log(photoProfilePath!.uri);
            console.log(selfyPath);
            
            
            const formData=new FormData()
            formData.append("profile_photo",{
                uri:photoProfilePath!.uri,
                type:photoProfilePath!.type,
                name:"empty"
            })
           
            formData.append("verification_selfie",{
                uri:selfyPath,
                type:"image/jpg",
                name:"empty2"
            })
            const statusVirify=await new UserHttp().uploadUserVerify(formData);
            if(statusVirify!=0){

            }
        } catch (error) {
                console.log(error);
                
        }
        
        const formDataPhoto=new FormData()
        formDataPhoto.append("file",{
            uri:photoProfilePath?.uri,
            type:photoProfilePath?.type,
            name:"empty"
        })
        const statusProfile= await new UserHttp().uploadUserPhoto(formDataPhoto,true)
        if(statusProfile!=null){
            dispatch(updateUserVerifyStatus({status:EVerifyStatus.in_progress}))
        }
        setLoad(false)
    }
    return(
        <>
        <ReactNativeModal isVisible={load} >
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#242121',width:width-100,alignSelf:'center',padding:20}}>
                <Progress.Circle size={30} color={"#de6f14"} borderWidth={2} indeterminate/>
                <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:16, color:"white",marginLeft:40}}>Подождите...</Text>
            </View>
        </ReactNativeModal>
        {verifyStatus==EVerifyStatus.in_progress
            ?   <InProgress toHome={()=>navigation()}/>
            :<>
                {page==0&&<MainVerify toPage={()=>toPage(1)}/>}
                {page==1&&<ProfilePhoto toPage={()=>toPage(2)} setPhotoProfile={setPhotoProfilePath}/>}
                {page==2&&<SelfyPhoto end={end} setSelfyPath={setSelfyPath}/>}
            </>
        }
            
            
        </>
    )
}

export default VerifyScreen;