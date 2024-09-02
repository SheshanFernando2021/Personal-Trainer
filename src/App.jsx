import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Timer from './Components/Timer/Timer';
import Navbar from './Components/Navbar/Navbar';
import SignIn from './Components/Access/SignIn/SignIn';
import SignUp from './Components/Access/SignUp/SignUp';
import RecipeSearch from './Components/Recipe/Recipe';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/recipe" element={<RecipeSearch />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
