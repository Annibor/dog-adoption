import { useEffect, useState } from 'react';
import {Card, Alert, Spinner} from 'react-bootstrap';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import '../styling/profile.css';

function UserInfo() {
  const { currentUser } = useCurrentUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`/profile/${currentUser.profile_id}/`);
          setUserData(response.data);
        } catch (err) {
          setError('Failed to fetch user profile.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const missingFields = !userData.first_name || !userData.last_name || !userData.email || !userData.phone || !userData.address || !userData.city || !userData.state || !userData.zip_code;

  return (
    <Card className='user-info-card shadow-sm p-3 mb-5 rounded'>
      <Card.Body>
      <Card.Title>{userData.username}</Card.Title>
        <Card.Text>
          <strong>Name:</strong> {userData.first_name} {userData.last_name}<br />
          <strong>Email:</strong> {userData.email}<br />
          <strong>Phone:</strong> {userData.phone}<br />
          <strong>Address:</strong> {userData.address}, {userData.city}, {userData.state} {userData.zip_code}<br />
          <strong>Has Children:</strong> {userData.has_children ? 'Yes' : 'No'}<br />
          <strong>Has Other Pets:</strong> {userData.has_other_pets ? 'Yes' : 'No'}
        </Card.Text>
        {missingFields && (
          <Alert variant="warning">
            Some of your profile information is missing. Please update your profile using the form below to complete your information.
          </Alert>
        )}
      </Card.Body>
    </Card>
  )
}

export default UserInfo;