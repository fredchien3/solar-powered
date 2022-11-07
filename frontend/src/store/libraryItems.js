import csrfFetch from "./csrf";
import { REMOVE_SESSION_USER } from "./session";

export const SET_LIBRARY_ITEMS = "libraryItems/SET_LIBRARY_ITEMS";

export const setLibraryItems = (payload) => {
  return {
    type: SET_LIBRARY_ITEMS,
    payload
  };
}


export const fetchLibraryItems = (userId) => async (dispatch) => {
  const res = await csrfFetch('/api/library_items/?user_id=' + userId);
  const data = await res.json();
  dispatch(setLibraryItems(data));
}

export const createLibraryItem = (libraryItem) => async (dispatch) => {
  await csrfFetch('/api/library_items', {
    method: "POST",
    body: JSON.stringify(libraryItem)
  });
}

export default function libraryItemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_LIBRARY_ITEMS:
      return action.payload.libraryItems;
    case REMOVE_SESSION_USER: // when user logs out
      return {};
    default:
      return state;
  }
}