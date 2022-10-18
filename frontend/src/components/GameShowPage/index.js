import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGame } from "../../store/games";
import StoreNavbar from "../StoreHomePage/StoreNavbar";
import "./GameShowPage.css";
import GameShowCarousel from "./GameShowCarousel";

export default function GameShowPage() {
  const dispatch = useDispatch();
  const gameId = useParams().id;
  const game = useSelector(state => state.games[gameId] ? state.games[gameId] : {loading: true});
  const stateSession = useSelector(state => state.session);
  document.title = game.loading ? "loading..." : game.title + " on Solar";

  const currentUser = stateSession.user;
  
  useEffect(() => {
    dispatch(fetchGame(gameId));
  }, [dispatch, gameId])
  
  let underMainBox;
  if (currentUser) {
    underMainBox = (
      <div className="wishlist-buttons-bar">
        Add to your wishlist Follow Ignore \/    view your queue
      </div>
    )
  } else {
    underMainBox = (
      <div className="wishlist-buttons-bar">
        <Link to="/login">Sign in</Link> to add this item to your wishlist, follow it, or mark it as ignored
      </div>
    )
  }
  
  return (
    <div className="game-show-page">
      <div className="game-show-page-dynamic-background"></div>
      <StoreNavbar />
      <header className="game-show-title-wrapper">
        <div>
          <p>All Games {'>'} {game.title}</p>
          <h1>{game.title}</h1>
        </div>
        <div>
          <button className="light-blue-button">Community Hub</button>
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
              <p>${game.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </aside>
        <aside className="game-show-main-right">

        </aside>
      </section>
    </div>
  )
}