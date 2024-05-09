import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutsContextProvider } from "./context/WorkoutsContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
