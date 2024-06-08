import { Col, Container, Row } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import '../styling/profile.css';
import '../styling/index.css';
import LikedDogsCarousel from '../components/LikedDogCarousel';

function Profile() {
  return (
    <div className='profile-page'>
      <Container>
        <Row>
          <Col md={9}>
            <Row>
              <Col className='my-4 p-3 profile-section profile-liked-dogs'>
                <div>
                  <LikedDogsCarousel />
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
          <Col md={3} className='profile-sidebar' >
            <div>
              <UserInfo />
            </div>
          </Col>
        </Row>
        
      </Container>
    </div>
  )
}

export default Profile