import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import '../styling/profile.css';
import '../styling/index.css';
import LikedDogsCarousel from '../components/LikedDogCarousel';
import AdoptionApplicationList from '../components/AdoptionApplicationList';
import axios from 'axios';

function Profile() {
  const [likedDogs, setLikedDogs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedDogs = async () => {
      try {
        const response = await axios.get('/favorites/');
        console.log('Liked dogs fetched:', response.data); // Debug log
        setLikedDogs(response.data);
      } catch (err) {
        console.error('Error fetching liked dogs:', err);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get('/adoption-applications/');
        console.log('Adoption applications fetched:', response.data); // Debug log
        setApplications(Array.isArray(response.data.results) ? response.data.results : []);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Error fetching applications');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedDogs();
    fetchApplications();
  }, []);

  const handleDogUnlike = (dogId) => {
    setLikedDogs((prevLikedDogs) => prevLikedDogs.filter((favorite) => favorite.dog.id !== dogId));
  };

  return (
    <div className='profile-page'>
      <Container>
        <Row className="flex ">
          <h1>Your profile page</h1>
          <div>
            <p className="w-75 align-center">
            This is where ypu can see your saved dogs, adoption applications you have done, events you have applied to adn you can update you profile information from here.
            </p>
          </div>
        </Row>
        <Row>
          <Col md={9}>
            <Row className="mx-2">
              <Col className='my-4 p-3 profile-section profile-liked-dogs'>
                <div>
                  <LikedDogsCarousel likedDogs={likedDogs} onDogUnlike={handleDogUnlike} />
                </div>
              </Col>
            </Row>
            <Row className="mx-2">
              <Col className='my-4 p-3 profile-section profile-adoption-applicaitons'>
                <div className='m-2 '>
                  <AdoptionApplicationList applications={applications} loading={loading} error={error} />
                </div>
              </Col>
            </Row>
            <Row className="mx-2">
              <Col className='my-4 p-3 profile-section profile-update-form'>
                <div>
                  <ProfileUpdateForm />
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={3} className='profile-sidebar'>
            <div>
              <UserInfo />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile;
