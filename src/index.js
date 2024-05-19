import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./root";
import "antd/dist/reset.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainProvider from "./context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <Root />
      </MainProvider>
    </Router>
  </React.StrictMode>
);
