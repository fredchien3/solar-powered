import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './LibraryItem.css';

export default function LibraryItem({ game }) {
  return (
    <div className="library-item-wrapper">
      <img src={game.smallImageUrl} alt={game.title + " small image"} />
      <div className="library-item-info-wrapper">
        <h1>{game.title}</h1>
        <p>0 hours on record</p>
        <Link to={"/store/" + game.id}><i className="fa-solid fa-link"></i>Store Page</Link>
      </div>
    </div>
  )
}