import React, { useState, useEffect } from "react";
import "../assets/css/LoginRegisterForm.css";
import userIcon from "../assets/img/person.png";
import emailIcon from "../assets/img/email.png";
import passwordIcon from "../assets/img/password.png";
import phoneIcon from "../assets/img/phone.png";
import placeholderImage from "../assets/img/dp.png";
import { validate } from "../lib/validation";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formMode, setFormMode] = useState("LOGIN");
  const [avatarPreview, setAvatarPreview] = useState(placeholderImage);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setAvatarPreview(placeholderImage);
    setErrorMessage("");
  }, [formMode]);


  function handleChangeAvatar(e) {
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  }

  function registerUser(formData) {
    setLoading(true); // Start registration process
    fetch("https://localhost:8080/api/auth/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Registration failed");
        }
        alert("Registration successful! Please proceed to login.");
        setFormMode("LOGIN");
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Registration process ended
      });
  }
  

  function validateRegistration(formData) {
    // Validation checks: username, phone number, email, password
    const validations = [
      { field: "fullName", message: "Please enter a valid full name" },
      { field: "phoneNumber", message: "Please enter a valid phone number" },
      { field: "email", message: "Please enter a valid email" },
      {
        field: "password",
        message:
          "Password must contain at least 1 digit, 1 lowercase, 1 uppercase, 1 special character, and at least 8 characters long.",
      },
    ];

    for (const validation of validations) {
      const fieldValue = formData.get(validation.field);
      if (!fieldValue) {
        setErrorMessage("Please fill in all fields");
        return false;
      }

      if (!validate(validation.field, fieldValue)) {
        setErrorMessage(validation.message);
        return false;
      }
    }

    return true;
  }

  function googleLogin() {
    fetch("https://localhost:8080/api/google-login")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.googleOAuthURL) {
        // Redirect the user to the Google OAuth URL
        window.location.href = data.googleOAuthURL;
      } else {
        throw new Error("Failed to get Google OAuth URL");
      }
    })
    .catch((error) => {
      console.error("Google login error:", error);
      // Handle the error, e.g., display a message to the user
    });
  } 

  function loginUser({ email, password }) {
    fetch("https://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.error) {
          setErrorMessage(data.error);
        } else {
          navigate("/app");
        }
      })
      .catch((error) => setErrorMessage(error.message));
  }

  function validateLogin(formData) {
    if (!validate("email", formData.get("email"))) {
      setErrorMessage("Please enter a valid email");
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Validate and submit forms
    if (formMode === "LOGIN" && validateLogin(formData)) {
      loginUser({
        email: formData.get("email"),
        password: formData.get("password"),
      });
    } else if (formMode === "REGISTER" && validateRegistration(formData)) {
      registerUser(formData);
    }
  }

  function renderLogin() {
    const handleGoogleLogin = () => {
      googleLogin();
    };  

    return (
      <>
        <div className="input">
          <img src={emailIcon} alt="Email" />
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="input">
          <img src={passwordIcon} alt="Password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="google-login">
          Login with Google? <span onClick={handleGoogleLogin}>Click Here</span>
        </div>
      </>
    );
  }

  function renderRegister() {
    return (
      <>
        <div className="photo_input">
          <img src={avatarPreview} alt="" />
          <div className="upload_btn">
            <input
              type="file"
              name="avatar"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChangeAvatar}
              multiple={false}
            />
          </div>
        </div>
        <div className="input">
          <img src={userIcon} alt="" />
          <input type="text" name="fullName" placeholder="Full Name" required />
        </div>
        <div className="input">
          <img src={phoneIcon} alt="" />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="input">
          <img src={emailIcon} alt="" />
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="input">
          <img src={passwordIcon} alt="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
      </>
    );
  }

  return (
    <div className="container" id="auth-page">
      <div className="header">
        <div className="text">{formMode}</div>
        <div className="underline" />
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="submit-container">
          <button
            type="button"
            className={formMode === "LOGIN" ? "light" : ""}
            onClick={() => setFormMode("LOGIN")}
          >
            LOGIN
          </button>
          <button
            type="button"
            className={formMode === "REGISTER" ? "light" : ""}
            onClick={() => setFormMode("REGISTER")}
          >
            REGISTER
          </button>
        </div>

        {formMode === "LOGIN" && renderLogin()}
        {formMode === "REGISTER" && renderRegister()}

        <p style={{ color: "red" }}>{errorMessage}</p>

        <div className="submit-container">
          <button type="submit" disabled={isLoading}>
            {formMode === "REGISTER" ? "Create Account" : "Log-in"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
