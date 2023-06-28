import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import { useField } from "../hooks"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../reducers/user"
import { useNotification } from "../hooks/index"

const LoginForm = () => {
  const username = useField("text")
  const password = useField("password")
  const [modalShow, setModalShow] = useState(false)

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(
        loginUser({ username: username.value, password: password.value })
      )
    } catch (e) {
      notifyWith("Wrong username or password", "danger")
    }
  }

  return (
    <Container fluid>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control {...username} />
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default LoginForm
