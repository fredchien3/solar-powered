import csrfFetch from "./csrf"

const SET_GAMES = "games/SET_GAMES"
const ADD_GAME = "games/ADD_GAME"

const setGames = (games) => { 
  return {
    type: SET_GAMES,
    payload: games
  }
}

const addGame = (game) => { 
  return {
    type: ADD_GAME,
    payload: game
  }
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
    case ADD_GAME:
      const game = action.payload;
      return {...state, ...game}
    default:
      return state;
  }
}