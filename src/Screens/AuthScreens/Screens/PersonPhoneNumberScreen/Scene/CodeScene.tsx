import React, { FC, useEffect, useState } from "react"
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, KeyboardAvoidingView, View } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { ReturnedData, UserHttp } from "../../../../../http/user/httpUser";
import { useAppSelector } from "../../../../../store/typesHooks/typesHooks";
import GradientButton from "../../../../../UIComponents/GradientButton/GradientButton";
import { IUserTempData } from "../../../../../store/reducers/tempUserDataReducer";



interface ErrorType {
    message: string | null;
}

let _interval=null;

const CodeScene:FC<{navigation:any}>=({navigation})=>{
    const {phoneNumber,firstName,lastName,dateOfBirth,gender}=useAppSelector(state=>state.tempUser)
    const [second,setSecond]=useState<number>(30);
    const [timer,setTimer]=useState<boolean>(true)
    const getCode = async (phoneNumber:string) : Promise<number> => {
        
        const status : ReturnedData = await new UserHttp().sendCode(phoneNumber);
        resetTimer()
        return status.code
    };

    const resetTimer=()=>{
        setTimer(true);
        setSecond(30);
    }

    useEffect(()=>{
        if(second<1){
            setTimer(false);
        }
        if(timer){
            _interval = setTimeout(()=>{
           
                setSecond(s=>s-1)
            },1000)
        }
        
    },[second])
    console.log(second);
    
    const registration=async()=>{
        const userData : IUserTempData={
            phoneNumber,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            city_name:""
        }
       const status : number = await new UserHttp().registration(userData);
       if(status===0){
        navigation.navigate("MainStack")
       }
    }

    const handleCodeChange = async (code: string) => {
            if (code.length === 6) {
                new UserHttp().checkCode(phoneNumber,code).then(value=>{
                    if(value==0){
                        registration();
                    }
                }).finally(()=>{
                  
                })

            
            }
        
    };

    const reCode=()=>{
        getCode(phoneNumber);
    }


    const showAlert = () => {
        Alert.alert(
            "Ваш код из СМС",
            `Отправленный код: ${"NO"}`,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    };

    return (
        <>
        <Text style={styles.topBigText}>
            Добавление номера телефона
        </Text>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}>
            <MaskedTextInput
                mask="999999"
                placeholder="Код из СМС"
                placeholderTextColor={"#78716C"}
                keyboardType='numeric'
                style={styles.input}
                onChangeText={handleCodeChange} />
        </KeyboardAvoidingView>
        <View style={{width:"100%",paddingHorizontal:53}}>
        <GradientButton
            active={!timer}
            onPress={reCode}
            
            >
            <Text style={{fontSize:14,fontFamily:"SF Pro Display",fontWeight:"400"}}>Отправить код повторно</Text>
        </GradientButton>
        </View>
        <View>
            {second>=0&&<Text style={{fontSize:14,fontFamily:"SF Pro Display",fontWeight:"400"}}>{"00:"+(second<10?"0"+second:second)}</Text>}
        </View>
    </>
    )
}


const styles = StyleSheet.create({

    input: {
        width: 280,
        height: 25,
        marginVertical: 20,
        marginTop: 150,
        padding: 5,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
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

export default CodeScene;