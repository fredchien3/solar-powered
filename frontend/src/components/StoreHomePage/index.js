import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../store/games";
import FeaturedBox from "./FeaturedBox";
import "./StoreHomePage.css"
import StoreSidebar from "./StoreSidebar";

export default function StoreHomePage() {
  const dispatch = useDispatch();
  let games = [];
  
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch])

  games = useSelector(state => Object.values(state.games))
  
  return (
    <div className="store-home-page">

      <nav className="store-top-nav">
        <StoreSidebar />
        <div className="store-top-nav-links">
          <div>Your Store</div>
          <div>New & Noteworthy</div>
          <div>Categories</div>
          <div>Points Shop</div>
          <div>News</div>
          <div>Labs</div>
        </div>
        <input type="search" />
      </nav>

      <div className="store-featured-box-wide-wrapper">
        <FeaturedBox games={games} />
      </div>
    </div>
    
  )
}