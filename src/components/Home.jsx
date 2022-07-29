import React from 'react';
import '../style/Home.css'

const Home = () => {
    return (
        <div className='intro-section'>
            <div className='intro-text'>
                <h1 className='heading-text' style={{color:'white', fontSize:'53px'}}>Certaine</h1>
                <p classname='description-text' style={{color:'hsla(0,0%,100%,.5)', paddingTop:'40px', fontSize:'25px'}}>Tool designed to help Institutions and Business to use Solana Blockchain!</p>
            </div>

            <div style={{marginLeft:'37%', marginTop:'15px'}}>
                <button className='transfer-nft'>Send NFTs</button>
                <button className='transfer-address'>Send To All Addresses</button>
            </div>

            <div style={{marginTop:'25px',}}>
                <p style={{fontSize:'25px', color:'white'}}>Enter a csv file ✨</p>
            </div>
        </div>
    )
}

export default Home;