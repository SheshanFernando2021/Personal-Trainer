import React from 'react'
import './SignIn.css'
import SignUp from '../SignUp/SignUp'
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className='sign-in-container'>
            <div className="sign-in-box">            <h1>Sign In</h1>
                <form>
                    <span> Your Email<input type="email" className='email' /></span>
                    <span>Your Password<input type="password" /></span><br />
                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link to="/signup">Click here to create an account</Link></p>                </form>
            </div>
        </div>
    )
}

export default SignIn