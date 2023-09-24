import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import globalCss from "../assets/global.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

export default function Navigation() {
  return (
    <>

    <Navbar variant="white" expand="lg" style={{backgroundColor:"black",}}>
      <Container >
      <img src={logo} alt="Logo" className="logo" />
      <Navbar.Brand href="#home" style={{color:"#a48d60", fontSize:30}}><strong style={{color:"white"}}>Barista</strong> Brew</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav" style={{color:"white"}}>
        {/* <Nav className="mr-auto" >
          <Nav.Link href="/" style={{color:"white"}}>Makanan</Nav.Link>
          <Nav.Link href="#link" style={{color:"white"}}>Minuman</Nav.Link>
          <Nav.Link href="ListOrder" style={{color:"white"}}>List Order</Nav.Link>
          
        </Nav> */}
      </Navbar.Collapse>
      </Container>
    </Navbar>
              </>

);
}
