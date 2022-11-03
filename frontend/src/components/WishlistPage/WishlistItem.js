import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { prettifyDate } from "../../helpers";
import "./WishlistItem.css";

export default function WishlistItem({ wishlistItem }) {


  const game = {
    id: 6,
    title: 'Team Fortress 2',
    price: 0,
    releaseDate: '2007-10-10',
    developer: 'Valve',
    publisher: 'Valve',
    mainImageUrl: 'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-main.jpg',
    bannerImageUrl: 'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-banner.jpg',
    smallImageUrl: 'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-small.jpg',
    imageUrls: [
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-1.jpg',
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-2.jpg',
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-3.jpg',
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-4.jpg',
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-5.jpg',
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-6.jpg',
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-7.jpg',
      'https://solar-powered.s3.amazonaws.com/game-images/tf2/tf2-8.jpg'
    ]
  };
  
  const removeButton = (
    <span className="remove-from-wishlist-wrapper">
      (<span className="remove-from-wishlist">remove</span>)
    </span>
  );
  
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
            <div className="wishlist-item-grid-item">None</div>
            <div className="wishlist-item-grid-item">Release date:</div>
            <div className="wishlist-item-grid-item">{prettifyDate(game.releaseDate)}</div>
          </div>
          <div className="wishlist-item-purchase">
            <p>{game.price > 0 ? "$" + game.price : "$9.99"}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
        <div className="wishlist-item-info-bottom-row">
          <p>Added on DATE OF CREATION</p>
          {removeButton}
        </div>
      </div>
    </div>
  )
}