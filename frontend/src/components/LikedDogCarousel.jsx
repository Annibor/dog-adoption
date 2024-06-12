import { Carousel } from 'react-bootstrap';
import DogDetail from './DogDetail';

const LikedDogsCarousel = ({ likedDogs, onDogUnlike }) => {
  if (!likedDogs || likedDogs.length === 0) {
    return <p>No liked dogs to display.</p>;
  }

  console.log('likedDogs:', likedDogs); // Debug log

  return (
    <div>
      <h2 className="text-center">Your saved dogs!</h2>
      <Carousel>
        {likedDogs.map((favorite, index) => (
          <Carousel.Item key={`${favorite.id}-${index}`}>
            <DogDetail dog={favorite.dog} condensed={true} onDogUnlike={onDogUnlike} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default LikedDogsCarousel;
