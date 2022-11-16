import { Box } from '@mui/material'
import styled from '../styled'

const Messages = ({ activeChannel, messages }) => (
  <Box style={styled.messagesContainer}>
    <Box style={styled.messagesHeader}>
      <Box style={{ fontWeight: 600 }}>
        #
        {' '}
        {activeChannel && activeChannel.name}
      </Box>
      <Box style={{ marginTop: 5 }}>
        {messages.length}
        {' '}
        сообщений
      </Box>
    </Box>
  </Box>
)

export default Messages
