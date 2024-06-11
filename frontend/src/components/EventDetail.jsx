import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EventDetail = ({ event }) => {
  if (!event) return <div>Select an event to see details</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>{new Date(event.date).toLocaleString()}</Card.Text>
        <Card.Text>{event.location}</Card.Text>
        <Button onClick={() => alert(`Registered for ${event.title}`)}>Apply</Button>
      </Card.Body>
    </Card>
  );
};

export default EventDetail;
