import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
//import MainNav from "./main-nav";
import AuthNav from "./auth-nav";

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="http://localhost:3000/">Hack the North</a>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
      <a class="nav-item nav-link" href="http://localhost:3000/events">Events</a>
      <a class="nav-item nav-link" href="http://localhost:3000/profile">Profile</a>
    </div>
  </div>
    <AuthNav />
      </nav>
    </div>
  );
};

export default NavBar;