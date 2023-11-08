import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import PersonBirthDateScreen from './Screens/PersonBirthDateScreen/PersonBirthDateScreen';
import PersonGenderSelectScreen from './Screens/PersonGenderSelectScreen/PersonGenderSelectScreen';
import PersonNameScreen from './Screens/PersonNameScreen/PersonNameScreen';
import PersonPhoneNumberScreen from './Screens/PersonPhoneNumberScreen/PersonPhoneNumberScreen';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import PersonCityScreen from './Screens/PersonCityScreen/PersonCityScreen';

const AuthStack = createStackNavigator();


export enum AuthNavigationName{
    homeScreen="HomeScreen",
    registrationScreen="RegistrationScreen",
    personPhoneNumberScreen="PersonPhoneNumberScreen",
    personNameScreen="PersonNameScreen",
    personBirthDateScreen="PersonBirthDateScreen",
    personGenderSelectScreen="PersonGenderSelectScreen",
    loginScreen="LoginScreen",
    cityScreen="CityScreen"
  }

const AuthNavigator = () =>{
    return(
        <AuthStack.Navigator screenOptions={{ headerShown: false }} >
        <AuthStack.Screen name={AuthNavigationName.homeScreen} component={HomeScreen} />
        <AuthStack.Screen name={AuthNavigationName.registrationScreen} component={RegistrationScreen} />
        <AuthStack.Screen name={AuthNavigationName.personPhoneNumberScreen} component={PersonPhoneNumberScreen} />
        <AuthStack.Screen name={AuthNavigationName.cityScreen} component={PersonCityScreen} />
        <AuthStack.Screen name={AuthNavigationName.personNameScreen} component={PersonNameScreen} />
        <AuthStack.Screen name={AuthNavigationName.personBirthDateScreen} component={PersonBirthDateScreen} />
        <AuthStack.Screen name={AuthNavigationName.personGenderSelectScreen} component={PersonGenderSelectScreen} />
        <AuthStack.Screen name={AuthNavigationName.loginScreen} component={LoginScreen} />
      </AuthStack.Navigator>
    )
  }

  export default AuthNavigator;