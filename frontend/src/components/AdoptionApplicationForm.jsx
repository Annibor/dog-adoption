import { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function AdoptionApplicationForm({ dogId, dogName }) {
  const currentUser = useCurrentUser();
  const [formData, setFormData] = useState({
    visit_date: '',
    reason: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    has_children: false,
    has_other_pets: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/profile/${currentUser.profile_id}/`);
          const { first_name, last_name, address, city, state, zip_code, phone, has_children, has_other_pets } = response.data;
          setFormData((prevData) => ({
            ...prevData,
            first_name: first_name || '',
            last_name: last_name || '',
            address: address || '',
            city: city || '',
            state: state || '',
            zip_code: zip_code || '',
            phone: phone || '',
            has_children: has_children || false,
            has_other_pets: has_other_pets || false,
          }));
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
    console.log(`Field ${name} updated to ${type === 'checkbox' ? checked : value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log('Submitting application with data:', formData);

    try {
      const response = await axios.post('/adoption-applications/', {
        ...formData,
        user: currentUser.profile_id,
        dog: dogId,
      });
      console.log('Application submitted successfully:', response.data);
      setSuccess('Application submitted successfully');
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit application:', err.response?.data);
      setError('Failed to submit application');
      setLoading(false);
    }
  };

  if (submitted) {
    return <Alert variant="success"> Thank you for your application!</Alert>;
  }


  return (
    <div>
      <h1>Apply to Adopt {dogName}</h1>
      <Form onSubmit={handleSubmit}>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
    
    
        <Row>
          <Form.Group as={Col} controlId="visit_date">
            <Form.Label>Visit Date</Form.Label>
            <Form.Control
              type="date"
              name="visit_date"
              value={formData.visit_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="zip_code">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} xs={6} controlId="has_children">
            <Form.Check 
              type="checkbox"
              label="Has Children"
              name="has_children"
              checked={formData.has_children}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} controlId="has_other_pets">
            <Form.Check 
              type="checkbox"
              label="Has Other Pets"
              name='has_other_pets'
              checked={formData.has_other_pets}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" className="mt-3">
          Submit Application
        </Button>
      </Form>
    </div>
  );
}

export default AdoptionApplicationForm;