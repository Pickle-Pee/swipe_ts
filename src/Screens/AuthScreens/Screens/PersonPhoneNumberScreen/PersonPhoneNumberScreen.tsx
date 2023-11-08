import React, { useState, useEffect, useRef, FC } from "react";
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, View, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import PhoneScene from "./Scene/PhoneScene";
import CodeScene from "./Scene/CodeScene";
import { AuthNavigationName } from "../../AuthScreen";

interface ErrorType {
    message: string | null;
}

const PersonPhoneNumberScreen:FC<{navigation:any }> = ({ navigation }) => {

    const [authStep, setAuthStep] = useState('phone');

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <SafeAreaView style={{height:"100%",backgroundColor:'white'}}>
            <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
                    <TouchableOpacity
                    onPress={() => authStep=="phone"?navigation.navigate(AuthNavigationName.personNameScreen):setAuthStep("phone")}>
                        <FontAwesomeIcon icon={faArrowLeft} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate(AuthNavigationName.homeScreen)}>
                        <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                </View>
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
        </Pressable>
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