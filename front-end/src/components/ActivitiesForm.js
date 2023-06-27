import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import wheelServices from "../services/wheels"

const ActivitesForm = ({ setSlices, slices, handleNotification }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const activity = event.target.activity.value
    try {
      const addedActivity = await wheelServices.create({ content: activity })
      setSlices(slices.concat(addedActivity))
      handleNotification(`${addedActivity.content} added`, "success")
    } catch (exception) {
      console.log("Activites Form Error ", exception)
      handleNotification(`Error adding activity`, "danger")
    }
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
