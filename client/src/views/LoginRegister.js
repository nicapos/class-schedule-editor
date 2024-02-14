import React, { useState } from 'react';
import '../assets/css/LoginRegisterForm.css'

import user_icon from '../assets/img/person.png'
import email_icon from '../assets/img/email.png'
import password_icon from '../assets/img/password.png'

function Login() {
    const[action, setAction] = useState('LOGIN');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // Add form submission logic here
    }

    return (

        <div className="container">
            <div className="header">
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>  

            <div className='inputs'>
            {action==="LOGIN"? <div></div> : <div className='input'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Username' />
                </div>}
                
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email' />
                </div> 
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Password' />
                </div>     
            </div>

            {action==="REGISTER"? <div></div> : <div className='forgot-password'>Forgot Password? <span> Click Here</span></div>}

            <div className='submit-container'>
                <div className={action==="LOGIN"?"submit gray":"submit"} onClick={()=>{setAction("REGISTER")}}>REGISTER</div>
                <div className={action==="REGISTER"?"submit gray":" submit"} onClick={()=>{setAction("LOGIN")}}>LOGIN</div>
            </div>

        </div>
    );
}

export default Login;
