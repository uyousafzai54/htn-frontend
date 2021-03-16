import React from "react";
import loading from "../assets/Rainbow.gif";
import '../styles/App.css';

const Loading = () => (
  <div className="center">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;