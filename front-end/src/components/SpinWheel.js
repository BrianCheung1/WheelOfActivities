import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import wheelServices from "../services/wheels"
import ActivitiesList from "./ActivitiesList"
import ActivitesForm from "./ActivitiesForm"

const Notification = ({ show, handleClose, winner }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Winner</Modal.Title>
      </Modal.Header>
      <Modal.Body>{winner.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const Wheel = ({ handleNotification }) => {
  const [slices, setSlices] = useState([])
  const [spinning, setSpinning] = useState(false)
  const [randomAngle, setRandomAngle] = useState(0)
  const [winner, setWinner] = useState("")
  const [show, setShow] = useState(false)
  const [turning, setTurning] = useState(false)
  const handleClose = () => setShow(false)
  const getInitialWheel = async () => {
    const wheel = await wheelServices.getAll()
    setSlices(wheel)
  }

  useEffect(() => {
    getInitialWheel()
  }, [])

  const spinWheel = () => {
    const newRandomAngle = Math.floor(Math.random() * 36 * 100)
    console.log(newRandomAngle)
    setRandomAngle(newRandomAngle)
    setSpinning(false)
    setTurning(true)
    // Delay the re-application of animation to ensure the reset animation is complete
    setTimeout(() => {
      setSpinning(true)
    }, 100)
    setWinner(
      slices.at(
        (Math.ceil(newRandomAngle / (360 / slices.length)) % slices.length) - 1
      )
    )
    setTimeout(() => {
      setShow(true)
      setTurning(false)
    }, 3100)
  }

  return (
    <Container fluid>
      <Row className="text-center justify-content-center">
        <ActivitesForm
          setSlices={setSlices}
          slices={slices}
          handleNotification={handleNotification}
        />
      </Row>
      <Row className="circle-container text-center justify-content-center">
        {slices.length === 1 ? (
          <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
            <div
              className={`circle ${spinning ? "spinning" : ""}`}
              style={{ "--randomAngle": `${randomAngle}deg` }}
            >
              {slices.toReversed().map((slice, index) => (
                <div className="slice" key={index}>
                  <div className="text">{slice.content}</div>
                </div>
              ))}
            </div>
          </Col>
        ) : (
          <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
            <div
              className={`circle ${spinning ? "spinning" : ""}`}
              style={{ "--randomAngle": `${randomAngle}deg` }}
            >
              {slices.toReversed().map((slice, index) => (
                <div
                  className="slice"
                  key={index}
                  style={{
                    transform: `rotate(${(360 / slices.length) * index}deg)`,
                    // backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                  }}
                >
                  <div
                    className="text"
                    style={{
                      transform: ` rotate(${360 / slices.length / 2}deg)`,
                    }}
                  >
                    {slice.content}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        )}
        <ActivitiesList
          slices={slices}
          setSlices={setSlices}
          handleNotification={handleNotification}
        />
      </Row>
      <Row className="text-center justify-content-center">
        <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
          <Button onClick={spinWheel} disabled={turning}>
            Spin the Wheel
          </Button>
          <Notification winner={winner} handleClose={handleClose} show={show} />
        </Col>
      </Row>
    </Container>
  )
}

export default Wheel
