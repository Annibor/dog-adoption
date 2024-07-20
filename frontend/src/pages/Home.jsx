import { Container, Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import homeImage from '../images/homeimage.jpg'
import { useCurrentUser } from '../contexts/CurrentUserContext';

function Home() {
    // Get the current user from the CurrentUserContext
    const { currentUser } = useCurrentUser();

    // Define pages accessible to logged-in users
  const pages = [
    { path: '/dogs', text: 'View Dogs', description: 'Browse our list of adorable dogs available for adoption.' },
    { path: '/profile', text: 'Profile', description: 'View and update your profile information.' },
    { path: '/events', text: 'Events', description: 'Check out upcoming adoption events.' },
  ];

  // Define pages accessible to non-logged-in users
  const authPages = [
    { path: '/login', text: 'Login', description: 'Access your account by logging in.' },
    { path: '/register', text: 'Register', description: 'Create a new account to join us.' },
  ];

  return (
    <div className="bg-light text-dark min-vh-100">
      <Container className="py-5" style={{ maxWidth: '800px' }}>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-left">
            <h1 className="display-4">Welcome to Dog Adoption</h1>
            <p className="lead">
              Find your perfect furry friend and give them a loving home.
            </p>
          </Col>
          <Col md={6} className="text-center">
            <img
            src={homeImage}
            alt="Two dogs happily runnign with eachother"
            aria-label="Image showing two dogs happily running"
            className="img-fluid rounded"
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
           {/* Conditionally render pages based on whether the user is logged in */}
        {currentUser ? (
          // Render links for logged-in users
            pages.map((page, index) => (
              <Col md={12} key={page.path} className="mb-4">
                <div className={`d-flex flex-column flex-md-row align-items-center justify-content-between ${index % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}>
                  <p className="mb-2 mb-md-0" style={{ flexGrow: 1, textAlign: 'center', margin: '10px' }}>{page.description}</p>
                  <Button as={Link} to={page.path} variant="primary" className="flex-shrink-0" style={{ width: '150px' }}>
                    {page.text}
                  </Button>
                </div>
              </Col>
            ))
          ) : (
            // Render links for non-logged-in users
            authPages.map((page, index) => (
              <Col md={12} key={page.path} className="mb-4">
                <div className={`d-flex flex-column flex-md-row align-items-center justify-content-between ${index % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}>
                  <p className="mb-2 mb-md-0" style={{ flexGrow: 1, textAlign: 'center', margin: '10px' }}>{page.description}</p>
                  <Button as={Link} to={page.path} variant="primary" className="flex-shrink-0" style={{ width: '150px' }}>
                    {page.text}
                  </Button>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
