import { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
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
      } else {
        setApplied(false);
        setSuccess(null);
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
      await axiosReq.post(`/events/registrations/${event.id}/`, requestData);
      setApplied(true);
      setSuccess('Successfully applied for the event!');
      localStorage.setItem(`eventApplied-${event.id}`, 'true');
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.detail === "You have already registered for this event.") {
        setApplied(true);
        setError('You have already applied for this event.');
      } else {
        setError('Failed to apply for the event.');
      }
      setLoading(false);
    }
  };

  if (!event) return <div>Select an event to see details</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className='my-3'>{event.title}</Card.Title>
        <Card.Text className='mx-1 my-2'>{event.description}</Card.Text>
        <Card.Text className='mx-1 mt-3'>{new Date(event.date).toLocaleString()}</Card.Text>
        <Card.Text className="mx-1 mt-3">{event.location}</Card.Text>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Button onClick={handleApply} disabled={loading || applied}>
          {applied ? 'Already Applied' : 'Apply'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventDetail;
