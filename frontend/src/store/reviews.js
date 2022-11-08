import csrfFetch from "./csrf";

export const SET_REVIEWS = "reviews/SET_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
// const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const setReviews = (payload) => { // and also games
  return {
    type: SET_REVIEWS,
    payload
  };
}

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review
  };
}

// const removeReview = (reviewId) => {
//   return {
//     type: REMOVE_REVIEW,
//     payload: reviewId
//   };
// }

export const fetchReviews = (gameId) => async (dispatch) => {
  const res = await csrfFetch(`/api/games/${gameId}/reviews`);
  const data = await res.json();
  dispatch(setReviews(data));
}

export const createReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/games/${review.gameId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review)
  });
  const data = await res.json();
  dispatch(addReview(data));
}

// export const deleteReview = (reviewId) => async (dispatch) => {
//   await csrfFetch(`/api/games/${gameId}/reviews` + reviewId, {
//     method: 'DELETE'
//   });
//   dispatch(removeReview(reviewId));
// }

export default function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.payload;
    case ADD_REVIEW:
      return {...state, ...action.payload};
    // case REMOVE_REVIEW:
    //   const newState = {...state};
    //   delete newState[action.payload];
    //   return newState;
    default:
      return state;
  }
}