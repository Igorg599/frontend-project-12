import { Box } from "@mui/material"
import { useState, useCallback, useContext } from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { SocketContext } from "context/socketContext"
import ModalChannel from "components/ModalChannel"
import styled from "../styled"

const Channels = ({ channels, activeChannelId, setActiveChannelId }) => {
  const socket = useContext(SocketContext)
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = useCallback(() => setOpenModal(true), [])
  const handleClose = useCallback(() => setOpenModal(false), [])

  const createNewChannel = useCallback(
    (channelName) => {
      return new Promise((resolve, reject) => {
        if (channels.find((item) => item.name === channelName)) {
          reject(new Error("Название канала должно быть уникальным"))
          return
        }
        try {
          socket.emit(
            "newChannel",
            {
              name: channelName,
            },
            (res) => {
              if (res.status === "ok") {
                resolve()
              }
            }
          )
        } catch (err) {
          reject(err)
        }
      })
    },
    [channels]
  )

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
      <ModalChannel
        open={openModal}
        handleClose={handleClose}
        callback={createNewChannel}
        type="create"
      />
      {channels.length > 0 && (
        <ul style={styled.list}>
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
              {item.removable && (
                <button style={styled.buttonArrow} type="button">
                  <span style={{ display: "none" }}>Управление каналом</span>▼
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </Box>
  )
}

export default Channels
