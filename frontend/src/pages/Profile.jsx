import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import '../styling/profile.css';
import '../styling/index.css';
import LikedDogsCarousel from '../components/LikedDogCarousel';
import axios from 'axios';

function Profile() {
  const [likedDogs, setLikedDogs] = useState([]);

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

    fetchLikedDogs();
  }, []);

  const handleDogUnlike = (dogId) => {
    setLikedDogs((prevLikedDogs) => prevLikedDogs.filter((favorite) => favorite.dog.id !== dogId));
  };

  return (
    <div className='profile-page'>
      <Container>
        <Row>
          <Col md={9}>
            <Row>
              <Col className='my-4 p-3 profile-section profile-liked-dogs'>
                <div>
                  <LikedDogsCarousel likedDogs={likedDogs} onDogUnlike={handleDogUnlike} />
                </div>
              </Col>
            </Row>
            <Row>
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
