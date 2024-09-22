import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (window.sendToUnity == null) {
  window.sendToUnity = (data) => {
    console.log("sendToUnity", data);
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
