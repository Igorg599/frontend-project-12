import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { appChannelsSelector } from 'store/channelSlice';
import { appMessagesSelector } from 'store/messageSlice';
import Channels from './Channels';
import Messages from './Messages';

const Chat = () => {
  const { channels } = useSelector(appChannelsSelector);
  const [activeChannelId, setActiveChannelId] = useState(1);
  const { messages } = useSelector(appMessagesSelector);

  const activeChannel = useMemo(() => {
    if (channels.length > 0) {
      const active = channels.find((item) => item.id === activeChannelId);
      if (!active) {
        setActiveChannelId(1);
        return null;
      }
      return active;
    }
    return null;
  }, [activeChannelId, channels, setActiveChannelId]);

  return (
    <Box style={{ display: 'flex', height: '100%' }}>
      <Channels
        channels={channels}
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
      />
      <Messages
        messages={messages}
        currentChannel={activeChannel}
      />
    </Box>
  );
};

export default Chat;
