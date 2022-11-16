import { Box } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '../styled'

const Channels = ({ channels, activeChannelId, setActiveChannelId }) => (
  <Box style={styled.channels}>
    <Box style={styled.title}>
      <Box>Каналы</Box>
      <AddCircleOutlineIcon color="primary" />
    </Box>
    {channels.length > 0 && (
      <ul>
        {channels.map((item) => (
          <li
            style={{
              ...styled.listItem,
              backgroundColor: activeChannelId === item.id ? '#5c636a' : '#FFFAFA',
              color: activeChannelId === item.id ? '#fff' : '#000'
            }}
            key={item.id}
          >
            <button type="button" onClick={() => setActiveChannelId(item.id)} style={styled.button}>
              #
              {' '}
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    )}
  </Box>
)

export default Channels
