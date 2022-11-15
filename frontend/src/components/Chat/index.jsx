import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { appChannelsSelector } from '../../store/channelSlice'
import Channels from './Channels'

const Chat = () => {
  const { channels, messages } = useSelector(appChannelsSelector)
  console.log(channels, messages)

  return (
    <Box style={{ display: 'flex', height: '100%' }}>
      <Channels channels={channels} />
    </Box>
  )
}

export default Chat
