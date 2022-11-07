import csrfFetch from "./csrf";
import { REMOVE_SESSION_USER } from "./session";

export const SET_WISHLIST_ITEMS = "wishlistItems/SET_WISHLIST_ITEMS";
const ADD_WISHLIST_ITEM = "wishlistItems/ADD_WISHLIST_ITEM";
const REMOVE_WISHLIST_ITEM = "wishlistItems/REMOVE_WISHLIST_ITEM";

const setWishlistItems = (payload) => {
  return {
    type: SET_WISHLIST_ITEMS,
    payload
  };
}

const addWishlistItem = (wishlistItem) => {
  return {
    type: ADD_WISHLIST_ITEM,
    payload: wishlistItem
  };
}

const removeWishlistItem = (wishlistItemId) => {
  return {
    type: REMOVE_WISHLIST_ITEM,
    payload: wishlistItemId
  };
}

export const fetchWishlistItems = (userId) => async (dispatch) => {
  const res = await csrfFetch('/api/wishlist_items/?user_id=' + userId);
  const data = await res.json();
  dispatch(setWishlistItems(data));
}

export const createWishlistItem = (wishlistItem) => async (dispatch) => {
  const res = await csrfFetch('/api/wishlist_items', {
    method: "POST",
    body: JSON.stringify(wishlistItem)
  });
  const data = await res.json();
  dispatch(addWishlistItem(data));
}

export const deleteWishlistItem = (wishlistItemId) => async (dispatch) => {
  await csrfFetch('/api/wishlist_items/' + wishlistItemId, {
    method: 'DELETE'
  });
  dispatch(removeWishlistItem(wishlistItemId));
}

export default function wishlistItemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_WISHLIST_ITEMS:
      return action.payload.wishlistItems;
    case ADD_WISHLIST_ITEM:
      const wishlistItem = action.payload;
      return {...state, ...wishlistItem};
    case REMOVE_WISHLIST_ITEM:
      const newState = {...state};
      delete newState[action.payload];
      return newState;
    case REMOVE_SESSION_USER: // when user logs out
      return {};
    default:
      return state;
  }
}