import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../store/session"
import './LoginForm.css';

export default function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateSession = useSelector(state => state.session);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [demoClicked, setDemoClicked] = useState(false);

  if (stateSession.user) {
    history.push('/');
  }

  useEffect(() => {
    setErrors([]);
  }, [credential, password])
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrors([]);
    if (credential.length && password.length) {
      return dispatch(login({credential, password}))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
  }

  const handleDemoClick = (e) => {
    e.preventDefault();
    if (demoClicked) return;
    setDemoClicked(true);
    setCredential('');
    setPassword('');
    setTimeout(fillCredential, 100);
    setTimeout(fillPassword, 1800);
  }

  const fillCredential = () => {
    let inputCredential = 'gaben';
    for (let i = 0; i < inputCredential.length; i++) {
      setTimeout(() => {
        setCredential(c => c + inputCredential[i]);
      }, i * 200)
    }
  }
  
  const fillPassword = () => {
    let inputPassword = 'MoolyFTW';
    for (let i = 0; i < inputPassword.length; i++) {
      setTimeout(() => {
        setPassword(c => c + inputPassword[i]);
      }, i * 100)
    }
  }
  
  return (
    <div className="login-page-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <label htmlFor="credential">Sign in with account name</label>
        <input id="credential" className={errors.length ? "error-border" : ""} value={credential} onChange={e => setCredential(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password"  className={errors.length ? "error-border" : ""} value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button type="submit">Sign in</button>
        <ul className="login-form-errors" >
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <Link to="/demo" className="demo-user-link" onClick={handleDemoClick}>Input demo user credentials</Link>
      </form>
    </div>
  );
}