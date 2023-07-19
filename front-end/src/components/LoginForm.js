import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useField } from "../hooks"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../reducers/user"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const LoginForm = () => {
  const username = useField("text")
  const password = useField("password")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    const message = await dispatch(
      loginUser({ username: username.value, password: password.value })
    )
    if (!message) {
      navigate("/")
    }
  }

  const handleSignup = async (event) => {
    navigate("/signup")
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={8} md={6} lg={4} xl={3}>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control {...username} />
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} />
            </Form.Group>

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>
              <Button variant="primary" onClick={handleSignup}>
                Signup
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
