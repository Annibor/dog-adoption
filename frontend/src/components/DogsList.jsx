// src/components/DogsList.js

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DogsList() {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dog.age.toString().includes(searchQuery)
  );


  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Control
            type="text"
            placeholder="Search for dogs by name, age or breed"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      <Row>
        {filteredDogs.map((dog) => (
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
