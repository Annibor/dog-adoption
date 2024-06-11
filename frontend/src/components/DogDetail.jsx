import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import AdoptionApplicationForm from './AdoptionApplicationForm';
import LikeButton from './LikeButton';

const DogDetail = ({ dog, condensed, onDogUnlike }) => {
  const { id } = useParams();
  const [dogData, setDogData] = useState(dog || null);
  const [loading, setLoading] = useState(!dog);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dog) { 
      const fetchDog = async () => {
        try {
          const response = await axios.get(`/dogs/${id}/`);
          setDogData(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchDog();
    }
  }, [id, dog]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const dogInfo = dogData || dog;
  console.log('dogInfo:', dogInfo);

  return (
    <Container className={`py-5 ${condensed ? 'condensed' : ''}`}>
      {!condensed && ( 
        <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
          &larr; Go Back
        </Button>
      )}
      <Row className="justify-content-center">
        <Col md={6}>
          {dogInfo && (
            <div>
              <Image src={dogInfo.image_url} fluid className="mb-4" />
              <h2>{dogInfo.name}</h2>
              <p><strong>Breed:</strong> {dogInfo.breed}</p>
              <p><strong>Gender:</strong> {dogInfo.gender}</p>
              <p><strong>Age:</strong> {dogInfo.age}</p>
              <p><strong>Temperament:</strong> {dogInfo.temperament}</p>
              <p><strong>Good With Children:</strong> {dogInfo.good_with_children}</p>
              <p><strong>Good With Other Dogs:</strong> {dogInfo.good_with_other_dogs}</p>
              <p><strong>Description:</strong> {dogInfo.description}</p>
              <p><strong>Adoption Status:</strong> {dogInfo.adoption_status}</p>
              <p>Created at: {dogInfo.created_at}</p>
              <p>Updated at: {dogInfo.updated_at}</p>

              {dogInfo.id && (
                <LikeButton dogId={dogInfo.id} onDogUnlike={onDogUnlike} />
              )}
            </div>
          )}
        </Col>
        {!condensed && dogInfo && ( 
          <Col md={6}>
            <AdoptionApplicationForm dogId={dogInfo.id} dogName={dogInfo.name} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DogDetail;
