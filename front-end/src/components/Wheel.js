import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { useState } from "react"
import Container from "react-bootstrap/esm/Container"
import ActivitesForm from "./ActivitiesForm"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"

const Notification = ({ show, handleClose, winner }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Winner</Modal.Title>
      </Modal.Header>
      <Modal.Body>{winner}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const Wheel = () => {
  const [options, setOptions] = useState([])
  const [winner, setWinner] = useState("")
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const activity = event.target.activity.value
    setOptions(options.concat(activity))
    event.target.activity.value = ""
  }
  const randomWinner = (event) => {
    event.preventDefault()
    const random = Math.floor(Math.random() * options.length)
    setWinner(options[random])
    setShow(true)
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={8} sm={6} md={4} lg={4} xl={4} xxl={4}>
          <Notification show={show} handleClose={handleClose} winner={winner} />
          <ActivitesForm setOptions={setOptions} handleSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={10} lg={8} xl={8} xxl={8}>
          {options.length > 0 ? (
            <Button onClick={randomWinner}>Pick a winner</Button>
          ) : (
            ""
          )}
          <ListGroup>
            {options.map((option) => (
              <ListGroup.Item key={option}>{option}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Wheel
