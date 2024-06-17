import React from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';

const EventApplicationList = ({ eventApplications, loading, error, onUnapply }) => {
  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!eventApplications || eventApplications.length === 0) {
    return <Alert variant="info">No event applications to display.</Alert>;
  }

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
                console.log(`Unapplying event application id: ${application.id}`);
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
