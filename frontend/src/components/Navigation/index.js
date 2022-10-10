import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import coberHappy from './cober_happy.jpeg'

export default function Navigation() {
  const stateSession = useSelector(state => state.session);
  let currentUser;
  if (stateSession) currentUser = stateSession.user;

  const centerCluster = (
      <ul className="center-cluster">
        <li>Store</li>
        <li>Community</li>
        {currentUser ? <li>User</li> : <></>}
        <li>Chat</li>
        <li>Support</li>
      </ul>
  )

  let rightCluster;
  if (currentUser) {
    rightCluster = (
      <div className="right-cluster">
        <button className="install-steam">Install Steam</button>
        <button className="mail-button">M</button>
        <ProfileButton currentUser={currentUser} />
        <img src={coberHappy} className="small-profile-pic"/>
      </div>
    )
  } else {
    rightCluster = (
      <div className="right-cluster">
        <button className="install-steam green">Install Steam</button>
        <ul className="login-signup-links">
          <li><Link to="/login">login</Link></li>
          <li><Link to="/signup">signup</Link></li>
        </ul>
      </div>
    )
  }
  
  return (
    <nav className="header-nav">
      <Link to="/" className="logo">SOLAR</Link>
      {centerCluster}
      {rightCluster}
    </nav>
  )
}