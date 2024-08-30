import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    });
  };
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log('User is signed in:', user);
      } else {
        setCurrentUser(null);
        console.log('No user is signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="Navbar-container">
      <ul>
        <li>Dashboard</li>
        <li>Day Planner</li>
        <li>Settings</li>
        <li>Customer Service</li>

        <Link to="/">
          <p
            onClick={handleSignOut}
            style={{ color: 'white', cursor: 'pointer' }}
          >
            sign out
          </p>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
