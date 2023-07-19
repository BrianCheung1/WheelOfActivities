import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import { useSelector } from "react-redux"

const Profile = () => {
  const user = useSelector(({ user }) => user)

  return (
    <Container fluid className="test">
      <Row
        style={{ height: "50vh" }}
        className="justify-content-center align-items-center"
      >
        <Col xs={10} md={6} lg={4}>
          <Card className="text-center">
            <Card.Header as="h5">
              {user.name[0].toUpperCase() + user.name.slice(1)}'s Profile
            </Card.Header>
          </Card>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Basice Profile Info</Accordion.Header>
              <Accordion.Body>Name: {user.name}</Accordion.Body>
              <Accordion.Body>Username: {user.username}</Accordion.Body>
              <Accordion.Body>ID: {user.id}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Stats</Accordion.Header>
              <Accordion.Body>Total Spins: {user.spins}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}
export default Profile
