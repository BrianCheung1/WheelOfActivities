import { useState } from "react"
import { useSelector } from "react-redux"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ActivitiesList from "./ActivitiesList"
import ActivitesForm from "./ActivitiesForm"
import { updateUserSpins } from "../reducers/user"
import { useDispatch } from "react-redux"
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

const SpinWheel = () => {
  const [spinning, setSpinning] = useState(false)
  const [randomAngle, setRandomAngle] = useState(0)
  const [winner, setWinner] = useState("")
  const [show, setShow] = useState(false)
  const [turning, setTurning] = useState(false)
  const handleClose = () => setShow(false)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  let wheels = useSelector(({ wheels }) =>
    [...wheels].filter((wheel) =>
      wheel.user.username === user.username ? wheel : ""
    )
  )

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
    const newRandomAngle = Math.floor(Math.random() * 36 * 100)
    console.log(newRandomAngle)
    setRandomAngle(newRandomAngle)
    setSpinning(false)
    setTurning(true)
    // Delay the re-application of animation to ensure the reset animation is complete
    setTimeout(() => {
      setSpinning(true)
    }, 100)
    // setWinner(
    //   fixedWheels.at(
    //     (Math.ceil(newRandomAngle / (360 / fixedWheels.length)) %
    //       fixedWheels.length) -
    //       1
    //   )
    // )
    setWinner(
      fixedWheels.at(
        Math.ceil(newRandomAngle / (360 / fixedWheels.length)) %
          fixedWheels.length
      )
    )
    setTimeout(() => {
      setShow(true)
      setTurning(false)
      dispatch(updateUserSpins(user.id))
    }, 3100)
  }

  return (
    <Container fluid>
      <Row className="circle-container text-center justify-content-center">
        {/* {wheels.length === 1 ? (
          <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto">
            <Button onClick={spinWheel} disabled={turning || wheels.length < 1}>
              Spin the Wheel
            </Button>
            <Notification
              winner={winner}
              handleClose={handleClose}
              show={show}
            />
            <div
              className={`circle ${spinning ? "spinning" : ""}`}
              style={{ "--randomAngle": `${randomAngle}deg` }}
            >
              {wheels.toReversed().map((slice, index) => (
                <div className="slice" key={index}>
                  <div className="text">{slice.content}</div>
                </div>
              ))}
            </div>
          </Col>
        ) : ( */}
        <Col xs={5}>
          <Button onClick={spinWheel} disabled={turning || wheels.length < 1}>
            Spin the Wheel
          </Button>
          <Notification winner={winner} handleClose={handleClose} show={show} />
          <div
            className={`circle ${spinning ? "spinning" : ""}`}
            style={{ "--randomAngle": `${randomAngle}deg` }}
          >
            {/* {wheels.toReversed().map((slice, index) => (
                <div
                  className="slice"
                  key={index}
                  style={{
                    transform: `rotate(${(360 / wheels.length) * index}deg)`,
                    // backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                  }}
                >
                  <div
                    className="text"
                    style={{
                      transform: ` rotate(${360 / wheels.length / 2}deg)`,
                    }}
                  >
                    {slice.content}
                  </div>
                </div>
              ))} */}
            <PieChart
              data={fixedWheels}
              label={({ dataEntry }) => dataEntry.content}
              labelStyle={{
                ...defaultLabelStyle,
              }}
            />
          </div>
        </Col>
        {/* )} */}

        <Col xs="auto">
          <ActivitesForm />
          <ActivitiesList wheels={wheels} />
        </Col>
      </Row>
    </Container>
  )
}

export default SpinWheel
