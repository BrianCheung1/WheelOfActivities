import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import wheelServices from "../services/wheels"

const ActivitesForm = ({ setSlices, slices }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const activity = event.target.activity.value
    const addedActivity = await wheelServices.create({ content: activity })
    setSlices(slices.concat(addedActivity))
    event.target.activity.value = ""
  }

  return (
    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Activity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Activity"
            id="activity"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Activity
        </Button>
      </Form>
    </Col>
  )
}

export default ActivitesForm
