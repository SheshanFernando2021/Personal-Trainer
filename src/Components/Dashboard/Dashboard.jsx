import React from 'react';
import './dashboard.css';
import Navbar from '../Navbar/Navbar';
const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <Navbar />
            <div className="dashboard-contents">
                <div className="welcome-text" id="items"><h2>Welcome back Sheshan !</h2></div>
                <div className="plan" id="items">
                    <h4>Plan | Freemium</h4>
                </div>
                <div className="current-weight" id="items"><p>Your current weight is 77 Kg</p></div>
                <div className="current-height" id="items"><p>Your current height is 176 cm</p></div>
                <div className="chest-day" id="items">
                    <p>Chest Day </p> <input type="text" name="" id="input-dashboard" placeholder='Kg' />
                </div>
                <div className="arm-day" id="items">
                    <p>Arm Day </p> <input type="text" name="" id="input-dashboard" placeholder='Kg' />
                </div>
                <div className="back-day" id="items">
                    <p>Back Day </p> <input type="text" name="" id="input-dashboard" placeholder='Kg' />
                </div>
                <div className="leg-day" id="items">
                    <p>Leg Day </p> <input type="text" name="" id="input-dashboard" placeholder='Kg' />
                </div>
                <div className="chest-day-graph" id="items">
                    Chest Day
                </div>
                <div className="arm-day-graph" id="items">
                    Arm Day
                </div>
                <div className="back-day-graph" id="items">
                    Back Day
                </div>
                <div className="leg-day-graph" id="items">
                    Leg Day
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
