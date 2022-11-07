import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGame } from "../../store/games";
import StoreNavbar from "../StoreHomePage/StoreNavbar/StoreNavbar";
import "./GameShowPage.css";
import GameShowCarousel from "./GameShowCarousel/GameShowCarousel";
import { createCartItem } from "../../store/cartItems";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchLibraryItems } from "../../store/libraryItems";
import RelevantBox from "./RelevantBox/RelevantBox";
import { prettifyDate } from "../../helpers";
import { createWishlistItem, deleteWishlistItem } from "../../store/wishlistItems";

export default function GameShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const gameId = parseInt(useParams().id);
  
  const gamesSlice = useSelector(state => state.games);
  const game = gamesSlice[gameId] || {};

  document.title = game.id ? game.title + " on Solar" : "loading...";
  
  const currentUser = useSelector(state => state.session.user) || {};

  const cartItemsArray = useSelector(state =>  Object.values(state.cartItems));
  const libraryItemsArray = useSelector(state => Object.values(state.libraryItems));

  const ownedGames = libraryItemsArray.map(libraryItem => gamesSlice[libraryItem.gameId]);
  
  const gameAlreadyInCart = cartItemsArray.some(cartItem => cartItem.gameId === gameId);
  const gameAlreadyInLibrary = libraryItemsArray.some(libraryItem => libraryItem.gameId === gameId);
  const gameAlreadyInWishlist = useSelector(state => {
    return Object.values(state.wishlistItems.currentUser)
      .find(wishlistItem => wishlistItem.gameId === gameId)
      ?.id
  });
  
  useEffect(() => {
    if (!game.id) dispatch(fetchGame(gameId));
  }, [dispatch, game.id, gameId]);

  useEffect(() => {
    if (libraryItemsArray.length === 0) dispatch(fetchLibraryItems(currentUser.id));
  }, [libraryItemsArray.length, currentUser.id, dispatch]);

  const handleAddToWishlist = () => {
    if (gameAlreadyInWishlist) { // game is in wishlist
      dispatch(deleteWishlistItem(gameAlreadyInWishlist));
    } else { // game is not in wishlist
      dispatch(createWishlistItem({userId: currentUser.id, gameId: gameId}));
    }
  }
  
  const handleAddToCart = () => {
    // if (gameAlreadyInLibrary) {
    //   // do nothing
    // } else 
    if (gameAlreadyInCart) {
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
    
  let addToCartButtonText = "Add to Cart";
  let wishlistButtonText = "Add to your wishlist";
  if (gameAlreadyInLibrary) {
    addToCartButtonText = "In Library";
    wishlistButtonText = "In Library";
  } else if (gameAlreadyInCart) {
    addToCartButtonText = "In Cart";
  }
  if (gameAlreadyInWishlist) wishlistButtonText = "On Wishlist";

  let wishlistControls = (
    <div className="wishlist-buttons-bar">
      <Link to="/login">Sign in</Link> to add this item to your wishlist, follow it, or mark it as ignored
    </div>
  );
  if (currentUser.id) {
    wishlistControls = (
      <div className="wishlist-buttons-bar">
        <button className="light-blue-button" onClick={handleAddToWishlist} disabled={gameAlreadyInLibrary}>
          {wishlistButtonText}
        </button>
      </div>
    )
  }
  
  const otherOwnedGames = ownedGames.filter(game => game?.id !== gameId);
  
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
                  {/* <th>All Reviews:</th><td>Very Positive<p>(1,000)</p></td> */}
                  <th>All Reviews:</th><td className="no-user-reviews">No user reviews</td>
                </tr>
                <tr className="release-date-row">
                  <th>Release Date:</th><td>{prettifyDate(game.releaseDate)}</td>
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
      {wishlistControls}
      <section className="game-show-main-column-wrapper">
        <aside className="game-show-main-left">
          <div className="buy-box">
            Buy {game.title}
            <div className="buy-box-buttons">
              <p>{game.price === 0 ? "Free to Play" : '$' + game.price}</p>
              <button className="add-to-cart-button" onClick={handleAddToCart} disabled={gameAlreadyInLibrary}>{addToCartButtonText}</button>
            </div>
          </div>
          <article className="about-this-game">
            <h1>About this game</h1>
            {game.longDescription}
          </article>
        </aside>
        <aside className="game-show-main-right">
          <RelevantBox currentUser={currentUser} otherOwnedGames={otherOwnedGames} />
        </aside>
      </section>
    </div>
  )
}