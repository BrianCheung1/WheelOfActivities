import * as React from "react"
import Navigationbar from "./components/Navbar"
import SpinWheel from "./components/SpinWheel"
import LoginForm from "./components/LoginForm"

const App = () => {
  return (
    <div>
      <Navigationbar />
      {/* <Wheel /> */}
      <LoginForm />
      <SpinWheel />
    </div>
  )
}

export default App
