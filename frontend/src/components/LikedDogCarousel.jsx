import { Carousel } from 'react-bootstrap';
import DogDetail from './DogDetail';

// LikedDogsCarousel component that displays a carousel of liked dogs
const LikedDogsCarousel = ({ likedDogs, onDogUnlike }) => {
  // If there are no liked dogs, display a message
  if (!likedDogs || likedDogs.length === 0) {
    return <p>No liked dogs to display.</p>;
  }

  return (
    <div>
      <h2 className="text-center">Your saved dogs!</h2>
      {/* Carousel component to display the liked dogs */}
      <Carousel>
        {/* Map through the liked dogs and display each dog in a Carousel.Item */}
        {likedDogs.map((favorite, index) => (
          <Carousel.Item key={`${favorite.id}-${index}`}>
            {/* DogDetail component to display the details of each dog */}
            <DogDetail dog={favorite.dog} condensed={true} onDogUnlike={onDogUnlike} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default LikedDogsCarousel;