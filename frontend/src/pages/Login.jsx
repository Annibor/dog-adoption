import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function Login() {
  // Get the logout message and login function from the CurrentUserContext
  const { logoutMessage, handleLogin } = useCurrentUser() || {};

  // Set up state for form data and error messages
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const [error, setError] = useState(null);

  // Get the navigation function from react-router-dom
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Call the handleLogin function to log in the user
      const response = await handleLogin({ username, password });

      // If login is successful, navigate to the home page
      if (response.status === 200) {
        navigate('/');
      } else {
        // If login fails, display an error message
        setError('Login failed, please try again!');
      }
    } catch (err) {
      // Handle any errors that occur during login
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'An unknown error occurred, please try again!');
      } else {
        setError('An unknown error occurred, please try again!');
      }
    }
  };

  return (
    <Container className='p-5'>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          {logoutMessage && (
            <Alert variant="success">{logoutMessage}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name='username'
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {error && (
              <Alert variant='danger' className='mt-3'>
                {error}
              </Alert>
            )}
            <Button className='my-4' variant='primary' type="submit">
              Login
            </Button>
          </Form>
          <Row className='mt-4 justify-content-center align-items-center'>
            <Button variant='link'>
              <Link to='/register'>
                Don't have an account? <span>Sign up now!</span>
              </Link>
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
