import { Col, Container, Row } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
import LikedDogsCarousel from '../components/LikedDogsCarousel';
import ProfileUpdateForm from '../components/ProfileUpdateForm';

function Profile() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={9}>
            <Row>
              <Col className='my-4 p-3 bg-warning'>
                <div>
                  <LikedDogsCarousel />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='my-4 p-3 bg-danger'>
                <div>
                  <ProfileUpdateForm />
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={3} className='bg-primary' >
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
