import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const EventDetail = ({ event }) => {
  const { currentUser } = useCurrentUser();

  const handleApply = async () => {
    try {
      await axios.post(`/events/registrations/${event.id}/`, {
        user: currentUser.profile_id,
      });
      alert('Successfully applied for the event!');
    } catch (err) {
      console.error('Failed to apply for the event:', err);
      alert('Failed to apply for the event.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>{new Date(event.date).toLocaleString()}</Card.Text>
        <Card.Text>{event.location}</Card.Text>
        <Button onClick={handleApply}>Apply</Button>
      </Card.Body>
    </Card>
  );
};

export default EventDetail;
