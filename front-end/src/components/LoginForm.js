import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container"
import { useField } from "../hooks"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../reducers/user"
import { useNavigate } from "react-router-dom"

// function MyVerticallyCenteredModal({ show, setUser, onHide }) {
//   const handleLogout = () => {
//     window.localStorage.removeItem("loggedWheelAppUser")
//     setUser("")
//     onHide()
//   }

//   return (
//     <Modal
//       show={show}
//       onHide={() => onHide}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={onHide}>Cancel</Button>
//         <Button onClick={() => handleLogout()}>Logout</Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }

const LoginForm = () => {
  const username = useField("text")
  const password = useField("password")
  const [modalShow, setModalShow] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username.value, password: password.value }))
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
