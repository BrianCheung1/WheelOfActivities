import { configureStore } from "@reduxjs/toolkit"

import wheelsReducer from "./reducers/wheels"
import usersReducer from "./reducers/users"
import userReducer from "./reducers/user"

const store = configureStore({
  reducer: {
    wheels: wheelsReducer,
    user: userReducer,
  },
})

export default store
