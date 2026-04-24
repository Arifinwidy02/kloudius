import { createContext, useEffect, useState } from 'react';
import type {
  AuthContextValue,
  AuthProviderProps,
  DataLoginType,
  DataSignUpType,
  UserDataType,
} from '../types/auth';
import {
  clearUserSession,
  retrieveUserSession,
  storeUserSession,
} from '../services/storage';
import { isCheckUser } from '../utils/findUser';
import { addUser, getUsers, isUserExists } from '../services/userDB';

const defaultAuthContextValue: AuthContextValue = {
  email: null,
  loading: false,
  userToken: null,
  signIn: async () => ({ success: false, message: 'AuthProvider not mounted' }),
  signUp: async () => ({ success: false, message: 'AuthProvider not mounted' }),
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextValue>(
  defaultAuthContextValue,
);

const SESSION_TTL_MS = 6 * 60 * 1000; // --> 6 minutes

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  const signIn: AuthContextValue['signIn'] = async (data: DataLoginType) => {
    try {
      setIsLoading(true);
      const isSeedUser = isCheckUser(data);
      const storedUsers = await getUsers();

      const isStoredUser = storedUsers.some(
        u =>
          u.email.trim() === data.email.trim() && u.password === data.password,
      );

      if (isSeedUser || isStoredUser) {
        const mockToken = 'JWT_DUMMY_TOKEN' + Math.random().toString(36);
        const sessionToStore: UserDataType = {
          email: data.email,
          token: mockToken,
          loginAt: Date.now(),
        };
        await storeUserSession(sessionToStore);
        setEmail(data.email);
        setUserToken(mockToken);
        return { success: true };
      } else {
        return { success: false, message: 'invalid credentials' };
      }
    } catch (error) {
      console.log('error', error);
      return { success: false, message: 'An error occured during sign in' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp: AuthContextValue['signUp'] = async (data: DataSignUpType) => {
    try {
      setIsLoading(true);
      const isUserAlreadyExist = await isUserExists(data.email);
      if (isUserAlreadyExist)
        return { success: false, message: 'user already exist' };
      await addUser(data);
      return { success: true };
    } catch (error) {
      console.log('error', error);
      return { success: false, message: 'An error occured during sign up' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await clearUserSession();
      setEmail(null);
      setUserToken(null);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadStorageData = async () => {
      const session: UserDataType | null = await retrieveUserSession();
      if (session) {
        const isExpired = Date.now() - session.loginAt > SESSION_TTL_MS;
        if (!isExpired) {
          setEmail(session.email);
          setUserToken(session.token);
        } else {
          await clearUserSession();
        }
      }
    };
    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ email, loading, signIn, signUp, logout, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
