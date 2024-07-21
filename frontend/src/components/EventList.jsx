import React from 'react';
import { ListGroup } from 'react-bootstrap';

const EventList = ({ events, setSelectedEvent }) => {
  // Check if there are no events or events array is empty
  if (!events || events.length === 0) {
     // Display a message if no events are available
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