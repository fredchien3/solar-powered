import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchGame } from "../../store/games";
import StoreNavbar from "../StoreHomePage/StoreNavbar";
import "./GameShowPage.css";

export default function GameShowPage() {
  const dispatch = useDispatch();
  const gameId = useParams().id;
  const game = useSelector(state => state.games[gameId] ? state.games[gameId] : {loading: true});
  document.title = game.loading ? "loading..." : game.title + " on Solar";
  
  useEffect(() => {
    dispatch(fetchGame(gameId));
  }, [dispatch, gameId])
  
  return (
    <div className="game-show-page">
      <div className="game-show-page-dynamic-background"></div>
      <StoreNavbar />
      <div className="game-show-title-wrapper">
        <div>
          <p>All Games {'>'} {game.title}</p>
          <h1>{game.title}</h1>
        </div>
        <div>
          <button className="community-hub">Community Hub</button>
        </div>
      </div>
      <section className="game-show-main-box-wide-wrapper">
        <div className="game-show-main-box">
          <div className="game-show-main-carousel">
  
          </div>
          <div className="game-show-main-info-panel">
            <img src={game.bannerImageUrl} alt={game.title + ' banner image'}/>
            <p>{game.shortDescription}</p>
            <table className="game-info-table">
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
            </table>
            <div className="popular-tags">
              Popular user-defined tags for this product:
              <div className="user-tags-row">
                <button>Tags</button>
                <button>Coming</button>
                <button>Soon!</button>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}