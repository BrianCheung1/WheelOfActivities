import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ActivitesForm = ({handleSubmit }) => {
  return (
    <Container fluid className="test">
      <Row >
        <Col className="text-center">
          <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
              <Form.Label>Activity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Activity"
                id="activity"
              />
              {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Activity
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ActivitesForm
