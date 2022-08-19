import { IUser } from 'interfaces/user';
import React, { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

export interface AuthState {
  isLoggedIn  : boolean;
  user       ?: IUser;
}

const AUTH_STATE_INITIAL: AuthState = {
  isLoggedIn: false,
  user      : undefined,
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_STATE_INITIAL )


  return (
    <AuthContext.Provider 
      value={{
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}