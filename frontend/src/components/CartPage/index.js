import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCartItem } from "../../store/cartItems";
import { createLibraryItem } from "../../store/libraryItems";
import StoreNavbar from "../StoreHomePage/StoreNavbar/StoreNavbar";
import CartItem from "./CartItem";
import "./CartPage.css";

export default function CartPage() {
  document.title = "Shopping Cart";
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionSlice = useSelector(state => state.session);
  const currentUser = sessionSlice.user || null;

  const cartItemsSlice = useSelector(state => state.cartItems);
  const cartItemsArray = Object.values(cartItemsSlice);
  const gamesArray = cartItemsArray.map(cartItem => cartItem.game);
  
  const cartItems = cartItemsArray.map(cartItem => {
    return <CartItem cartItem={cartItem} key={cartItem.id} />;
  });
  const cartEmpty = (cartItems.length === 0);
  
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const pricesArray = gamesArray.map(game => game.price);
    const reducedPrice = pricesArray.reduce((acc, el) => acc + el, 0);
    setTotalPrice(reducedPrice.toFixed(2));
  }, [gamesArray])

  const handlePurchase = () => {
    if (cartItems.length > 0) {
      addCartItemsToLibrary()
        .then(deleteCurrentUserCartItems())
        .then(history.push('/users/' + currentUser.username + '/games'))
        .catch(res => alert(res))
    }
  }
  
  const handleRemoveAll = () => {
    alert('Removing all items from cart!');
    // replace with modal later
    deleteCurrentUserCartItems();
  }

  const addCartItemsToLibrary = async () => {
    Object.values(cartItemsSlice).forEach(cartItem => {
      const libraryItem = { userId: cartItem.userId, gameId: cartItem.game.id };
      dispatch(createLibraryItem(libraryItem));
    })
  }
  
  const deleteCurrentUserCartItems = async () => {
    Object.keys(cartItemsSlice).forEach(cartItemId => {
      dispatch(deleteCartItem(cartItemId));
    })
  }

  // let selfOrGiftString = <p className="checkout-page-body-p">Purchase as a gift feature coming soon.</p>;
  let disablePurchaseForMyself = false;
  if (cartEmpty) {
    // selfOrGiftString = "";
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
              {/* {selfOrGiftString} */}
              <div className="checkout-buttons continue-shopping">
                <button className="green-button" onClick={handlePurchase} disabled={disablePurchaseForMyself}>Purchase for myself</button>
                {/* <buttonclassName="green-button" disabled>Purchase as a gift</button> */}
              </div>
            </div>
            <div className="sales-tax-disclaimer-wrapper checkout-page-body-p">
              <sup>1</sup><p>Sales tax will be calculated during checkout where applicable</p>
            </div>
            <div className="continue-shopping-wrapper">
              <Link to="/store" className="light-blue-button continue-shopping">Continue Shopping</Link>
              <span onClick={handleRemoveAll} className="cart-remove">Remove all items</span>
            </div>

            {/* <div className="digital-delivery-wrapper">
              <h1>Delivery</h1>
              <div>
                <i></i>
                <p>All digital goods are delivered via the Solar desktop application.</p>
                <p>Solar and your games will be available for download at the end of the purchase.</p>
              </div>
            </div> */}

          </div>
          {/* <aside className="cart-page-main-right">

          </aside> */}
        </section>
      </div>
    )
  }
}