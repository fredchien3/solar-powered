import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { deleteCartItem } from '../../store/cartItems';
import { fetchGame } from '../../store/games';
import './CartItem.css';

export default function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGame(cartItem.gameId));
  }, [dispatch, cartItem.gameId])
  const game = useSelector(state => state.games[cartItem.gameId]) || {};

  const handleRemove = () => {
    dispatch(deleteCartItem(cartItem.id));
  }

  return (
    <div className="cart-item-wrapper">
      <Link to={'games/' + game.id}><img src={game.smallImageUrl} alt={game.title + 'small image'} /></Link>
      <div>
          <Link to={'games/' + game.id}>{game.title}</Link>
        <div className="price-and-remove">
          <p className="cart-item-price">{game.price ? '$' + game.price : 'Free'}</p>
          <span onClick={handleRemove} className="cart-remove">Remove</span>
        </div>
      </div>
    </div>
  )
}