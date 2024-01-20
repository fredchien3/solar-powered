import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './TabListItem.css';

export default function TabListItem({ game, active }) {
  
  return (
    <Link to={'/games/' + game.id}>
      <div className={active ? "tab-list-item tab-active" : "tab-list-item "} >
        <img src={game.smallImageUrl} alt={game.title + ' list item'} />
        <div>
          <h1>{game.title}</h1>
          <p>{game.price > 0 ? '$' + game.price : 'Free to Play'}</p>
        </div>
      </div>
    </Link>
  )
}