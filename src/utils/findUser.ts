import users from '../constant/users';
import { DataLoginType } from '../types/auth';

export const isCheckUser = (userData: DataLoginType): boolean => {
  return users.some(({ email, password }) => {
    return userData.email === email && userData.password === password;
  });
};
