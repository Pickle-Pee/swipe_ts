import React, { useState } from 'react';
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
import { Input, Center, IconButton, Text } from 'native-base';
import GradientButton from '../assets/elements/elements';

const PersonNameScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const [textName, setTextName] = useState('');
  const [textSecondName, setTextSecondName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [secondNameError, setSecondNameError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const clearInputName = () => {
    setTextName('');
  };

  const clearInputSecondName = () => {
    setTextSecondName('');
  };

  const handleNameChange = (text: string) => {
    const filteredText = text.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    if (filteredText !== text) {
      Alert.alert(
        'Ошибка ввода',
        'Введите только буквы кириллицы (без символов, цифр и латиницы)',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    setTextName(filteredText);
  };

  const handleSecondNameChange = (text: string) => {
    const filteredText = text.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    if (filteredText !== text) {
      Alert.alert(
        'Ошибка ввода',
        'Введите только буквы кириллицы (без символов, цифр и латиницы)',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    setTextSecondName(filteredText);
  };

  const handleContinue = async () => {
    if (textName.trim() === '') {
      setNameError(true);
      return;
    }

    if (textSecondName.trim() === '') {
      setSecondNameError(true);
      return;
    }
    navigation.navigate("PersonBirthDateScreen", { firstName: textName, lastName: textSecondName })
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
            Привет! Давай создадим твой профиль
          </Text>
          <Text style={{ paddingTop: 20, textAlign: 'center' }}>
            Введите свои данные для создания аккаунта
          </Text>
          <Center p="10">
            <Input
              style={styles.input}
              p={2}
              m={2}
              mt={70}
              placeholder={nameError ? 'Это обязательное поле' : 'Имя'}
              placeholderTextColor={nameError ? 'red' : "#78716C"}
              value={textName}
              onChangeText={handleNameChange}
              keyboardType='default'
              variant="underlined"
              isInvalid={nameError}
              InputRightElement={textName !== '' ? (
                <IconButton
                  icon={<FontAwesomeIcon icon={faXmarkCircle} size={15} color="black" />}
                  onPress={clearInputName}
                />
              ) : undefined}
            />
            <Input
              style={styles.input}
              p={2}
              m={2}
              mb={5}
              placeholder={secondNameError ? 'Это обязательное поле' : 'Фамилия'}
              placeholderTextColor={nameError ? 'red' : "#78716C"}
              value={textSecondName}
              onChangeText={handleSecondNameChange}
              keyboardType='default'
              variant="underlined"
              isInvalid={secondNameError}
              InputRightElement={textSecondName !== '' ? (
                <IconButton
                  icon={<FontAwesomeIcon icon={faXmarkCircle} size={15} color="black" />}
                  onPress={clearInputSecondName}
                />
              ) : undefined}
            />

          </Center>
        </KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <GradientButton
            onPress={handleContinue}
            disabled={isButtonDisabled}
          >
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
  }
})

export default PersonNameScreen;

