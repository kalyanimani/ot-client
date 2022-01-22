import axios from 'axios';
import {
  PRODUCT_LOADING,
  PRODUCT_STOPLOADING,
  LIST_PRODUCT,
  GET_PRODUCT_SLIDER,
  GET_ERRORS,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_ATTRIBUTE_LOADING,
  GET_PRODUCT_ATTRIBUTE_SUCCESS,
  GET_PRODUCT_ATTRIBUTE_FAIL,
} from "./types";
import { API_URL } from "./constant";

// Get all product
export const listProduct= (data) => dispatch => {
  dispatch(setProductLoading());
  axios
    .post(API_URL+'/api/product/web',data)
    .then(res =>{
      dispatch({
        type: LIST_PRODUCT,
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

// Get all product
export const listProductSlider= (data) => dispatch => {
  dispatch(setProductLoading());
  axios
    .post(API_URL+'/api/product/web/getshop',data)
    .then(res =>{
      dispatch({
        type: GET_PRODUCT_SLIDER,
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


// Product loading
export const setProductLoading = () => {
    return {
      type: PRODUCT_LOADING
    };
  };

export const stopProductLoading = () => {
  return {
    type: PRODUCT_STOPLOADING,
  };
};

// GET PRODUCT BY THEIR ID

export const productFind = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_LOADING });

    const { data } = await axios.post(
      "http://3.238.89.147:5000/api/product/detail",
      {
        productID: "614d7297a9c0ba3aeec9e672",
      }
    );
    console.log("hey data" + data._id);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const attributeFind = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_ATTRIBUTE_LOADING });

    const { data } = await axios.post(
      "http://3.238.89.147:5000/api/product/attribute",
      {
        productID: "614d7297a9c0ba3aeec9e672",
      }
    );
    console.log("hey data" + data._id);
    dispatch({ type: GET_PRODUCT_ATTRIBUTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_ATTRIBUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
