import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './Screens/ChatScreen/ChatScreen';
import CommunicationScreen from './Screens/CommunicationScreen/CommunicationScreen';
import EditInterecting from './Screens/EditInterecting/EditInterecting';
import EditProfile from './Screens/EditProfile/EditProfile';
import LikesScreen from './Screens/LikesScreen/LikesScreen';
import MainLoader from './Screens/MainLoader/MainLoader';
import MatchScreen from './Screens/MatchScreen/MatchScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import TabNavigator from './Screens/TabNavigator/TabNavigator';
import Options from './Screens/Options/Options';

const MainStack = createStackNavigator();

export enum MainNavigationName{
    mainLoader="MainLoader",
    tabNavigator="TabNavigator",
    editProfile="EditProfile",
    editInterecting="EditInterecting",
    chat="Chat",
    communicationScreen="CommunicationScreen",
    likesScreen="LikesScreen",
    matchScreen="MatchScreen",
    profileScreen="ProfileScreen",
    options="Options"
  }


const MainNavigator = () => {

return (
    <MainStack.Navigator screenOptions={{ headerShown: false}} >
      <MainStack.Screen name={MainNavigationName.mainLoader} component={MainLoader} />
      <MainStack.Screen name={MainNavigationName.tabNavigator} component={TabNavigator} />
      <MainStack.Screen name={MainNavigationName.editProfile} component={EditProfile} />
      <MainStack.Screen name={MainNavigationName.editInterecting}component={EditInterecting} />
      <MainStack.Screen name={MainNavigationName.chat} component={ChatScreen} />
      <MainStack.Screen name={MainNavigationName.communicationScreen} component={CommunicationScreen} />
      <MainStack.Screen name={MainNavigationName.likesScreen} component={LikesScreen} />
      <MainStack.Screen name={MainNavigationName.matchScreen} component={MatchScreen} />
      <MainStack.Screen name={MainNavigationName.profileScreen} component={ProfileScreen} />
      <MainStack.Screen name={MainNavigationName.options} component={Options} />
    </MainStack.Navigator>
  )}

  export default MainNavigator;