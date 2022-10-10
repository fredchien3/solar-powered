import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
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
    <form className="signup-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Email Address
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Solar Account Name
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Choose Password
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password
        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </label>
      <button type="submit">Done</button>
    </form>
  );
}