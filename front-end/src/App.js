import { useState, useEffect } from "react"
import Navigationbar from "./components/Navbar"
import SpinWheel from "./components/SpinWheel"
import LoginForm from "./components/LoginForm"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useInitialization } from "./hooks/index"
import { useSelector } from "react-redux"

const App = () => {
  const stateInitializer = useInitialization()
  const user = useSelector(({ user }) => user)
  const navigate = useNavigate()
  useEffect(() => {
    stateInitializer()
  }, [])

  if (!user) {
    return (
      <>
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<SpinWheel />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  )
}

export default App
