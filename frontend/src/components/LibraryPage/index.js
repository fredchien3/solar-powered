import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchLibraryItems } from '../../store/libraryItems';
import { fetchUser } from '../../store/users';
import defaultAvatar from "../default_avatar.jpg";
import LibraryItem from './LibraryItem';
import './LibraryPage.css';

export default function LibraryPage() {
  const dispatch = useDispatch();
  const { username } = useParams();
  
  const currentUser = useSelector(state => state.session.user);
  
  const viewingOwnLibrary = currentUser.username === username;

  const userArray = useSelector(state => Object.values(state.users));

  let libraryUser;
  if (viewingOwnLibrary) {
    libraryUser = currentUser;
  } else {
    libraryUser = userArray.find(user => user.username === username) || {};
  }

  document.title = libraryUser.displayName ? `Solar Community :: ${libraryUser.displayName} :: Games` : "loading...";
  
  useEffect(() => {
    dispatch(fetchUser(username))
      .then(user => {
        dispatch(fetchLibraryItems(user.id, !viewingOwnLibrary))
      });
  }, [dispatch, currentUser.id, username, viewingOwnLibrary])

  // const libraryItemsSlice = useSelector(state => state.libraryItems);
  // const libraryItemsArray = Object.values(libraryItemsSlice);
  // const gamesSlice = useSelector(state => state.games);
  // const gamesArray = libraryItemsArray.map(libraryItem => gamesSlice[libraryItem.gameId]);
  
  // const libraryItems = gamesArray.map(game => {
  //   if (game) return <LibraryItem game={game} key={game.id} />;
  // })

  const libraryItems = useSelector(state => {
    let libraryItemsArray;
    if (viewingOwnLibrary) {
      libraryItemsArray = Object.values(state.libraryItems.currentUser);
    } else {
      libraryItemsArray = Object.values(state.libraryItems.otherUser);
    }
    const gamesArray = libraryItemsArray.map(libraryItem => state.games[libraryItem.gameId]);
    return gamesArray.map(game => {
      return game ? <LibraryItem game={game} key={game.id} /> : <></>;
    })
  })


  return (
    <div className="library-page">
      <header className="library-header">
        <img src={defaultAvatar} alt="avatar"></img>
        <div>
          <Link className="link-to-profile" to={'/users/' + libraryUser.username + '/games'}>{libraryUser.displayName}</Link>
          <span>»</span>
          <Link className="link-to-games" to={'/users/' + libraryUser.username + '/games'}>Games</Link>
        </div>
      </header>
      <section className="library-main-column">
        {libraryItems}
      </section>
    </div>
  )
}