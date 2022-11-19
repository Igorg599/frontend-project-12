/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
}

export const { reducer, actions } = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    initUser: (state, { payload }) => {
      state.currentUser = payload
    },
  },
})

export const appUserSelector = ({ user }) => user

export default reducer
