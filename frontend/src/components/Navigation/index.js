import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { logout } from "../../store/session"

export default function Navigation() {
  const stateSession = useSelector(state => state.session);
  let currentUser;
  if (stateSession) currentUser = stateSession.user;
  const dispatch = useDispatch();

  if (currentUser) {
    return (
      <ul>
        <li><Link to="/">View profile</Link></li>
        <li><button onClick={() => dispatch(logout())}>Logout: {currentUser.username}</button></li>
        <li><Link to="/">Account details</Link></li>
        <li><Link to="/">Logout: cartercow</Link></li>
        <li><Link to="/">Preferences</Link></li>
        <li><Link to="/">Change language</Link></li>
      </ul>
    )
  } else {
    return (
      <ul>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/signup">signup</Link></li>
      </ul>
    )
  }
}