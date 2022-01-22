import *  as types from './types';

export function getWishlist() {
    return (dispatch) => {
        dispatch({
            type: types.GET_WISHLIST_SUCCESS
        });
    }
}
export function loadWishlist(productList) {
    return (dispatch) => {
        dispatch({
            type: types.LOAD_WISHLIST,
            item: productList
        });
    }   
}

export function addToWishlist(cartItem) {
    return (dispatch) => {
     

        dispatch({
            type: types.ADD_TO_WISHLIST_SUCCESS,
            item: cartItem
        });
    }   
}

export function removeFromWishlist(item) {
    return (dispatch) => {
        dispatch({
            type: types.REMOVE_FROM_WISHLIST_SUCCESS,
            item: item
        });
    }
}