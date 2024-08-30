import React from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submitSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User signed in successfully');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log('Error signing in:', error.message);
      });
  };
  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        {' '}
        <h1>Log In</h1>
        <form onSubmit={submitSignIn}>
          <span>
            {' '}
            Your Email
            <input
              type="email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span>
            Your Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <br />
          <button type="submit">Login</button>
          <p>
            Don't have an account ?
            <Link to="/signup"> Click here to create an account</Link>
          </p>{' '}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
