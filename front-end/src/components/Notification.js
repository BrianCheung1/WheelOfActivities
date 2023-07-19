import { useSelector } from "react-redux"
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const Notification = () => {
  const message = useSelector(({ notification }) => notification)

  if (!message.message) {
    return
  }
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={6} md={4} className="notification-container">
          <Alert key={message.type} variant={message.type}>
            {message.message}
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default Notification
