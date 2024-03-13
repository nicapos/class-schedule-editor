import React, { useEffect } from "react";
import "../assets/css/App.css";
import { Loader2 as Spinner } from 'lucide-react';

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  function getCurrentUser() {
    fetch("http://localhost:8080/api/user/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
      credentials: "include",
    })
      .then(response => response.json())
      .then((data) =>  {
        if (!data.user) {
          // No logged in user. Redirect back to login
          navigate("/login");
          return;
        }
        navigate("/app");
        return;
      });
  }

  useEffect(getCurrentUser, []);

  return (
    <div className="App">
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <Spinner className="h-32 w-32 animate-spin" />
        <p>Loading app...</p>
      </div>
    </div>
  );
}

export default App;
