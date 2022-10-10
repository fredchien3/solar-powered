import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { logout } from "../../store/session"

export default function ProfileButton({currentUser}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const menu = (
    <ul className="profile-button-nav">
      <li><Link to="/">View profile</Link></li>
      <li><button onClick={() => dispatch(logout())}>Logout: {currentUser.username}</button></li>
      <li><Link to="/">Account details</Link></li>
      <li><Link to="/">Logout: {currentUser.username}</Link></li>
      <li><Link to="/">Preferences</Link></li>
      <li><Link to="/">Change language</Link></li>
    </ul>
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
      <button onClick={openMenu} className="profile-button">{currentUser.username} ▼</button>
      {showMenu ? menu : <></>}
    </div>
  )
}