import DogsList from "../components/DogsList";

function Dogs() {
  return (
    <div>
      <div className="">
        <h1 className="text-center pt-3">Dogs</h1>
        <div className="w-75">
          <p>This is where you can find all of our dogs that are available for adoption. 
          <p>Feel free to search or filter between the listed dogs, so you can fain your soulmate!</p>
          </p>
        </div>
      </div>
      
      <div>
        <DogsList />
      </div>
    </div>
  );
}

export default Dogs;