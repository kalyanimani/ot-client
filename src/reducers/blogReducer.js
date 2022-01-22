import {
    BLOG_LOADING,
    BLOG_STOPLOADING,
    LIST_BLOG
  } from '../actions/types';
   
   const initialState = {
     blogloading: false,
     listblog:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case BLOG_LOADING:
         return {
           ...state,
           blogloading: true
         };
         case BLOG_STOPLOADING:
         return {
           ...state,
           blogloading: false
         };
        case LIST_BLOG:
        return {
          ...state,
          listblog: action.payload,
          blogloading: false
       };
       default:
         return state;
     }
   }
   