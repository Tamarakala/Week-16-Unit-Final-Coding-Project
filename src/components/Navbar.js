import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
        <BootstrapNavbar.Brand as={NavLink} to="/">My React App</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/" exact activeClassName="active">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/about" activeClassName="active">About</Nav.Link>
                {/* Ensure other Nav.Links are updated similarly */}
            </Nav>
        </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
);

export default Navbar;
