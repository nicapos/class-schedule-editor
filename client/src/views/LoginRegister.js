import React, { useState, useEffect } from 'react';
import '../assets/css/LoginRegisterForm.css'
import user_icon from '../assets/img/person.png'
import email_icon from '../assets/img/email.png'
import password_icon from '../assets/img/password.png'
import phone_icon from '../assets/img/phone.png'
import placeholderImage from '../assets/img/dp.png'
import { validateEmail, validatePassword, validatePhoneNumber, validateFullName } from '../lib/validation';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [action, setAction] = useState('LOGIN');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formMode, setFormMode] = useState('LOGIN');
    const [avatarSrc, setAvatarSrc] = useState(placeholderImage); // For uploading the image to the backend
    const [avatarImg, setAvatarImg] = useState(placeholderImage); // For displaying the image in the front end

    const navigate = useNavigate();

    function clearForm() {
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setAvatarSrc(placeholderImage);
        setAvatarSrc(placeholderImage);
    }

    useEffect(() => {
        // Clear form fields when switching between login and register
        clearForm();
    }, [formMode]);

    function handleFileInputChange(event) {
        // const maxFileSize = 5 * 1024 * 1024; // 5MB 
    
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const dataURL = reader.result;
            // const fileSizeInBytes = file.size;

            // // Check file size
            // if (fileSizeInBytes > maxFileSize) {
            //     alert('File size is too large');
            //     return false;
            // }
            // Set the file object itself as the avatar source
            setAvatarSrc(file); // For uploading the image to the backend
            setAvatarImg(dataURL); // For displaying the image in the front end
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    }  

    // TODO: Connect to the database register user
    function registerUser() {
        const formData  = new FormData();
        formData.append("full_name", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone_number", phoneNumber);
        formData.append("avatar", avatarSrc);

        fetch('http://localhost:8080/api/auth/register', { method: 'POST', body: formData })
            .then(response => {
                console.log(response)
                if (response.status === 400) {
                    throw new Error('Registration failed');
                }

                const data = response.json();
                console.log(data);

                alert('Registration successful! Please proceed to login.');
                setAction('LOGIN');
            })
            .catch(error => {
                console.error('Registration error:', error.message);
                alert('Registration failed. Please try again.');
            });
    }

    function validateRegistration() {
        // Validation checks: username, phone number, email, password
        if (!fullName || !phoneNumber || !email || !password) {
            alert('Please fill in all fields');
            setAction('REGISTER');
            return false;
        }

        // Validate and upload DP
        // validateAndUploadDP(avatarSrc);

        if (!validateEmail(email)) {
            alert('Please enter a valid email');
            setAction('REGISTER');
            return false;
        }
        if (!validatePassword(password)) {
            alert('Password must contain at least one digit, one lowercase, one uppercase, one special character, and at least 8 characters long.');
            setAction('REGISTER');
            return false;
        }
        if (!validatePhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number');
            setAction('REGISTER');
            return false;
        }
        if (!validateFullName(fullName)) {
            alert('Please enter a valid full name');
            setAction('REGISTER');
            return false;
        }

        return true;
    }

    function loginUser() {
        try {
        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })
            .then(response => response.json())
            .then((data) =>  {
                navigate("/app");
            })
            .catch((error) => {
                console.log(error);
                alert("Login failed. " + error.message);
            });
        } catch (error) {
            console.log(error);
            alert("Login failed. " + error.message);
        }
    }

    function validateLogin() {
        if (!email || !password) {
            alert('Please fill in all fields');
            setAction('LOGIN');
            return false;
        }

        return true;
    }

    function handleSubmitLogin() {
        if (!validateLogin()) return;
        loginUser();
    }

    function handleSubmitRegistration() {
        if (!validateRegistration()) return;
    
        registerUser();
        clearForm();

        // Switch back to login mode
        alert('Registration successful!');
        setAction('LOGIN');
    }
    
    function handleSubmit(e) {
        e.preventDefault();

        if (action === 'CONFIRM LOGIN') {
            
        } else if (action === 'CONFIRM REGISTRATION') {
            
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

                {action === "REGISTER" && (
                    <div className='photo_input'>
                        <img src={avatarImg} alt='' />
                        <div className='upload_btn'>
                            <input type='file' name="avatar" accept="image/png, image/jpeg, image/jpg" onChange={handleFileInputChange} />
                        </div>
                    </div>
                )}
                
                {action === "REGISTER" && (
                    <div className='input'>
                        <img src={user_icon} alt='' />
                        <input
                            type='text'
                            name='full_name'
                            placeholder='Full Name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                )}

                {action === "REGISTER" && (
                    <div className='input'>
                        <img src={phone_icon} alt='' />
                        <input
                            type='tel'
                            name='phone_number'
                            placeholder='Phone Number'
                            value={phoneNumber}
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
                {action === "LOGIN" && (
                    <div className='forgot-password'>
                        Forgot Password? <span> Click Here</span>
                    </div>
                )}

                {action === "LOGIN" && (
                    <div className='submit-container'>
                        <button type="button" className={"submit gray"} onClick={handleSubmitLogin}>Log-in</button>
                    </div>
                )}

                {action === "REGISTER" && (
                <div className='submit-container'>
                    <button type="submit" className={"submit gray"} onClick={handleSubmitRegistration}>Create Account</button>
                </div>
                )}
                

            </form>
        </div>
    );
}

export default Login;