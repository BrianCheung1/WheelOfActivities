import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addWheel } from "../reducers/wheels"

const ActivitesForm = ({ turning, setWheels, wheels }) => {
  const [content, setContent] = useState("")
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!user) {
      setWheels((wheels) => [...wheels, { content: content }])
    } else {
      dispatch(addWheel({ content }))
    }
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
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={turning}>
          Add Activity
        </Button>
      </Form>
    </div>
  )
}

export default ActivitesForm
