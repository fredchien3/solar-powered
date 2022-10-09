import csrfFetch from "./csrf"

const SET_SESSION_USER = "session/SET_SESSION_USER"
const REMOVE_SESSION_USER = "session/REMOVE_SESSION_USER"

const setSessionUser = (user) => {
  return {
    type: SET_SESSION_USER,
    payload: user
  };
};

const removeSessionUser = () => {
  return {
    type: REMOVE_SESSION_USER
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  const data = await res.json();
  dispatch(setSessionUser(data.user));
};

export default function sessionReducer(state = { user: null }, action) {
  const newState = {...state};
  switch (action.type) {
    case SET_SESSION_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_SESSION_USER:
      return {
        user: null
      };
    default:
      return state;
  }
}