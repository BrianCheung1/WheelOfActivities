import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import loginService from "../services/login"
import wheelService from "../services/wheels"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
    <div>
      {user && <p>{user.name} is logged in</p>}
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
    </div>
  )
}

export default LoginForm
