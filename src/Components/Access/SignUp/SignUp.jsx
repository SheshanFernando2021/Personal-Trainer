import React from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submitSignIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User logged in successfully');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log('Error logging in:', error.message);
      });
  };
  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        {' '}
        <h1>Register</h1>
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
            Already have an account ?<Link to="/"> Click here to Log In</Link>
          </p>{' '}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
