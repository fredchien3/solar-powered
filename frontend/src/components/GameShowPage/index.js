import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGame } from "../../store/games";
import StoreNavbar from "../StoreHomePage/StoreNavbar";
import "./GameShowPage.css";
import GameShowCarousel from "./GameShowCarousel";
import { createCartItem } from "../../store/cartItems";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchLibraryItems } from "../../store/libraryItems";

export default function GameShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const gameId = parseInt(useParams().id);
  
  const gamesSlice = useSelector(state => state.games);
  const game = gamesSlice[gameId] || {};

  document.title = game.id ? game.title + " on Solar" : "loading...";
  
  const sessionSlice = useSelector(state => state.session);
  const currentUser = sessionSlice.user || {};
  
  const cartItemsSlice = useSelector(state => state.cartItems);
  const cartItemsArray = Object.values(cartItemsSlice);
  
  const libraryItemsSlice = useSelector(state => state.libraryItems);
  const libraryItemsArray = Object.values(libraryItemsSlice);
  const libraryItemsGameIds = libraryItemsArray.map(libraryItem => libraryItem.gameId);
  
  const gameAlreadyInCart = cartItemsArray.some(cartItem => cartItem.gameId === gameId);
  const gameAlreadyInLibrary = libraryItemsArray.some(libraryItem => libraryItem.gameId === gameId);
  
  useEffect(() => {
    dispatch(fetchGame(gameId));
    dispatch(fetchLibraryItems(currentUser.id));
  }, [dispatch, gameId, currentUser.id])

  useEffect(() => {
    const ownedGamesIds = Object.values(libraryItemsSlice).map(libraryItem => libraryItem.gameId);
      ownedGamesIds.forEach(otherGameId => dispatch(fetchGame(otherGameId)));
  }, [dispatch, libraryItemsSlice])

  const handleAddToCart = () => {
    if (gameAlreadyInLibrary) {
      // do nothing
    } else if (gameAlreadyInCart) {
      history.push("/cart");
    } else {
      dispatch(createCartItem(gameId))
      .then(() => {
        history.push("/cart");
      })
      .catch(async res => {
        const data = await res.json();
        console.log(data.message);
        history.push("/login");
      });
    }
  }
    
  let underMainBox = (
    <div className="wishlist-buttons-bar">
      <Link to="/login">Sign in</Link> to add this item to your wishlist, follow it, or mark it as ignored
    </div>
  );
  if (currentUser.id) {
    underMainBox = (
      <div className="wishlist-buttons-bar">
        Wishlist feature coming soon.
      </div>
    )
  }

  let addToCartButtonText = "Add to Cart";
  if (gameAlreadyInLibrary) {
    addToCartButtonText = "In Library";
  } else if (gameAlreadyInCart) {
    addToCartButtonText = "In Cart";
  }

  const dupGamesSlice = {...gamesSlice};
  delete dupGamesSlice[gameId];
  const otherOwnedGames = Object.values(dupGamesSlice).filter(game => libraryItemsGameIds.includes(game.id));
  // shuffle
  // for (let i = otherOwnedGames.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [otherOwnedGames[i], otherOwnedGames[j]] = [otherOwnedGames[j], otherOwnedGames[i]];
  // }

  let similarGame1 = otherOwnedGames[0] || {};
  let similarGame2 = otherOwnedGames[1] || {};
  let relevantBoxContents = (
    <div>
      <p>Sign in to see reasons why you may or may not like this based on your games, friends, and curators you follow.</p>
      <span className="relevant-login-signup-buttons">
        <Link to="/login" className="light-blue-button">Log In</Link>
        <span>or</span>
        <Link to="/signup" className="light-blue-button">Sign Up</Link>
      </span>
    </div>
  );
  if (currentUser.id) {  
    relevantBoxContents = (
      <div>
        {similarGame1.id && <div className="relevant-similar-games-tile">
          <span>
            <i className="fa-solid fa-check" />
            Similar to games you've played:
          </span>
          <span className="relevant-similar-games-images">
            {similarGame1.id && <Link to={'/games/' + similarGame1.id}>
              <img src={similarGame1.smallImageUrl} alt={similarGame1.title + ' small image'} />
            </Link>}
            {similarGame2.id && <Link to={'/games/' + similarGame2.id}>
              <img src={similarGame2.smallImageUrl} alt={similarGame2.title + ' small image'} />
            </Link>}
          </span>
        </div>}
      </div>
    );
  }
  
  return (
    <div className="game-show-page">
      <div className="game-show-page-dynamic-background"></div>
      <StoreNavbar />
      <header className="game-show-title-wrapper">
        <div>
          <p className="game-show-breadcrumbs"><Link to="/store">All Games</Link> {'>'} <Link to={'/games/' + gameId}>{game.title}</Link></p>
          <h1>{game.title}</h1>
        </div>
        <div>
          {/* No dead links */}
          {/* <button className="light-blue-button">Community Hub</button> */}
        </div>
      </header>
      <section className="game-show-main-box-wide-wrapper">
        <div className="game-show-main-box">
          <GameShowCarousel game={game} />
          <aside className="game-show-main-info-panel">
            <img src={game.bannerImageUrl} alt={game.title + ' banner'}/>
            <p>{game.shortDescription}</p>
            <table className="game-info-table">
              <tbody>
                <tr className="review-summary">
                  <th>All Reviews:</th><td>Very Positive<p>(1,000)</p></td>
                </tr>
                <tr className="release-date-row">
                  <th>Release Date:</th><td>{game.releaseDate}</td>
                </tr>
                <tr>
                  <th>Developer:</th><td className="developer-publisher">{game.developer}</td>
                </tr>
                <tr>
                  <th>Publisher:</th><td className="developer-publisher">{game.publisher}</td>
                </tr>
              </tbody>
            </table>
            <div className="popular-tags">
              Popular user-defined tags for this product:
              <div className="user-tags-row">
                <button>Tags</button>
                <button>Coming</button>
                <button>Soon</button>
                <button>+</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
      {underMainBox}
      <section className="game-show-main-column-wrapper">
        <aside className="game-show-main-left">
          <div className="buy-box">
            Buy {game.title}
            <div className="buy-box-buttons">
              <p>{game.price === 0 ? "Free to Play" : '$' + game.price}</p>
              <button onClick={handleAddToCart} disabled={gameAlreadyInLibrary}>{addToCartButtonText}</button>
            </div>
          </div>
          <article className="about-this-game">
            <h1>About this game</h1>
            {game.longDescription}
          </article>
        </aside>
        <aside className="game-show-main-right">
          <div className="game-relevant">
            <h1>Is this game relevant to you?</h1>
            {relevantBoxContents}
          </div>
        </aside>
      </section>
    </div>
  )
}