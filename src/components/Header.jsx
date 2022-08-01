import React from 'react';
import logo from '../logo.jpg';
import '../style/Header.css';

const Header = () => {
    return (
        <div className='header-section'> 
            <div className='header__logo'>
                <span><img src={logo} style={{fontSize:'20px',height:'28px',marginTop:'20px',lineHeight:'2.4',}}alt="certaine-logo"/></span>
                <h1 style={{color:'white', paddingTop:'20px', paddingLeft:'10px'}} className='header-text'>Certaine</h1>
            </div>
            <div className='button-grp'>
                <p className='log-button'>Log In</p>
                <button className='sign-button'>Sign Up</button>
            </div>
        </div>
    )
}

export default Header;