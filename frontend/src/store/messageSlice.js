/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import { actions as actionsChannels } from "./channelSlice"

const initialState = {
  messages: [],
}

export const { reducer, actions } = createSlice({
  name: "appMessages",
  initialState,
  reducers: {
    initMessages: (state, { payload }) => {
      state.messages = payload
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      actionsChannels.removeChannel,
      (state, { payload: { id } }) => {
        const channelId = Number(id)
        state.messages = state.messages.filter((m) => m.channelId !== channelId)
      }
    )
  },
})

export const appMessagesSelector = ({ messages }) => messages

export default reducer
