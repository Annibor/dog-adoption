import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log('handleChange:', event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    console.log('handleSubmit: formData:', formData);

    try {
      const response = await axios.post('/dj-rest-auth/login/', {
        username,
        password,
      });

      console.log('handleSubmit: response:', response);

      if (response.status === 200) {
        console.log('handleSubmit: Login successful, navigating to home.');
        navigate('/');
      } else {
        console.error('handleSubmit: Unexpected response:', response);
        setError('Login failed, please try again!');
      }
    } catch (err) {
      console.error('handleSubmit: Error during login:', err);
      if (err.response && err.response.data) {
        console.error('handleSubmit: errorData:', err.response.data);
        setError(err.response.data.detail || 'An unknown error occurred, please try again!');
      } else {
        setError('An unknown error occurred, please try again!');
      }
    }
  }

  return (
    <Container className='p-5'>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
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
