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

  return (
    <Container className='p-5'>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="UserName">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Username"
                name='username'
                value={username}
                required/>
            </Form.Group>
            

            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={password}
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

export default Login
