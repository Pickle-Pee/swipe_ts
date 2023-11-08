import { FC, useRef, useState } from "react";
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, View, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { useAppDispatch, useAppSelector } from "../../../../../store/typesHooks/typesHooks";
import { updateUserPhoneNumber } from "../../../../../store/reducers/tempUserDataReducer";
import GradientButton from "../../../../../UIComponents/GradientButton/GradientButton";
import { ReturnedData, UserHttp } from "../../../../../http/user/httpUser";

interface ErrorType {
    isError: boolean;
    message: string;
}


interface IPhoneScene{
    setAuthStep:(step:string)=>void;
}

const PhoneScene:FC<IPhoneScene>=({setAuthStep})=>{
    const {width}=useWindowDimensions()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState<ErrorType>({ message: "",isError:false });
    const dispatch=useAppDispatch();
    const {phoneNumber}=useAppSelector(state=>state.tempUser)


    const getCode = async (phoneNumber:string) : Promise<number> => {
        
        const status : ReturnedData = await new UserHttp().sendCode(phoneNumber);
        return status.code
    };

    const handleTextChange = (text: string, rawText: string) => { 
        dispatch(updateUserPhoneNumber({phoneNumber:rawText}))
        if(error.isError){
           
            setError({
                isError:false,
                message:""
            })
           
        }
        if (rawText.length === 11) {
            setIsButtonDisabled(false);
        } else {  
            setIsButtonDisabled(true);
        }
        
    };

    const handleClick=async()=>{
      const phoneValid : ReturnedData = await new UserHttp().checkMobile(phoneNumber);
      if(phoneValid.code!=0){
        console.log(phoneValid.code/100);
        
        if(phoneValid.code-phoneValid.code%100==600){
            setIsButtonDisabled(true);
            setError({
                isError:true,
                message:phoneValid.message
            })
        }
        return;
      }  
    const status : number =  await getCode(phoneNumber);
    if(status==0){
        setAuthStep("code");
    }else{
        
    }
    }

console.log(phoneNumber.length);

    return(
        <>
            <Text style={styles.topBigText}>
                                Добавление номера телефона
                            </Text>
                            <View style={styles.inputContainer}>
                                {error && (
                                    <Text style={styles.errorText}>
                                        {error.message}
                                    </Text>
                                )}
                                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}>
                                    <MaskedTextInput
                                        mask="+7 (999) 999-99-99"
                                        placeholder="Номер телефона"
                                        placeholderTextColor={"#78716C"}
                                        onChangeText={(text, rawText) => {
                                            handleTextChange(text, rawText);
                                        }}
                                        value={phoneNumber}
                                        keyboardType="numeric"
                                        style={styles.input}
                                        
                                    />
                                </KeyboardAvoidingView>
                            </View>
                           
                            <View style={{width:width-106,alignSelf:'center'}}>
                                <GradientButton onPress={handleClick} active={!isButtonDisabled}>
                                    <Text >Продолжить</Text>
                                </GradientButton>
                            </View>
                            

                            <Text style={{ textAlign: 'center', width: '90%', paddingTop: 20 }}>
                                Вы можете получать от нас sms-уведомления в целях безопасности и выполнения входа
                            </Text>
                        
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

export default PhoneScene;