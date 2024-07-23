import DogsList from "../components/DogsList";

function Dogs() {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-75 text-center">
        <h1 className="text-center pt-3">Dogs</h1>
        <p>
          This is where you can find all of our dogs that are available for adoption.
          <br />
          Feel free to search or filter between the listed dogs, so you can find your soulmate!
        </p>
      </div>
      <div className="w-100">
        <DogsList />
      </div>
    </div>
  );
}

export default Dogs;