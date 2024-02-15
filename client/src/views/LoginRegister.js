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
    var validEmailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    if (email.match(validEmailRegex)) {
        return true;
    }
    return false;
}

function validatePassword(password){
    var validPasswordRegex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$");

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
    var validFullName = new RegExp("^[A-Z][a-z]*(?: [A-Z][a-z]*)*$");

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

    function connectToDB(){
        fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullname: fullname,
            email: email,
            password: password,
            phonennumber:phonennumber,
            avatar: avatarSrc
        }),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Registration failed');
            }
            // Registration successful
            return response.json(); // If the server returns JSON data
        })
        .then(data => {
            // Handle success (e.g., show success message, redirect to login page)
            alert('Registration successful! Please proceed to login.');
            setAction('LOGIN'); // Switch back to login mode
        })
        .catch(error => {
            // Handle error (e.g., show error message)
            console.error('Registration error:', error.message);
            alert('Registration failed. Please try again.');
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        if (action === 'LOGIN') {
            // Switching
        } else if (action === 'REGISTER') {
            // Switching
        } else if(action === 'CONFIRM LOGIN'){
            // Handle login

            // Validation checks: email, password
            if (!email || !password) {
                alert('Please fill in all fields');
                setAction('LOGIN')
                return;
            }

        } else if(action === 'CONFIRM REGISTRATION'){

            // Handle registration 

            // Validation checks: username, phone number, email, password
                if (!fullname || !phonennumber || !email || !password) {
                    alert('Please fill in all fields');
                    setAction('REGISTER')
                    return;
                }
                // Validate and upload DP   
                validateAndUploadDP(document.getElementById('loginregform').avatar);
    
                if (!validateEmail(email)) {
                    alert('Please enter a valid email');
                    setAction('REGISTER')
                    return;
                }
                if (!validatePassword(password)) {
                    alert('Please enter a valid password');
                    setAction('REGISTER')
                    return;
                }
                if (!validatePhoneNumber(phonennumber)) {
                    alert('Please enter a valid phone number');
                    setAction('REGISTER')
                    return;
                }
                if (!validateFullName(fullname)) {
                    alert('Please enter a valid full name');
                    setAction('REGISTER')
                    return;
                }
    
                // Successful registration
                connectToDB()
                

                setUsername('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
    
                alert('Registration successful!');
                setAction('LOGIN'); // Switch back to login mode
            
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <form className='form' onSubmit={handleSubmit} encType='multipart/form-data' id="loginregform">

                <div className='submit-container'>
                    <button type="submit" className={action === "REGISTER" ? "submit gray" : "submit"} onClick={() => { 
                        if (action === 'REGISTER') {
                            setAction("LOGIN"); 
                            setFormMode('LOGIN'); 
                        }
                    }}>LOGIN</button> 
                    <button type="submit" className={action === "LOGIN" ? "submit gray" : "submit"} onClick={() => { 
                        if (action === 'LOGIN') {
                            setAction("REGISTER");
                            setFormMode('REGISTER');
                        }
                    }}>REGISTER</button>
                </div>

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

                {action === "REGISTER" ? null : (
                    <div className='submit-container'>
                        <button type="submit" className={"submit gray"} onClick={() => { 
                                if (action === 'LOGIN') {
                                    // TODO: Handle Login
                                    setAction("CONFIRM LOGIN");
                                }
                        }}>CONFIRM LOGIN</button>
                    </div>
                )}

                {action === "LOGIN" ? null : (
                <div className='submit-container'>
                    <button type="submit" className={"submit gray"} onClick={() => { 
                            if (action === 'REGISTER') {
                                // TODO: Handle Registration
                                setAction("CONFIRM REGISTRATION");
                            }
                    }}>CONFIRM REGISTRATION</button>
                </div>
                )}
                

            </form>
        </div>
    );
}

export default Login;