import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { SSRProvider } from "react-bootstrap/SSRProvider"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <SSRProvider> */}
      <App />
      {/* </SSRProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);