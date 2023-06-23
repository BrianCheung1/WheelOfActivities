import * as React from "react"
import Navigationbar from "./components/Navbar"
import Wheel from "./components/Wheel"
import SpinWheel from "./components/SpinWheel"

const App = () => {
  return (
    <div>
      <Navigationbar />
      <Wheel />
      <SpinWheel />
    </div>
  )
}

export default App
