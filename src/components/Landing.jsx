import React, {useState,useRef} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { ethers } from "ethers";
//integrating sequence wallet
import { sequence } from "0xsequence";
// import 'react-toastify/dist/ReactToastify.css';
import '../style/Header.css';
import { Link } from "react-router-dom";
import logo from '../logo.jpg';
import meta from '../metamask.png';
import sequence_logo from '../sequence-logo.svg'
// import land from '../landing.png'; 
import { FiUpload }from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdOutlineFormatColorReset } from 'react-icons/md'
import '../style/Landing.css';

const Landing = (props) => {
    // const notify = () => toast("Please Connect Wallet!");
    // const defaultRow = { firstName:'', lastName:'' };
    const [isOpen, setIsOpen] = useState(false)
    //state to add new row fro properties
    const [newrowinput, setNewRowInput] = useState([]);
    // const [sequenceconnected, setSequenceConnected] = useState(false);
    // const [walletaddress, setWalletAddress] = useState('');
    const [explore, setExplore] = useState(false);
    const [signmodal, setSignModal] = useState(false);

    // const wallet = {walletaddress};

    //function to handle put onchange
    const handleInputChange = (event, index) => {
      const {name, value} = event.target;
      const propertyList = [...newrowinput];
      propertyList[index][name] = value;
      //set the propertyList to the newrowinput
      setNewRowInput(propertyList);
    }

    //functn that triggers the btn to remove a row.
    const removeRow = (index) => {
      //define the list
      const propertyList = [...newrowinput];
      propertyList.splice(index,1) //this line deletes that particular row, by targeting the exact index
      setNewRowInput(propertyList);
    }

    //function to add a new row
    const addRow = () => {
      setNewRowInput([...newrowinput, []]);
    }

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

    //sequence wallet Setup
    
    async function connectWallet() {
      sequence.initWallet('polygon');
      const user_wallet = sequence.getWallet();
      const connectDetails = await user_wallet.connect({
        app: 'Certaine',
        authorize: true,
        // And pass settings if you would like to customize further
        settings: {
          theme: "light",
          bannerUrl: "https://yoursite.com/banner-image.png",  // 3:1 aspect ratio, 1200x400 works best
          includedPaymentProviders: ["moonpay", "ramp"],
          defaultFundingCurrency: "matic",
          lockFundingCurrencyToDefault: false,
        }
      })

      user_wallet.openWallet();
      console.log('user accepted connect?', connectDetails.connected)
      console.log('users signed connect proof to valid their account address:', connectDetails.proof)
      
      // if (connectDetails.connected === true) {
      //   setSequenceConnected(true)
      // } else {
      //   setSequenceConnected(false)
      // }
      const address = user_wallet.getAddress();
      console.log(address);
    }
    
    // const minimize_address = `${wallet?.slice(0, 6)}..${wallet?.slice(-4)}`; 

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
              <main className="modal__main">
                <img src={sequence_logo} alt="metamask logo" onClick={connectWallet} style={{fontSize:'20px',height:'78px',marginTop:'20px',lineHeight:'5.4',}}/>
                <h1 style={{fontWeight:'900', fontSize:'60px', color:'white'}}>Sequence</h1>
                <p onClick={connectWallet} style={{color:'hsla(0,0%,100%,.5)', fontSize:'25px', fontWeight:'600',}}>Connect to your Sequence Wallet</p>
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
                <hr style={{marginTop:'10px', width:'550px', color:'hsla(0,0%,100%,.5)', opacity:'0.05',}}/>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Name<span style={{color:'red'}}>*</span></p>
                <input type='text' className='explore__name' placeholder='Name of Certificate' required/>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Address<span style={{color:'red'}}>*</span></p>
                <input type='text' className='explore__name' placeholder='Add Receiver Address' required/>
                <p style={{fontWeight:'600', fontSize:'15px', color:'white', paddingTop:'20px',}}>Media</p>
                <div className='upload__section'>
                  <div className='upload__nav'>
                    <div><FiUpload style={{ paddingTop:'10px', fontSize:'30px', color:'hsla(0,0%,100%,.5)'}}/></div>
                    <div><p style={{fontWeight:'600', fontSize:'15px', color:'hsla(0,0%,100%,.5)',}}>Upload File</p></div>
                  </div>
                  <div>
                    <input type="file" ref={hiddenFileInput} style={{display:'none'}} required/>
                    <button className='upload__btn' onClick={handleClick} onChange={handleChange}> <span style={{paddingTop:'20px', color:'hsla(0,0%,100%,.5)'}}><AiOutlineFileAdd style={{paddingTop:'5px',}}/></span> Select File</button>
                  </div>
                </div>
                <p style={{fontSize:'12px', paddingTop:'10px' ,color:'hsla(0,0%,100%,.5)',}}>File Supported: PNG, JPG.</p>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Description</p>
                <textarea className="description__field"  name="msg" rows="5" cols="50" required></textarea>
                <div className="properties__section">
                  <div className="properties__nav">
                    <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Properties</p>
                    <button className='reset__btn'>Reset <span><MdOutlineFormatColorReset style={{paddingTop:'3px',}}/></span></button>
                  </div>
                  {
                    newrowinput.map((x, id) => {
                      return (
                      <>
                        <div className='property__line'>
                          <div> 
                             <input type='text' className='property__name' placeholder='trait_type' onChange={event => handleInputChange(event,id)} required/>
                          </div>
                          <div>
                            <input type='text' className='property__name' placeholder='value' onChange={event => handleInputChange(event,id)} required/>
                          </div>
                          <div><p onClick={() => removeRow(id)} style={{paddingTop:'5px', color:'hsla(0,0%,100%,.5)'}}>x</p></div>
                        </div>
                      </>
                      )
                    })
                  }
                  <button className='add__row__btn' onClick={addRow}>+ Add Row</button>
                  <button className='submit__btn'>Submit</button>
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
                  <h1 className='head__txt' style={{color:'white', fontSize:'60px', width:'70%',}}>Upload & Build NFT Certificate Easily</h1>
                  <p className='descrp__txt' style={{color:'hsla(0,0%,100%,.5)', width:'70%',}}>It takes seconds to upload certificate and create an NFT certificate on Certaine. Easily Connect your Wallet. Send NFT to any address.</p>
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