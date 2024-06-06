import { Container, Row, Col } from 'react-bootstrap';
import '../src/styling/index.css';

function Footer() {
  return (
    <footer className="footer">
      <Container className="p-4 text-center">
        <Row>
          <Col xs={6} md={4}>
            Dog Adoption
          </Col>
          <Col xs={6} md={4}>
            <div>Links to social media</div>
          </Col>
          <Col xs={6} md={4}>
            <div>Tex ttext </div>
          </Col>
        </Row>
        <p>&copy; 2024 Dog Adoption. All Rights Reserved.</p>
      </Container>
    </footer>
  )
}

export default Footer
