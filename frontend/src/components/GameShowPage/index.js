import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGame } from "../../store/games";
import StoreNavbar from "../StoreHomePage/StoreNavbar/StoreNavbar";
import "./GameShowPage.css";
import GameShowCarousel from "./GameShowCarousel/GameShowCarousel";
import { fetchLibraryItems } from "../../store/libraryItems";
import RelevantBox from "./RelevantBox/RelevantBox";
import { prettifyDate, ratingColor, ratingSummary } from "../../helpers";
import WishlistButton from "./WishlistButton/WishlistButton";
import CartButton from "./CartButton/CartButton";
import ReviewBox from "./ReviewBox/ReviewBox";
import { fetchReviews } from "../../store/reviews";
import ReviewsIndex from "./ReviewsIndex/ReviewsIndex";

export default function GameShowPage() {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user || {}) ;

  const gameId = parseInt(useParams().id);

  const game = useSelector(state => state.games[gameId] || {});

  document.title = game.id ? game.title + " on Solar" : "loading...";
  
  const libraryItemsArray = useSelector(state => Object.values(state.libraryItems.currentUser));

  const gameAlreadyInLibrary = libraryItemsArray.some(libraryItem => libraryItem.gameId === gameId);
  
  const reviews = useSelector(state => {
    return Object.values(state.reviews).filter(review => review.gameId === gameId)
  });
  
  let averageScore;
  const numReviews = reviews.length;
  if (numReviews > 0) {
    const reviewBooleans = reviews.map(review => review.recommended);
    averageScore = (reviewBooleans.filter(Boolean).length / reviewBooleans.length) * 100;
  } else {
    averageScore = null;
  }

  const ratingSummaryText = ratingSummary(averageScore);
  const ratingClass = ratingColor(averageScore);

  const allReviewsElement = <a href="#reviews">
    <span className={ratingClass}>
      {ratingSummaryText}
    </span>
    {numReviews > 0 ? <p>{`(${numReviews})`}</p> : <></>}
  </a>
  
  
  useEffect(() => {
    if (!game.id) dispatch(fetchGame(gameId));
  }, [dispatch, gameId, game.id]);

  useEffect(() => {
    if (libraryItemsArray.length === 0) dispatch(fetchLibraryItems(currentUser.id));
  }, [libraryItemsArray.length, currentUser.id, dispatch]);

  useEffect(() => {
    dispatch(fetchReviews(gameId));
  }, [dispatch, gameId])
  
  let wishlistControls = (
    <div className="wishlist-buttons-bar">
      <Link to="/login">Sign in</Link> to add this item to your wishlist{/* , follow it, or mark it as ignored */}
    </div>
  );
  if (currentUser.id) {
    wishlistControls = (
      <div className="wishlist-buttons-bar">
        <WishlistButton gameId={gameId}
          currentUser={currentUser}
          gameAlreadyInLibrary={gameAlreadyInLibrary}
        />
      </div>
    )
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
                  <th>All Reviews:</th><td className="no-user-reviews">{allReviewsElement}</td>
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
      <ReviewBox
        game={game}
        currentUser={currentUser}
        gameAlreadyInLibrary={gameAlreadyInLibrary}
      />
      <section className="game-show-main-column-wrapper">
        <aside className="game-show-main-left">
          <div className="buy-box">
            Buy {game.title}
            <div className="buy-box-buttons">
              <p>{game.price === 0 ? "Free to Play" : '$' + game.price}</p>
              <CartButton
                gameId={gameId}
                gameAlreadyInLibrary={gameAlreadyInLibrary}
              />
            </div>
          </div>
          <article className="about-this-game">
            <h1 className="blue-line-bottom">About this game</h1>
            {game.longDescription}
          </article>
        </aside>
        <aside className="game-show-main-right">
          <RelevantBox currentUser={currentUser} gameId={gameId} />
        </aside>
      </section>
      <ReviewsIndex
        reviews={reviews}
        ratingSummaryText={ratingSummaryText}
        ratingClass={ratingClass}
      />
    </div>
  )
}