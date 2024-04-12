// GoogleLogin.js
import React, { useEffect } from "react";
import { getGoogleOAuthURL } from "../../../src/utils/oauth/getGoogleUrl";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Google OAuth URL when the component mounts
    const googleOAuthURL = getGoogleOAuthURL();
    window.location.href = googleOAuthURL;
  }, []);

  return <div>Redirecting to Google login...</div>;
}

export default GoogleLogin;
