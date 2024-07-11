import {Card} from 'react-bootstrap';
import '../styling/profile.css';
function UserInfo() {
  return (
    <Card className='user-info-card shadow-sm p-3 mb-5 rounded'>
      <Card.Body>
        <Card.Title>Welcome to your profile page! </Card.Title>
        <Card.Text>
        Here, you can view and update your personal information, see the dogs you have liked, check your adoption applications, and review your event applications. Use the sections below to navigate through your details and make any necessary updates or changes.
        </Card.Text>
      </Card.Body>
      
    </Card>
  )
}

export default UserInfo