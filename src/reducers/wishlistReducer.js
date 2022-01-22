import * as types from '../actions/types';
var initalWishlist=[]



const initialState = {
    wishlist:initalWishlist
}
export default function (state = initialState.wishlist, action) {
	switch (action.type) {
		case types.GET_WISHLIST_SUCCESS:
			return state;
		case types.ADD_TO_WISHLIST_SUCCESS:

			var exists = false;
			const newState = state.map(item => {
				if (item.id === action.item.id) {
					exists = true;
					return {
						...item,
						quantity: action.item.quantity
					}
				} else {
					return item
				}
			});

			if (exists) {
				return newState;
			} else {
				return [
					...state,
					action.item
				];
			}
		case types.REMOVE_FROM_WISHLIST_SUCCESS:
			const remaingList = [
				...state.filter(i => i.id !== action.item.id)
			]
			return remaingList;
		case types.LOAD_WISHLIST:
			return action.item
		default:
			return state;
	}
}