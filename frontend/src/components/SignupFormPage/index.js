import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { signup } from "../../store/session";
import './SignupForm.css'

export default function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateSession = useSelector(state => state.session);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (stateSession.user) {
    history.push('/');
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup({email, username, password}))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    } else {
      setErrors(['Passwords do not match'])
    }
  }
  
  return (
    <div className="signup-page-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <label htmlFor="email">Email Address</label>
        <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="username">Solar Account Name</label>
        <input id="username" value={username} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Choose Password</label>
        <input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" />
        <label>
          <input type="checkbox"></input>
          I am 13 years of age or older and agree to the terms of the <Link to="/subscriber_agreement" onClick={e => e.preventDefault()}>Solar Subscriber Agreement</Link> and the <Link to="/privacy_agreement" onClick={e => e.preventDefault()}>Valve Privacy Policy</Link>.
        </label>
        <button type="submit">Continue</button>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </form>
    </div>
  );
}