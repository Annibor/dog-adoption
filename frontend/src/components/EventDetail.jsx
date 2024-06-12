import { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const EventDetail = ({ event }) => {
  const { currentUser } = useCurrentUser();
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event) {
      const appliedStatus = localStorage.getItem(`eventApplied-${event.id}`);
      if (appliedStatus === 'true') {
        setApplied(true);
        setSuccess('Successfully applied for the event!');
      }
    }
  }, [event]);

  const handleApply = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const requestData = {
        event: event.id,
        user: currentUser.profile_id,
      };
      console.log('Request Data:', requestData);
      const response = await axios.post(`/events/registrations/${event.id}/`, requestData);
      console.log('Response Data:', response.data);
      setApplied(true);
      setSuccess('Successfully applied for the event!');
      setLoading(false);
      localStorage.setItem(`eventApplied-${event.id}`, 'true');
    } catch (err) {
      console.error('Failed to apply for the event:', err.response?.data || err);
      setError('Failed to apply for the event.');
      setLoading(false);
    }
  };

  if (!event) return <div>Select an event to see details</div>;

  if (applied) {
    return <Alert variant="success">Thank you for applying for the event!</Alert>;
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>{new Date(event.date).toLocaleString()}</Card.Text>
        <Card.Text>{event.location}</Card.Text>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Button onClick={handleApply} disabled={loading}>
          Apply
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventDetail;
