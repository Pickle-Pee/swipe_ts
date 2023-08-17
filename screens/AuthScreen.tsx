import React, { useState, useEffect, useRef } from "react";
import { Image, Button, Center, Text, KeyboardAvoidingView, View } from 'native-base';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ViewStyle, TextStyle } from 'react-native';
import GradientButton from '../assets/elements/elements';
import { MaskedTextInput } from 'react-native-mask-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from "../utils/UserContext";

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

  const saveToken = async (token: string) => {
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
        console.log(response)
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
      console.log("handleCodeChange called with code:", code);
      if (code.length === 6) {
        const response = await axios.post(
          `http://193.164.150.223:1024/api/login?phone_number=${phoneNumber}&code=${code}`
        );
        const responseUserData = await axios.get(
          `http://193.164.150.223:1024/api/user/${phoneNumber}`
        );

        console.log(responseUserData)

        if (response && response.data && response.data.access_token) {
          const finalAccessToken = response.data.access_token;

          if (finalAccessToken) {
            await saveToken(finalAccessToken);

            const user = {
              accessToken: finalAccessToken,
            };

            const userData = responseUserData.data[0];

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Center p="0" flex={1}>
        <Image
          source={require("../assets/logo.png")}
          alt="logo"
          mb={50}
          size="xl"
        />

        {authStep === "phone" && (
          <>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}
              >
                Введите номер телефона
              </Text>
              <View style={styles.inputContainer}>
                <MaskedTextInput
                  mask="+7 (999) 999-99-99"
                  placeholder="Номер телефона"
                  placeholderTextColor={"#78716C"}
                  onChangeText={(text, rawText) => {
                    handleTextChange(text, rawText);
                  }}
                  keyboardType="numeric"
                  style={styles.input}
                  ref={maskedInputRef}
                />
              </View>
            </KeyboardAvoidingView>
            {/* <View>
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View> */}
            <GradientButton
              onPress={handleLogin}
              disabled={isButtonDisabled || isCheckingPhoneNumber}
            >
              <Text fontSize="sm" p={2}>
                Войти
              </Text>
            </GradientButton>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PersonPhoneNumberScreen");
              }}
            >
              <Text fontSize="sm" pt={2}>
                Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </>
        )}

        {authStep === "code" && (
          <>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}
              >
                Введите код из СМС
              </Text>
              <MaskedTextInput
                mask="999999"
                placeholder="Код из СМС"
                placeholderTextColor={"#78716C"}
                keyboardType="numeric"
                style={styles.input}
                onChangeText={handleCodeChange}
              />
            </KeyboardAvoidingView>
            <GradientButton onPress={handleLogin}>
              <Text fontSize="sm" p={2}>
                Отправить код повторно
              </Text>
            </GradientButton>
            <TouchableOpacity onPress={showAlert}>
              <Text>показать код</Text>
            </TouchableOpacity>
          </>
        )}
      </Center>
    </TouchableWithoutFeedback>
  );
};

interface Styles {
  inputContainer: ViewStyle;
  input: TextStyle;
  errorText: TextStyle;
}

const styles: Styles = {
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
