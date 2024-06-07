import {Card} from 'react-bootstrap';
import '../styling/profile.css';
function UserInfo() {
  return (
    <Card className='user-info-card shadow-sm p-3 mb-5 rounded'>
      <Card.Body>
        <Card.Title>Username</Card.Title>
        <Card.Text>
        Here will be userInformation
        like name
        number
        ect
        </Card.Text>
       
      </Card.Body>
      
    </Card>
  )
}

export default UserInfo

