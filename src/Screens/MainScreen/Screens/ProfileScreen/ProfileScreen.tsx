// ProfileScreen.js

import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Dimensions, Pressable,NativeModules, TaskProvider, NativeSyntheticEvent, NativeScrollEvent, useWindowDimensions, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faArrowRightToBracket, faArrowRightToFile, faEllipsis, faEllipsisH, faEllipsisV, faHandPaper, faPaperPlane, faPaperclip, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Asset, launchImageLibrary,launchCamera } from 'react-native-image-picker';
import ReactNativeModal from 'react-native-modal';
import NavPanel, { ContextPanel, IActionContextMenu } from '../../../../UIComponents/NavPanel/NavPanel';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../../../store/typesHooks/typesHooks';
import { IUserPhotos, UserHttp } from '../../../../http/user/httpUser';
import { addUserPhotos, updateUserProfile } from '../../../../store/reducers/userReducer';
import { RNCamera } from 'react-native-camera';
import GradientButton from '../../../../UIComponents/GradientButton/GradientButton';
//@ts-ignore



const baseUrl="http://193.164.150.223:1024";


const ProfileScreen: React.FC<{ navigation: StackNavigationProp<any>, route: any }> = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const [uploadPhoto,setUploadPhoto]=useState<boolean>(false)
  const [photoLoadView,setPhotoLoadView]=useState<boolean>(false)
  const [assetLoadView,setPAssetLoadView]=useState<Asset>({})
  const {width,height}=useWindowDimensions()
  const  {profile,photos,accessToken}=useAppSelector(state=>state.user)
  
  const dispatch=useAppDispatch()
  
  useEffect(() => {

    if(profile==null){
      new UserHttp().meInfo().then(value=>{
        if(value!=null){
          dispatch(updateUserProfile(value!))
        }
      })
    }

}, []);
  const calculateAge = (dateBirth: any) => {
    const birthYear = new Date(dateBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  //const age = calculateAge(userData.dateBirth);
  const gradientColors =  ['#F857A6', '#20BDFF'];
  
  // const onPress=()=>{
  //   console.log("push");
    
   
    
   
  //   const ac:NotificationAction={
  //     id:"ACTION_E",
  //     title:"SOS",
      
  //     textInput:{
  //       buttonTitle:"send",
  //       placeholder:"sendeeer"
  //     },
      
  //   }
  //   const ac1:NotificationAction={
  //     id:"CALL_112_ACTION1",
  //     title:"call",
  //   }
  //   const cat:NotificationCategory={
  //     id:"EMERGENCY_CATEGORY1",
  //     actions:[ac1]
  //   }
  //   PushNotificationIOS.setNotificationCategories([cat])
  //   const notReq:NotificationRequest={
  //     id:"1",
  //     title:"SOS-кнопка",
  //     category:"EMERGENCY_CATEGORY1",
  //     userInfo:{
  //       "rew":"dsds"
  //     }
      
      
  //   }
    
  //   PushNotificationIOS.addNotificationRequest(notReq)
  // }

const scrollRef=useRef(null)
const [pagePhoto,setPagePhoto]=useState<number>(0)
const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  const pageWidth = event.nativeEvent.layoutMeasurement.width;
  const currentPage = Math.floor(offsetX / pageWidth);

  setPagePhoto(currentPage)
}
const scrollTo=(position:number)=>{
  console.log("scroll");
  //@ts-ignore
  scrollRef.current.scrollTo({x:position*width,y:0})
}

const avatar=photos.filter(el=>el.is_avatar==true)
const otherPhoto=photos.filter(el=>el.is_avatar==false)
const images=[...avatar,...otherPhoto];

const [loadAva,setLoadAva]=useState<boolean>(false)
console.log("inOPt");
console.log(photos);

const  sengPhoto=async()=>{
  setPhotoLoadView(false)
  setUploadPhoto(true);
  const uploadData = new FormData()
  uploadData.append("file",{
    uri:assetLoadView.uri,
    type:assetLoadView.type,
    name:"filew",
  })
  console.log(loadAva.toString());
  
 const fileReturn=await new  UserHttp().uploadUserPhoto(uploadData,loadAva)
 if(fileReturn){
  const photo:IUserPhotos={
    photo_url:"/service/get_file/"+fileReturn.file_key,
    is_avatar:loadAva,
    id:fileReturn.id
  }
    dispatch(addUserPhotos(photo))
 }
 setUploadPhoto(false)
 setPAssetLoadView({});
 setLoadAva(true)
}


const goToFile=async()=>{
  if(uploadPhoto) return;
  const images = await launchImageLibrary({
      mediaType:"photo",
      selectionLimit:1
     });
     
     const assets :Asset[]|undefined=images.assets;
     if(assets){
      const file=assets[0];
      setPAssetLoadView(file);
      setPhotoLoadView(true)
     
     }
}

const cancelFile=()=>{
  setPAssetLoadView({});
  setPhotoLoadView(false)
}
 

useEffect(()=>{
  //new UserHttp().getUserPhoto()

},[])

const [photoOptionsModal,setPhotoOptionsModal]=useState(false)

const localMenuAcrions:IActionContextMenu[]=[
  {text:"Сделать аватаром",action:"set_avatar"},
  {text:"Удалить фото",action:"delete_photo"},
]
const actionDispatcher=(action:string)=>{
  console.log(action);
  
  switch (action){
      case "set_avatar":
          break;   
      case "delete_photo":
          break;
  }
}

let cameraRef:RNCamera;
const takePicture=async(camera:any)=>{
  const options = { quality: 0.5, base64: true };
 const data=await camera.takePictureAsync(options)
 console.log(data);
 
}

  return (
    <SafeAreaView style={styles.container}>
      <ReactNativeModal isVisible={photoLoadView} backdropOpacity={1} style={{margin:0}}>
          <SafeAreaView>
            {assetLoadView.uri&&<Image width={width} height={height} source={{uri:assetLoadView.uri}}/>}
          </SafeAreaView>
          <View style={{position:"absolute",height:120,bottom:0,backgroundColor:"#000000cc",width:width,justifyContent:'center',alignItems:'flex-end'}}>
            <Pressable onPress={sengPhoto} style={{flexDirection:'row',alignItems:'center',marginRight:20}}>
              <Text style={{color:"green",fontSize:20}}>Отправить</Text>
               <FontAwesomeIcon icon={faArrowRight}  size={30} color='green'/>
            </Pressable>
          </View>
          <View style={{position:"absolute",height:120,top:0,backgroundColor:"#000000cc",width:width,justifyContent:'space-between',alignItems:'flex-end',flexDirection:'row'}}>
            <Pressable onPress={cancelFile} style={{flexDirection:'row',alignItems:'center',marginLeft:20,marginBottom:20}}>
              <Text style={{color:"green",fontSize:20}}>Отмена</Text>
            </Pressable>
            <Pressable onPress={()=>setLoadAva(ava=>!ava)} style={{flexDirection:'row',marginBottom:20,marginRight:20,alignItems:'center'}}>
              <View style={{width:30,height:30,borderRadius:30,borderWidth:3,borderColor:"green",padding:3,marginRight:5}}>
                {loadAva&&<View style={{backgroundColor:"green",flex:1,borderRadius:20}}/>}
              </View>
              <Text style={{color:"green",fontSize:15}}>Сделать аватаром</Text>
            </Pressable>
          </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={photoOptionsModal}  onBackdropPress={()=>setPhotoOptionsModal(false)} style={{margin:0}} animationIn={"zoomIn"} animationOut={"zoomOutUp"} backdropOpacity={0.4}>
        <View style={{position:"absolute",top:140,right:15, borderRadius:14,backgroundColor:"rgba(220, 220, 217,0.9)",width:"70%"}}>
            {localMenuAcrions.map((element,inndex,arr)=>{
                return(
                    <Pressable onPress={()=>actionDispatcher(element.action)} key={inndex} style={{ height:40,paddingHorizontal:10, justifyContent:"center",alignItems:'flex-start', borderTopWidth:inndex==0?0:1,borderTopColor:inndex==0?"transparent":"#00000022"}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:16, color: inndex==(arr.length-1)?"red":"black"}}>{element.text}</Text>
                    </Pressable>
                )
            })}
        </View>
      </ReactNativeModal>
      <View>
        <NavPanel panel={ContextPanel.profile} navigation={navigation} />
      </View>
      {profile==null
        ?  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text>Load...</Text>
          </View>
        :<>
          <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingLeft:0,marginTop:1}}> 
        <Pressable onPress={()=>setPhotoOptionsModal(true)} style={{position:"absolute",top:10,right:10,zIndex:2}}>
          <FontAwesomeIcon icon={faEllipsisV} size={30}/>
        </Pressable>
       <ScrollView
        ref={scrollRef}
          style={{}}
         horizontal 
         contentContainerStyle={{}}  
         bounces={false} 
         showsHorizontalScrollIndicator={false}
         pagingEnabled={true}
         onMomentumScrollEnd={handleScroll}
         >
          {images.map(image=>{
            return(
              <Pressable > 
                     <Image
                      style={styles.photo}
                      alt='photo'
                      width={width}
                      key={image.id}
                      height={319.73}
                      source={{
                        uri:baseUrl+image.photo_url,
                        headers:{
                          "Authorization":accessToken!
                        }
                      }}
                  />
              </Pressable>
           
            )
          })}
       </ScrollView>
      
       <View style={{paddingLeft:106,paddingRight:106,width:width,position:"absolute",bottom:8,flexDirection:"row"}}>
        {images.map((_,index)=>{
           
          return <View key={index} style={[styles.page,{backgroundColor:pagePhoto==index?"white":"rgba(255, 255, 255, 0.5)",}]}/>
            
        })}
        </View>
      </View>
      <ScrollView 
          
          style={{marginTop:10,marginHorizontal:15}} 
          horizontal 
          bounces={false} 
          
          showsHorizontalScrollIndicator={false}>
            {images.map((image,index)=>{
              return (
                <Pressable key={image.id} onPress={()=>scrollTo(index)}>
                <LinearGradient
                   style={{padding:0,borderWidth:2,borderRadius:10,marginRight:10,overflow:"hidden"}}
                   colors={index==pagePhoto?gradientColors:["white","white"]}
                >
                <Image
                    style={{}}
                    alt='photo'
                    width={70}
  
                    height={73}
                    source={{
                      uri:baseUrl+image.photo_url,
                      headers:{
                        "Authorization":accessToken!
                      }
                    }}
                />
                </LinearGradient>
             
              </Pressable>
              )
            })}
           
           
          
       </ScrollView>
      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:32,paddingHorizontal:20}}>
        <View>
            <Text style={{fontFamily:"SF Pro Display",fontWeight:"600",fontSize:25,lineHeight:29.3, color:"rgba(36, 39, 41, 1)"}}>{profile.first_name}, {new Date().getFullYear()-profile.birth.getFullYear()}</Text>
        </View>
        {/* <View style={{backgroundColor: "rgba(240, 246, 250, 1)",borderRadius:13,height:25.93,alignItems:'center',justifyContent:'center',paddingHorizontal:8.98}}>
          <Text style={{fontFamily:"SF Pro Display",fontWeight:"600",fontSize:12.96,lineHeight:15.19, color:"rgba(36, 39, 41, 1)"}}>1.8 км</Text>
        </View> */}
      </View>
      <View style={{marginTop:20.66,paddingHorizontal:20}}>
          <Text style={{fontFamily:"SF Pro Display",fontWeight:"500",fontSize:19,lineHeight:22.27, color:"rgba(54, 67, 77, 0.9)"}}>О себе</Text>
          <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:16,lineHeight:18.75, color:"rgba(54, 67, 77, 0.7)",marginTop:10.77}}>{profile.about_me}</Text>
      </View>
      <View style={{marginTop:20.57,paddingHorizontal:20}}>
        <View style={{marginBottom:10,flexDirection:"row"}}>
        <Text style={{fontFamily:"SF Pro Display",fontWeight:"500",fontSize:19,lineHeight:22.27, color:"rgba(54, 67, 77, 0.9)",}}>Интересы</Text>
          <Pressable onPress={()=>{
            navigation.navigate("EditInterecting",{list:profile.interests})
          }} style={{marginLeft:5, flexDirection:'row',width:120,justifyContent:'space-between',height:30,alignItems:'center',padding:5}}>
                  <FontAwesomeIcon icon={faPenToSquare}  size={14}/>
                  <Text style={{fontFamily:"SF Pro Display",fontSize:16,color:"#009ADA",fontWeight:"bold"}}>{"(Изменить)"}</Text>
          </Pressable>
        </View>
         
          <View style={{flexDirection:"row",padding:0,flexWrap:'wrap'}}>
          {profile.interests&&profile.interests.map(el=>(
            <View>
              <GradientButton onPress={()=>{}} >
                   <Text style={{fontFamily:"SF Pro Display",fontWeight:"500",fontSize:15,lineHeight:17.62, color:"rgba(36, 39, 41, 0.7)",marginHorizontal:10}}>{el.interest_text}</Text>
              </GradientButton>
            </View>
              
            ))}
         </View>
      </View>
      </ScrollView>
      {/* <Pressable onPress={onPress} style={{height:40}}>
              <Text>go push</Text>
      </Pressable> */}
        </>
      }
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    height:42.96,
    borderRadius: 9,
    paddingLeft:12.89,
    paddingRight:12.89,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:10.23
  },
  page:{
    flex:1,
    marginHorizontal:5,
    height:4,

    borderRadius:20,
  },
  photo:{
    
  },
  container: {
    backgroundColor:"white",
    flex:1
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
