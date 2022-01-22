import {
  PRODUCT_LOADING,
  PRODUCT_STOPLOADING,
  LIST_PRODUCT,
  GET_PRODUCT_SLIDER,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../actions/types";

const initialState = {
  productloading: false,
  listproduct: null,
  productslider: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        productloading: true,
      };
    case PRODUCT_STOPLOADING:
      return {
        ...state,
        productloading: false,
      };
    case LIST_PRODUCT:
      return {
        ...state,
        listproduct: action.payload,
        productloading: false,
      };
    case GET_PRODUCT_SLIDER:
      return {
        ...state,
        productslider: action.payload,
        productloading: false,
      };
    default:
      return state;
  }
}

export const getProductReducer = (
  state = { product: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_LOADING:
      return { loading: true };
    case GET_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

