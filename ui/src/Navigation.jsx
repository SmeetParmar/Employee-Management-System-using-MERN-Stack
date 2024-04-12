// import React from 'react';
// import { NavLink } from 'react-router-dom';

// function Navigation() {

//   const navStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '10px',
//     backgroundColor: '#00008b',
//   };

//   const linkStyle = {
//     textDecoration: 'none',
//     color: '#fff',
//     fontSize: '20px',
//     margin: '0 20px',
//   };

//   return (
//     <nav style={navStyle}>
//       <NavLink to="/" style={linkStyle}>Home</NavLink>
//       <NavLink to="/employeeAdd" style={linkStyle}>Add Employee</NavLink>
//       <NavLink to="/employeeSearch" style={linkStyle}>Search Employee</NavLink>
//     </nav>
//   );
// }

// export default Navigation;

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
        <Nav className="mr-auto">
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



