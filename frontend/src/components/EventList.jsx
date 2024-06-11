import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const EventList = ({ setSelectedEvent }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/');
        console.log('API response:', response.data);
        if (response.data.results && Array.isArray(response.data.results)) {
          setEvents(response.data.results);
          response.data.results.forEach(event => console.log('Event ID:', event.id));
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
    <div>
      {error && <div>{error}</div>}
      <ListGroup>
        {events.map(event => (
          <ListGroup.Item 
            key={event.id} 
            onClick={() => setSelectedEvent(event)}
            action
          >
            {event.title} - {new Date(event.date).toLocaleDateString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EventList;
