/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: 1,
};

export const { reducer, actions } = createSlice({
  name: 'appChannels',
  initialState,
  reducers: {
    initChannels: (state, { payload }) => {
      state.channels = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.activeChannelId = payload.id;
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const channelId = Number(id);
      const newState = state.channels.map((item) => {
        if (item.id === channelId) {
          item.name = name;
          return item;
        }
        return item;
      });
      state = newState;
    },
    removeChannel: (state, { payload: { id } }) => {
      const channelId = Number(id);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.activeChannelId = 1;
    },
    changeActiveChannelId: (state, { payload }) => {
      state.activeChannelId = payload;
    },
  },
});

export const appChannelsSelector = ({ channels }) => channels;

export default reducer;
