import React, {useState,useEffect, useRef} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { ethers } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import '../style/Header.css';
import { Link } from "react-router-dom";
import logo from '../logo.jpg';
import meta from '../metamask.png';
// import land from '../landing.png'; 
import { FiUpload }from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdOutlineFormatColorReset } from 'react-icons/md'
import '../style/Landing.css';

const Landing = (props) => {
    // const notify = () => toast("Please Connect Wallet!");
    const [isOpen, setIsOpen] = useState(false);
    const [activerow, setActiveRow] = useState(true);
    const [newrow, setNewRow] = useState(false);
    const [explore, setExplore] = useState(false);
    const [signmodal, setSignModal] = useState(false);

    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
    };

    const openModal = () => {
      setIsOpen(true);
    }
  
    const closeModal = () => {
      setIsOpen(false);
    }
  
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
  useEffect(() => {
    setActiveRow(true);
  }, [])
  
      
 return (
        <div className='landing__page__section'>
          {isOpen && (
           <>
            <div className="overlay"></div>
            <div className="modal">
              <button onClick={closeModal} className="close-button">&times;</button>
              <main className="modal__main">
                <img src={meta} alt="metamask logo"  onClick={btnhandler} style={{fontSize:'20px',height:'78px',marginTop:'20px',lineHeight:'5.4',}}/>
                <h1 style={{fontWeight:'900', fontSize:'60px', color:'white'}}>Metamask</h1>
                <p onClick={btnhandler} style={{color:'hsla(0,0%,100%,.5)', fontSize:'25px', fontWeight:'600',}}>Connect to your Metamask Wallet</p>
              </main>
            </div>
           </>
          )}
          {
            explore && (
          <>
            <div className="overlay"></div>
            <div className="explore_modal">
              <button onClick={() => setExplore(false)} className="close-button">&times;</button>
              <main className="explore__main">
                <p style={{fontWeight:'900', fontSize:'20px', color:'white'}}>Mint new Certificate</p>
                <p style={{fontWeight:'600', fontSize:'15px', color:'white', paddingTop:'20px',}}>Metadata</p>
                <hr style={{marginTop:'10px', width:'350px', color:'hsla(0,0%,100%,.5)', opacity:'0.05',}}/>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Name <span style={{color:'red'}}>*</span></p>
                <input type='text' className='explore__name' placeholder='Name'/>
                <p style={{fontWeight:'600', fontSize:'15px', color:'white', paddingTop:'20px',}}>Media</p>
                <div className='upload__section'>
                  <div className='upload__nav'>
                    <div><FiUpload style={{ paddingTop:'10px', fontSize:'30px', color:'hsla(0,0%,100%,.5)'}}/></div>
                    <div><p style={{fontWeight:'600', fontSize:'15px', color:'hsla(0,0%,100%,.5)',}}>Upload File</p></div>
                  </div>
                  <div>
                    <input type="file" ref={hiddenFileInput} style={{display:'none'}} />
                    <button className='upload__btn' onClick={handleClick} onChange={handleChange}> <span style={{paddingTop:'20px', color:'hsla(0,0%,100%,.5)'}}><AiOutlineFileAdd style={{paddingTop:'5px',}}/></span> Select File</button>
                  </div>
                </div>
                <p style={{fontSize:'12px', paddingTop:'10px' ,color:'hsla(0,0%,100%,.5)',}}>You can upload image, audio, video, text, pdf, and 3D model files here.</p>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Description</p>
                <textarea className="description__field"  name="msg" rows="5" cols="50"></textarea>
                <div className="properties__section">
                  <div className="properties__nav">
                    <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Properties</p>
                    <button className='reset__btn'>Reset <span><MdOutlineFormatColorReset style={{paddingTop:'3px',}}/></span></button>
                  </div>

                  {
                    activerow && (
                      <div className='property__line'>
                       <div><input type='text' className='property__name' placeholder='trait_type'/></div>
                       <div><input type='text' className='property__name' placeholder='value'/></div>
                       <div><p onClick={() => setActiveRow(false)} style={{paddingTop:'5px', color:'hsla(0,0%,100%,.5)'}}>x</p></div>
                     </div>
                    )
                  }

                  {
                    newrow && (
                      <div className='property__line'>
                       <div><input type='text' className='property__name' placeholder='trait_type'/></div>
                       <div><input type='text' className='property__name' placeholder='value'/></div>
                       <div><p onClick={() => setNewRow(false)} style={{paddingTop:'5px', color:'hsla(0,0%,100%,.5)'}}>x</p></div>
                     </div>
                    )
                  }
                  <button className='add__row__btn' onClick={() => setNewRow(true)}>+ Add Row</button>
                </div>
              </main>
            </div>
          </>
            )
          }

          {
            signmodal && (
            <>
              <div className="overlay"></div>
              <div className='login__modal'>
               <button onClick={() => setSignModal(false)} className="close-button">&times;</button>
               <h1 className="sign__text">Sign Up</h1>
               <input type='text' placeholder='Name' className="name__field"/>
               <form class="my-form">
                  <textarea className="description-field"  name="msg" rows="5" cols="50" placeholder="Description"></textarea>
               </form>
               <button className="sign__btn">Sign Up</button>      
              </div>
            </>
            )
          }
          <div className='header-section'> 
              <div className='header__logo'>
                <span><img src={logo} style={{fontSize:'20px',height:'28px',marginTop:'20px',lineHeight:'2.4',}}alt="certaine-logo"/></span>
                <Link to="/" style={{textDecoration:'none', outline:'none',}}><h1 style={{color:'white', paddingTop:'20px', paddingLeft:'10px', cursor:'pointer'}} className='header-text'>Certaine</h1></Link>
              </div>
              <div>
                <button className='connect-button' onClick={openModal} style={{border:'1px solid transparent'}}>Connect Wallet</button>
                {/* <ToastContainer /> */}
              </div>
          </div>

           <div className='main__landing__section'>
              <div className='landing__text'>
                  <h1 style={{color:'white', fontSize:'55px', width:'100%'}}>Make instant NFT Certificate Builder Platform</h1>
                  <p className='descrp__txt' style={{color:'hsla(0,0%,100%,.5)', width:'600px',}}>It takes seconds to upload certificate and create an NFT certificate on Certaine. Easily Connect your Wallet. Send NFT to any address.</p>
                  <div>
                    <button className='new__button' onClick={() => setSignModal(true)} style={{marginTop:'20px', border:'1px solid transparent'}}>New to Certaine</button>
                    <button onClick={() => setExplore(true)} className='sign-button' style={{marginTop:'20px', width:'8rem', marginLeft:'4rem', border:'1px solid transparent'}}>Explore</button>
                  </div>
              </div>
           </div>
        </div>
    )
}


export default Landing;