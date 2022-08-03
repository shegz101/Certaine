import React from "react";
import '../style/Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-section">
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