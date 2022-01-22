import {
    SHIPPING_LOADING,
    SHIPPING_STOPLOADING,
    LIST_SHIPPING
  } from '../actions/types';
   
   const initialState = {
     shippingloading: false,
     listshipping:[],
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case SHIPPING_LOADING:
         return {
           ...state,
           shippingloading: true
         };
         case SHIPPING_STOPLOADING:
         return {
           ...state,
           shippingloading: false
         };
        case LIST_SHIPPING:
        return {
          ...state,
          listshipping: action.payload,
          shippingloading: false
       };
       default:
         return state;
     }
   }
   