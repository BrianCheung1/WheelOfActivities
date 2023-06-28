import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Accordion from "react-bootstrap/Accordion"

const Profile = () => {
  const id = useParams().id
  const user = useSelector(({ user }) => user)
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col xs={4}>
          <Card className="text-center">
            <Card.Header as="h5">
              {user.name[0].toUpperCase() + user.name.slice(1)}
            </Card.Header>
          </Card>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Basice Profile Info</Accordion.Header>
              <Accordion.Body>{user.name}</Accordion.Body>
              <Accordion.Body>{user.username}</Accordion.Body>
              <Accordion.Body>{user.id}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Stats</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}
export default Profile
