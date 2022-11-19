import { configureStore } from "@reduxjs/toolkit"
import channelSlice from "./channelSlice"
import userSlice from "./userSlice"

export default configureStore({
  reducer: {
    channels: channelSlice,
    user: userSlice,
  },
})
