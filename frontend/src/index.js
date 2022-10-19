import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as gameActions from './store/games'
import * as cartItemActions from './store/cartItems';
import * as libraryItemActions from './store/libraryItems';
import * as userActions from './store/users'

const store = configureStore();

// if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.gameActions = gameActions;
  window.cartItemActions = cartItemActions;
  window.libraryItemActions = libraryItemActions;
  window.userActions = userActions;
// }

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

if (sessionStorage.getItem('X-CSRF-Token') && sessionStorage.getItem('currentUser')) {
renderApplication();
} else {
store.dispatch(sessionActions.restoreSession()).then(renderApplication);
}