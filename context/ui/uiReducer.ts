import { UiState } from "./UiProvider";

type UiType = 
  | { type: 'action'}

export const uiReducer = ( state: UiState, action: UiType ): UiState => {
 switch (action.type) {
   case 'action':
     return {
       ...state,
     }
   default:
     return state;
 }
}