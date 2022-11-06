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

  const usersSlice = useSelector(state => state.users);
  const wishlistUser = Object.values(usersSlice).find(user => user.username === username) || {};
  document.title = wishlistUser.displayName ? `${wishlistUser.displayName}'s wishlist` : "loading..."

  useEffect(() => {
    dispatch(fetchUser(username))
      .then(user => dispatch(fetchWishlistItems(user.id)));
  }, [dispatch, username])


  return (
    <div className="wishlist-page">
      <section className="wishlist-main-column">
        <header>
          <img src={defaultAvatar} className="wishlist-profile-pic" />
          <h1 className="wishlist-title">{wishlistUser.displayName}'s wishlist</h1> 
        </header>
        {/* <div className="wishlist-control-bar"></div> */}
        <div className="wishlist-divider"></div>
        <article>
          <WishlistItem />
        </article>
      </section>
    </div>
  )
}