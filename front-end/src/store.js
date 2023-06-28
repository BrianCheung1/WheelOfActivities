import { configureStore } from "@reduxjs/toolkit"

import wheelsReducer from "./reducers/wheels"
import usersReducer from "./reducers/users"
import userReducer from "./reducers/user"
import notificationReducer from "./reducers/notification"

const store = configureStore({
  reducer: {
    wheels: wheelsReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
})

export default store
