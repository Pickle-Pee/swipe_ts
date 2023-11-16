import React, { useState, useEffect, useRef } from "react";
import { Image, Button, Center, Text, KeyboardAvoidingView, View } from 'native-base';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ViewStyle, TextStyle, SafeAreaView } from 'react-native';
import GradientButton from '../../assets/elements/elements';
import { MaskedTextInput } from 'react-native-mask-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from "../../utils/UserContext";
import { AuthNavigationName } from "../../App";

type AuthStep = "phone" | "code";

const AuthScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const maskedInputRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [authStep, setAuthStep] = useState<AuthStep>("phone");
  const [phoneNumberExists, setPhoneNumberExists] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isCheckingPhoneNumber, setIsCheckingPhoneNumber] = useState<boolean>(false);
  const { setUser, setUserData } = useUserContext();

  const saveUserData = async (data: any, token: string) => {
    try {
      await AsyncStorage.setItem("user_full_data", JSON.stringify(data));
      await AsyncStorage.setItem("access_token", token);
      console.log("data saved");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const saveToken = async ( token: string) => {
    try {
      await AsyncStorage.setItem("access_token", token);
      console.log("token saved");
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };

  axios.interceptors.request.use(
    (config) => {
      // console.log('Sending request to:', config.url, 'with data:', config.data);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleTextChange = (text: string, rawText: string) => {
    if (rawText.length === 11) {
      setError(null);
      setIsButtonDisabled(false);
    } else if (rawText.length < 11) {
      setError("Введите номер телефона");
      setIsButtonDisabled(true);
    } else {
      setError(null);
      setIsButtonDisabled(true);
    }
    setPhoneNumber(rawText);
  };

  const handleLogin = async () => {
    try {
      if (phoneNumber.length === 11) {
        const response = await axios.post(
          `http://193.164.150.223:1024/api/send-code?phone_number=${phoneNumber}`
        );
        const accessToken = response.data.access_token;
        if (accessToken) {
          await saveToken(accessToken);
          setVerificationCode(response.data.verification_code);
          console.log(response.data.verification_code);
          setAuthStep("code");
        } else {
          setError("user not found");
        }
      } else {
        setError("Введите номер телефона");
      }
    } catch (error) {
      console.error("Ошибка авторизации", error);
    }
  };

  const handleCodeChange = async (code: string) => {
    try {
      if (code.length === 6) {
        const response = await axios.post(
          `http://193.164.150.223:1024/api/login?phone_number=${phoneNumber}&code=${code}`
        );
        const responseUserData = await axios.get(
          `http://193.164.150.223:1024/api/user/${phoneNumber}`
        );

        if (response && response.data && response.data.access_token) {
          const finalAccessToken = response.data.access_token;

          if (finalAccessToken) {
            await saveToken(finalAccessToken);

            const user = {
              accessToken: finalAccessToken,
            };

            const userData = responseUserData.data;

            const {
              phone_number,
              first_name,
              last_name,
              date_of_birth,
            } = userData;

            const formattedUserData = {
              phoneNumber: phone_number,
              firstName: first_name,
              lastName: last_name,
              dateBirth: date_of_birth,
            };

            console.log("Setting user data:", user, "User data:", formattedUserData);
            saveUserData(formattedUserData, finalAccessToken);
            setUser(user);
            setUserData(formattedUserData);
          } else {
            setError("Неверный код. Попробуйте еще раз.");
          }
        } else {
          setError("Неверный код. Попробуйте еще раз.");
        }
      } else {
        setError("Код должен состоять из 6 цифр.");
      }
    } catch (error) {
      setError("Неверный код. Попробуйте еще раз.");
    }
  };

  const handleCheckPhoneNumber = async () => {
    if (phoneNumber.length === 11) {
      setIsCheckingPhoneNumber(true);
      try {
        const checkNumberResponse = await axios.get(
          `http://193.164.150.223:1024/api/user/${phoneNumber}`
        );
        setError(null);
        setIsButtonDisabled(false);
      } catch (error) {
        setError("Пользователь не зарегистрирован");
        setIsButtonDisabled(true);
      } finally {
        setIsCheckingPhoneNumber(false);
      }
    } else {
      setError(null);
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      handleCheckPhoneNumber();
    }
  }, [phoneNumber]);

  const showAlert = () => {
    Alert.alert(
      "Ваш код из СМС",
      `Отправленный код: ${verificationCode}`,
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{alignItems:"center",height:"100%"}}>

        <Image
          source={require("../../assets/logo.png")}
          alt="logo"
          mt={175}
          
          w={101.12}
          h={89}
        />

            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
              {/* <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}
              >
                SWAP - листай и влюбляйся!
              </Text> */}
              <View style={styles.inputContainer}>
              </View>
            </KeyboardAvoidingView>
            <GradientButton
              onPress={()=>{
                navigation.navigate(AuthNavigationName.loginScreen);
              }}
              
            >
              <Text fontSize="sm" p={2}>
                Войти
              </Text>
            </GradientButton>
            <TouchableOpacity
            style={{marginTop:30}}
              onPress={() => {
                navigation.navigate(AuthNavigationName.personNameScreen);
              }}
            >
              <Text fontSize="sm" pt={2}>
                Зарегистрироваться
              </Text>
            </TouchableOpacity>
          
              <View style={{position:"absolute",bottom:25}}>
                <View style={{flexDirection:"row",marginBottom:10}}>
                  <Text style={styles.bottomText}>Продолжая, вы принимаете условия</Text>
                  <Text style={styles.bottomTextTap}> Соглашения</Text>
                </View>
                  <Text style={styles.bottomTextTap}>Конфиденциальность</Text>
              </View>
    </SafeAreaView>
  );
};

interface Styles {
  bottomText: TextStyle;
  bottomTextTap : TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  errorText: TextStyle;
}

const styles: Styles = {

  bottomText:{
    fontFamily:"SFProDisplay-Light",
    fontSize:10,
    fontWeight:"700",
    lineHeight:11.72,
    color:"#565656",
    textAlign:"center"
  },
  bottomTextTap:{
    fontFamily:"SFProDisplay-Light",
    fontSize:10,
    fontWeight:"700",
    lineHeight:11.72,
    color:"#009ADA",
    textAlign:"center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 151,
    
    height:25
  },
  input: {
    width: 280,
    height: 25,
    marginVertical: 20,
    padding: 5,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    position: "absolute"
  },
};

export default AuthScreen;
