import * as React from "react"
import Navigationbar from "./components/Navbar"
import Wheel from "./components/Wheel"
import SpinWheel from "./components/SpinWheel"
import wheelsService from "./services/wheels"

const test = async () => {
  const notes = await wheelsService.getAll()
  console.log(notes)
}
const App = () => {
  return (
    <div>
      <Navigationbar />
      {/* <Wheel /> */}
      <SpinWheel />
      {<button onClick={()=>test()}>test</button>}
    </div>
  )
}

export default App
