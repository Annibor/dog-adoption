import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Navbar, Nav, Container, Alert } from 'react-bootstrap';
import { useCurrentUser, useLogout} from '../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';


export default function Navigation() {
  const { currentUser, greetingMessage } = useCurrentUser();
  const handleLogout = useLogout();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  // Show alert when greeting message changes
  useEffect(() => {
    if (greetingMessage) {
      setShowAlert(true);
    }
  }, [greetingMessage]);

  const logout = async () => {
    try {
      await handleLogout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };


  return (
    <Navbar expand="lg">
      
      <Container>
      <Logo />
        <Navbar.Toggle aria-controls="basic-navbar" />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="m-auto">
          {currentUser ? (
            <>
              <NavLink to="/dogs" className="nav-link" >Dogs</NavLink>
              <NavLink to="/events" className="nav-link">Events</NavLink>
              <NavLink to="/profile"className="nav-link" >Profile</NavLink>
              <Navbar.Text className="nav-link">Logged in as {currentUser.username}</Navbar.Text>
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
      {showAlert && (
        <Alert variant="success" className="m-3" onClose={() => setShowAlert(false)} dismissible>
          {greetingMessage}
        </Alert>
      )}
    </Navbar>
  )
}