import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { login } from "../../store/session"
import './LoginForm.css';

export default function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateSession = useSelector(state => state.session);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (stateSession.user) {
    history.push('/');
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({credential, password}))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }
  
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label htmlFor="credential">Sign in with account name</label>
      <input id="credential"  value={credential} onChange={e => setCredential(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}