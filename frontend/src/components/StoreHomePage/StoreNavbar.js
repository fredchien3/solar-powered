import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./StoreNavbar.css"

export default function StoreNavbar() {
  return (
    <nav className="store-nav-bar">
      <div className="store-nav-bar-links">
        <Link to="/store">Your Store</Link>
        <Link to="#">New & Noteworthy</Link>
        <Link to="#">Categories</Link>
        <Link to="#">Points Shop</Link>
        <Link to="#">News</Link>
        <Link to="#">Labs</Link>
      </div>
      <input className="store-nav-bar-search"type="search" placeholder="search" />
      <button className="store-nav-bar-submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </nav>
  )
}