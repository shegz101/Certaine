import React from 'react';
import '../style/Header.css';

const Header = () => {
    return (
        <div className='header-section'> 
            <div><h1 style={{color:'white'}} className='header-text'>Certaine</h1></div>
            <div className='button-grp'>
                <button className='init-button'>Init Account</button>
                <button className='connect-button'>Connect to Wallet</button>
            </div>
        </div>
    )
}

export default Header;