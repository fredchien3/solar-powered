import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import defaultAvatar from "../default_avatar.jpg";
import { fetchCartItems } from "../../store/cartItems";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
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


  // Original:
  // const centerCluster = (
  //     <div className="center-cluster">
  //       <Link to="/store">Store</Link>
  //       <Link to="#">Community</Link>
  //       {currentUser ? <Link to="#">{currentUser.displayName}</Link> : <></>}
  //       {currentUser ? <Link to="#">Chat</Link> : <Link to="#">About</Link>}
  //       <Link to="#">Support</Link>
  //     </div>
  // )

  // No dead links:
  const centerCluster = (
      <div className="center-cluster">
        <Link to="/store">Store</Link>
        {currentUser ? <Link to={`/users/${currentUser.username}/games`}>{currentUser.displayName}</Link> : <></>}
        <span style={{width: '20px'}} />
        <a href="https://www.linkedin.com/in/fchien">LinkedIn</a>
        <a href="https://github.com/fredchien3">GitHub</a>
        <a href="mailto: fred.chien3@gmail.com">Email</a>
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
        <Link to={'/users/' + currentUser.username + '/games'} className="small-avatar-wrapper">
          <img alt="avatar" src={defaultAvatar} className="small-avatar"/>
        </Link>
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
          <Link to="/login">login</Link> |  
          <Link to="/signup">signup</Link>
        </div>
      </div>
    )
  }

  let cartButton = <Link to="/cart" className="green-cart-link">Cart ({numCartItems})</Link>;
  if (location.pathname.includes("/users")) cartButton = <></>;
  
  return (
    <nav className="header-nav">
      <div className="header-nav-content">
        <Link to="/" className="logo">
          <i className="fa-solid fa-sun"></i>
          <h1>Solar</h1>
        </Link>
        {centerCluster}
        {rightCluster}
        {numCartItems > 0 ? cartButton : <></>}
      </div>
    </nav>
  )
}