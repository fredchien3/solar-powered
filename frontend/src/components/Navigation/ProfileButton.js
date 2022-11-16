import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import "./ProfileButton.css";

export default function ProfileButton({currentUser}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout()).then(history.push('/store'));
  }
  
  const menu = (
    <div className="profile-button-dropdown">
      <Link to={`/users/${currentUser.username}/games`}>View profile</Link>
      <Link to={`/users/${currentUser.username}/games`}>Account details</Link>
      <a href="/logout" onClick={handleLogout}>Logout: <p>{currentUser.username}</p></a>
      <Link to="#">Preferences</Link>
      <Link to="#">Change language</Link>
    </div>
  )
  
  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  }
  
  useEffect(() => {
    if (showMenu)  {
      const closeMenu = () => setShowMenu(false);
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
      }
  }, [showMenu])

  return (
    <div className="profile-button-wrapper">
      <button onClick={openMenu} className="profile-button">{currentUser.displayName} ▼</button>
      {showMenu ? menu : <></>}
    </div>
  )
}