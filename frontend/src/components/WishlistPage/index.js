import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser } from "../../store/users";
import { fetchWishlistItems } from "../../store/wishlistItems";
import defaultAvatar from "../default_avatar.jpg";
import WishlistItem from "./WishlistItem";
import "./WishlistPage.css";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { username } = useParams();
  
  const currentUser = useSelector(state => state.session.user);

  const viewingOwnWishlist = currentUser.username === username;

  const userArray = useSelector(state => Object.values(state.users));

  let wishlistUser;
  if (viewingOwnWishlist) {
    wishlistUser = currentUser;
  } else {
    wishlistUser = userArray.find(user => user.username === username) || {};
  }

  document.title = wishlistUser.displayName ? `${wishlistUser.displayName}'s wishlist` : "loading..."


  useEffect(() => {
    if (!viewingOwnWishlist) {
      dispatch(fetchUser(username))
       .then(user => dispatch(fetchWishlistItems(user.id, true)));
    }
  }, [dispatch, username, viewingOwnWishlist])

  const wishlistItemsArray = useSelector(state => {
    if (viewingOwnWishlist) {
      return Object.values(state.wishlistItems.currentUser);
    } else {
      return Object.values(state.wishlistItems.otherUser);
    }
  });

  const wishlistItems = wishlistItemsArray.map(wishlistItem => {
    return <WishlistItem wishlistItem={wishlistItem} viewingOwnWishlist={viewingOwnWishlist} key={wishlistItem.id} />
  });

  return (
    <div className="wishlist-page">
      <section className="wishlist-main-column">
        <header>
          <img src={defaultAvatar} className="wishlist-profile-pic" alt="avatar" />
          <h1 className="wishlist-title">{wishlistUser.displayName}'s wishlist</h1> 
        </header>
        {/* <div className="wishlist-control-bar"></div> */}
        <div className="wishlist-divider"></div>
        <article>
          {wishlistItems}
        </article>
      </section>
    </div>
  )
}