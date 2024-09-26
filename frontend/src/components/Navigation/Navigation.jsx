import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import defaultAvatar from "../default_avatar.jpg";
import { fetchCartItems } from "../../store/cartItems";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchWishlistItems } from "../../store/wishlistItems";

export default function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentUser = useSelector(state => state.session.user);

  const numCartItems = useSelector(state => Object.values(state.cartItems)).length;
  const numCurrentUserWishlistItems = useSelector(state => Object.values(state.wishlistItems.currentUser)).length;

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCartItems()); // no user ID needed
      dispatch(fetchWishlistItems(currentUser.id));
    };
  }, [dispatch, currentUser])

  const centerCluster = (
      <div className="center-cluster">
        <Link to="/store">Store</Link>
        <a href="https://github.com/fredchien3/solar-powered/"
          target="_blank"
          rel="noreferrer">
          Community
        </a>
        {currentUser ? <Link to={`/users/${currentUser.username}/games`}>{currentUser.displayName}</Link> : <></>}
        <a href="https://www.linkedin.com/in/fchien/"
          target="_blank"
          rel="noreferrer">
          {currentUser ? "Chat" : "About"}
        </a>
        <a href="mailto: fred.chien3@gmail.com"
          target="_blank"
          rel="noreferrer">
          Support
        </a>
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
        <button className="install-solar">
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

  let wishlistButton = <Link to={`/users/${currentUser?.username}/wishlist`} className="link-to-wishlist">
    Wishlist ({numCurrentUserWishlistItems})
  </Link>

  let cartButton = <Link to="/cart" className="link-to-cart">
    Cart ({numCartItems})
  </Link>;

  if (location.pathname.includes("/users/") && location.pathname.includes("/games")) {
    cartButton = <></>;
    wishlistButton = <></>;
  }

  if (location.pathname.includes("/"))

  return (
    <nav className="header-nav">
      <div className="header-nav-content">
        <Link to="/" className="logo">
          <i className="fa-solid fa-sun"></i>
          <h1>Solar</h1>
        </Link>
        {centerCluster}
        {rightCluster}
        {currentUser && <div className="wishlist-and-cart-wrapper">
          {numCurrentUserWishlistItems > 0 ? wishlistButton : <></>}
          {numCartItems > 0 ? cartButton : <></>}
        </div>}
      </div>
    </nav>
  )
}