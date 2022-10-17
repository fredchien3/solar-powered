import csrfFetch from "./csrf";

const SET_CART_ITEMS = "cartItems/SET_CART_ITEM";
// const ADD_CART_ITEM = "cartItems/ADD_CART_ITEM";
const REMOVE_CART_ITEM = "cartItems/REMOVE_CART_ITEM";

const setCartItems = (cartItems) => {
  return {
    type: SET_CART_ITEMS,
    payload: cartItems
  };
}

// const addCartItem = (cartItem) => {
//   return {
//     type: ADD_CART_ITEM,
//     payload: cartItem
//   };
// }

const removeCartItem = (cartItem) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: cartItem
  };
}

export const fetchCartItems = () => async (dispatch) => {
  const res = await csrfFetch('/api/cart_items');
  const cartItems = await res.json();
  dispatch(setCartItems(cartItems));
}

// export const fetchCartItem
// dispatches addCartItem

export const createCartItem = (cartItem) => async (dispatch) => {
  const res = await csrfFetch('/api/cart_items', {
    method: postMessage,
    body: JSON.stringify(cartItem)
  });
  const data = await res.json();
  console.log(data);
  // dispatch(addCartItem)
}

export const deleteCartItem = (cartItemId) => async (dispatch) => {
  await csrfFetch('/api/cart_items/' + cartItemId, {
    method: 'DELETE'
  });
  dispatch(removeCartItem(cartItemId));
}

export default function cartItemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.payload;
    // case ADD_CART_ITEM:
    //   const cartItem = action.payload;
    //   return {...state, ...cartItem};
    case REMOVE_CART_ITEM:
      const newState = {...state};
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}