import React from "react";
import "../assets/css/App.css";
import { Loader2 as Spinner } from "lucide-react";

import useCurrentUser from "../hooks/useCurrentUser";

function App() {
  useCurrentUser();

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
