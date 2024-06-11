import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventList from '../components/EventList';
import EventDetail from '../components/EventDetail';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h1>Events</h1>
          <EventList setSelectedEvent={setSelectedEvent} />
        </Col>
        <Col md={8}>
          {selectedEvent && <EventDetail event={selectedEvent} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
