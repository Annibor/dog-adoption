import React from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';

// EventApplicationList component
const EventApplicationList = ({ eventApplications, loading, error, onUnapply }) => {
  // If loading is true, display a spinner
  if (loading) return <Spinner animation="border" variant="primary" />;
  
  // If there's an error, display an alert with the error message
  if (error) return <Alert variant="danger">{error}</Alert>;
  
  // If there are no event applications, display an info alert
  if (!eventApplications || eventApplications.length === 0) {
    return <Alert variant="info">No event applications to display.</Alert>;
  }

  // Render the list of event applications
  return (
    <div>
      <h2>Your Event Applications</h2>
      {eventApplications.map(application => (
        <Card key={application.id} className="mb-3">
          <Card.Body>
            <Card.Title>{application.event.title}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {new Date(application.event.date).toLocaleString()}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong> {application.status}
            </Card.Text>
            <Button
              variant="danger"
              onClick={() => {
                onUnapply(application.id, application.event.id);
              }}
            >
              Unapply
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EventApplicationList;
