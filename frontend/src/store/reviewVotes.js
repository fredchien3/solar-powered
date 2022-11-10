import csrfFetch from "./csrf";
import { ADD_REVIEW, SET_REVIEWS } from "./reviews";

const ADD_REVIEW_VOTE = "reviewVotes/ADD_REVIEW_VOTE";
const REMOVE_REVIEW_VOTE = "reviewVotes/REMOVE_REVIEW_VOTE";

const addReviewVote = (reviewVote) => {
  return {
    type: ADD_REVIEW_VOTE,
    payload: reviewVote
  }
}

const removeReviewVote = (reviewVoteId) => {
  return {
    type: REMOVE_REVIEW_VOTE,
    payload: reviewVoteId
  }
}

export const createReviewVote = (reviewVote) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewVote.reviewId}/review_votes`, {
    method: "POST",
    body: JSON.stringify(reviewVote)
  })
  const data = await res.json();
  dispatch(addReviewVote(data));
}

export const updateReviewVote = (reviewVote) => async (dispatch) => {
  const updatedVote = {value: reviewVote.value}
  const res = await csrfFetch(`/api/review_votes/${reviewVote.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedVote)
  });
  const data = await res.json();
  dispatch(addReviewVote(data));
}

export const deleteReviewVote = (reviewVoteId) => async (dispatch) => {
  await csrfFetch(`/api/review_votes/${reviewVoteId}`, {
    method: "DELETE"
  });
  dispatch(removeReviewVote(reviewVoteId));
}

export default function reviewVotesReducer(state = {}, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.payload.reviewVotes;
    case ADD_REVIEW:
      return {...state, ...action.payload.reviewVotes};
    case ADD_REVIEW_VOTE:
      return {...state, ...action.payload};
    case REMOVE_REVIEW_VOTE:
      const newState = {...state};
      delete newState[action.payload];
      return newState
    default:
      return state;
  }
}