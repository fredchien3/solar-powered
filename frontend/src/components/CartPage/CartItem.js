import './CartItem.css';

export default function CartItem({game}) {
  return (
    <div className="cart-item-wrapper">
      <img src="https://cdn.akamai.steamstatic.com/steam/apps/1139980/capsule_231x87.jpg?t=1666087224" />
      <div>
        <h1>{game.title}</h1>
        <div className="price-and-remove">
          <p>${game.price}</p>
          <a className="cart-remove">Remove</a>
        </div>
      </div>      
    </div>
  )
}