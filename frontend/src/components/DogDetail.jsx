import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import AdoptionApplicationForm from './AdoptionApplicationForm';

const DogDetail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await axios.get(`/dogs/${id}/`);
        setDog(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
      fetchDog();
  }, [id]);
  
  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  

  return (
    <Container className='py-5'>
      <Row className="justify-content-center">
        <Col md={6}>
          {dog && (
            <div>
              <Image src={dog.image_url} fluid className="mb-4" />
              <h2>{dog.name}</h2>
              <p><strong>Breed:</strong> {dog.breed}</p>
              <p><strong>Gender:</strong>{dog.gender}</p>
              <p><strong>Age:</strong> {dog.age}</p>
              <p><strong>Temperament:</strong> {dog.temperament} </p>
              <p><strong>Good With children:</strong> {dog.good_with_children}</p>
              <p><strong>Good with other dogs:</strong>{dog.good_with_other_dogs}</p>
              <p><strong>Description:</strong> {dog.description}</p>
              <p><strong>Adoption status:</strong>{dog.adoption_status}</p>
              <p>Created at: {dog.created_at}</p>
              <p>Updated at: {dog.updated_at}</p>

              <Button variant="primary">
                <i className="fa fa-heart"></i> Save
              </Button>
            </div>
          )}
        </Col>
        <Col md={6}>
          < AdoptionApplicationForm />
        </Col>
      </Row>
    </Container>
  );
};

export default DogDetail;
