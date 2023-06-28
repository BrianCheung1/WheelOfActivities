import { useState, useEffect } from "react"
import Navigationbar from "./components/Navbar"
import SpinWheel from "./components/SpinWheel"
import LoginForm from "./components/LoginForm"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useInitialization, useNotification } from "./hooks/index"
import { useSelector } from "react-redux"
import Profile from "./components/Profile"
import Notification from "./components/Notification"

const App = () => {
  const stateInitializer = useInitialization()
  const user = useSelector(({ user }) => user)
  const notifyWith = useNotification()
  useEffect(() => {
    stateInitializer()
  }, [])

  if (!user) {
    return (
      <>
        <Navigationbar />
        <Notification />
        <LoginForm />
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
      </Routes>
    </div>
  )
}

export default App
