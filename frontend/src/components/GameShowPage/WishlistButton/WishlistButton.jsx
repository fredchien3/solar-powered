import { useDispatch, useSelector } from "react-redux";
import { createWishlistItem, deleteWishlistItem } from "../../../store/wishlistItems";
import "./WishlistButton.css";

export default function WishlistButton({ gameId, currentUser, gameAlreadyInLibrary }) {
  const dispatch = useDispatch();

  const gameAlreadyInWishlist = useSelector(state => {
    return Object.values(state.wishlistItems.currentUser)
    .find(wishlistItem => wishlistItem.gameId === gameId)
    ?.id
  });

  let wishlistButtonText = "Add to your wishlist";
  if (gameAlreadyInLibrary) {
    wishlistButtonText = "In Library";
  } else if (gameAlreadyInWishlist) {
     wishlistButtonText = <>
        <i className="fa-regular fa-square-check" />
        On Wishlist
      </>;
  }

  const handleAddToWishlist = () => {
    if (gameAlreadyInWishlist) {
      dispatch(deleteWishlistItem(gameAlreadyInWishlist));
    } else {
      dispatch(createWishlistItem({userId: currentUser.id, gameId: gameId}));
    }
  }

  const buttonClass = gameAlreadyInWishlist
    ? "light-blue-button wishlist-button active"
    : "light-blue-button wishlist-button";

  return (
    <button
      className={buttonClass}
      onClick={handleAddToWishlist}
      disabled={gameAlreadyInLibrary}
    >
      {wishlistButtonText}
    </button>
  )
}