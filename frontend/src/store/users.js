import csrfFetch from "./csrf";

// const SET_USERS = "users/SET_USERS";
const SET_USER = "users/SET_USER";
// const REMOVE_USER = "users/REMOVE_USER";

// const setUsers = (users) => { 
//   return {
//     type: SET_USERS,
//     payload: users
//   };
// }

const setUser = (user) => { 
  return {
    type: SET_USER,
    payload: user
  };
}

// export const removeUser = (userId) => {
//   return {
//     type: REMOVE_USER,
//     payload: userId
//   };
// }

// export const fetchUsers = () => async (dispatch) => {
//   const res = await csrfFetch('/api/users');
//   const users = await res.json();
//   dispatch(setUsers(users));
// }

export const fetchUser = (userParam) => async (dispatch) => {
  let res;
  if (typeof userParam === 'number') {
    res = await csrfFetch('/api/users/nil?user_id=' + userParam);
  } else {
    res = await csrfFetch('/api/users/nil?username=' + userParam)
  }
  const userData = await res.json();
  dispatch(setUser(userData));
}

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    // case SET_USERS:
    //   return action.payload;
    // case REMOVE_USER:
    //   const newState = {...state};
    //   delete newState[action.payload];
    //   return newState;
    case SET_USER:
      const user = action.payload;
      return {[user.id]: user};
    default:
      return state;
  }
}