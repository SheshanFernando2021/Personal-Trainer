import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Settings from './Components/Settings/Settings'
// import DayPlanner from './Components/Day Planner/Dayplanner'
import Dashboard from './Components/Dashboard/Dashboard'
import Navbar from './Components/Navbar/Navbar'
import SignIn from './Components/Access/SignIn/SignIn'
import SignUp from './Components/Access/SignUp/SignUp'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      {/* <SignUp /> */}
      {/* <Dashboard /> */}

    </div>
  )
}

export default App