import axios from 'axios';
import {
  SHIPPING_LOADING,
  SHIPPING_STOPLOADING,
  LIST_SHIPPING,
  GET_ERRORS,
} from './types';
import {API_URL} from './constant'

// Get all blog
export const listShipping= () => dispatch => {
  dispatch(setShippingLoading());
  axios
    .get(API_URL+'/api/shipping/web')
    .then(res =>{
      dispatch({
        type: LIST_SHIPPING,
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


// Shipping loading
export const setShippingLoading = () => {
    return {
      type: SHIPPING_LOADING
    };
  };
  export const stopShippingLoading = () => {
    return {
      type: SHIPPING_STOPLOADING
    };
  };