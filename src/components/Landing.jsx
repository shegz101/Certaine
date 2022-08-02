import React from 'react';
import '../style/Header.css';
import { Link } from "react-router-dom";
import logo from '../logo.jpg';
import land from '../landing.png'; 
import '../style/Landing.css';

const Landing = () => {
    return (
        <div className='landing__page__section'>
            <div className='header-section'> 
               <div className='header__logo'>
                  <span><img src={logo} style={{fontSize:'20px',height:'28px',marginTop:'20px',lineHeight:'2.4',}}alt="certaine-logo"/></span>
                  <h1 style={{color:'white', paddingTop:'20px', paddingLeft:'10px'}} className='header-text'>Certaine</h1>
               </div>
               <div>
                  <Link to="/login"><button className='sign-button' style={{border:'1px solid transparent'}}>Sign In</button></Link>
               </div>
           </div>

           <div className='main__landing__section'>
              <div className='landing__text'>
                  <h1 style={{color:'white', fontSize:'55px',width:'50%',}}>Make instant NFT Certificate Builder Platform</h1>
                  <p style={{color:'hsla(0,0%,100%,.5)', fontSize:'25px', width:'45%',}}>It takes seconds to upload certificate and create an NFT certificate on Certaine. Easily Connect your Wallet. Send NFT to any address.</p>
                  <>
                    <Link to="/login"><button className='sign-button' style={{marginTop:'20px',width:'8rem', border:'1px solid transparent'}}>Get Started</button></Link>
                    <button className='sign-button' style={{marginTop:'20px', width:'8rem', marginLeft:'4rem', border:'1px solid transparent'}}>Explore</button>
                  </>
              </div>
              <div className='landing__image'>
                <img src={land} style={{height:'500px', marginTop:'28px', marginLeft:'-600px'}} alt='Landing Page'/>
              </div>
           </div>
        </div>
    )
}


export default Landing;