import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
const Navigationbar = () => (
  <Navbar
    collapseOnSelect
    expand="lg"
    className="bg-body-tertiary"
    data-bs-theme="dark"
    bg="dark"
  >
    <Container fluid>
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Wheel</Nav.Link>
          <Nav.Link href="#features">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)
export default Navigationbar
