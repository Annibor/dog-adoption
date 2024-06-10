import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';

export default function Navigation() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  console.log('Current User:', currentUser);

  const logout = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };


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
                <NavLink onClick={logout} className="nav-link">Logout</NavLink>
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