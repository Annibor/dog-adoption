import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form, Collapse } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults'; // Import axiosReq instance
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import "../styling/dogs.css";
import "../styling/index.css";

function DogsList() {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    temperament: '',
    good_with_children: '',
    good_with_other_dogs: '',
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axiosReq.get('/dogs/', { params: filters });
        if (Array.isArray(response.data.results)) {
          setDogs(response.data.results);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDogs();
  }, [filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dog.age.toString().includes(searchQuery)
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      breed: '',
      age: '',
      gender: '',
      temperament: '',
      good_with_children: '',
      good_with_other_dogs: '',
    });
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Control
            type="text"
            placeholder="Search for dogs by name, age or breed"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button
            className="mb-2"
            onClick={() => setOpen(!open)}
            aria-controls="filters"
            aria-expanded={open}
            variant="secondary"
          >
            <FaFilter /> Filters
          </Button>
          <Collapse in={open}>
            <div>
              <h4>Filters</h4>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                />
              </Form.Group>
              <Form.Group controlId="breed">
                <Form.Label>Breed</Form.Label>
                <Form.Control
                  type="text"
                  name="breed"
                  value={filters.breed}
                  onChange={handleFilterChange}
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={filters.age}
                  onChange={handleFilterChange}
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="temperament">
                <Form.Label>Temperament</Form.Label>
                <Form.Control
                  as="select"
                  name="temperament"
                  value={filters.temperament}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="calm">Calm</option>
                  <option value="energetic">Energetic</option>
                  <option value="aggressive">Aggressive</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="good_with_children">
                <Form.Label>Good with Children</Form.Label>
                <Form.Control
                  as="select"
                  name="good_with_children"
                  value={filters.good_with_children}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="good_with_other_dogs">
                <Form.Label>Good with Other Dogs</Form.Label>
                <Form.Control
                  as="select"
                  name="good_with_other_dogs"
                  value={filters.good_with_other_dogs}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Control>
              </Form.Group>
              <Button variant="secondary" onClick={handleClearFilters} className="mt-3">
                Clear Filters
              </Button>
            </div>
          </Collapse>
        </Col>
        {filteredDogs.map((dog) => (
          <Col key={dog.id} md={4}>
            <Card className={`mb-4 ${dog.adoption_status === 'adopted' ? 'adopted-card' : ''}`}>
              <Card.Img
                 className={`card-img-custom ${dog.adoption_status === 'adopted' ? 'adopted-card-img' : ''}`}
                variant="top"
                src={dog.featured_image}
              />
              <Card.Body>
                <Card.Title>{dog.name}</Card.Title>
                <Card.Text>{dog.breed} {dog.age} years old</Card.Text>
                <Button
                  as={Link}
                  to={`/dogs/${dog.id}`}
                  variant={dog.adoption_status === 'adopted' ? 'secondary' : 'primary'}
                  className={dog.adoption_status === 'adopted' ? 'adopted-button' : ''}
                  disabled={dog.adoption_status === 'adopted'}
                >
                  {dog.adoption_status === 'adopted' ? 'Found new home' : 'Read more about me'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DogsList;
