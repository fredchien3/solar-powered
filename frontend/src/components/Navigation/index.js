import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import coberHappy from './cober_happy.jpeg'

export default function Navigation() {
  const stateSession = useSelector(state => state.session);
  let currentUser;
  if (stateSession) currentUser = stateSession.user;

  const centerCluster = (
      <div className="center-cluster">
        <Link to="/">Store</Link>
        <Link to="/">Community</Link>
        {currentUser ? <Link to="/">{currentUser.displayName}</Link> : <></>}
        {currentUser ? <Link to="/">Chat</Link> : <Link to="/">About</Link>}
        <Link to="/">Support</Link>
      </div>
  )

  let rightCluster;
  if (currentUser) {
    rightCluster = (
      <div className="right-cluster">
        <button className="install-steam">
          <i className="fa-solid fa-download"></i>
          Install Solar
        </button>
        <button className="mail-button">
          <i className="fa-solid fa-envelope"></i>
        </button>
        <ProfileButton currentUser={currentUser} />
        <div className="small-profile-pic-wrapper">
          <img alt="cober-pic" src={coberHappy} className="small-profile-pic"/>
        </div>
      </div>
    )
  } else {
    rightCluster = (
      <div className="right-cluster">
        <button className="install-steam green">
          <i className="fa-solid fa-download"></i>
          Install Solar
        </button>
        <div className="login-signup-links">
          <Link to="/login">login</Link>
            |  
          <Link to="/signup">signup</Link>
        </div>
      </div>
    )
  }

  return (
    <nav className="header-nav">
      <div className="header-nav-content">
        <Link to="/" className="logo">
          <i className="fa-solid fa-cloud-sun"></i>
          <h1>Solar</h1>
        </Link>
        {centerCluster}
        {rightCluster}
      </div>
    </nav>
  )
}