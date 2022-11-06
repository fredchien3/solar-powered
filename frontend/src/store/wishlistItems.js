import csrfFetch from "./csrf";
import { addGames } from "./games";
import { REMOVE_SESSION_USER } from "./session";

const SET_WISHLIST_ITEMS = "wishlistItems/SET_WISHLIST_ITEMS";
const ADD_WISHLIST_ITEM = "wishlistItems/ADD_WISHLIST_ITEM";
const REMOVE_WISHLIST_ITEM = "wishlistItems/REMOVE_WISHLIST_ITEM";

const setWishlistItems = (wishlistItems) => {
  return {
    type: SET_WISHLIST_ITEMS,
    payload: wishlistItems
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
  const res = await csrfFetch('/api/wishlist_items/?user_=' + userId);
  const data = await res.json();
  dispatch(setWishlistItems(data.wishlistItems));
  dispatch(addGames(data.games));
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
      return action.payload;
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