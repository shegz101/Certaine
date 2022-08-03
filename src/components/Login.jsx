import React from "react";
import '../style/Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-section">
            <div className='login__image'>
                <p style={{color:'white', paddingLeft:'30px', paddingTop:'30px', fontSize:'38px', fontWeight:'400', wordSpacing:'20'}}>Certaine</p>
            </div>
            <div className='login__input'>
               <h1 className="sign__text">Sign Up</h1>
               <p className='log__text'>New to Certaine? <span style={{color:'white', }}>sign up now</span></p>
               <input type='text' placeholder='Name' className="email__field"/>
               <input type='text' placeholder='Description' className="password__field"/>
               <Link to="/home"><button className="sign__btn">Sign Up</button></Link>       
            </div>
        </div>
    )
}

export default Login;