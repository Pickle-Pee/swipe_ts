import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  accessToken: string;
}

interface UserContextProps {
  user: UserData | null;
  isLoggedIn: boolean;
  userData: any;
  setUser: (user: UserData | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUserData: (data: any) => void;
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

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('user_data');
        if (userString) {
          const parsedUser = JSON.parse(userString) as UserData;
          setUser(parsedUser);
          setIsLoggedIn(true);
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
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('user_data');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: loginUser, // Use the new loginUser function
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        logoutUser, // Add the new logoutUser function
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
