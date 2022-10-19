import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGame, setGames } from '../../store/games';
import { fetchLibraryItems, setLibraryItems } from '../../store/libraryItems';
import { fetchUser } from '../../store/users';
import defaultAvatar from "../default_avatar.jpg";
import LibraryItem from './LibraryItem';
import './LibraryPage.css';

export default function LibraryPage() {
  const dispatch = useDispatch();
  const { username } = useParams();

  const usersSlice = useSelector(state => state.users);
  const user = Object.values(usersSlice)[0] || {};

  const libraryItemsSlice = useSelector(state => state.libraryItems);
  const libraryItemsArray = Object.values(libraryItemsSlice);
  const libraryItemsGameIds = libraryItemsArray.map(libraryItem => libraryItem.gameId);

  // const gamesSlice = useSelector(state => state.games);
  // const gamesArray = Object.values(gamesSlice);
  
  const libraryItems = libraryItemsArray.map(libraryItem => {
    return <LibraryItem libraryItem={libraryItem} key={libraryItem.id} />;
  })
  
  useEffect(() => {
    dispatch(fetchUser(username));
    dispatch(setLibraryItems({}));
    dispatch(setGames({}));
  }, [dispatch, username])

  useEffect(() => {
    dispatch(fetchLibraryItems(user.id));
  }, [dispatch, user.id])

  return (
    <div className="library-page">
      <header className="library-header">
        <img src={defaultAvatar} alt="avatar"></img>
        <div>
          <h1>{user.displayName}</h1>
          <span>»</span>
          <p>Games</p>
        </div>
      </header>
      <section className="library-main-column">
        {libraryItems}
      </section>
    </div>
  )
}