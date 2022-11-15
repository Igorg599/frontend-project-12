import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { appChannelsSelector } from '../../store/channelSlice'
import Channels from './Channels'

const Chat = () => {
  const { channels } = useSelector(appChannelsSelector)
  const [activeChannels, setActiveChannels] = useState(0)

  useEffect(() => {
    if (channels.length) {
      setActiveChannels(channels[0].id)
    }
  }, [channels])

  return (
    <Box style={{ display: 'flex', height: '100%' }}>
      <Channels
        channels={channels}
        activeChannels={activeChannels}
        setActiveChannels={setActiveChannels}
      />
    </Box>
  )
}

export default Chat
