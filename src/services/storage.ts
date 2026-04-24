import EncryptedStorage from 'react-native-encrypted-storage';
import { UserDataType } from '../types/auth';

const SESSION_KEY = 'user_session';

export const storeUserSession = async (userData: UserDataType) => {
  try {
    await EncryptedStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  } catch (error) {
    console.log('error storing data', error);
  }
};

export const retrieveUserSession = async () => {
  try {
    const sessionData = await EncryptedStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.log('error retrieving data', error);
  }
};

export const clearUserSession = async () => {
  try {
    await EncryptedStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.log('error clearing user session', error);
  }
};
