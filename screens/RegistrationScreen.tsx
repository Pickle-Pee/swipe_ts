import React, { useState } from 'react';
import { Text, View, Center, FormControl, Input, IconButton, Icon, KeyboardAvoidingView, Stack } from 'native-base';
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../assets/elements/elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PersonDataScreen from './PersonDataScreen';


export default RegistrationScreen = ({ navigation }) => {

    return <PersonDataScreen />
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    topBigText: {
        fontSize: 22,
        textAlign: 'center',
        // flex: 1,
        paddingTop: 50
    }
})
