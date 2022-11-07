import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createCartItem } from "../../../store/cartItems";

export default function CartButton({ gameId, gameAlreadyInLibrary }) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const gameAlreadyInCart = useSelector(state => {
    const cartItemsArray = Object.values(state.cartItems);
    return cartItemsArray.some(cartItem => cartItem.gameId === gameId)
  })

  const handleAddToCart = () => {
    // if (gameAlreadyInLibrary) {
    //   // do nothing
    // } else 
    if (gameAlreadyInCart) {
      history.push("/cart");
    } else {
      dispatch(createCartItem(gameId))
      .then(() => {
        history.push("/cart");
      })
      .catch(async res => {
        const data = await res.json();
        console.log(data.message);
        history.push("/login");
      });
    }
  }
  
  let addToCartButtonText = "Add to Cart";
  if (gameAlreadyInLibrary) {
    addToCartButtonText = "In Library";
  } else if (gameAlreadyInCart) {
    addToCartButtonText = "In Cart";
  }
  
  return (
    <button 
      className="add-to-cart-button" 
      onClick={handleAddToCart} 
      disabled={gameAlreadyInLibrary}
    >
      {addToCartButtonText}
    </button>
  )
}