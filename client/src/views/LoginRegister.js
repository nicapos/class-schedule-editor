import React, { useState } from 'react';
import '../assets/css/LoginRegisterForm.css'

import user_icon from '../assets/img/person.png'
import email_icon from '../assets/img/email.png'
import password_icon from '../assets/img/password.png'
import phone_icon from '../assets/img/phone.png'
import dp_upload from '../assets/img/dp.png'

function Login() {
    const [action, setAction] = useState('LOGIN');
    const [fullname, setUsername] = useState('');
    const [phonennumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // Add form submission logic here
        if (action === 'LOGIN') {
            // Handle login
        } else {
            // Handle registration
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <form className='form' onSubmit={handleSubmit}>
                {action === "LOGIN" ? null : (
                    <div className='photo_input'>
                        <img src={dp_upload} alt='' />
                        <div className='upload_btn'>
                            <input type='file'/>
                        </div>
                    </div>
                )}
                
                {action === "LOGIN" ? null : (
                    <div className='input'>
                        <img src={user_icon} alt='' />
                        <input
                            type='text'
                            placeholder='Full Name'
                            value={fullname}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}

                {action === "LOGIN" ? null : (
                    <div className='input'>
                        <img src={phone_icon} alt='' />
                        <input
                            type='tel'
                            placeholder='Phone Number'
                            value={phonennumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                )}

                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {action === "REGISTER" ? null : (
                    <div className='forgot-password'>
                        Forgot Password? <span> Click Here</span>
                    </div>
                )}
                <div className='submit-container'>
                    <button type="submit" className={action === "REGISTER" ? "submit gray" : "submit"} onClick={() => { setAction("LOGIN") }}>LOGIN</button>
                    <button type="button" className={action === "LOGIN" ? "submit gray" : "submit"} onClick={() => { setAction("REGISTER") }}>REGISTER</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
