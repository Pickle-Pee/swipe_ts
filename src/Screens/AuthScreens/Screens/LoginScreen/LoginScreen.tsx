import { View,SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Image, Text, Pressable, } from "react-native";
import React, { FC, useState } from "react";
import { MaskedTextInput } from "react-native-mask-text";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReturnedData, UserHttp } from "../../../../http/user/httpUser";
import { AuthNavigationName } from "../../AuthScreen";
import GradientButton from "../../../../UIComponents/GradientButton/GradientButton";
import SVGAppLogoMain from "../../../../SVG/SVGAppLogoMain";




const LoginScreen:FC<{navigation:StackNavigationProp<any>}> = ({navigation})=>{

    const [phone,setPhone]=useState<string>("");
    const [code,setCode]=useState<string>("");
    const [step,setStep]=useState<string>("phone");
    
    
    const handlerStep=async()=>{
        
        console.log(step);
        
        if(step=="phone"){
          const status : ReturnedData=await new UserHttp().sendCode("7"+phone.substring(1));
            if(status.code==0){
                setStep("code");
            }
        }
        if(step=="code"){
            console.log("click");
            const status : ReturnedData = await new UserHttp().login("7"+phone.substring(1),code);
            if(status.code==0){
                navigation.navigate("MainStack")
            }
        }
    }

    return(
        <Pressable onPress={Keyboard.dismiss} style={{flex:1,backgroundColor:'white'}}>
            <KeyboardAvoidingView behavior="position" style={{flex:1}} keyboardVerticalOffset={0}>
            
                <ScrollView>
                <SafeAreaView style={{alignItems:"center",flex:1,padding:24}}>
                {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}> */}
                <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",height:30,width:"100%" }}>
                    {step=="code"?  <TouchableOpacity
                                    onPress={() => setStep("phone")}>
                                        <FontAwesomeIcon icon={faArrowLeft} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
                                    </TouchableOpacity>
                                  : <View style={{height:10}}></View>  
                    }
                    <TouchableOpacity
                    onPress={() => navigation.navigate(AuthNavigationName.homeScreen)}>
                        <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:75,marginBottom:139}}>
                    <SVGAppLogoMain/>
                </View>
                    
                 <View  style={styles.borderBottom}>
                 {step=="phone"
                    && 
                    <>
                                    <MaskedTextInput
                                        mask="+7 (999) 999-99-99"
                                        placeholder="Номер телефона"
                                        placeholderTextColor={"#6D6D6D"}
                                        onChangeText={(text, rawText) => {
                                          setPhone(rawText)
                                        }}
                                        keyboardType="numeric"
                                        style={styles.input}
                                        value={phone}
                                    /> 
                    </>
                    }
                    {step=="code"
                    &&
                    <>
                         <MaskedTextInput
                                        mask="999999"
                                        placeholder="Введите код из смс"
                                        placeholderTextColor={"#6D6D6D"}
                                        onChangeText={(text, rawText) => {
                                          setCode(rawText)
                                        }}
                                        keyboardType="numeric"
                                        style={styles.input}
                                        value={code}
                                    /> 
                    </>
                    }
                                   
                                </View>
                             
               <Pressable onPress={handlerStep} style={{marginTop:37}} focusable={true}>
                    <GradientButton
                    disabled={
                       step=="phone" && phone.length!=10 || step=="code" && code.length!=6
                    }
                    onPress={handlerStep}
                    
                    >
                        
                    <Text  style={{fontSize:18,fontFamily:"SF Pro Display",fontWeight:"400",paddingHorizontal:114}}>
                    Продолжить
                    </Text>
                    </GradientButton>
               </Pressable>
                {/* </KeyboardAvoidingView> */}
                
            
            </SafeAreaView>
            </ScrollView>
               
            </KeyboardAvoidingView>
            </Pressable>
        
    )
}
const styles = StyleSheet.create({

    input: {
        width: 280,
        height: 25,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    preinput:{
        color:"#20BDFF",
        padding: 8,
        fontSize: 16,
        fontFamily: "SFProDisplay-Light",
        fontWeight: '400',
    },
    borderBottom:{
        width: 280,
        height: 40,
        borderStyle:"solid",
        flexDirection:'row'
    },
    form: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBigText: {
        fontSize: 22,
        textAlign: 'center',
        paddingTop: 50,
        width: '70%',
    },
    inputContainer: {
        flexDirection: 'column',
        width: '70%',
        alignItems: 'center',
        alignContent: 'flex-end',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        paddingBottom: 50,
        position: 'absolute'
    }
})
export default LoginScreen;