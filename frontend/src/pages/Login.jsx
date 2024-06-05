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

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/dj-rest-auth/login/', {
        username,
        password,
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        setError('Login failed, please try again!');
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (err.response && err.response.data) {
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
            <Form.Group controlId="UserName">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Username"
                name='username'
                value={username}
                onChange={handleChange}
                required/>
            </Form.Group>
            {error.username?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={password}
                onChange={handleChange}
                />
            </Form.Group>
            {error.password?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}
            <Button className='my-4 ' variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className = 'mt-4 justify-content-center aligin-items-center'>
       <Button>
        <Link className='text-white' to="/register">
         Don&apos;t have an account? <span>Sign up now!</span>
        </Link>
       </Button>
      </Row>
    </Container>
    
  )
}

export default Login
