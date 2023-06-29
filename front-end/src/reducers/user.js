import { createSlice } from "@reduxjs/toolkit"

import loginService from "../services/login"
import storageService from "../services/storage"
import { notify } from "./notification"
import userService from "../services/users"

const initialState = null

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    },
  },
})

export const { set, clear, alter } = slice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      dispatch(set(user))
      dispatch(notify(`Welcome ${user.name}`))
    } catch (exception) {
      dispatch(notify(`${exception.response.data.error}`, "danger"))
      return exception.response.data.error
    }
  }
}

export const signUpUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await userService.create(credentials)
      dispatch(notify(`Successfully Created Account`))
    } catch (exception) {
      dispatch(notify(`${exception.response.data.error}`, "danger"))
      return exception.response.data.error
    }
  }
}

export const updateUserSpins = (id) => {
  return async (dispatch) => {
    try {
      const user = await userService.updateSpins(id)
      const user2 = storageService.loadUser()
      user2.spins = user.spins
      storageService.saveUser(user2)
      dispatch(notify(`Successfully Updated Spins`))
      dispatch(set(user))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const initUser = () => {
  return async (dispatch) => {
    const user = storageService.loadUser()
    dispatch(set(user))
  }
}

export const clearUser = () => {
  return async (dispatch) => {
    storageService.removeUser()
    dispatch(clear())
  }
}

export default slice.reducer
