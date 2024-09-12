import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteAllCartItems } from "../../store/cartItems";
import { createLibraryItem } from "../../store/libraryItems";
import { deleteWishlistItem } from "../../store/wishlistItems";
import StoreNavbar from "../StoreHomePage/StoreNavbar/StoreNavbar";
import CartItem from "./CartItem";
import "./CartPage.css";

export default function CartPage() {
  document.title = "Shopping Cart";
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);

  const cartItemsArray = useSelector(state => Object.values(state.cartItems));

  const cartItems = cartItemsArray.map(cartItem => {
    return <CartItem cartItem={cartItem} key={cartItem.id} />;
  });
  const cartEmpty = (cartItems.length === 0);

  const pricesArray = useSelector(state => {
    return cartItemsArray.map(cartItem => state.games[cartItem.gameId].price);
  })
  const reducedPrice = pricesArray.reduce((acc, el) => acc + el, 0);
  const totalPrice = reducedPrice.toFixed(2);

  const wishlistItemsArray = useSelector(state => Object.values(state.wishlistItems.currentUser));

  const handlePurchase = () => {
    if (cartItems.length > 0) {
      addCartItemsToLibrary()
        .then(dispatch(deleteAllCartItems()))
        .then(history.push('/users/' + currentUser.username + '/games'))
        .catch(res => alert(res))
    }
  }

  const handleRemoveAll = () => {
    alert('Removing all items from cart!');
    // replace with modal later
    dispatch(deleteAllCartItems());
  }

  const addCartItemsToLibrary = async () => {
    cartItemsArray.forEach(cartItem => {
      const libraryItem = { userId: cartItem.userId, gameId: cartItem.gameId };
      dispatch(createLibraryItem(libraryItem));
      const wishlistItem = wishlistItemsArray.find(wishlistItem => wishlistItem.gameId === cartItem.gameId)
      if (wishlistItem) dispatch(deleteWishlistItem(wishlistItem.id));
    })
  }

  let disablePurchaseForMyself = false;
  if (cartEmpty) {
    disablePurchaseForMyself = true;
  }

  if (!currentUser) {
    return <Redirect to="login" />;
  } else {
    return (
      <div className="cart-page">
        <div className="cart-page-glow-background" />
        <StoreNavbar />
        <header className="cart-page-title-wrapper">
          <span><Link to="/store">All Products</Link> {'>'} Your Shopping Cart</span>
          <h1>Your Shopping Cart</h1>
        </header>
        <section className="cart-page-main-column-wrapper">
          <div className="cart-page-main-left">
            {cartItems}
            <div className="checkout-wrapper">
              <div className="estimated-total-wrapper">
                <span><h1>Estimated total</h1><sup>1</sup></span>
                <h1>${totalPrice === 0 ? "0.00" : totalPrice}</h1>
              </div>
              <div className="checkout-buttons continue-shopping">
                <button className="green-button" onClick={handlePurchase} disabled={disablePurchaseForMyself}>Purchase for myself</button>
              </div>
            </div>
            <div className="sales-tax-disclaimer-wrapper checkout-page-body-p">
              <sup>1</sup><p>Sales tax will be calculated during checkout where applicable</p>
            </div>
            <div className="continue-shopping-wrapper">
              <Link to="/store" className="light-blue-button continue-shopping">Continue Shopping</Link>
              <span onClick={handleRemoveAll} className="cart-remove">Remove all items</span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}