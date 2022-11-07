import { SET_CART_ITEMS } from "./cartItems";
import csrfFetch from "./csrf";
import { SET_LIBRARY_ITEMS, SET_OTHER_LIBRARY } from "./libraryItems";
import { SET_OTHER_WISHLIST, SET_WISHLIST_ITEMS } from "./wishlistItems";

const SET_GAMES = "games/SET_GAMES";
const ADD_GAME = "games/ADD_GAME";
const ADD_GAMES = "games/ADD_GAMES";

export const setGames = (games) => { 
  return {
    type: SET_GAMES,
    payload: games
  };
}

export const addGames = (games) => {
  return {
    type: ADD_GAMES,
    payload: games
  }
}

const addGame = (game) => { 
  return {
    type: ADD_GAME,
    payload: game
  };
}

export const fetchGames = () => async (dispatch) => {
  const res = await csrfFetch('/api/games');
  const games = await res.json(); // normalized, i.e. { id => {gameData}}
  dispatch(setGames(games));
}

export const fetchGame = (gameId) => async (dispatch) => {
  const res = await csrfFetch('/api/games/' + gameId);
  const game = await res.json(); // normalized, i.e. { id => {gameData}}
  dispatch(addGame(game));
}

export default function gamesReducer(state = {}, action) {
  switch (action.type) {
    case SET_GAMES:
      return action.payload;
    case ADD_GAMES:
      return {...state, ...action.payload}
    case ADD_GAME:
      const game = action.payload;
      return {...state, ...game};
    case SET_CART_ITEMS:
    case SET_LIBRARY_ITEMS:
    case SET_OTHER_LIBRARY:
    case SET_WISHLIST_ITEMS:
    case SET_OTHER_WISHLIST:
      return {...state, ...action.payload.games};
    default:
      return state;
  }
}