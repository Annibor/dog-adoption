import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import '../styling/LikeButton.module.css';

const LikeButton = ({ dogId, onDogUnlike }) => {
  const { currentUser } = useCurrentUser();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Fetch the like status of the dog
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get('/favorites/');
        const likedDogs = response.data;
        const isLiked = likedDogs.some(favorite => favorite.dog.id === dogId);
        setLiked(isLiked);
      } catch (err) {
        console.error(`Error fetching like status: ${err.message}`);
      }
    };

    // Fetch the like status only if the user is logged in and a dogId is provided
    if (currentUser && dogId) {
      fetchLikeStatus();
    }
  }, [dogId, currentUser]);

  const handleLikeToggle = async () => {
    // Check if the user is logged in
    if (!currentUser) {
      alert('You need to be logged in to like a dog.');
      return;
    }

    try {
      if (liked) {
        // Unlike the dog if it is already liked
        const response = await axios.delete(`/favorites/${dogId}/`);
        console.log('Dog unliked:', response.data, 'for dogId:', dogId);
        if (onDogUnlike) onDogUnlike(dogId); 
      } else {
        // Like the dog if it is not liked
        const response = await axios.post('/favorites/', { dog: dogId });
        console.log('Dog liked:', response.data, 'for dogId:', dogId);
      }
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Render the like button with appropriate styling and icon based on the like status
    <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeToggle}>
      <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} size="2x" />
    </button>
  );
};

export default LikeButton;