import { Box } from "@mui/material"
import { useState, useCallback } from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import ModalChannel from "components/ModalChannel"
import styled from "../styled"

const Channels = ({ channels, activeChannelId, setActiveChannelId }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = useCallback(() => setOpenModal(true), [])
  const handleClose = useCallback(() => setOpenModal(false), [])

  return (
    <Box style={styled.channels}>
      <Box style={styled.title}>
        <Box>Каналы</Box>
        <AddCircleOutlineIcon
          color="primary"
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
        />
      </Box>
      <ModalChannel open={openModal} handleClose={handleClose} type="create" />
      {channels.length > 0 && (
        <ul>
          {channels.map((item) => (
            <li
              style={{
                ...styled.listItem,
                backgroundColor:
                  activeChannelId === item.id ? "#5c636a" : "#FFFAFA",
                color: activeChannelId === item.id ? "#fff" : "#000",
              }}
              key={item.id}
            >
              <button
                type="button"
                onClick={() => setActiveChannelId(item.id)}
                style={styled.button}
              >
                # {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Box>
  )
}

export default Channels
