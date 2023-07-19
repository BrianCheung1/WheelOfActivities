import { useState } from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ActivitiesList from "./ActivitiesList"
import ActivitesForm from "./ActivitiesForm"
import { PieChart } from "react-minimal-pie-chart"

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

const SpinWheelGuest = () => {
  const [spinning, setSpinning] = useState(false)
  const [randomAngle, setRandomAngle] = useState(0)
  const [winner, setWinner] = useState("")
  const [show, setShow] = useState(false)
  const [turning, setTurning] = useState(false)
  const [wheels, setWheels] = useState([])
  const handleClose = () => setShow(false)

  const colors = ["#E38627", "#C13C37", "#6A2135", "#0000ff "]

  const fixedWheels = wheels.map((v, index) => ({
    ...v,
    value: 1,
    color: colors[index % 4],
  }))
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  }

  const spinWheel = () => {
    let newRandomAngle = Math.floor(Math.random() * 360 * 100)
    setRandomAngle(newRandomAngle)
    setSpinning(false)
    setTurning(true)
    // Delay the re-application of animation to ensure the reset animation is complete
    setTimeout(() => {
      setSpinning(true)
    }, 100)
    const angle = 360 / fixedWheels.length
    let count = fixedWheels.length - 1
    while (newRandomAngle % 360 > angle) {
      count -= 1
      newRandomAngle -= angle
    }
    setWinner(fixedWheels.at(count))
    setTimeout(() => {
      setShow(true)
      setTurning(false)
    }, 3100)
  }

  return (
    <Container fluid>
      {console.log(wheels)}
      <Row className="circle-container text-center justify-content-center align-items-center">
        <Col xs={11} md={8} lg={8} xl={6}>
          <Notification winner={winner} handleClose={handleClose} show={show} />

          <div
            className={`circle ${spinning ? "spinning" : ""}`}
            style={{ "--randomAngle": `${randomAngle}deg` }}
          >
            <PieChart
              data={fixedWheels}
              label={({ dataEntry }) =>
                dataEntry.content.length > 10
                  ? dataEntry.content.substring(0, 9) + "..."
                  : dataEntry.content
              }
              labelStyle={{
                ...defaultLabelStyle,
              }}
            />
          </div>
        </Col>
 
          <Col xs={1}>
            <div className="arrow spin-button"></div>
          </Col>

        <Col xs={8} md={4}>
          <Button onClick={spinWheel} disabled={turning || wheels.length < 1}>
            Spin the Wheel
          </Button>
          <ActivitesForm
            turning={turning}
            setWheels={setWheels}
            wheels={wheels}
          />
          <ActivitiesList wheels={wheels} setWheels={setWheels} turning={turning}/>
        </Col>
      </Row>
    </Container>
  )
}

export default SpinWheelGuest
