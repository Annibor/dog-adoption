import { Card, Button, Alert, Spinner } from 'react-bootstrap';

const AdoptionApplicationList = ({ applications, loading, error, onUnapply }) => {
  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!applications || applications.length === 0) {
    return <Alert variant="info">No adoption applications to display.</Alert>;
  }

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
              onClick={() => onUnapply(application.id)}
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
