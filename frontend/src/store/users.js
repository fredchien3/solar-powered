import csrfFetch from "./csrf";
import { ADD_REVIEW, SET_REVIEWS } from "./reviews";

const SET_USER = "users/SET_USER";

const setUser = (user) => { 
  return {
    type: SET_USER,
    payload: user
  };
}

export const fetchUser = (userParam) => async (dispatch) => {
  let res;
  if (typeof userParam === 'number') {
    res = await csrfFetch('/api/users/nil?user_id=' + userParam);
  } else {
    res = await csrfFetch('/api/users/nil?username=' + userParam)
  }
  const userData = await res.json();
  dispatch(setUser(userData));
  return userData;
}

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      return {[user.id]: user};
    case SET_REVIEWS:
      return action.payload.users;
    case ADD_REVIEW:
      return {...state, ...action.payload.user}
    default:
      return state;
  }
}