import { FC, useState } from "react"
import { Image, Button, View, Text, KeyboardAvoidingView } from 'native-base';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { UserHttp } from "../../../http/user/httpUser";
import { useAppSelector } from "../../../store/typesHooks";
import { IUserTempData } from "../../../store/reducers/tempUserDataReducer";
import GradientButton from "../../../../assets/elements/elements";
import { getCode } from "../helpers/getCode";



interface ErrorType {
    message: string | null;
}

const CodeScene:FC<{navigation:any}>=({navigation})=>{
    const [error, setError] = useState<ErrorType>({ message: null });
    const [blocked,setBlocked]=useState<boolean>(false);
    const {phoneNumber,firstName,lastName,dateOfBirth,gender}=useAppSelector(state=>state.tempUser)
    

    const registration=async()=>{
        const userData : IUserTempData={
            phoneNumber,
            firstName,
            lastName,
            dateOfBirth,
            gender
        }
       const status : number = await new UserHttp().registration(userData);
       if(status===0){
        navigation.navigate("MainStack")
       }
    }

    const handleCodeChange = async (code: string) => {
            if (code.length === 6) {
                setBlocked(true);
                new UserHttp().checkCode(phoneNumber,code).then(value=>{
                    if(value==0){
                        registration();
                    }
                }).finally(()=>{
                    setBlocked(false);
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
        <GradientButton
            disabled={blocked}
            onPress={reCode}>
            <Text fontSize="sm" p={2}>Отправить код повторно</Text>
        </GradientButton>
        <TouchableOpacity onPress={showAlert}>
            <Text>показать код</Text>
        </TouchableOpacity>
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