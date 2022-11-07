import csrfFetch from "./csrf";
import { REMOVE_SESSION_USER } from "./session";

export const SET_WISHLIST_ITEMS = "wishlistItems/SET_WISHLIST_ITEMS";
export const SET_OTHER_WISHLIST = "wishlistItems/SET_OTHER_WISHLIST"
const ADD_WISHLIST_ITEM = "wishlistItems/ADD_WISHLIST_ITEM";
const REMOVE_WISHLIST_ITEM = "wishlistItems/REMOVE_WISHLIST_ITEM";

const setWishlistItems = (payload, visiting = false) => {
  const type = visiting ? SET_OTHER_WISHLIST : SET_WISHLIST_ITEMS;
  return {
    type,
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

export const fetchWishlistItems = (userId, visiting = false) => async (dispatch) => {
  const res = await csrfFetch('/api/wishlist_items/?user_id=' + userId);
  const data = await res.json();
  dispatch(setWishlistItems(data, visiting));
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

const initialState = {currentUser: {}, otherUser: {}}
export default function wishlistItemsReducer(state = initialState, action) {
  const newState = {...state};
  switch (action.type) {
    case SET_WISHLIST_ITEMS:
      newState.currentUser = action.payload.wishlistItems;
      return newState;
    case SET_OTHER_WISHLIST:
      newState.otherUser = action.payload.wishlistItems;
      return newState;
    case ADD_WISHLIST_ITEM:
      const wishlistItem = action.payload;
      newState.currentUser = {...newState.currentUser, wishlistItem};
      return newState;
    case REMOVE_WISHLIST_ITEM:
      delete newState.currentUser[action.payload];
      return newState;
    case REMOVE_SESSION_USER: // when user logs out
      newState.currentUser = {};
      return newState;
    default:
      return state;
  }
}