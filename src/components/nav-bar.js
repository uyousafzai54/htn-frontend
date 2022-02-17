import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
//import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import logo from '../assets/htn.ico';

const NavBar = () => {
  const url = process.env.REACT_APP_AUTH0_CLIENT_URL;
  console.log(url)
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand navbar-light bg-light">
        
        <a className="navbar-brand" href={url}>
          <img src = {logo} width = "30" height = "30" alt = ""></img>
        </a>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
      <a className="nav-item nav-link" href={`${url}events`}>Events</a>
      <a className="nav-item nav-link" href={`${url}profile`}>Profile</a>
    </div>
  </div>
    <AuthNav />
      </nav>
    </div>
  );
};

export default NavBar;