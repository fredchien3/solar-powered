import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { login } from "../../store/session"
import './LoginForm.css';

export default function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateSession = useSelector(state => state.session)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
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
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Sign in with account name
        <input value={credential} onChange={e => setCredential(e.target.value)} />
      </label>
      <label>
        Password
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}