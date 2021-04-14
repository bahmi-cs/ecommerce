import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { firebase } from "./lib/firebase";
import { FirebaseContext } from "./context/firebase";
import reportWebVitals from "./reportWebVitals";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "ATcmz0H5b9aNxGw2byWVII3-d3cn81_r4R1kxTrSiCb0-RNnZ-_o-12zc-Z9_EnsSn2Xw80weLVDyM2V",
  currency: "CAD",
  intent: "capture",
  // "data-client-token": "abc123xyz==",
};

ReactDOM.render(
  <>
    <FirebaseContext.Provider value={{ firebase }}>
      <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </FirebaseContext.Provider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
