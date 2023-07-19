import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Overlay from "react-bootstrap/Overlay"
import Tooltip from "react-bootstrap/Tooltip"
import { useField } from "../hooks"
import { useDispatch, useSelector } from "react-redux"
import { signUpUser } from "../reducers/user"
import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

const SignUpForm = () => {
  const username = useField("text")
  const password = useField("password")
  const name = useField("text")
  const [show, setShow] = useState(false)
  const target = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  const handleConfirmPassword = (event) => {
    const newConfirmPassword = event.target.value
    if (newConfirmPassword !== password.value) {
      setShow(true)
    } else {
      setShow(false)
    }
  }
  const handleSignup = async (event) => {
    event.preventDefault()

    const message = await dispatch(
      signUpUser({
        username: username.value,
        password: password.value,
        name: name.value,
      })
    )
    if (!message) {
      navigate("/login")
    }
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={8} md={6} lg={4} xl={3}>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control {...username} />
              <Form.Label>Name</Form.Label>
              <Form.Control {...name} />
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} />
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={handleConfirmPassword}
                ref={target}
                type="password"
              />
              <Overlay target={target.current} show={show} placement="bottom">
                <Tooltip id="overlay-example">Passwords must match</Tooltip>
              </Overlay>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Signup
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpForm
