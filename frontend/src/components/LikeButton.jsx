// src/components/LikeButton.js

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import '../styling/LikeButton.module.css';

const LikeButton = ({ dogId }) => {
  const { currentUser } = useCurrentUser();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log('dogId:', dogId); // Debug log for dogId
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`/favorites/${dogId}/`);
        if (response.status === 200) {
          setLiked(true);
        }
      } catch (err) {
        if (err.response && err.response.status !== 404) {
          console.error(err);
        }
      }
    };

    if (currentUser && dogId) {
      fetchLikeStatus();
    }
  }, [dogId, currentUser]);

  const handleLikeToggle = async () => {
    if (!currentUser) {
      alert('You need to be logged in to like a dog.');
      return;
    }

    console.log('dogId before request:', dogId); 

    try {
      if (liked) {
        const response = await axios.delete(`/favorites/${dogId}/`);
        console.log('Dog unliked:', response.data, 'for dogId:', dogId);
      } else {
        const response = await axios.post('/favorites/', { dog: dogId });
        console.log('Dog liked:', response.data, 'for dogId:', dogId);
      }
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeToggle}>
      <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} size="2x" />
    </button>
  );
};

export default LikeButton;
