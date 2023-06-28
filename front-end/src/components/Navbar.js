import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"
import { useClearUser } from "../hooks"

const Navigationbar = () => {
  const user = useSelector(({ user }) => user)
  const clearUser = useClearUser()

  const logout = async () => {
    clearUser()
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      data-bs-theme="dark"
      bg="dark"
    >
      <Container fluid>
        <Navbar.Brand href="">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="align-items-center">
            <Nav.Link href="/">Wheel</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            {!user && <Nav.Link href="/login">Login</Nav.Link>}
            {user && (
              <Nav.Link>
                {user.name} logged in{" "}
                <Button variant="outline-danger" onClick={logout}>
                  Logout
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Navigationbar
