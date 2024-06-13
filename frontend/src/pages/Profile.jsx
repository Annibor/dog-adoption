import { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Collapse } from 'react-bootstrap';
import { FaDog, FaHeart, FaUserEdit, FaPaw } from 'react-icons/fa';
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
  


  const [showLikedDogs, setShowLikedDogs] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showEventApplications, setShowEventApplications] = useState(false);
  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);

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
      <Row>
        <Col md={9}>
          <Row className='my-4 p-3 profile-section'>
            <Col>
              <div className="section-header" onClick={() => setShowLikedDogs(!showLikedDogs)} aria-controls="liked-dogs-section" aria-expanded={showLikedDogs}>
                <FaHeart size={32} className="section-icon" />
                <span className="section-title">Liked Dogs</span>
              </div>
              <Collapse in={showLikedDogs}>
                <div id="liked-dogs-section">
                  <LikedDogsCarousel likedDogs={likedDogs} onDogUnlike={handleDogUnlike} />
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className='my-4 p-3 profile-section'>
            <Col>
              <div className="section-header" onClick={() => setShowApplications(!showApplications)} aria-controls="applications-section" aria-expanded={showApplications}>
                <FaPaw size={32} className="section-icon" />
                <span className="section-title">Adoption Applications</span>
              </div>
              <Collapse in={showApplications}>
                <div id="applications-section">
                  <AdoptionApplicationList applications={applications} loading={loading} error={error} />
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className='my-4 p-3 profile-section'>
            <Col>
              <div className="section-header" onClick={() => setShowEventApplications(!showEventApplications)} aria-controls="event-applications-section" aria-expanded={showEventApplications}>
                <FaDog size={32} className="section-icon" />
                <span className="section-title">Event Applications</span>
              </div>
              <Collapse in={showEventApplications}>
                <div id="event-applications-section">
                  Here will be events list
                </div>
              </Collapse>
            </Col>
          </Row>
          <Row className='my-4 p-3 profile-section'>
            <Col>
              <div className="section-header" onClick={() => setShowProfileUpdateForm(!showProfileUpdateForm)} aria-controls="profile-update-section" aria-expanded={showProfileUpdateForm}>
                <FaUserEdit size={32} className="section-icon" />
                <span className="section-title">Update Profile</span>
              </div>
              <Collapse in={showProfileUpdateForm}>
                <div id="profile-update-section">
                  <ProfileUpdateForm />
                </div>
              </Collapse>
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
);
}
export default Profile;
