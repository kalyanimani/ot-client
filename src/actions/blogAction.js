import axios from 'axios';
import {
  BLOG_LOADING,
  BLOG_STOPLOADING,
  LIST_BLOG,
  GET_ERRORS,
} from './types';
import {API_URL} from './constant'

// Get all blog
export const listBlog= (data) => dispatch => {
  dispatch(setBlogLoading());
  axios
    .post(API_URL+'/api/blog/web',data)
    .then(res =>{
      dispatch({
        type: LIST_BLOG,
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


// Blog loading
export const setBlogLoading = () => {
    return {
      type: BLOG_LOADING
    };
  };
  export const stopBlogLoading = () => {
    return {
      type: BLOG_STOPLOADING
    };
  };