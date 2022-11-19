import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchGames } from "../../store/games";
import FeaturedBox from "./FeaturedBox/FeaturedBox";
import "./StoreHomePage.css"
import StoreNavbar from "./StoreNavbar/StoreNavbar";
import StoreSidebar from "./StoreSidebar/StoreSidebar";
import StoreTabList from "./StoreTabList/StoreTabList";

export default function StoreHomePage({ error }) {
  document.title = "Welcome to Solar";
  const dispatch = useDispatch();

  const sessionSlice = useSelector(state => state.session);
  const currentUser = sessionSlice.user || {};
  
  let games = [];
  games = useSelector(state => Object.values(state.games))

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);
  
  let errorMessage;
  if (error) errorMessage = <div className="flash-error">{error}</div>
  
  let signInBox;
  if (!currentUser.id) signInBox = (
    <div className="store-sign-in-box">
      Sign in to view personalized recommendations
      <Link className="green-button" to="/login">Sign In</Link>
      <span>Or <Link to="/signup">sign up</Link> and join Solar for free</span>
    </div>
  )
  
  // shuffle games
  for (let i = games.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [games[i], games[j]] = [games[j], games[i]];
  }

  const tablistGames = games.slice(0, 10);
  const featuredGames = games.slice(10, games.length);
  
  return (
    <div className="store-home-page">
      {errorMessage}
      <StoreNavbar />
      <div className="store-featured-box-wide-wrapper">
        <StoreSidebar />
        <FeaturedBox games={featuredGames} />
      </div>
      {signInBox}
      <StoreTabList games={tablistGames} />
    </div>
  )
}