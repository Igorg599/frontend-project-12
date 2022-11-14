/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  messages: [],
}

export const { reducer, actions } = createSlice({
  name: 'appChannels',
  initialState,
  reducers: {
    addChannel: (
      state,
      {
        payload,
      }
    ) => {
      state.channels = payload.channels
      state.messages = payload.messages
    },
  },
})

export const appChannelsSelector = ({ channels }) => channels

export default reducer
