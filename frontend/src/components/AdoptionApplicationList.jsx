import { Card, Button, Alert, Spinner } from 'react-bootstrap';

// Renders a list of adoption applications
const AdoptionApplicationList = ({ applications, loading, error, onUnapply }) => {
  // If loading is true, display a spinner
  if (loading) return <Spinner animation="border" variant="primary" />;

  // If there's an error, display an alert with the error message
  if (error) return <Alert variant="danger">{error}</Alert>;

  // If there are no applications, display an info alert
  if (!applications || applications.length === 0) {
    return <Alert variant="info">No adoption applications to display.</Alert>;
  }

  // Render the list of applications
  return (
    <div>
      <h2>Your Adoption Applications</h2>
      {applications.map(application => (
        <Card key={application.id} className="mb-3">
          <Card.Body>
            <Card.Title>{application.dog.name}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {new Date(application.visit_date).toLocaleString()}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong> {application.status}
            </Card.Text>
            <Button
              variant="danger"
              onClick={() => {
                onUnapply(application.id, application.dog, application.user)}}
            >
              Unapply
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AdoptionApplicationList;
