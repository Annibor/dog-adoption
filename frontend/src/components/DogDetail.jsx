import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults'; // Import axiosReq instance
import AdoptionApplicationForm from './AdoptionApplicationForm';
import LikeButton from './LikeButton';
import "../styling/dogs.css";
import "../styling/index.css";

const DogDetail = ({ dog, condensed, onDogUnlike }) => {
  const { id } = useParams();
  const [dogData, setDogData] = useState(dog || null);
  const [loading, setLoading] = useState(!dog);
  const [error, setError] = useState(null);
  const [resetForm, setResetForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dog) {
      const fetchDog = async () => {
        try {
          const response = await axiosReq.get(`/dogs/${id}/`); // Use axiosReq
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

  const handleFormReset = () => {
    setResetForm(!resetForm);
    console.log('Form reset in DogDetail');
  };

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
              <Card className="mb-4">
                <Card.Img
                  className="card-img-custom"
                  variant="top"
                  src={dogInfo.featured_image}
                />
                <Card.Body>
                  <Card.Title className='text-uppercase'>{dogInfo.name}</Card.Title>
                  <Card.Text>
                    {!condensed && (
                      <>
                        <strong>Breed:</strong> {dogInfo.breed}<br />
                        <strong>Gender:</strong> {dogInfo.gender}<br />
                        <strong>Age:</strong> {dogInfo.age}<br />
                        <strong>Temperament:</strong> {dogInfo.temperament}<br />
                        <strong>Good With Children:</strong> {dogInfo.good_with_children ? "Yes" : "No"}<br />
                        <strong>Good With Other Dogs:</strong> {dogInfo.good_with_other_dogs ? "Yes" : "No"}<br />
                        <strong>Description:</strong> {dogInfo.description}<br />
                        <strong>Adoption Status:</strong> {dogInfo.adoption_status}<br />
                        <strong>Created at:</strong> {new Date(dogInfo.created_at).toLocaleDateString()}<br />
                        <strong>Updated at:</strong> {new Date(dogInfo.updated_at).toLocaleDateString()}<br />
                      </>
                    )}
                  </Card.Text>
                  {dogInfo.id && (
                    <LikeButton dogId={dogInfo.id} onDogUnlike={onDogUnlike} />
                  )}
                </Card.Body>
              </Card>
            </div>
          )}
        </Col>
        {!condensed && dogInfo && (
          <Col md={6}>
            {dogInfo.adoption_status === 'adopted' ? (
              <div className="adopted-overlay">
                <h3>Found new home</h3>
              </div>
            ) : (
              <AdoptionApplicationForm dogId={dogInfo.id} dogName={dogInfo.name} onReset={handleFormReset} formResetSignal={resetForm} key={resetForm} />
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DogDetail;
