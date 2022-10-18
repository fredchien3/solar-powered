import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import StoreNavbar from "../StoreHomePage/StoreNavbar";
import CartItem from "./CartItem";
import "./CartPage.css";

export default function CartPage() {
  document.title = "Shopping Cart";
  const stateSession = useSelector(state => state.session);
  const currentUser = stateSession.user || null;
  const cartItemsSlice = useSelector(state => state.cartItems);

  if (!currentUser) {
    return <Redirect to="login" />;
  }
  const cartItemsArray = Object.values(cartItemsSlice);
  const cartItems = cartItemsArray.map(cartItem => {
    return <CartItem cartItem={cartItem} key={cartItem.id} />;
  });

  const cartEmpty = (cartItems.length === 0);
  
  let selfOrGiftString = <p className="checkout-page-body-p">Purchase as a gift feature coming soon...</p>;
  let disablePurchaseForMyself = false;
  if (cartEmpty) {
    selfOrGiftString = "";
    disablePurchaseForMyself = true;
  }
  
  const totalPrice = cartItemsArray.map(game => game.price).reduce((acc, el) => acc + el, 0);
  
  return (
    <div className="cart-page">
      <div className="cart-page-glow-background" />
      <StoreNavbar />
      <header className="cart-page-title-wrapper">
        <p>All Products {'>'} Your Shopping Cart</p>
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
            {selfOrGiftString}
            <div className="checkout-buttons continue-shopping">
              <button disabled={disablePurchaseForMyself}>Purchase for myself</button>
              <button disabled>Purchase as a gift</button>
            </div>
          </div>
          <div className="sales-tax-disclaimer-wrapper checkout-page-body-p">
            <sup>1</sup><p>Sales tax will be calculated during checkout where applicable</p>
          </div>
          <div className="continue-shopping-wrapper">
            <Link to="/store" className="light-blue-button continue-shopping">Continue Shopping</Link>
            <a href="/" className="cart-remove">Remove all items</a>
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