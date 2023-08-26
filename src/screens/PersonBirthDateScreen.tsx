import React, { ReactNode, useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Alert,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { Input, Center, IconButton, Text, Select, CheckIcon } from 'native-base';
import GradientButton from '../../assets/elements/elements';
import BirthdayPicker from './components/BirthdayPicker';
import { useAppDispatch, useAppSelector } from '../store/typesHooks';
import { State } from 'react-native-gesture-handler';
import { updateUserBirth } from '../store/reducers/tempUserDataReducer';

const PersonBirthDateScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
   
    const dispatch=useAppDispatch();

    const handleBirthdaySelected = (formattedBirthday: string) => {
        dispatch(updateUserBirth({dateOfBirth:formattedBirthday}))
      };

    const handleContinue = async () => {

        navigation.navigate("PersonGenderSelectScreen")
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ height: '100%' }}>
                <TouchableOpacity
                    style={{ alignItems: "flex-end" }}
                    onPress={() => navigation.navigate('AuthScreen')}>
                    <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                </TouchableOpacity>
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}>
                    <Text style={styles.topBigText}>
                        Когда у тебя День рождения?
                    </Text>
                    <Text style={{ paddingTop: 20, textAlign: 'center' }}>
                        Выберите дату своего рождения
                    </Text>
                        <BirthdayPicker onBirthdaySelected={handleBirthdaySelected}/>
                </KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <GradientButton
                        onPress={handleContinue}>
                        <Text fontSize="sm" p={2}>Продолжить</Text>
                    </GradientButton>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'flex-start',
    },
    topBigText: {
        fontSize: 22,
        textAlign: 'center',
        paddingTop: 50
    },
    input: {
        fontSize: 16,
        fontWeight: '500'
    },
    genderView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default PersonBirthDateScreen;

