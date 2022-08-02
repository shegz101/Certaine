import React, {useState} from "react";
import '../style/Login.css';

const Login = () => {
    const [sign, setSign] = useState(false);
    return (
        <div className="login-section">
            <div className='login__image'>
                <p style={{color:'white', paddingLeft:'30px', paddingTop:'30px', fontSize:'38px', fontWeight:'400', wordSpacing:'20'}}>Certaine</p>
            </div>
            <div className='login__input'>
                <h1 className="sign__text">Sign In</h1>
                <p className='log__text'>New to Certaine? <span onClick={() => setSign(true)} style={{color:'white', cursor:'pointer',}}>sign up now</span></p>
                {
                    sign ? (
                          <>
                            <input type='text' placeholder='Full Name' className="name__field"/>
                            <input type='text' placeholder='Email Address' className="email__field"/>
                            <input type='passWord' placeholder='Password' minlength="8" className="password__field"/>
                            <p className="password__instruction">At least 8 characters, letters and numbers</p>
                            <button className="sign__btn">Sign In</button>
                          </>
                    ) : (
                       <>
                        <input type='text' placeholder='Email Address' className="email__field"/>
                        <input type='passWord' placeholder='Password' minlength="8" className="password__field"/>
                        <p className="password__instruction">At least 8 characters, letters and numbers</p>
                        <button className="sign__btn">Sign In</button>
                       </> 
                    )
                }
            </div>
        </div>
    )
}

export default Login;