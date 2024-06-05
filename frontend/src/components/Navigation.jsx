import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar" />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="me-auto">
            <NavLink to="/dogs" className="nav-link" activeClassName="active">Dogs</NavLink>
            <NavLink to="/profile" className="nav-link" activeClassName="active">Profile</NavLink>
            <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
            <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}