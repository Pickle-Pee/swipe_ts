import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  accessToken: string;
}

interface UserFullData {
  phoneNumber: string,
  firstName: string,
  lastName: string,
  dateBirth: string,
}

interface UserContextProps {
  user: UserData | null;
  isLoggedIn: boolean;
  userData: UserFullData;
  setUser: (user: UserData) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUserData: (data: any) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const logAllAsyncStorageData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
  
      console.log('All AsyncStorage Data:');
      allData.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.error('Error logging AsyncStorage data:', error);
    }
  };

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('user_full_data');
        const userTokenString = await AsyncStorage.getItem('user_data');
        if (userDataString && userTokenString) {
          const parsedUserData = JSON.parse(userDataString) as UserData;
          const parsedUserToken = JSON.parse(userDataString) as UserData;
          setUser(parsedUserToken);
          setUserData(parsedUserData);
          setIsLoggedIn(true);
          logAllAsyncStorageData();
        }
      } catch (error) {
        console.error('Error restoring user data:', error);
      }
    };

    restoreUser();
  }, []);

  const loginUser = async (userData: UserData) => {
    setUser(userData);
    setIsLoggedIn(true);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  };

  const logoutUser = async () => {
    setUser(null);
    setUserData(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('user_data');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: loginUser,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
