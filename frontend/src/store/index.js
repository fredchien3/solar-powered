import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import sessionReducer from './session';
import gamesReducer from './games';
import cartItemsReducer from './cartItems';
import libraryItemsReducer from './libraryItems';
import usersReducer from './users';
import wishlistItemsReducer from './wishlistItems';
import reviewsReducer from './reviews';
import reviewVotesReducer from './reviewVotes';

const rootReducer = combineReducers({
  session: sessionReducer,
  games: gamesReducer,
  cartItems: cartItemsReducer,
  libraryItems: libraryItemsReducer,
  users: usersReducer,
  wishlistItems: wishlistItemsReducer,
  reviews: reviewsReducer,
  reviewVotes: reviewVotesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;