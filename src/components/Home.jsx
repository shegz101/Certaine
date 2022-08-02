import React, {useRef} from 'react';
import { FiUpload }from 'react-icons/fi';
import { MdOutlineSendToMobile }from 'react-icons/md';
import {AiOutlineWallet} from 'react-icons/ai';
import {FaRegAddressCard} from 'react-icons/fa';
import '../style/Home.css'
import Header from './Header';
import Footer from './Footer';

const Home = (props) => {
    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
    };
    return (
        <div className='intro-section'>
            <Header/>
            <div className='intro-text'>
                <h1 className='heading-text' style={{color:'white', fontSize:'38px', textAlign:'center', justifyContent:'center',}}>Web3 Certificate Builder built on Polygon Blockchain</h1>
                <p classname='description-text' style={{color:'hsla(0,0%,100%,.5)', paddingTop:'40px',fontSize:'23px', textAlign:'center', justifyContent:'center',}}>Polygon tool designed to help Institutions and Business <p>to generate certificates on Polygon Blockchain!</p></p>
            </div>

            <div style={{marginLeft:'35.5%', marginTop:'15px'}}>
                <input type="file" ref={hiddenFileInput} style={{display:'none'}} />
                <button onClick={handleClick} onChange={handleChange} className='upload__btn'>Upload Certificate</button>
                <button className='transfer-nft'>Send NFTs</button> 
            </div>

            {/* <div style={{marginTop:'40px', justifyContent:'center', textAlign:'center',}}>
                <p style={{fontSize:'33px', color:'white'}}>Upload a Certificate Image✨</p>
                <div style={{display:'flex', flexDirection:'row', textAlign:'center', justifyContent:'center', marginTop:'20px'}}>
                   <button className='transfer-address'>Send To All Addresses</button>
                   <p style={{color:'white', lineHeight:'40px', fontSize:'27px', marginTop:'-2px'}}>No file Chosen</p>
                </div>
            </div> */}

            <div className="upload-section">
                <div>
                    <img src='https://img.freepik.com/premium-psd/3d-nft-certificate_382786-1170.jpg' alt="Nft to certificate" style={{height:'400px', width:'700px', borderRadius:'13px', border:'2px solid #1a202c'}}/>
                </div>
                <div style={{marginTop:'150px'}}>
                    <h2 style={{color:'white', paddingLeft:'30px',}}><FiUpload style={{ paddingTop:'10px', fontSize:'30px',}}/>Upload Certificate and turn into NFT</h2>
                    <p style={{color:'hsla(0,0%,100%,.5)', paddingLeft:'63px', paddingTop:'10px'}}> Easily upload a certificate. Change it into NFT.</p>
                    <input type="file" ref={hiddenFileInput} style={{display:'none'}} />
                    <button onClick={handleClick} onChange={handleChange} className='upload__btn' style={{marginLeft:'63px', marginTop:'15px',}}>Upload Certificate</button>
                </div>
            </div>

            <div className="send-section">
               <div style={{marginTop:'150px'}}>
                    <h2 style={{color:'white', paddingLeft:'30px',}}><MdOutlineSendToMobile style={{ paddingTop:'10px', fontSize:'30px',}}/>Embed Certificate and Send NFT Easily</h2>
                    <p style={{color:'hsla(0,0%,100%,.5)', paddingLeft:'63px', paddingTop:'10px'}}>Change your certificate to NFT.</p>
                    <p style={{color:'hsla(0,0%,100%,.5)', paddingLeft:'63px', paddingTop:'10px'}}>Send the generated NFT</p>
                    <button className='transfer-nft' style={{marginLeft:'63px', marginTop:'15px',}}>Send NFTs</button> 
                </div>
                <div>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45U8_MQxIbdO3ivEp4FaftXPdTEElVjc0rQ&usqp=CAU' alt="Nft to certificate" style={{height:'400px', width:'700px', borderRadius:'13px', marginLeft:'20px', border:'2px solid #1a202c'}}/>
                </div>
            </div>

            <div>
                <h1 style={{color:'white', paddingTop:'20px', textAlign:'center', justifyContent:'center',}}>Built for Institutions</h1>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <div style={{backgroundColor:'#2a2c37', height:'200px', width: '400px', justifyContent:'center',borderRadius:'12px', marginLeft:'auto', marginRight:'auto', marginTop:'20px',marginBottom:'20px', textAlign:'center'}}>
                       <button className='transfer-address'><AiOutlineWallet/>Connect your wallet</button>  
                    </div>
                    <div style={{backgroundColor:'#2a2c37', height:'200px', width: '400px', justifyContent:'center',borderRadius:'12px', marginLeft:'auto', marginRight:'auto', marginTop:'20px',marginBottom:'20px', textAlign:'center'}}>
                      <button className='transfer-address'><FaRegAddressCard/> Send To All Addresses</button>  
                    </div>
                </div>  
            </div>
            <Footer/>
        </div>
    )
}

export default Home;