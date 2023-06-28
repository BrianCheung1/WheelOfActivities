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
    <Container fluid>
      <Navbar
        collapseOnSelect
        expand="lg"
        // className="bg-body-tertiary"
      >
        <Navbar.Brand href="">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="align-items-center">
            <Nav.Link href="/">Wheel</Nav.Link>
            {!user && <Nav.Link href="/login">Login</Nav.Link>}
            {user && (
              <Nav.Link href={`/user-${user.id}`}>
                {user.name} logged in
              </Nav.Link>
            )}
            {user && (
              <Button variant="outline-danger" onClick={logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}
export default Navigationbar
