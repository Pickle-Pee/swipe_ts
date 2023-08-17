import React, { useState, useEffect, useRef } from "react";
import { Image, Button, View, Text, KeyboardAvoidingView } from 'native-base';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import GradientButton from '../assets/elements/elements';
import { MaskedTextInput } from 'react-native-mask-text';
import axios from 'axios';
import { useUserContext } from "../utils/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { PersonPhoneNumberScreenProps } from "../App";

interface ErrorType {
    message: string | null;
}

const PersonPhoneNumberScreen = ({ navigation, onLogin, route }: PersonPhoneNumberScreenProps) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [unMaskedValue, setUnmaskedValue] = useState("");
    const maskedInputRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState<ErrorType>({ message: null });
    const { user, setUser } = useUserContext();
    const [verificationCode, setVerificationCode] = useState('');
    const [authStep, setAuthStep] = useState('phone');
    const [phoneNumberExists, setPhoneNumberExists] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isCheckingPhoneNumber, setIsCheckingPhoneNumber] = useState(false);

    const saveToken = async (token: string) => {
        try {
            await AsyncStorage.setItem('access_token', token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    // Получение токена
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    // Удаление токена
    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('access_token');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    const handleTextChange = (text: string, rawText: string) => {
        if (rawText.length === 11) {
            setError({ message: null });
            setIsButtonDisabled(false);
        } else {
            setError({ message: null });
            setIsButtonDisabled(true);
        }
        setPhoneNumber(rawText);
    };

    axios.interceptors.request.use((config) => {
        console.log('Sending request to:', config.url, 'with data:', config.data);
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://193.164.150.223:1024/api/send-code?phone_number=${phoneNumber}`);
            const accessToken = response.data.access_token;
            if (accessToken) {
                await saveToken(accessToken); // Сохранение токена
                setVerificationCode(response.data.verification_code);
                console.log(response.data.verification_code)
                setAuthStep('code');
            } else {
                setError({ message: 'user not found' });
            }
        } catch (error) {
            console.error('Ошибка авторизации', error);
        }
    };

    const handleCheckPhoneNumber = async () => {
        if (phoneNumber.length === 11) {
            setIsCheckingPhoneNumber(true);
            try {
                const checkNumberResponse = await axios.get(`http://193.164.150.223:1024/api/user/${phoneNumber}`);
                if (checkNumberResponse.status === 200) {
                    setPhoneNumberExists(true);
                    setIsButtonDisabled(true);
                    setError({ message: 'Пользователь уже зарегистрирован' });
                } else {
                    setPhoneNumberExists(false);
                    setIsButtonDisabled(false);
                    setError({ message: null });
                }
            } finally {
                setIsCheckingPhoneNumber(false);
            }
        } else if (phoneNumber.length < 0) {
            setError({ message: 'Введите номер телефона' });
            setIsButtonDisabled(true);
        } else {
            setError({ message: null });
            setIsButtonDisabled(true);
        }
    };

    useEffect(() => {
        if (phoneNumber) {
            handleCheckPhoneNumber();
        }
    }, [phoneNumber]);

    const handleCodeChange = async (code: string) => {
        try {
            if (code.length === 6) {
                const response = await axios.post(`http://193.164.150.223:1024/api/register?phone_number=${phoneNumber}&code=${code}`);
                if (response && response.data && response.data.access_token) {
                    const finalAccessToken = response.data.access_token;
                    if (finalAccessToken) {
                        await saveToken(finalAccessToken);
                        const userData = { accessToken: finalAccessToken, phoneNumber: phoneNumber };
                        await AsyncStorage.setItem('user_data', JSON.stringify(userData));
                        await saveToken(finalAccessToken);
                        navigation.navigate('PersonDataScreen', { phoneNumber: phoneNumber });
                    } else {
                        setError({ message: 'Неверный код. Попробуйте еще раз.' });
                    }
                } else {
                    setError({ message: 'Неверный код. Попробуйте еще раз.' });
                }
            } else {
                setError({ message: 'Код должен состоять из 6 цифр.' });
            }
        } catch (error) {
            console.error('Error verifying code', error);
            setError({ message: 'Неверный код. Попробуйте еще раз.' });
        }
    };


    const showAlert = () => {
        Alert.alert(
            "Ваш код из СМС",
            `Отправленный код: ${verificationCode}`,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
                    <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
                </TouchableOpacity>
                <View style={styles.container}>
                    {authStep === 'phone' && (
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
                                        keyboardType="numeric"
                                        style={styles.input}
                                        ref={maskedInputRef}
                                    />
                                </KeyboardAvoidingView>
                            </View>


                            <GradientButton onPress={handleLogin} disabled={isButtonDisabled}>
                                <Text fontSize="sm" p={2}>Продолжить</Text>
                            </GradientButton>

                            <Text style={{ textAlign: 'center', width: '90%', paddingTop: 20 }}>
                                Вы можете получать от нас sms-уведомления в целях безопасности и выполнения входа
                            </Text>
                        </>
                    )}

                    {authStep === 'code' && (
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
                                onPress={handleLogin}>
                                <Text fontSize="sm" p={2}>Отправить код повторно</Text>
                            </GradientButton><TouchableOpacity onPress={showAlert}>
                                <Text>показать код</Text>
                            </TouchableOpacity>
                        </>)}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
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

export default PersonPhoneNumberScreen;