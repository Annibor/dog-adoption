import { useState, useEffect } from 'react';
import { Col, Container, Row, Collapse } from 'react-bootstrap';
import { FaDog, FaHeart, FaUserEdit, FaPaw } from 'react-icons/fa';
import UserInfo from '../components/UserInfo';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import '../styling/profile.css';
import '../styling/index.css';
import LikedDogsCarousel from '../components/LikedDogCarousel';
import AdoptionApplicationList from '../components/AdoptionApplicationList';
import EventApplicationList from '../components/EventApplicationList';
import { axiosReq } from '../api/axiosDefaults';


/**
 * Profile component displays the user's profile page.
 * It fetches and displays the user's liked dogs, adoption applications,
 * event applications, and provides options to update the profile.
 */
function Profile() {
  // State variables
  const [likedDogs, setLikedDogs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [eventApplications, setEventApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formResetSignal, setFormResetSignal] = useState(false);
  const [eventResetSignal, setEventResetSignal] = useState(false);

  // Show/Hide sections
  const [showLikedDogs, setShowLikedDogs] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showEventApplications, setShowEventApplications] = useState(false);
  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);

  // Fetches the user's liked dogs from the server.
  useEffect(() => {
    const fetchLikedDogs = async () => {
      try {
        const response = await axiosReq.get('/favorites/');
        setLikedDogs(response.data);
      } catch (err) {
        console.error('Error fetching liked dogs:', err);
      }
    };

    // Fetches the user's adoption applications from the server.

    const fetchApplications = async () => {
      try {
        const response = await axiosReq.get('/adoption-applications/');
        setApplications(Array.isArray(response.data.results) ? response.data.results : []);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Error fetching applications');
      } finally {
        setLoading(false);
      }
    };

    // Fetches the user's event applications from the server.
    const fetchEventApplications = async () => {
      try {
        const response = await axiosReq.get('/events/registrations/');
        console.log('Event applications fetched:', response.data);
        setEventApplications(Array.isArray(response.data.results) ? response.data.results : []);
      } catch (err) {
        console.error('Error fetching event applications:', err);
        setError('Error fetching event applications');
      } finally {
        setLoading(false);
      }
    };

    // Fetch data on component mount
    fetchLikedDogs();
    fetchApplications();
    fetchEventApplications();
  }, []);

  // Handles the unlike action for a dog.
  const handleDogUnlike = (dogId) => {
    setLikedDogs((prevLikedDogs) => prevLikedDogs.filter((favorite) => favorite.dog.id !== dogId));
  };

  // Handles the unapply action for an adoption application.
  const handleUnapplyAdoption = async (applicationId, dogId, currentUser) => {
    try {
      await axiosReq.delete(`/adoption-applications/${applicationId}/`);
      setApplications((prevApplications) => prevApplications.filter((application) => application.id !== applicationId));
      localStorage.removeItem(`applied_${dogId}_${currentUser.id}`);
      setFormResetSignal(prev => !prev);
    } catch (err) {
      console.error('Error unapplying adoption application:', err);
      setError('Error unapplying adoption application');
    }
  };

  // Handles the unapply action for an event application.
  const handleUnapplyEvent = async (eventApplicationId, eventId, currentUser) => {
    try {
      await axiosReq.delete(`/events/registrations/${eventApplicationId}/`);
      setEventApplications((prevEventApplications) => prevEventApplications.filter((application) => application.id !== eventApplicationId));
      localStorage.removeItem(`eventApplied_${eventId}_${currentUser.id}`);
      setEventResetSignal(prev => !prev);
    } catch (err) {
      console.error('Error unapplying event application:', err);
      setError('Error unapplying event application');
    }
  };

  return (
    <div className='profile-page'>
      <Container>
        <Row>
          <Col md={4} className='profile-sidebar'>
            <div>
              <UserInfo />
            </div>
          </Col>
          <Col md={8} className='mt-3'>
            <Row className='my-4 p-2 profile-section'>
              <Col>
                {/* Liked Dogs section */}
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
                {/* Adoption Applications section */}
                <div className="section-header" onClick={() => setShowApplications(!showApplications)} aria-controls="applications-section" aria-expanded={showApplications}>
                  <FaPaw size={32} className="section-icon" />
                  <span className="section-title">Adoption Applications</span>
                </div>
                <Collapse in={showApplications}>
                  <div id="applications-section">
                    <AdoptionApplicationList
                      applications={applications}
                      loading={loading}
                      error={error}
                      onUnapply={(applicationId) => handleUnapplyAdoption(applicationId, applications.find(app => app.id === applicationId).dog, applications.find(app => app.id === applicationId).user)}
                      formResetSignal={formResetSignal} />
                  </div>
                </Collapse>
              </Col>
            </Row>
            <Row className='my-4 p-3 profile-section'>
              <Col>
                {/* Event Applications section */}
                <div className="section-header" onClick={() => setShowEventApplications(!showEventApplications)} aria-controls="event-applications-section" aria-expanded={showEventApplications}>
                  <FaDog size={32} className="section-icon" />
                  <span className="section-title">Event Applications</span>
                </div>
                <Collapse in={showEventApplications}>
                  <div id="event-applications-section">
                    <EventApplicationList
                      eventApplications={eventApplications}
                      loading={loading}
                      error={error}
                      onUnapply={(applicationId) => handleUnapplyEvent(applicationId, eventApplications.find(app => app.id === applicationId).event)}
                      eventResetSignal={eventResetSignal}
                    />
                  </div>
                </Collapse>
              </Col>
            </Row>
            <Row className='my-4 p-3 profile-section'>
              <Col>
                {/* Profile Update section */}
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
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
