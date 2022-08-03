import React from "react";
import '../style/Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-section">
            <div className='login__image'>
            <Link to="/" style={{textDecoration:'none',}}><p className='back__history__text' style={{color:'white', paddingLeft:'30px', paddingTop:'30px', fontSize:'38px', fontWeight:'400', wordSpacing:'20', textDecoration:'none',}}>Certaine</p></Link>
            </div>
            <div className='login__input'>
               <h1 className="sign__text">Sign Up</h1>
               <input type='text' placeholder='Name' className="name__field"/>
               <form class="my-form">
                    <textarea className="description__field"  name="msg" rows="5" cols="50" placeholder="Description"></textarea>
               </form>
               <Link to="/home"><button className="sign__btn">Sign Up</button></Link>       
            </div>
        </div>
    )
}

export default Login;