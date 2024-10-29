import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StoreHomePage from './components/StoreHomePage/StoreHomePage';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import Navigation from './components/Navigation/Navigation';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import GameShowPage from './components/GameShowPage/GameShowPage';
import CartPage from './components/CartPage/CartPage';
import LibraryPage from './components/LibraryPage/LibraryPage';
import Footer from './components/Footer/Footer';
import WishlistPage from './components/WishlistPage/WishlistPage';

function App() {
  return (
    <>
      <Navigation />
      <section className="main-display-flex">
        <Switch>
          <Route exact path="/">
            <Redirect to="/store"/>
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
          {/* <Route exact path="/users/:username">
            <LibraryPage />
          </Route> */}
          <Route path="/users/:username/games">
            <LibraryPage />
          </Route>
          <Route path="/users/:username/wishlist">
            <WishlistPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>
            <StoreHomePage error={"URL Not Found :^("} />
          </Route>
        </Switch>
      </section>
      <Footer />
    </>
  );
}

export default App;
