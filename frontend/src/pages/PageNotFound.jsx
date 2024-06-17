import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Container className="text-center" style={{ marginTop: '100px' }}>
      <h1>Oops! Page Not Found</h1>
      <Button variant="primary" onClick={() => navigate(-1)} className="mt-3">
        Go Back
      </Button>
    </Container>
  );
}

export default PageNotFound;
