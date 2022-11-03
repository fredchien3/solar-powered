import csrfFetch from "./csrf";
import { setGames } from "./games";
import { REMOVE_SESSION_USER } from "./session";

const SET_LIBRARY_ITEMS = "libraryItems/SET_LIBRARY_ITEM";

export const setLibraryItems = (libraryItems) => {
  return {
    type: SET_LIBRARY_ITEMS,
    payload: libraryItems
  };
}


export const fetchLibraryItems = (userId) => async (dispatch) => {
  const res = await csrfFetch('/api/library_items/?user_id=' + userId);
  const data = await res.json();
  dispatch(setLibraryItems(data.libraryItems));
  dispatch(setGames(data.games))
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
      return action.payload;
    case REMOVE_SESSION_USER: // when user logs out
      return {};
    default:
      return state;
  }
}