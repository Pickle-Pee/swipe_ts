import React, { useState, useEffect, useRef } from "react";
import { Image, Button, Center, Text, KeyboardAvoidingView, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import GradientButton from '../../../assets/elements/elements';
import auth from '@react-native-firebase/auth';
import { MaskedTextInput } from 'react-native-mask-text';
import axios from 'axios';
import { useUserContext } from "../../../utils/UserContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaView } from "react-native-safe-area-context";

const PersonPhoneNumberInput = ({ navigation, onLogin }) => { // Добавляем параметр onLogin
    const [phoneNumber, setPhoneNumber] = useState('');
    const [unMaskedValue, setUnmaskedValue] = useState("");
    const maskedInputRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const { user, setUser } = useUserContext();


    const handleTextChange = (text, rawText) => {
        setUnmaskedValue(rawText);
        setPhoneNumber(rawText);
    };

    const handleLogin = async () => {
        try {
            const phoneNumber = `+${unMaskedValue}`;
            const unmaskedPhoneNumber = `${unMaskedValue}`;
            const response = await axios.post('http://193.164.150.223:1024/api/login', { phone_number: unmaskedPhoneNumber });
            const user = response.data.user;
            if (user) {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                setUser(user);
                // console.log('Код подтверждения отправлен на номер телефона', phoneNumber);
                console.log('user data:', user);
            } else {
                setError('user not found');
            }
            setLoggedIn(true);
        } catch (error) {
            console.error('Ошибка авторизации', error);
        }
    };

    const handleCodeChange = async (code) => {
        try {
            const phoneNumber = `+${unMaskedValue}`;
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            await confirmation.confirm(code);
            onLogin({ phoneNumber, code });
            navigation.navigate('Tab');
        } catch (error) {
            console.error('Error verifying code', error);
            setError('Неверный код. Попробуйте еще раз.');
        }
    };


    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
                <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.topBigText}>
                    Добавление номера телефона
                </Text>

                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}>
                    <MaskedTextInput
                        mask="+7 (999) 999-99-99"
                        placeholder="Номер телефона"
                        onChangeText={(text, rawText) => {
                            setUnmaskedValue(rawText);
                            setPhoneNumber(rawText);
                            handleTextChange(text, rawText);
                        }}
                        keyboardType="numeric"
                        style={styles.input}
                        ref={maskedInputRef}
                    />
                </KeyboardAvoidingView>

                <GradientButton onPress={handleLogin}>
                    <Text fontSize="sm" p={2}>Войти</Text>
                </GradientButton>
            </View>
        </SafeAreaView>

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
        width: '70%'
    },
})

export default PersonPhoneNumberInput;