import React, { useState } from "react"

const Wheel = () => {
  const slices = ["1", "2", "3"]
  const [spinning, setSpinning] = useState(false)
  const [randomAngle, setRandomAngle] = useState(0)

  const spinWheel = () => {
    const newRandomAngle = Math.floor(Math.random() * 360)
    console.log(newRandomAngle)
    setRandomAngle(newRandomAngle)
    setSpinning(false)
    // Delay the re-application of animation to ensure the reset animation is complete
    setTimeout(() => {
      setSpinning(true)
    }, 100)
  }

  return (
    <div>
      <div
        className={`circle ${spinning ? "spinning" : ""}`}
        style={{ "--randomAngle": `${randomAngle}deg` }}
      >
        {slices.map((slice, index) => (
          <li
            key={index}
            style={{
              transform: `rotate(${(360 / slices.length) * index}deg) skewY(${
                360 / slices.length - 90
              }deg)`,
            }}
          >
            <div
              className="text"
              style={{
                transform: ` skewY(${
                  (360 / slices.length - 90) * -1
                }deg) rotate(${360 / slices.length / 2}deg) `,
              }}
            >
              {slice}
            </div>
          </li>
        ))}
      </div>
      <button onClick={spinWheel}>Spin the Wheel</button>
      <h2>Congratulations!</h2>
      <p>You landed on: {randomAngle % slices.length}</p>
    </div>
  )
}

export default Wheel
