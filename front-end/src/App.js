import * as React from "react"
import Navigationbar from "./components/Navbar"
import SpinWheel from "./components/SpinWheel"

const App = () => {
  return (
    <div>
      <Navigationbar />
      {/* <Wheel /> */}
      <SpinWheel />
    </div>
  )
}

export default App
