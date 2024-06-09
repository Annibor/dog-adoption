import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useCurrentUser } from '../contexts/CurrentUserContext';

export default function Navigation() {
  const currentUser = useCurrentUser();
  console.log('Current User:', currentUser);


  return (
    <Navbar expand="lg">
      <Logo />
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar" />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="m-auto">
            <NavLink to="/dogs" className="nav-link" >Dogs</NavLink>
            <NavLink to="/profile"className="nav-link" >Profile</NavLink>
            {currentUser ? (
              <>
                <Navbar.Text className="nav-link">Welcome!</Navbar.Text>
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/register" className="nav-link">Register</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}