import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import homeReducer from './homeReducer';
import blogReducer from './blogReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import shippingReducer from './shippingReducer';
import { getProductReducer } from "./productReducer";







export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    home: homeReducer,
    blog: blogReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    shipping: shippingReducer,
    getProduct: getProductReducer,
});
