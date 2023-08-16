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
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientButton from '../assets/elements/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CitySearchInput from '../components/CitySearcInput';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const PersonDataScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [textName, setTextName] = useState('');
  const [textSecondName, setTextSecondName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nameError, setNameError] = useState(false);
  const [secondNameError, setSecondNameError] = useState(false);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState('');

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
      console.log('Access Token:', token);
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

  const handleDateChange = (event: any, selected: any) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
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

    console.log(getToken)

    try {
      const token = await getToken(); // Получение токена
      const response = await axios.post('http://193.164.150.223:1024/api/add_register_data', {
        phone_number: phoneNumber,
        first_name: textName,
        last_name: textSecondName,
        date_of_birth: selectedDate.toISOString().split('T')[0],
        gender: selectedGender,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });

      console.log('Response data:', response.data);

      if (response && response.data && response.data.message) {
        // Обработка успешного добавления данных
        console.log(response.data.message);
      } else {
        setError('Ошибка при добавлении данных пользователя');
      }
    } catch (error) {
      console.error('Error adding user data', error);
      setError('Ошибка при добавлении данных пользователя');
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ height: '100%' }}>
        <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
          <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
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
              placeholderTextColor={nameError ? 'red' : 'grey'}
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
              ) : null as ReactNode} />
            <Input
              style={styles.input}
              p={2}
              m={2}
              mb={5}
              placeholder={secondNameError ? 'Это обязательное поле' : 'Фамилия'}
              value={textSecondName}
              onChangeText={handleSecondNameChange}
              keyboardType='default'
              variant="underlined"
              isInvalid={secondNameError}
              InputRightElement={textSecondName !== '' && (
                <IconButton
                  icon={<FontAwesomeIcon icon={faXmarkCircle} size={15} color="black" />}
                  onPress={clearInputSecondName} />
              )} />

            <Select minWidth="300"
              accessibilityLabel="Укажите ваш пол"
              placeholder="Укажите ваш пол"
              _selectedItem={{
                endIcon: <CheckIcon size={5} />
              }}
              mt="1"
              mb="1"
              onValueChange={selectedGender => setSelectedGender(value)}>
              <Select.Item label="Мужской" value="male" />
              <Select.Item label="Женский" value="female" />
            </Select>


            <Text style={{ fontSize: 16, paddingBottom: 10 }}>Выберите дату своего рождения</Text>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />

          </Center>
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
  }
})

export default PersonDataScreen;

