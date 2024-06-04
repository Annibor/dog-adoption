import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = FormData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container className='p-5'>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Register</h2>
          <Form>
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

            <Form.Group controlId="ConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name='confirmpassword'
                value={confirmPassword}
                onChange={handleChange}
                />
            </Form.Group>

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
