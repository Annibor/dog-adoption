// src/components/LikedDogsCarousel.jsx

import { Carousel } from 'react-bootstrap';
import DogDetail from './DogDetail';

const LikedDogsCarousel = ({ likedDogs }) => {
  if (!likedDogs || likedDogs.length === 0) {
    return <p>No liked dogs to display.</p>;
  }

  console.log('likedDogs:', likedDogs); // Debug log

  return (
    <div>
      <h2>Here are your saved dogs!</h2>
      <Carousel>
        {likedDogs.map((favorite, index) => (
          <Carousel.Item key={`${favorite.id}-${index}`}>
            <DogDetail dog={favorite.dog} condensed={true} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default LikedDogsCarousel;
