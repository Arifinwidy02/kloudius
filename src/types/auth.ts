export interface DataLoginType {
  email: string;
  password: string;
}

export interface DataSignUpType extends DataLoginType {
  name: string;
}

export interface StoredUser extends DataLoginType {
  id: number;
  name: string;
}

export interface UserDataType {
  email: string;
  token: string;
  loginAt: number;
}

export type AuthActionResult =
  | { success: true; message?: string }
  | { success: false; message: string };

export interface AuthContextValue {
  email: string | null;
  loading: boolean;
  userToken: string | null;
  signIn: (data: DataLoginType) => Promise<AuthActionResult>;
  signUp: (data: DataSignUpType) => Promise<AuthActionResult>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
