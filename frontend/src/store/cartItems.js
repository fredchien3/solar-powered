import csrfFetch from "./csrf";
import { REMOVE_SESSION_USER } from "./session";

export const SET_CART_ITEMS = "cartItems/SET_CART_ITEMS";
const ADD_CART_ITEM = "cartItems/ADD_CART_ITEM";
const REMOVE_CART_ITEM = "cartItems/REMOVE_CART_ITEM";
const CLEAR_CART = "cartItems/CLEAR_CART";

const setCartItems = (payload) => { // and also games
  return {
    type: SET_CART_ITEMS,
    payload
  };
}

const addCartItem = (cartItem) => {
  return {
    type: ADD_CART_ITEM,
    payload: cartItem
  };
}

const removeCartItem = (cartItemId) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: cartItemId
  };
}

const clearCart = () => {
  return {
    type: CLEAR_CART
  };
}

export const fetchCartItems = () => async (dispatch) => {
  const res = await csrfFetch('/api/cart_items');
  const data = await res.json();
  dispatch(setCartItems(data));
}

export const createCartItem = (gameId) => async (dispatch) => {
  const res = await csrfFetch('/api/cart_items', {
    method: "POST",
    body: JSON.stringify({gameId: gameId})
  });
  const data = await res.json();
  dispatch(addCartItem(data));
}

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  await csrfFetch('/api/cart_items/' + cartItemId, {
    method: 'DELETE'
  });
  dispatch(removeCartItem(cartItemId));
}

export const deleteAllCartItems = () => async (dispatch) => {
  await csrfFetch('/api/cart_items/all', {
    method: 'DELETE'
  });
  dispatch(clearCart());
}

export default function cartItemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.payload.cartItems;
    case ADD_CART_ITEM:
      const cartItem = action.payload;
      return {...state, ...cartItem};
    case REMOVE_CART_ITEM:
      const newState = {...state};
      delete newState[action.payload];
      return newState;
    case CLEAR_CART:
      return {};
    case REMOVE_SESSION_USER: // when user logs out
      return {};
    default:
      return state;
  }
}