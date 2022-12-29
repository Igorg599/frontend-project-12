import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { appChannelsSelector } from 'store/channelSlice';
import { appMessagesSelector } from 'store/messageSlice';
import Channels from './Channels';
import Messages from './Messages';

const Chat = () => {
  const { channels, activeChannelId } = useSelector(appChannelsSelector);
  const { messages } = useSelector(appMessagesSelector);

  const activeChannel = useMemo(() => {
    if (channels.length > 0) {
      return channels.find((item) => item.id === activeChannelId);
    }
    return null;
  }, [activeChannelId, channels]);

  return (
    <Box style={{ display: 'flex', height: '100%' }}>
      <Channels channels={channels} activeChannelId={activeChannelId} />
      <Messages messages={messages} currentChannel={activeChannel} />
    </Box>
  );
};

export default Chat;
