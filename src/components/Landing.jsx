import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import '../style/Header.css';
import { Link } from "react-router-dom";
import logo from '../logo.jpg';
import land from '../landing.png'; 
import '../style/Landing.css';

const Landing = () => {
    const notify = () => toast("Please Connect Wallet!");
     // usetstate for storing and retrieving wallet details
    const [data, setData] = useState({
      address:'',
      Balance: null,
    })

    // Button handler button for handling a
    // request event for metamask
    const btnhandler = () => {
      // Checking if metamask is already present or not
      if (window.ethereum) {
        // res[0] for fetching a first wallet
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
      } else {
        alert("install metamask extension!!");
      }
    };

    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {
      // Requesting balance method
      window.ethereum
        .request({ 
          method: "eth_getBalance", 
          params: [address, "latest"] 
        })
        .then((balance) => {
          // Setting balance
          setData({
            Balance: ethers.utils.formatEther(balance),
          });
        });
    };

    // Function for handling all events
    const accountChangeHandler = (account) => {
      // Setting an address data
      setData({
        address: account,
      });
    
      // Setting a balance
      getbalance(account);
    };
      
 return (
        <div className='landing__page__section'>
            <div className='header-section'> 
               <div className='header__logo'>
                  <span><img src={logo} style={{fontSize:'20px',height:'28px',marginTop:'20px',lineHeight:'2.4',}}alt="certaine-logo"/></span>
                  <h1 style={{color:'white', paddingTop:'20px', paddingLeft:'10px'}} className='header-text'>Certaine</h1>
               </div>
               <div>
                  <button className='connect-button' onClick={btnhandler} style={{border:'1px solid transparent'}}>Connect Wallet</button>
                  <ToastContainer />
               </div>
           </div>

           <div className='main__landing__section'>
              <div className='landing__text'>
                  <h1 style={{color:'white', fontSize:'55px',width:'50%',}}>Make instant NFT Certificate Builder Platform</h1>
                  <p style={{color:'hsla(0,0%,100%,.5)', fontSize:'25px', width:'45%',}}>It takes seconds to upload certificate and create an NFT certificate on Certaine. Easily Connect your Wallet. Send NFT to any address.</p>
                  <>
                    <Link to="/login"><button className='new__button' style={{marginTop:'20px', border:'1px solid transparent'}}>New to Certaine</button></Link>
                    <button onClick={notify} className='sign-button' style={{marginTop:'20px', width:'8rem', marginLeft:'4rem', border:'1px solid transparent'}}>Explore</button>
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