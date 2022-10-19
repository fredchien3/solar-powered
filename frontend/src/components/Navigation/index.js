import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import defaultAvatar from "../default_avatar.jpg";

import { fetchCartItems } from "../../store/cartItems";

export default function Navigation() {
  const dispatch = useDispatch();
  const sessionSlice = useSelector(state => state.session);
  const cartItemsSlice = useSelector(state => state.cartItems);
  const cartItemsArray = Object.values(cartItemsSlice);

  const [numCartItems, setNumCartItems] = useState(cartItemsArray.length);

  let currentUser;
  if (sessionSlice) currentUser = sessionSlice.user;
    
  useEffect(() => {
    if (currentUser) dispatch(fetchCartItems());
  }, [dispatch, currentUser])

  useEffect(() => {
    setNumCartItems(cartItemsArray.length);
  }, [cartItemsArray])

  const centerCluster = (
      <div className="center-cluster">
        <Link to="/store">Store</Link>
        <Link to="#">Community</Link>
        {currentUser ? <Link to="#">{currentUser.displayName}</Link> : <></>}
        {currentUser ? <Link to="#">Chat</Link> : <Link to="#">About</Link>}
        <Link to="#">Support</Link>
      </div>
  )

  let rightCluster;
  if (currentUser) {
    rightCluster = (
      <div className="right-cluster">
        <button className="install-solar">
          <i className="fa-solid fa-download"></i>
          Install Solar
        </button>
        <button className="mail-button">
          <i className="fa-solid fa-envelope"></i>
        </button>
        <ProfileButton currentUser={currentUser} />
        <div className="small-avatar-wrapper">
          <img alt="avatar" src={defaultAvatar} className="small-avatar"/>
        </div>
      </div>
    )
  } else {
    rightCluster = (
      <div className="right-cluster">
        <button className="install-solar green">
          <i className="fa-solid fa-download"></i>
          Install Solar
        </button>
        <div className="login-signup-links">
          <Link to="/login">login</Link>
            |  
          <Link to="/signup">signup</Link>
        </div>
      </div>
    )
  }

  return (
    <nav className="header-nav">
      <div className="header-nav-content">
        <Link to="/" className="logo">
          <i className="fa-solid fa-sun"></i>
          {/* <i className="fa-solid fa-cloud-sun"></i> */}
          {/* <i className="fa-solid fa-solar-panel"></i> */}
          <h1>Solar</h1>
        </Link>
        {centerCluster}
        {rightCluster}
        {numCartItems > 0 ? <Link to="/cart" className="green-cart-link">Cart ({numCartItems})</Link> : <></>}
      </div>
    </nav>
  )
}