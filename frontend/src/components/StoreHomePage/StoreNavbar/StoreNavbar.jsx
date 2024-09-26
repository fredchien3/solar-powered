import { Link } from "react-router-dom/cjs/react-router-dom.min"
import NewsModal from "./NewsModal"
import "./StoreNavbar.css"

export default function StoreNavbar() {
  // No dead links:
  const storeNavbarLinks = (
    <div className="store-nav-bar-links">
      <Link to="/store" className="store-nav-bar-link">Your Store</Link>
      {/* <Link to="#">New & Noteworthy</Link> */}
      {/* <Link to="#">Categories</Link> */}
      {/* <Link to="#">Points Shop</Link> */}
      <NewsModal />
      {/* <Link to="#">Labs</Link> */}
    </div>
  )

  return (
    <nav className="store-nav-bar">
      {storeNavbarLinks}
      {/* No dead links */}
      <input className="store-nav-bar-search" type="search" placeholder="search" />
      <button className="store-nav-bar-submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </nav>
  )
}