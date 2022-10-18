import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StoreHomePage from './components/StoreHomePage';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import GameShowPage from './components/GameShowPage';
import CartPage from './components/CartPage';

function App() {
  return (
    <>
      <Navigation />
      <section className="main-display-flex">
        <Switch>
          <Route exact path="/">
            <Redirect to="/store" />
          </Route>
          <Route exact path="/store">
            <StoreHomePage />
          </Route>
          <Route path="/games/:id">
            <GameShowPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>
            <div class="flash-error">Nothing found</div>
            <StoreHomePage />
          </Route>
        </Switch>
      </section>
    </>
  );
}

export default App;
