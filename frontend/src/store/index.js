import { configureStore } from '@reduxjs/toolkit';
import channelSlice from './channelSlice';
import messageSlice from './messageSlice';

export default configureStore({
  reducer: {
    channels: channelSlice,
    messages: messageSlice,
  },
});
