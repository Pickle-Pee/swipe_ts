import React, { FC, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativeModal from "react-native-modal";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../../store/typesHooks/typesHooks";
import { IUserProfileUpdate, UserHttp } from "../../../../http/user/httpUser";
import { updateUserProfile } from "../../../../store/reducers/userReducer";
import SVGCancelVip from "../../../../SVG/SVGCancelVip";
import SvgChevronLeft from "../ChatScreen/svg/chevronLeft";
interface IEditProfile{
    navigation:any;
}


const EditProfile:FC<IEditProfile>=({navigation})=>{

    const {profile}=useAppSelector(state=>state.user)
    if(profile==null){
        return (
            <SafeAreaView>
                
                    <Text>Ошибка загрузки данных</Text>
                
            </SafeAreaView>
        )
    }
    const [name,setName]=useState<string>(profile.first_name)
    const [city,setCity]=useState<string>(profile.city_name)
    const [gender,setGender]=useState<string>(profile.gender)
    const [birth,setBirth]=useState<Date>(profile.birth)
    const [avaibletDate,setAvaibleDate]=useState<Date>(birth)
    const [visibleCalendare,setVisibleCalendare]=useState<boolean>(false)
    const [about,setAbout]=useState<string>(profile.about_me)
    const [focusIndex,setFocusIndex]=useState<number>(0)
    const [loading,setLoading]=useState<boolean>(false)
    const scrollRef=useRef(null)
    const dispatch=useAppDispatch()
    const saveForm=async()=>{
        Keyboard.dismiss()
        setLoading(true);
        const newProfileData:IUserProfileUpdate={
            about_me:about,
            date_of_birth:birth.getFullYear()+"-"+((birth.getMonth()+1)>=10?(birth.getMonth()+1):"0"+(birth.getMonth()+1))+"-"+(birth.getDate()>=10?birth.getDate():"0"+birth.getDate()),
            city_name:city,
            first_name:name,
            gender:gender
        }
        console.log(newProfileData);
        
       const status= await new UserHttp().updateUser(newProfileData)
       if(status==0){
        const newInfo=await  new UserHttp().meInfo();
        if(newInfo==null){
            console.log("Не обновилась инфа");
            
            return;
        }
        dispatch(updateUserProfile(newInfo))
        setLoading(false)
        navigation.goBack()

       }
       setLoading(false)
    }

    const scrollToEnd=()=>{
       
        Keyboard.addListener("keyboardWillShow",(listener)=>{
            console.log(listener);
            
             //@ts-ignore
            scrollRef.current.scrollToEnd({animated: true})
            Keyboard.removeAllListeners("keyboardWillShow")
        })
        
       
    }
const handleBack=()=>{
    navigation.goBack()
}
    return (
        <SafeAreaView style={{backgroundColor:"white",flex:1}}>
            <ReactNativeModal style={{padding:0,margin:0,justifyContent:'flex-end'}} isVisible={visibleCalendare} onBackdropPress={()=>setVisibleCalendare(false)}>
                <View style={{backgroundColor:"white",paddingBottom:50}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:10}}>
                        <Pressable onPress={()=>setVisibleCalendare(false)}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"400",color:"#009ADA"}}>ОТМЕНА</Text>
                        </Pressable>
                        <Pressable onPress={()=>{
                            setBirth(avaibletDate)
                            setVisibleCalendare(false)
                        }}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"600",color:"#009ADA"}}>ВЫБРАТЬ</Text>
                        </Pressable>
                    </View>
                    
                    <DateTimePicker
                        
                        display="spinner"
                        value={avaibletDate}
                        onChange={(event,date)=>{
                            setAvaibleDate(date??birth)
                        }}
                        mode="date"
                    />
                </View>
              
            </ReactNativeModal>
            <ReactNativeModal isVisible={loading}>
                        <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                                <View style={{backgroundColor:"white",paddingHorizontal:30,paddingVertical:15}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:23,fontWeight:"400",color:"#242729"}}>Подождите...</Text>
                                </View>
                                    
                        </SafeAreaView>
            </ReactNativeModal>
            <View style={{marginBottom:30,height:61,alignItems:'center',zIndex:3,justifyContent:'center'}}>
                <View style={{backgroundColor:'white',zIndex:4,height:100,position:'absolute',top:-100,width:"100%"}}>

                </View>
                <Pressable onPress={handleBack} style={{width:50,height:61,justifyContent:"center",alignItems:"center",position:'absolute',left:0}}>
                    <SvgChevronLeft/>
                </Pressable>
                <Text  style={{fontFamily:"SF Pro Display",fontSize:23,fontWeight:"600",color:"#242729"}}>Редактировать профиль</Text>
            </View>
                <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={54} >
             <ScrollView  ref={scrollRef} style={{marginHorizontal:15}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={{}}>
                    <Text  style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"600",color:"#242729"}}>О себе</Text>
                </View>
                <View>
                    <View style={{position:"relative",height:43,marginTop:20,}}>
                        {name.length>0&&<View style={{position:"absolute",top:-9,left:25,backgroundColor:"white",zIndex:2,paddingHorizontal:5}}>
                                            <Text style={{fontFamily:"SF Pro Display",fontSize:13,color:"#B998FF",fontWeight:"bold"}}>Имя</Text>
                                        </View>}
                         <TextInput  placeholder="Имя" placeholderTextColor={"#B998FF"} style={{fontWeight:name.length==0?"bold":"400", height:43, paddingHorizontal:13, borderRadius:12.89,borderWidth:1,borderColor:focusIndex==0?"#B998FF":"rgba(54, 67, 77, 0.3)"}} value={name} onChangeText={setName}/>
                    </View>
                    <View style={{position:"relative",height:43,marginTop:20,}}>
                        {city.length>0&&<View style={{position:"absolute",top:-9,left:25,backgroundColor:"white",zIndex:2,paddingHorizontal:5}}>
                                            <Text style={{fontFamily:"SF Pro Display",fontSize:13,color:"#B998FF",fontWeight:"bold"}}>Город</Text>
                                        </View>}
                          <TextInput  placeholder="Город" placeholderTextColor={"#B998FF"} style={{fontWeight:city.length==0?"bold":"400",height:43,paddingHorizontal:13, borderRadius:12.89,borderWidth:1,borderColor:focusIndex==0?"#B998FF":"rgba(54, 67, 77, 0.3)"}} value={city} onChangeText={setCity}/>
                    </View> 
                    <View style={{position:"relative",height:43,marginTop:20}}>
                        {birth&&<View style={{position:"absolute",top:-9,left:25,backgroundColor:"white",zIndex:2,paddingHorizontal:5}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:13,color:"#B998FF",fontWeight:"bold"}}>Дата рождения</Text>
                                </View>}
                                <Pressable onPress={()=>setVisibleCalendare(true)} style={{ flexDirection:'row',alignItems:'center', height:43,paddingHorizontal:13, borderRadius:12.89,borderWidth:1,borderColor:focusIndex==0?"#B998FF":"rgba(54, 67, 77, 0.3)",justifyContent:'space-between'}}>
                                    <Text  style={{ fontWeight:"400"}}>{birth.toLocaleDateString("ru",{year: 'numeric', month: 'long', day: 'numeric' })}</Text> 
                                    <FontAwesomeIcon icon={faCalendarDays} size={19}/>
                                </Pressable>
                               
                          
                    </View> 
                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:18,color:"#242729",}}>Гендер</Text>
                        <View style={{flexDirection:"row",marginTop:20}}>
                            <Pressable 
                                onPress={()=>setGender("male")}
                                style={{padding:0,borderWidth:1,borderColor:gender=="male"?'#009ADA':"#1F2937",height:45,paddingHorizontal:23,borderRadius:6,alignItems:'center',justifyContent:'center'}}
                            >
                                <Text>Мужской</Text>
                            </Pressable>
                            <Pressable
                                onPress={()=>setGender("female")}
                                style={{marginLeft:30, padding:0,borderWidth:1,borderColor:gender=="female"?"#E62885":"#1F2937",height:45,paddingHorizontal:23,borderRadius:6,alignItems:'center',justifyContent:'center'}}
                            >
                                <Text>Женский</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{position:"relative",marginTop:20}}>
                        {about?.length>0&&<View style={{position:"absolute",top:-9,left:25,backgroundColor:"white",zIndex:2,paddingHorizontal:5}}>
                                            <Text style={{fontFamily:"SF Pro Display",fontSize:13,color:"#B998FF",fontWeight:"bold"}}>Обо мне</Text>
                                        </View>}
                          <TextInput onFocus={scrollToEnd} placeholder="Обо мне" multiline placeholderTextColor={"#B998FF"} style={{fontWeight:city.length==0?"bold":"400",minHeight:64,maxHeight:120, paddingHorizontal:13,paddingTop:10.74,paddingBottom:10.74, borderRadius:12.89,borderWidth:1,borderColor:focusIndex==0?"#B998FF":"rgba(54, 67, 77, 0.3)"}} value={about} onChangeText={setAbout}/>
                    </View> 
                    {/* 
                    <TextInput style={{height:43,marginTop:15,paddingHorizontal:13, borderRadius:12.89,borderWidth:1,borderColor:focusIndex==0?"#B998FF":"rgba(54, 67, 77, 0.3)"}} value={about} onChangeText={setAbout}/> */}
                </View>
              
               {/* <View style={{marginTop:20,marginBottom:20,flexDirection:"row"}}>
                <Text style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"600",color:"#242729",}}>Интересы</Text>
                <Pressable style={{marginLeft:5, flexDirection:'row',width:120,justifyContent:'space-between',height:30,alignItems:'center',padding:5}}>
                        <FontAwesomeIcon icon={faPenToSquare}  size={14}/>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:16,color:"#009ADA",fontWeight:"bold"}}>{"(Изменить)"}</Text>
                </Pressable>
               </View>
               <Wrap style={{flexDirection:"row",padding:0}}>
                    {profile.interests.map(el=>(
                    <GradientBorderView
                    gradientProps={{
                        colors: gradientColors
                    }}
                    style={[
                        styles.buttonContainer,
                        {
                        opacity:  1,
                        marginBottom:10
                        }
                    ]}
                    >
                    <Text style={{fontFamily:"SF Pro Display",fontWeight:"500",fontSize:15.04,lineHeight:17.62, color:"rgba(36, 39, 41, 0.7)"}}>{el.interest_text}</Text>
                    </GradientBorderView>
                    ))}
               </Wrap>
                */}
               <Pressable onPressIn={saveForm} style={{marginTop:20, height:55,backgroundColor:"#7760AF",alignItems:'center',justifyContent:'center',borderRadius:10}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:15,color:"white",fontWeight:"bold"}}>Сохранить изменения</Text>
               </Pressable>
               
            </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

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
    }})
export default EditProfile;