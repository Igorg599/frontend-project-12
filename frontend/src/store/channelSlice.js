/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  channels: [],
  messages: [],
}

export const { reducer, actions } = createSlice({
  name: "appChannels",
  initialState,
  reducers: {
    initChannels: (state, { payload }) => {
      state.channels = payload.channels
      state.messages = payload.messages
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload)
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const channelId = Number(id)
      const newState = state.channels.map((item) => {
        if (item.id === channelId) {
          item.name = name
          return item
        }
        return item
      })
      state = newState
    },
  },
})

export const appChannelsSelector = ({ channels }) => channels

export default reducer
