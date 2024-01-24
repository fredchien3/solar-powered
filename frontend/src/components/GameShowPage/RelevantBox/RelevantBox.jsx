import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./RelevantBox.css";

export default function RelevantBox({ currentUser, gameId }) {
  const otherOwnedGames = useSelector(state => {
    const libraryItemsArray = Object.values(state.libraryItems.currentUser);
    const ownedGames = libraryItemsArray.map(libraryItem => state.games[libraryItem.gameId]);
    return ownedGames.filter(game => game?.id !== gameId);
  });

  // shuffle
  // for (let i = otherOwnedGames.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [otherOwnedGames[i], otherOwnedGames[j]] = [otherOwnedGames[j], otherOwnedGames[i]];
  // }

  let similarGame1 = otherOwnedGames[0] || {};
  let similarGame2 = otherOwnedGames[1] || {};
  let relevantBoxContents;
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
  } else {
    relevantBoxContents = (
      <div>
        <p>Sign in to see reasons why you may or may not like this based on your games, friends, and curators you follow.</p>
        <span className="relevant-login-signup-buttons">
          <Link to="/login" className="light-blue-button">Log In</Link>
          <span>or</span>
          <Link to="/signup" className="light-blue-button">Sign Up</Link>
        </span>
      </div>
    );
  }
  return (
    <div className="game-relevant">
      <h1>Is this game relevant to you?</h1>
      {relevantBoxContents}
    </div>
  );
}