import { Container, Row, Button, Col } from 'react-bootstrap';

function Home() {
  return (
    <div className="bg-light text-dark min-vh-100">
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-left">
            <h1 className="display-4">Welcome to Dog Adoption</h1>
            <p className="lead">
              Find your perfect furry friend and give them a loving home. Browse through our list of adorable dogs available for adoption.
            </p>
            <Button variant="primary" className="mt-3">
              View Dogs
            </Button>
          </Col>
          <Col md={6} className="text-center">
            <div>Will be an img</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;