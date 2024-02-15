import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/css/index.css";
import App from "./views/App";
import reportWebVitals from "./lib/reportWebVitals";
import ScheduleEditorPage from "./views/ScheduleEditorPage";
import LoginRegister from "./views/LoginRegister";
import AdminPage from "./views/AdminPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={<ScheduleEditorPage />} />
        <Route path="/loginregister" element={<LoginRegister />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
