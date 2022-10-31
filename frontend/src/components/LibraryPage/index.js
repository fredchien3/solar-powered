import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { setGames } from '../../store/games';
import { fetchLibraryItems, setLibraryItems } from '../../store/libraryItems';
import { fetchUser } from '../../store/users';
import defaultAvatar from "../default_avatar.jpg";
import LibraryItem from './LibraryItem';
import './LibraryPage.css';

export default function LibraryPage() {
  const dispatch = useDispatch();
  const { username } = useParams();

  const usersSlice = useSelector(state => state.users);
  const libraryUser = Object.values(usersSlice).find(user => user.username === username) || {};

  const libraryItemsSlice = useSelector(state => state.libraryItems);
  const libraryItemsArray = Object.values(libraryItemsSlice);
  const libraryItems = libraryItemsArray.map(libraryItem => {
    return <LibraryItem game={libraryItem.game} key={libraryItem.id} />;
  })
  
  useEffect(() => {
    dispatch(fetchUser(username))
      .then(user => dispatch(fetchLibraryItems(user.id)));
  }, [dispatch])

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