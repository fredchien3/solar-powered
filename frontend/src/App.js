import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StoreHomePage from './components/StoreHomePage';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';

function App() {
  return (
    <>
      <Navigation />
      <section className="main-display">
        <Switch>
          <Route exact path="/">
            <Redirect to="/store" />
          </Route>
          <Route exact path="/store">
            <StoreHomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      </section>
    </>
  );
}

export default App;
