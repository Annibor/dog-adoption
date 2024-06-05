import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { Alert } from 'react-bootstrap';


function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

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
    try {
      const response = await axios.post('/dj-rest-auth/registration/', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // Registration successful, navigate to another page (e.g., login)
        navigate('/');
      } else {
        console.error('Unexpected response:', response);
        setError({ non_field_errors: ['Registration failed, please try again!'] });
      }
    } catch (err) {
      // Capture and set specific error messages from the response
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        setError(errorData);
      } else {
        setError('An unknown error occurred, please try again!');
      }
    }
  }


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
                required/>
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
                required/>
            </Form.Group>
            {error.email?.map((message, idx) => (
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

            <Form.Group controlId="ConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                />
            </Form.Group>
            {error.confirmPassword?.map((message, idx) => (
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
    </Container>
  )
}

export default Register
