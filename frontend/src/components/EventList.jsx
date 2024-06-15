import React from 'react';
import { ListGroup } from 'react-bootstrap';

const EventList = ({ events, setSelectedEvent }) => {
  if (!events || events.length === 0) {
    return <div>No events available.</div>;
  }

  return (
    <div>
      <ListGroup>
        {events.map(event => (
          <ListGroup.Item 
            key={event.id} 
            onClick={() => setSelectedEvent(event)}
            action
            className="my-2 list-item"
          >
            <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EventList;