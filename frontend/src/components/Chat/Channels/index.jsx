import { Box } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '../styled'

const Channels = ({ channels }) => (
  <Box style={styled.channels}>
    <Box style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 10 }}>
      <Box>Каналы</Box>
      <AddCircleOutlineIcon color="primary" />
    </Box>
    {channels.length && (
      <ul>
        {channels.map((item) => (
          <li style={{ listStyleType: 'none' }} key={item.id}>
            #
            {' '}
            {item.name}
          </li>
        ))}
      </ul>
    )}
  </Box>
)

export default Channels
