import React, { useState, useEffect } from 'react';
import '../assets/css/LoginRegisterForm.css'
import user_icon from '../assets/img/person.png'
import email_icon from '../assets/img/email.png'
import password_icon from '../assets/img/password.png'
import phone_icon from '../assets/img/phone.png'
import dp_upload from '../assets/img/dp.png'
;

function validateEmail(email) {
    const validEmailRegex = /(^\w?([,.-]\w)?)*@\w*.\w{2,}$/;
    return validEmailRegex.test(email);
}

function validatePassword(password){
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return validPasswordRegex.test(password);
}

function validatePhoneNumber(phoneNumber){
    const validPhoneNumRegex = /^\d{7,13}$/;
    return validPhoneNumRegex.test(phoneNumber);
}

function validateFullName(fullName){
    const validFullNameRegex = /[a-zA-Z ]{3,}/;
    return validFullNameRegex.test(fullName);
}

function validateAndUploadDP(files) {
    var fileInput = files[0]; // Access the first file in the array
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;
    const maxFileSize = 5 * 1024 * 1024; // 5 MB 

    // Check extension if the file is an image
    if (!allowedExtensions.test(fileInput.name)) {
        alert('Invalid file type. Only JPG, JPEG, or PNG files are allowed.');
        return false;
    }

    // Check file size
    if (fileInput.size > maxFileSize) {
        alert('File size is too large. Maximum allowed size is 5MB.');
        return false;
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
        setAvatarSrc(dp_upload);
    }, [formMode]);

    function handleFileInputChange(event) {
        const maxFileSize = 5 * 1024 * 1024; // 5MB 
    
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const dataURL = reader.result;
            const fileSizeInBytes = file.size;

            // Check file size
            if (fileSizeInBytes > maxFileSize) {
                alert('File size is too large');
                return false;
            }
            setAvatarSrc(dataURL);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    }    

    // TODO: Connect to the database register user
    function registerToDB(){
        fetch('http://localhost:8080/api/auth/register', {
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
            return response.json(); 
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
            // Validation checks: email, password
            if (!email || !password) {
                alert('Please fill in all fields');
                setAction('LOGIN')
                return;
            }
            // Check email if in database
            fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
            })
            // TODO: If Login is successful

        } else if(action === 'CONFIRM REGISTRATION'){
            var flag = 0;

            // Validation checks: username, phone number, email, password
                if (!fullname || !phonennumber || !email || !password) {
                    alert('Please fill in all fields');
                    setAction('REGISTER')
                    return;
                }
                // Validate and upload DP   
                validateAndUploadDP(avatarSrc);
    
                if (!validateEmail(email)) {
                    alert('Please enter a valid email');
                    flag = 1;
                    setAction('REGISTER')
                    return;
                }
                if (!validatePassword(password)) {
                    alert('Please enter a valid password');
                    flag = 1;
                    setAction('REGISTER')
                    return;
                }
                if (!validatePhoneNumber(phonennumber)) {
                    alert('Please enter a valid phone number');
                    flag = 1;
                    setAction('REGISTER')
                    return;
                }
                if (!validateFullName(fullname)) {
                    alert('Please enter a valid full name');
                    flag = 1;
                    setAction('REGISTER')
                    return;
                }
    
                // Successful registration
                registerToDB()
                
                // Clear form fields
                setUsername('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
                setAvatarSrc(dp_upload)
    
                // Switch back to login mode
                
                if(flag !== 1){
                    alert('Registration successful!');
                    setAction('LOGIN'); 
                }
            
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
                            <input type='file' name="avatar" accept="image/png, image/jpeg, image/jpg" onChange={handleFileInputChange} />
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