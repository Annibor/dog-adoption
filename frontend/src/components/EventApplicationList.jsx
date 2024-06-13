import React, { useEffect, useState } from 'react';
import { Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const EventApplicationList = ({ eventApplications, loading, error }) => {
  const [eventsDetails, setEventsDetails] = useState({});

  useEffect(() => {
    const fetchEventDetails = async (eventId) => {
      try {
        const response = await axios.get(`/events/${eventId}/`);
        return response.data;
      } catch (err) {
        console.error('Error fetching event details:', err);
        return null;
      }
    };

    const loadEventDetails = async () => {
      const details = {};
      for (const application of eventApplications) {
        if (!details[application.event]) {
          const eventDetail = await fetchEventDetails(application.event);
          if (eventDetail) {
            details[application.event] = eventDetail;
          }
        }
      }
      setEventsDetails(details);
    };

    loadEventDetails();
  }, [eventApplications]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!eventApplications || eventApplications.length === 0) {
    return <Alert variant="info">No event applications to display.</Alert>;
  }

  return (
    <div>
      <h2>Your Event Applications</h2>
      {eventApplications.map(application => {
        const event = eventsDetails[application.event] || {};
        return (
          <Card key={application.id} className="mb-3">
            <Card.Body>
              <Card.Title>{event.title || 'No title available'}</Card.Title>
              <Card.Text>
                <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleString() : 'No date available'}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {event.location || 'No location available'}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {application.status}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default EventApplicationList;
