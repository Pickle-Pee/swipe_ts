import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";
import { vibrateShort } from "../../../nativeIOS/vibration";
import { useAppDispatch, useAppSelector } from "../../../store/typesHooks";
import { updateDeleted, updateRecorded } from "../../../store/reducers/ChatControllerReducer";
import fsvoice from "../../../fs/voise/fsvoice";
import dispatcherMessages from "../helpers/dispatcherMessages";

interface IRecordVoice{
    chatId:number;
}

let currentPatch=""
let deleted=false
const RecordVoice:FC<IRecordVoice>=({chatId})=>{

    const {width}=useWindowDimensions()
    const {recorded}=useAppSelector(state=>state.chatController)
    const {userId}=useAppSelector(state=>state.user)
    const [disabledGesture,setDisabledGesture]=useState<boolean>(false)
    const [margins,setMargins]=useState<boolean>(true)
    const dispatch=useAppDispatch()


   const xPosition=useRef(new Animated.Value(0)).current

  const setAnimValue=(dx:number)=>{
   // if(!recorded) return;
   if(dx==100){

    
    Animated.timing(xPosition,{
      toValue:0,
      duration:200,
      useNativeDriver:false
     }).start(()=>{
     
      dispatch(updateRecorded(false))
      setDisabledGesture(false)

     })
   }else{
    !disabledGesture&&xPosition.setValue(-dx); 
   }
  
    
  }

    const [panResponder, setPanResponder] = useState(
        PanResponder.create({
            onStartShouldSetPanResponder: ()=> {
                dispatch(updateRecorded(true));
                setMargins(true);
                vibrateShort()
                startRecorded()
             
               return true;
            },
            onMoveShouldSetPanResponder: () =>{
              
              return true
            },
            onPanResponderMove: (event, gestureState) => {
              // Вызывается при движении
              
              let dx = gestureState.dx;
              
              //console.log(dx);
              if(dx<=-150){
                deleted=true;
                setDisabledGesture(true);
                setMargins(false);
                setAnimValue(100)     
                return;
                
              }else{
                setAnimValue(dx)
                //dispatch(updateDeleted(false));
              }
             
              
            },
            onPanResponderRelease: (e) => {
            //console.log("|||||er");
            xPosition.setValue(0);
            setMargins(true);
              setAnimValue(100)
                 // console.log(e.nativeEvent.pageX);
                  
                  dispatch(updateRecorded(false))
                  stopRecorded()
                
               
                
               
            },
          })
    );

      useEffect(()=>{
        //console.log(recorded);
        
     //  fsvoice.stopRecord()
        if(recorded){
          
        }else{ 
            
        }
      },[recorded])  


      const startRecorded=async()=>{
        //console.log("recoord");
        
        const path:string= await fsvoice.recordVoise(userId,chatId);
        currentPatch=path;

        
      }

      const stopRecorded=async()=>{
        const pathFull:string= await  fsvoice.stopRecord()
            if(deleted){
              currentPatch=""
                //TODO delete voice!!!per currentpatch
            }else{
              console.log(currentPatch);
                dispatcherMessages.addVoiceMessage(chatId,userId,currentPatch,pathFull).then(()=>{
                  currentPatch=""
                })
            }
            deleted=false;
            
      }

    return(
        <Animated.View {...(disabledGesture?{}:panResponder.panHandlers)} style={{position:"absolute",right:margins?xPosition:0,width:recorded?75:width*0.16,backgroundColor:recorded?"#EB539F":"white",height:75,alignItems:'center',justifyContent:"center",borderRadius:recorded?75:0}}>
                         {/* < Pressable  onPressIn={async()=>{
                        
                    //  const result:string= await fsvoice.recordVoise(userId,chatId)
                    //  console.log(result);
                        
                    //    setTempPath(result)
                    }} onPressOut={async()=>{
                        setRecordet(false)
                    //    await fsvoice.stopRecord();
                    //      setPath([...path,tempPath])
                        //const result:number= await fsvoice.playVoise(path);
                       
                    }} style={{flex:1,paddingLeft:8}}>
                       
                    </Pressable> */}
                        <FontAwesomeIcon icon={faMicrophone} size={23} color="#000000aa"/>
                    </Animated.View>
    )
}

export default RecordVoice;