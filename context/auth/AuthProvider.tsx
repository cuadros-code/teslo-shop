import React, { useReducer } from 'react';
import { tesloApi } from 'api';
import Cookie from 'js-cookie';
import axios from 'axios';
import { IUser } from 'interfaces/user';
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

  const loginUser = async ( email: string, password: string ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - login', payload: user });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const registerUser = async ( name:string, email: string, password: string ): Promise<{
    hasError: boolean;
    message?: any;
  }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - login', payload: user });
      return {
        hasError: false,
        message: 'Usuario registrado correctamente'
      }
    } catch (error: any) {
      let { message } = error.response.data;
      if(axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: message
        }
      }
      return {
        hasError: true,
        message: 'Error inesperado'
      }
    }
  }


  return (
    <AuthContext.Provider 
      value={{
        ...state,
        loginUser,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}