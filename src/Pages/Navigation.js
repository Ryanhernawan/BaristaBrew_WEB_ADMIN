import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png";
import globalCss from "../assets/global.css"

export default function Navigation() {
  return (
    <Navbar
      // collapseOnSelect
      expand="lg"
      bg="black"
      variant="dark"
      className="p-4"
    >
      <Container
      >
        <Navbar.Brand>
          <div className="navbar">
                
            <img src={logo} alt="Logo" className="logo" />
            <h1
              className="navbar-text"
              style={{color:"white"}}
            >
              Barista<span>Brew</span>
            </h1>
          </div>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
      </Container>
    </Navbar>
  );
}
