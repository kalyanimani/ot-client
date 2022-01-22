import {
    HOME_LOADING,
    HOME_STOPLOADING,
    LIST_HOME
  } from '../actions/types';
   
   const initialState = {
     homeloading: false,
     listhome:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case HOME_LOADING:
         return {
           ...state,
           homeloading: true
         };
         case HOME_STOPLOADING:
         return {
           ...state,
           homeloading: false
         };
        case LIST_HOME:
        return {
          ...state,
          listhome: action.payload,
          homeloading: false
       };
       default:
         return state;
     }
   }
   