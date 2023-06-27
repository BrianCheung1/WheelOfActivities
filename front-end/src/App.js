import { useState } from "react"
import Navigationbar from "./components/Navbar"
import SpinWheel from "./components/SpinWheel"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"

const App = () => {
  const [notification, setNotification] = useState("")
  const [type, setType] = useState("primary")

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification("")
    }, 3000)
  }

  return (
    <div>
      <Navigationbar />
      <Notification message={notification} type={type} />
      <LoginForm />
      <SpinWheel handleNotification={handleNotification} />
    </div>
  )
}

export default App
