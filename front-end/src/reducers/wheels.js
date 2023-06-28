import wheelService from "../services/wheels"

import { createSlice } from "@reduxjs/toolkit"
import { notify } from "./notification"

const slice = createSlice({
  name: "wheels",
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
    remove(state, { payload }) {
      return state.filter((s) => s.id !== payload)
    },
    alter(state, { payload }) {
      return state.map((s) => (s.id !== payload.id ? s : payload))
    },
  },
})

const { set, add, remove, alter } = slice.actions

export const initializeWheels = () => {
  return async (dispatch) => {
    const data = await wheelService.getAll()
    dispatch(set(data))
  }
}

export const addWheel = (object) => {
  return async (dispatch) => {
    try {
      const data = await wheelService.create(object)
      dispatch(add(data))
      dispatch(notify(`successfully added ${object.content}`))
    } catch (e) {
      dispatch(notify(`${e.response.data.error}`, "danger"))
    }
  }
}

export const updateWheel = (object) => {
  return async (dispatch) => {
    const data = await wheelService.update(object)
    dispatch(alter(data))
  }
}

export const removeWheel = (object) => {
  return async (dispatch) => {
    try {
      await wheelService.remove(object.id)
      dispatch(remove(object.id))
      dispatch(notify(`successfully added ${object.content}`))
    } catch (e) {
      dispatch(notify(`${e.response.data.error}`, "danger"))
    }
  }
}

export default slice.reducer
