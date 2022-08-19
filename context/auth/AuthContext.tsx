import { createContext } from 'react';
import { IUser } from '../../interfaces/user';

interface AuthProps {
  isLoggedIn: boolean;
  user?     : IUser,
}

export const AuthContext = createContext({} as AuthProps);
