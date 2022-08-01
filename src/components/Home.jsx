import React, {useRef} from 'react';
import '../style/Home.css'

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
            <div className='intro-text'>
                <h1 className='heading-text' style={{color:'white', fontSize:'53px'}}>Certaine</h1>
                <p classname='description-text' style={{color:'hsla(0,0%,100%,.5)', paddingTop:'40px',fontSize:'25px', textAlign:'center', justifyContent:'center',}}>Polygon tool designed to help Institutions and Business <p>to generate certificates on Polygon Blockchain!</p></p>
            </div>

            <div style={{marginLeft:'35.5%', marginTop:'15px'}}>
                <button className='transfer-nft'>Send NFTs</button>
                <button className='transfer-address'>Send To All Addresses</button>
            </div>

            <div style={{marginTop:'40px', justifyContent:'center', textAlign:'center',}}>
                <p style={{fontSize:'33px', color:'white'}}>Enter a csv file✨</p>
                <div style={{display:'flex', flexDirection:'row', textAlign:'center', justifyContent:'center', marginTop:'20px'}}>
                   <input type="file" ref={hiddenFileInput} style={{display:'none'}} />
                   <button onClick={handleClick} onChange={handleChange} className='upload__btn'>Choose File</button> 
                   <p style={{color:'white', lineHeight:'40px', fontSize:'27px', marginTop:'-2px'}}>No file Chosen</p>
                </div>
            </div>
        </div>
    )
}

export default Home;