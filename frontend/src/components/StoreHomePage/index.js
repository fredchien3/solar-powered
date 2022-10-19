import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../store/games";
import FeaturedBox from "./FeaturedBox";
import "./StoreHomePage.css"
import StoreNavbar from "./StoreNavbar";
import StoreSidebar from "./StoreSidebar";

export default function StoreHomePage({ error }) {
  document.title = "Welcome to Solar";
  const dispatch = useDispatch();
  let games = [];
  
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch])
  
  games = useSelector(state => Object.values(state.games))
  
  for (let i = games.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [games[i], games[j]] = [games[j], games[i]];
  }
  
  let errorMessage;
  if (error) errorMessage = <div class="flash-error">{error}</div>
  
  return (
    <div className="store-home-page">
      {errorMessage}
      <StoreNavbar />
      <div className="store-featured-box-wide-wrapper">
        <StoreSidebar />
        <FeaturedBox games={games} />
      </div>
    </div>
  )
}