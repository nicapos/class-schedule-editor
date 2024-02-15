import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'
import '../assets/css/LoginRegisterForm.css'

import user_icon from '../assets/img/person.png'
import email_icon from '../assets/img/email.png'
import password_icon from '../assets/img/password.png'
import phone_icon from '../assets/img/phone.png'
import dp_upload from '../assets/img/dp.png'
;

function validateEmail(email){
    var validEmailRegex = new RegExp("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/");

    if (email.match(validEmailRegex)) {
        return true;
    }
    return false;
}

function validatePassword(password){
    var validPasswordRegex = new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;")

    if (password.match(validPasswordRegex)) {
        return true;
    }
    return false;

}

function validatePhoneNumber(phonennumber){
    var validPhoneNumberRegex = new RegExp("^\\+[1-9]{1}[0-9]{0,2}-[2-9]{1}[0-9]{2}-[2-9]{1}[0-9]{2}-[0-9]{4}$");

    if (phonennumber.match(validPhoneNumberRegex)) {
        return true;
    }
    return false;
}
function validateFullName(fullname){
    var validFullName = new RegExp("/^[a-z ,.'-]+$/i");

    if (fullname.match(validFullName)) {
        return true;
    }
    return false;
}

function validateAndUploadDP(input){
    var fileInput = input;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    var maxFileSize = 5 * 1024 * 1024; // 5MB 

    // Check extension if the file is an image
    if (!allowedExtensions.exec(fileInput)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    }
    // Check file size
    if (fileInput[0].files[0].size > maxFileSize) {
        alert('File size is too large');
        fileInput.value = '';
        return false;
    }
    //Object validation
    if (fileInput.length && fileInput[0].files && fileInput[0].files.length) {
        var url = window.URL || window.webkitURL;
        var image = new Image();
        image.onload = function() {
            alert('Valid Image');
        };
        image.onerror = function() {
            alert('Invalid image');
        };
        image.src = url.createObjectURL(fileInput[0].files[0]);
    }
}

function Login() {
    const [action, setAction] = useState('LOGIN');
    const [fullname, setUsername] = useState('');
    const [phonennumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formMode, setFormMode] = useState('LOGIN');
    const [avatarSrc, setAvatarSrc] = useState(dp_upload);

    useEffect(() => {
        // Clear form fields when switching between login and register
        setUsername('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
    }, [formMode]);

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatarSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (action === 'LOGIN') {
            // Handle login
        } else if (action === 'REGISTER'){
            // Handle registration
            if (!fullname || !phonennumber || !email || !password) {
                alert('Please fill in all fields');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email');
                return;
            }
            if (!validatePassword(password)) {
                alert('Please enter a valid password');
                return;
            }
            if (!validatePhoneNumber(phonennumber)) {
                alert('Please enter a valid phone number');
                return;
            }
            if (!validateFullName(fullname)) {
                alert('Please enter a valid full name');
                return;
            }

            // Successful registration
            setUsername('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');

            alert('Registration successful!');
            setAction('LOGIN'); // Switch back to login mode`
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <form className='form' onSubmit={handleSubmit} encType='multipart/form-data' id="loginregform">
                {action === "LOGIN" ? null : (
                    <div className='photo_input'>
                        <img src={avatarSrc} alt='' />
                        <div className='upload_btn'>
                            <input type='file' name="avatar" accept="image/*" onChange={handleFileInputChange} />
                        </div>
                    </div>
                )}
                
                {action === "LOGIN" ? null : (
                    <div className='input'>
                        <img src={user_icon} alt='' />
                        <input
                            type='text'
                            name='full_name'
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
                            name='phone_number'
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
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input
                        type='password'
                        name='password'
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
                    <button type="submit" className={action === "REGISTER" ? "submit gray" : "submit"} onClick={() => { setAction("LOGIN"); setFormMode('LOGIN'); }}>LOGIN</button>
                    <button type="button" className={action === "LOGIN" ? "submit gray" : "submit"} onClick={() => { setAction("REGISTER"); setFormMode('REGISTER'); }}>REGISTER</button>
                </div>
            </form>
        </div>
    );
}

export default Login;