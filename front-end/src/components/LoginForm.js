import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import loginService from "../services/login"
import wheelService from "../services/wheels"
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"

function MyVerticallyCenteredModal({ show, setUser, onHide }) {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedWheelAppUser")
    setUser("")
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={() => onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </Modal.Footer>
    </Modal>
  )
}

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedWheelAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      wheelService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with ", username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedWheelAppUser", JSON.stringify(user))
      wheelService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("error logging in")
    }
  }

  return (
    <Container fluid>
      <MyVerticallyCenteredModal
        show={modalShow}
        setUser={setUser}
        onHide={() => setModalShow(false)}
      />
      {user && (
        <p>
          {user.name} is logged in{" "}
          <Button onClick={() => setModalShow(true)}>Logout</Button>
        </p>
      )}
      {!user && (
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              id="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              id="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      )}
    </Container>
  )
}

export default LoginForm
