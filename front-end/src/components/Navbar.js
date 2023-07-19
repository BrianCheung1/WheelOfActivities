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
      >
        <Navbar.Brand href="/">Spin the Wheel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Nav.Link
              href="https://github.com/BrianCheung1/WheelOfActivities"
              target="_blank"
            >
              Github
            </Nav.Link>
            {!user && <Nav.Link href="/login">Login</Nav.Link>}
            {!user && <Nav.Link href="/signup">Signup</Nav.Link>}

            {user && <Nav.Link href={`/user-${user.id}`}>{user.name}</Nav.Link>}
            {user && (
              <Button variant="outline-danger" onClick={logout} style={{width: "50%"}}>
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
