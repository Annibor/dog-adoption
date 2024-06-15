import { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Alert, Spinner } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function AdoptionApplicationForm({ dogId, dogName }) {
  const { currentUser } = useCurrentUser(); // Get current user
  const [formData, setFormData] = useState({
    visit_date: '',
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const applied = localStorage.getItem(`applied_${dogId}_${currentUser.id}`);
      if (applied) {
        setSubmitted(true);
      }
    }
  }, [dogId, currentUser]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axiosReq.post('/adoption-applications/', { ...formData, dog: dogId });
      setSuccess('Application submitted successfully!');
      if (currentUser) {
        localStorage.setItem(`applied_${dogId}_${currentUser.id}`, true);
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit the application');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <Alert variant="success">You have already applied for this dog.</Alert>;
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
