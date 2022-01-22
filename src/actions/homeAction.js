import axios from 'axios';
import {
  HOME_LOADING,
  HOME_STOPLOADING,
  LIST_HOME,
  GET_ERRORS,
} from './types';
import {API_URL} from './constant'

// Get all blog
export const listHome= () => dispatch => {
  dispatch(setHomeLoading());
  axios
    .get(API_URL+'/api/setting/home')
    .then(res =>{
      dispatch({
        type: LIST_HOME,
        payload:res.data
      })
    })
    .catch(err =>{
      console.log("err data",err)
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
      })

    });
};


// Home loading
export const setHomeLoading = () => {
    return {
      type: HOME_LOADING
    };
  };
  export const stopHomeLoading = () => {
    return {
      type: HOME_STOPLOADING
    };
  };