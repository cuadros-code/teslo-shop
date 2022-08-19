import { IUser } from "interfaces/user";
import { AuthState } from "./AuthProvider";

type AuthType = 
  | { type: '[Auth] - login', payload: IUser }
  | { type: '[Auth] - logout' }


export const authReducer = ( state: AuthState, action: AuthType ): AuthState => {
  switch (action.type) {
    case '[Auth] - login':
      return {
        ...state,
        isLoggedIn: true,
        user      : action.payload,
      }
    case '[Auth] - logout':
      return {
        ...state,
        isLoggedIn: false,
        user      : undefined,
      }
    default:
      return state;
  }
}