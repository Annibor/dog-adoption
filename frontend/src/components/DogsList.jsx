import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {useState} from 'react';

function DogsList() {
  const [dogs] = useState([]);

  return (
    <div>
      <Container>
        <Row>
          {dogs.map(dog => (
            <Col key={dog.id} md={4}>
              <Card>
                <div>HEre will be img</div>
                <Card.Body>
                  <Card.Title>{dog.name}</Card.Title>
                  <Card.Text>{dog.breed} {dog.age} years old</Card.Text>
                  <Button > Read more about me!</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default DogsList
