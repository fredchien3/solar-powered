import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { logout } from "../../store/session"

export default function ProfileButton({currentUser}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const menu = (
    <div className="profile-button-dropdown">
      <Link to="/">View profile</Link>
      <Link to="/">Account details</Link>
      <button onClick={() => dispatch(logout())}>Logout: <p>{currentUser.username}</p></button>
      <Link to="/">Preferences</Link>
      <Link to="/">Change language</Link>
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
      <button onClick={openMenu} className="profile-button">{currentUser.username} ▼</button>
      {showMenu ? menu : <></>}
    </div>
  )
}