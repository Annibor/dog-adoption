// src/components/ProtectedRoute.js
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import '../styling/ProtectedRoute.module.css';

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return (
      <Container className="protected-route-container mt-5 text-center">
        <div className="protected-route-card p-4">
          <h2>Welcome to PawPal's webpage!</h2>
          <p className="lead py-3">To access this page, please log in or register.</p>
          <div className="d-flex flex-column flex-sm-row justify-content-center">
            <Button as={Link} to="/login" variant="primary" className="mx-2 my-2 my-sm-0">Login</Button>
            <Button as={Link} to="/register" variant="secondary" className="mx-2 my-2 my-sm-0">Register</Button>
          </div>
        </div>
      </Container>
    );
  }

  return element;
};
export default ProtectedRoute;
