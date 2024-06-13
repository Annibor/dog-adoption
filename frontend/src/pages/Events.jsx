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
      <div className="content-wrapper">
        <Row>
          <Col md={7}>
            <div className="p-2 content-div">
              <div className="m-3">
                <h1 className="pb-3">Events</h1>
                <p>Join our events to meet and potentially adopt a loving dog. Here you can find all the   upcoming events. Click on an event to see more details and apply to participate.</p>
                <EventList events={events} setSelectedEvent={setSelectedEvent} />
              </div>
              
            </div>
            
          </Col>
          <Col md={5}>
            <EventDetail event={selectedEvent} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Events;
