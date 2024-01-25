import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { numberifyDate, prettifyDate } from "../../utils/formatDate";
import { ratingColor, ratingSummary } from "../../utils/formatRating";
import { deleteWishlistItem } from "../../store/wishlistItems";
import CartButton from "../GameShowPage/CartButton/CartButton";
import "./WishlistItem.css";

export default function WishlistItem({ wishlistItem, viewingOwnWishlist }) {
  const dispatch = useDispatch();
  const game = useSelector(state => state.games[wishlistItem.gameId]) || {};

  const handleRemoveWishlistItem = () => {
    dispatch(deleteWishlistItem(wishlistItem.id));
  }

  let removeButton;
  if (viewingOwnWishlist) {
    removeButton = (
      <span className="remove-from-wishlist-wrapper">
        (<span onClick={handleRemoveWishlistItem} className="remove-from-wishlist">remove</span>)
      </span>
    );
  }

  return (
    <div className="wishlist-item-wrapper">
      <Link to={"/games/" + game.id} className="wishlist-item-img-wrapper">
        <img src={game.bannerImageUrl} alt={game.title + " banner"} />
      </Link>
      <div className="wishlist-item-info">
        <Link to={"/games/" + game.id}><h1>{game.title}</h1></Link>
        <div className="wishlist-item-info-middle-row">

          <div className="wishlist-item-grid">
            <div className="wishlist-item-grid-item">Overall reviews:</div>
            <div className={"wishlist-item-grid-item " + ratingColor(game.averageScore)}>{ratingSummary(game.averageScore)}</div>
            <div className="wishlist-item-grid-item">Release date:</div>
            <div className="wishlist-item-grid-item">{prettifyDate(game.releaseDate)}</div>
          </div>
          <div className="wishlist-item-purchase">
            <p>{game.price > 0 ? "$" + game.price : "$9.99"}</p>
            <CartButton gameId={game.id} />
          </div>
        </div>
        <div className="wishlist-item-info-bottom-row">
          <p>Added on {numberifyDate(wishlistItem.createdAt)}</p>
          {removeButton}
        </div>
      </div>
    </div>
  )
}