import React from 'react';
import { StyleSheet } from 'react-native';
import PersonNameScreen from './PersonNameScreen';
import { PersonNameScreenProps } from '../App';

const RegistrationScreen = ({ navigation, route}: PersonNameScreenProps) => {

    return <PersonNameScreen navigation={navigation} route={route} />
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
        paddingTop: 50
    }
})

export default RegistrationScreen;
