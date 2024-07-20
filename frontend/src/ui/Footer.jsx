import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styling/index.css';

function Footer() {
  return (
    <footer className="footer">
      <Container className="p-4 text-center">
        <Row>
          <Col xs={12} md={4}>
            Dog Adoption
          </Col>
          <Col xs={12} md={4}>
            <div>
              <div className="mb-4 footer-icons">
                <Button
                  variant="link"
                  href="https://www.facebook.com/"
                  target="_blank"
                  title="Facebook"
                  className="text-light fs-3 m-1"
                  aria-label="link to facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </Button>
                <Button
                  variant="link"
                  href="https://www.instagram.com/"
                  target="_blank"
                  title="Instagram"
                  className="text-light fs-3 m-1"
                  aria-label="link to instagram"
                >
                  <i className="fab fa-instagram"></i>
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div>Tex ttext </div>
          </Col>
        </Row>
        <p>&copy; 2024 Dog Adoption. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
