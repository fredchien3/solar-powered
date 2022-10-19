import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchGame } from '../../store/games';
import './LibraryItem.css';

export default function LibraryItem({ libraryItem }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGame(libraryItem.gameId));
  }, [dispatch, libraryItem.gameId]);
  const game = useSelector(state => state.games[libraryItem.gameId]) || {};
  
  return (
    <div className="library-item-wrapper">
      <img src={game.smallImageUrl} alt={game.title + " small image"} />
      <div className="library-item-info-wrapper">
        <h1>{game.title}</h1>
        <p>0 hours on record</p>
        <Link to={"/games/" + game.id}><i className="fa-solid fa-link"></i>Store Page</Link>
      </div>
    </div>
  )
}