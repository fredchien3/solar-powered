import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';

function App() {
  return (
    <>
      <Navigation />
      <h1>solar powered</h1>
      <p>hello world!</p>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
