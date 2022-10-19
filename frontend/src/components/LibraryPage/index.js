import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/users';
import defaultAvatar from "../default_avatar.jpg";
import LibraryItem from './LibraryItem';
import './LibraryPage.css';

export default function LibraryPage() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const usersSlice = useSelector(state => state.users);
  const user = Object.values(usersSlice)[0] || {};
  
  useEffect(() => {
    dispatch(fetchUser(username));
  }, [dispatch, username])

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
        <LibraryItem game={{title: 'Counter-Strike: Global Offensive', smallImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_184x69.jpg"}} />
        <LibraryItem game={{title: 'Counter-Strike: Global Offensive', smallImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_184x69.jpg"}} />
      </section>
    </div>
  )
}