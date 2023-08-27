import { View,SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, } from "react-native";
import { FC, useState } from "react";
import { Center, Image,KeyboardAvoidingView,ScrollView,Text } from "native-base";
import GradientButton from "../../../assets/elements/elements";
import { MaskedTextInput } from "react-native-mask-text";
import { ReturnedData, UserHttp } from "../../http/user/httpUser";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthNavigationName } from "../../../App";



const LoginScreen:FC<{navigation:StackNavigationProp<any>}> = ({navigation})=>{

    const [phone,setPhone]=useState<string>("");
    const [code,setCode]=useState<string>("");
    const [step,setStep]=useState<string>("phone");
    
    
    const handlerStep=async()=>{
        if(step=="phone"){
          const status : ReturnedData=await new UserHttp().sendCode("7"+phone);
            if(status.code==0){
                setStep("code");
            }
        }
        if(step=="code"){
            const status : ReturnedData = await new UserHttp().login("7"+phone,code);
            if(status.code==0){
                navigation.navigate("MainStack")
            }
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    onPress={() => navigation.navigate(AuthNavigationName.authScreen)}>
                        <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require("../../../assets/logo.png")}
                    
                    mt={145}
                    alt="logo"
                    mb={139}
                    w={101.12}
                    h={89}
                    />
                    
                 <View  style={styles.borderBottom}>
                 {step=="phone"
                    && 
                    <>
                         <Text style={styles.preinput}>RU +7</Text>
                                    <MaskedTextInput
                                        mask="(999) 999-99-99"
                                        placeholder="Телефон"
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
                             
               <View style={{marginTop:37}} focusable={true}>
                    <GradientButton
                    disabled={
                       step=="phone" && phone.length!=10 || step=="code" && code.length!=6
                    }
                    onPress={handlerStep}
                    
                    >
                        
                    <Text fontSize={18} fontFamily={"SFProDisplay-Light"} fontWeight={300} color={"#1F2937"} p={2}>
                    Продолжить
                    </Text>
                    </GradientButton>
               </View>
                {/* </KeyboardAvoidingView> */}
                
            
            </SafeAreaView>
            </ScrollView>
               
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        
    )
}
const styles = StyleSheet.create({

    input: {
        padding: 8,
        fontSize: 16,
        fontFamily: "SFProDisplay-Light",
        fontWeight: '400',
        color:"#1F2937"
    
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
        borderBottomColor: "#E5E5E5",
        borderBottomWidth:1,
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