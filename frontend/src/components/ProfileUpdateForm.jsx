import { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const ProfileUpdateForm = () => {
  const { currentUser } = useCurrentUser();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    has_children: false,
    has_pets: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/profile/${currentUser.profile_id}/`);
          const {
            first_name,
            last_name,
            username,
            email,
            address,
            city,
            state,
            zip,
            phone,
            has_children,
            has_pets,
          } = response.data;
          setFormData({
            first_name: first_name || '',
            last_name: last_name || '',
            username: username || '',
            email: email || '',
            password: '',
            confirmPassword: '',
            address: address || '',
            city: city || '',
            state: state || '',
            zip: zip || '',
            phone: phone || '',
            has_children: has_children || false,
            has_pets: has_pets || false,
          });
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Oops, passwords must match, please try again!');
      setLoading(false);
      return;
    }

    try {
      await axios.put(`/profile/${currentUser.profile_id}/`, formData);
      setSuccess('Profile updated successfully');
      setLoading(false);
    } catch (err) {
      console.error('Failed to update profile:', err.response?.data);
      setError('Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Profile Information</h2>
      <Form className='m-2' onSubmit={handleSubmit}>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Row>
          <Form.Group as={Col} xs={12} md={6} controlId="FirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="First Name"
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="LastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Last Name"
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} xs={12} md={6} controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Username"
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email"
              placeholder="Email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} xs={12} md={6} controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Confirm Password"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} xs={12} controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Address"
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col} xs={12} md={4} controlId="City">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text"
              placeholder="City"
              name='city'
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4} controlId="State">
            <Form.Label>State</Form.Label>
            <Form.Control 
              type="text"
              placeholder="State"
              name='state'
              value={formData.state}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4} controlId="Zip">
            <Form.Label>Zip</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Zip"
              name='zip'
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} xs={12} controlId="Phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Phone"
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col} xs={6} controlId="HasChildren">
            <Form.Check 
              type="checkbox"
              label="Has Children"
              name='has_children'
              checked={formData.has_children}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} controlId="HasPets">
            <Form.Check 
              type="checkbox"
              label="Has Pets"
              name='has_pets'
              checked={formData.has_pets}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" className='mt-3'>
          Update here
        </Button>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
