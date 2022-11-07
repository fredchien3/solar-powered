import { useDispatch, useSelector } from "react-redux";
import { createWishlistItem, deleteWishlistItem } from "../../../store/wishlistItems";

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
     wishlistButtonText = "On Wishlist";
  }

  const handleAddToWishlist = () => {
    if (gameAlreadyInWishlist) { // game is in wishlist
      dispatch(deleteWishlistItem(gameAlreadyInWishlist));
    } else { // game is not in wishlist
      dispatch(createWishlistItem({userId: currentUser.id, gameId: gameId}));
    }
  }

  return (
    <button
      className="light-blue-button"
      onClick={handleAddToWishlist}
      disabled={gameAlreadyInLibrary}
    >
      {wishlistButtonText}
    </button>
  )
}