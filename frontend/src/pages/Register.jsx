import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const { username, email, password1, password2 } = formData;

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || {});
    }
  };

  return (
    <Container className='p-5'>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="UserName">
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
            {error.username?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Enter email"
                name='email'
                value={email}
                onChange={handleChange} 
                required
              />
            </Form.Group>
            {error.email?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="Password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password1'
                value={password1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {error.password1?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="Password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name='password2'
                value={password2}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {error.password2?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}

            <Button className='my-4' variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='mt-4 justify-content-center align-items-center'>
        <Button>
          <Link className='text-white' to="/login">
            Already have an account? <span>Log in now!</span>
          </Link>
        </Button>
      </Row>
    </Container>
  );
}

export default Register;
