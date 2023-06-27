import { useDispatch } from "react-redux"

import { initializeWheels } from "../reducers/wheels"
import { initializeUsers } from "../reducers/users"
import { initUser } from "../reducers/user"
import { useState } from "react"

export const useInitialization = () => {
  const dispatch = useDispatch()

  return () => {
    dispatch(initializeWheels())
    dispatch(initializeUsers())
    dispatch(initUser())
  }
}

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
