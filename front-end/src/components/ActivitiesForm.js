import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addWheel } from "../reducers/wheels"

const ActivitesForm = () => {
  const [content, setContent] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(addWheel({ content }))
    setContent("")
    event.target.activity.value = ""
  }

  return (
    <div className="activies-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Activity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Activity"
            id="activity"
            onChange={({ target }) => setContent(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Activity
        </Button>
      </Form>
    </div>
  )
}

export default ActivitesForm
