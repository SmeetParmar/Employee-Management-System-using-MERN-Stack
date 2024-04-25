import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

function Navigation() {
  const navStyle = {
    backgroundColor: '#00008b',
  };

  return (
    <Navbar style={navStyle} expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Item>
            <NavLink exact to="/" className="nav-link text-white fs-5 me-4">Home</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employeeAdd" className="nav-link text-white fs-5 me-4">Add Employee</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/employeeSearch" className="nav-link text-white fs-5 me-4">Search Employee</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/upComingRetirement" className="nav-link text-white fs-5">Upcoming Retirement</NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;