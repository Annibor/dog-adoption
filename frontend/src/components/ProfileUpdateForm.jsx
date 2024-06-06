
import { Form, Button, Col, Row } from 'react-bootstrap';

function ProfileUpdateForm() {

  /*const [updatedInfo, setUpdatedInfo] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    hasChildren: false,
    hasPets: false,
  });
  */

  return (
    <div>
      <Form className='m-2'>
        <Row>
          <Form.Group as={Col} controlId="FirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="First Name"
              name='firstName'
              /*value={updatedInfo.firstName}*/
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="LastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Last Name"
              name='lastName'
              /*value={updatedInfo.lastName}*/
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="Username">
            <Form.Label>Username</Form.Label>

            <Form.Control 
              type="text"
              placeholder="Username"
              name='username'
              /*value={updatedInfo.username}*/
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email"
              placeholder="Email"
              name='email'
              /*value={UpdatedInfo.email}*/
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Password"
              name='password'
              /*value={UpdatedInfo.password}*/
              required
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Address"
            name='address'
            /*value={address}*/
            required
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col} controlId="City">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text"
              placeholder="City"
              name='city'
              /*value={city}*/
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="State">
            <Form.Label>State</Form.Label>
            <Form.Control 
              type="text"
              placeholder="State"
              name='state'
              /*value={state}*/
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Zip">
            <Form.Label>Zip</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Zip"
              name='zip'
              /*value={zip}*/
              required
            />
          </Form.Group>
          <Form.Group controlId="Phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Phone"
              name='phone'
              /*value={phone} */
              required
            />
          </Form.Group>
        </Row>
        
        <Form.Group controlId="HasCildren">
          <Form.Check 
            type="checkbox"
            label="Has Children"
            name='hasChildren'
            /*value={haschildren}*/
            required
          />
        </Form.Group>
        <Form.Group controlId="HasPets">
          <Form.Check 
            type="checkbox"
            label="Has Pets"
            name='hasPets'
            /*value={haspets}*/
            required
          />
        </Form.Group>
        <Button type="submit" className='mt-3'>
          Update Profile information
        </Button>
      </Form>
      
    </div>
  )
}

export default ProfileUpdateForm
