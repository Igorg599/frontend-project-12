/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

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
})

export const appMessagesSelector = ({ messages }) => messages

export default reducer
