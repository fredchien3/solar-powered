import csrfFetch from "./csrf";

const SET_LIBRARY_ITEMS = "libraryItems/SET_LIBRARY_ITEM";
// const ADD_LIBRARY_ITEM = "libraryItems/ADD_LIBRARY_ITEM";
const REMOVE_LIBRARY_ITEM = "libraryItems/REMOVE_LIBRARY_ITEM";

const setLibraryItems = (libraryItems) => {
  return {
    type: SET_LIBRARY_ITEMS,
    payload: libraryItems
  };
}

// const addLibraryItem = (libraryItem) => {
//   return {
//     type: ADD_LIBRARY_ITEM,
//     payload: libraryItem
//   };
// }

export const fetchLibraryItems = () => async (dispatch) => {
  const res = await csrfFetch('/api/library_items');
  const libraryItems = await res.json();
  dispatch(setLibraryItems(libraryItems));
}

// export const fetchLibraryItem
// dispatches addLibraryItem

export const createLibraryItem = (libraryItem) => async (dispatch) => {
  const res = await csrfFetch('/api/library_items', {
    method: postMessage,
    body: JSON.stringify(libraryItem)
  });
  const data = await res.json();
  // dispatch(addLibraryItem)
}

export default function libraryItemsReducer(state = {}, action) {
  switch (action.type) {
    case SET_LIBRARY_ITEMS:
      return action.payload;
    // case ADD_LIBRARY_ITEM:
    //   const libraryItem = action.payload;
    //   return {...state, ...libraryItem};
    default:
      return state;
  }
}