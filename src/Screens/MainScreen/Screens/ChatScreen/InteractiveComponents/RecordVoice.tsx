import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";
import dispatcherMessages from "../helpers/dispatcherMessages";
import { useAppDispatch, useAppSelector } from "../../../../../store/typesHooks/typesHooks";
import { updateRecorded } from "../../../../../store/reducers/ChatControllerReducer";
import fsvoice from "../../../../../fs/voise/fsvoice";

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
               // vibrateShort()
                startRecorded()
             
               return true;
            },
            onMoveShouldSetPanResponder: () =>{
              
              return false;
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
              const metric=[...fsvoice.currentmetric];
              const min = Math.min(...metric);
               const max = Math.max(...metric);
     
               let scaledNumbers = metric.map(number => {
                 const scaled = 2 + (number - min) * (28 / (max - min));
                 const rounded = Math.round(Math.min(30, Math.max(2, scaled)));
                 return rounded;
               });
               console.log("1scale"+scaledNumbers);
               
               if(scaledNumbers.length<=32){
                  while(scaledNumbers.length<32){
                    if(scaledNumbers.length%2==1){
                      scaledNumbers.push(2)
                    }else{
                      scaledNumbers.unshift(2)
                    }
                 }
               }else{
                console.log(scaledNumbers);
                  const otherRate=scaledNumbers.length%32
                  console.log("otherRate:"+otherRate);
                  
                  const tickRate=(scaledNumbers.length-otherRate)/32
                  console.log("tickRate:"+tickRate);

                  const newScale=[];
                  const getAverage = (numbers:number[]) => {
                    const sum = numbers.reduce((acc, number) => acc + number, 0);
                    const length = numbers.length;
                    return sum / length;
                  };
                  const otherNumbers=(scaledNumbers.length)%tickRate
                  for(let i=0;i<scaledNumbers.length-(scaledNumbers.length)%tickRate;i+=tickRate){
                    const currentArray=scaledNumbers.slice(i*tickRate,(i+1)*tickRate)
                    console.log(i+"-step:"+currentArray);
                    newScale.push(getAverage(currentArray))
                  }
                  console.log("other"+scaledNumbers.slice(-otherRate));
                  
                  newScale.push(getAverage(scaledNumbers.slice(-otherNumbers)))
                  scaledNumbers=newScale;
               }
             
               console.log(scaledNumbers);
               
              //console.log(currentPatch);
                dispatcherMessages.addVoiceMessage(chatId,userId,currentPatch,pathFull,scaledNumbers).then(()=>{
                  currentPatch=""
                })
            }
            deleted=false;
            fsvoice.currentmetric=[]
            
      }

    return(
        <Animated.View {...(disabledGesture?{}:panResponder.panHandlers)}  style={{position:"absolute",right:margins?xPosition:0,width:recorded?75:width*0.16,backgroundColor:recorded?"#EB539F":"white",height:75,alignItems:'center',justifyContent:"center",borderRadius:recorded?75:0}}>
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