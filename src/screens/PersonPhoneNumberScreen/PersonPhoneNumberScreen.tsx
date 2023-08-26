import React, { useState, useEffect, useRef } from "react";
import { Image, Button, View, Text, KeyboardAvoidingView } from 'native-base';
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import GradientButton from '../../../assets/elements/elements';
import { MaskedTextInput } from 'react-native-mask-text';
import axios from 'axios';
import { useUserContext } from "../../../utils/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { PersonPhoneNumberScreenProps } from "../../../App";
import PhoneScene from "./Scene/PhoneScene";
import { UserHttp } from "../../http/user/httpUser";
import { ISendCode } from "../../http/user/models";
import CodeScene from "./Scene/CodeScene";

interface ErrorType {
    message: string | null;
}

const PersonPhoneNumberScreen = ({ navigation, route }: PersonPhoneNumberScreenProps) => {

    const [authStep, setAuthStep] = useState('phone');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <TouchableOpacity
                    style={{ alignItems: "flex-end" }}
                    onPress={() => navigation.navigate('AuthScreen')}>
                    <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                </TouchableOpacity>
                <View style={styles.container}>
                    {
                    authStep === 'phone' 
                    &&  <PhoneScene 
                            setAuthStep={setAuthStep}
                        />
                    }
                    {authStep === 'code' 
                    &&  <CodeScene
                            navigation={navigation}
                        />
                    }
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