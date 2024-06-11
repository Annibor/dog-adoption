import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EventDetail from '../components/EventDetail';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/');
        if (Array.isArray(response.data.results)) {
          setEvents(response.data.results);
          setSelectedEvent(response.data.results[0]); 
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching events:', err.message);
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      {error && <div>Error: {error}</div>}
      <Row>
        <Col md={8}>
          <h1>Events</h1>
          <EventList events={events} setSelectedEvent={setSelectedEvent} />
        </Col>
        <Col md={4}>
          <EventDetail event={selectedEvent} />
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
