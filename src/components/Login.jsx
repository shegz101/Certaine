import React from "react";
import logo from '../logo.jpg';
import '../style/Login.css';
import '../style/Header.css';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-section">
            <div className='header__logo' style={{marginTop:'20px'}}>
                <span><img src={logo} style={{fontSize:'20px',height:'28px',marginTop:'20px',lineHeight:'2.4',}}alt="certaine-logo"/></span>
                <Link to="/" style={{textDecoration:'none', outline:'none',}}><h1 style={{color:'white', paddingTop:'20px', paddingLeft:'10px'}} className='header-text'>Certaine</h1></Link>
            </div>
            <div className='login__input'>
               <h1 className="sign__text">Sign Up</h1>
               <input type='text' placeholder='Name' className="name__field"/>
               <form class="my-form">
                    <textarea className="description__field"  name="msg" rows="5" cols="50" placeholder="Description"></textarea>
               </form>
               <Link to="/home"><button className="sign__btn">Sign Up</button></Link>       
            </div>
        </div>
    )
}

export default Login;