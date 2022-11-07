import csrfFetch from "./csrf"

const SET_SESSION_USER = "session/SET_SESSION_USER"
export const REMOVE_SESSION_USER = "session/REMOVE_SESSION_USER"

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

const storeCSRFToken = (res) => {
  const token = res.headers.get('X-CSRF-Token');
  if (token) sessionStorage.setItem('X-CSRF-Token', token);
}

const storeCurrentUser = (user) => {
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('currentUser');
  }
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  const userData = await res.json();
  storeCurrentUser(userData);
  dispatch(setSessionUser(userData));
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });
  const userData = await res.json();
  storeCurrentUser(userData);
  dispatch(setSessionUser(userData));
}

export const logout = () => async (dispatch) => {
  await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  storeCurrentUser(null);
  dispatch(removeSessionUser());
}

export const restoreSession = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');

  storeCSRFToken(res);
  const userData = await res.json();
  storeCurrentUser(userData);
  dispatch(setSessionUser(userData));
};

const initialState = { user: JSON.parse(sessionStorage.getItem('currentUser')) };

export default function sessionReducer(state = initialState, action) {
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