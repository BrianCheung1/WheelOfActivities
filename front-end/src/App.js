import { useEffect } from "react"
import Navigationbar from "./components/Navbar"
import SpinWheel from "./components/SpinWheel"
import LoginForm from "./components/LoginForm"
import { Routes, Route } from "react-router-dom"
import { useInitialization } from "./hooks/index"
import { useSelector } from "react-redux"
import Profile from "./components/Profile"
import Notification from "./components/Notification"
import SignUpForm from "./components/SignUpForm"
import Test from "./components/Test"

const App = () => {
  const stateInitializer = useInitialization()
  const user = useSelector(({ user }) => user)
  useEffect(() => {
    stateInitializer()
  }, [])

  if (!user) {
    return (
      <>
        <Navigationbar />
        <Notification />
        <Routes>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="*" element={<LoginForm />}></Route>
        </Routes>
      </>
    )
  }

  return (
    <div>
      <Navigationbar />
      <Notification />
      <Routes>
        <Route path="/" element={<SpinWheel />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path={`/user-${user.id}`} element={<Profile />}></Route>
        <Route path="*" element={<SpinWheel />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </div>
  )
}

export default App
