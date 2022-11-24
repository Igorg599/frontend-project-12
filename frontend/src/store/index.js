import { configureStore } from "@reduxjs/toolkit"
import channelSlice from "./channelSlice"
import messageSlice from "./messageSlice"
import userSlice from "./userSlice"

export default configureStore({
  reducer: {
    channels: channelSlice,
    messages: messageSlice,
    user: userSlice,
  },
})
