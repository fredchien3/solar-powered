import csrfFetch from "./csrf";

export const SET_LIBRARY_ITEMS = "libraryItems/SET_LIBRARY_ITEMS";
export const SET_OTHER_LIBRARY = "libraryItems/SET_OTHER_LIBRARY";

export const setLibraryItems = (payload, visiting) => {
  const type = visiting ? SET_OTHER_LIBRARY : SET_LIBRARY_ITEMS;
  return {
    type,
    payload
  };
}

export const fetchLibraryItems = (userId, visiting = false) => async (dispatch) => {
  const res = await csrfFetch('/api/library_items/?user_id=' + userId);
  const data = await res.json();
  dispatch(setLibraryItems(data, visiting));
}

export const createLibraryItem = (libraryItem) => async (dispatch) => {
  await csrfFetch('/api/library_items', {
    method: "POST",
    body: JSON.stringify(libraryItem)
  });
}

const initialState = {currentUser: {}, otherUser: {}}
export default function libraryItemsReducer(state = initialState, action) {
  const newState = {...state};
  switch (action.type) {
    case SET_LIBRARY_ITEMS:
      newState.currentUser = action.payload.libraryItems;
      return newState;
    case SET_OTHER_LIBRARY:
      newState.otherUser = action.payload.libraryItems;
      return newState;
    default:
      return state;
  }
}