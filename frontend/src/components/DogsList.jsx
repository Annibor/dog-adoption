// src/components/DogsList.js

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DogsList() {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get('/dogs/');
        console.log('API response:', response);
        if (Array.isArray(response.data.results)) {
          setDogs(response.data.results);
          console.log('Dogs data:', response.data.results);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDogs();
  }, []);

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {dogs.map((dog) => (
          <Col key={dog.id} md={4}>
            <Card className="mb-4">
              <div>Here will be img</div>
              <Card.Body>
                <Card.Title>{dog.name}</Card.Title>
                <Card.Text>{dog.breed} {dog.age} years old</Card.Text>
                <Button  as={Link} to={`/dogs/${dog.id}`}>Read more about me!</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DogsList;
