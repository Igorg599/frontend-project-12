import { Box, Button } from "@mui/material"
import { useState, useCallback, useContext } from "react"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { SocketContext } from "context/socketContext"
import ModalChannel from "components/ModalChannel"
import Popup from "components/Popup"
import styled from "../styled"

const ItemChannel = ({ item, activeChannelId, setActiveChannelId }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <li
      style={{
        ...styled.listItem,
        backgroundColor: activeChannelId === item.id ? "#5c636a" : "#FFFAFA",
      }}
    >
      <Button
        type="button"
        onClick={() => setActiveChannelId(item.id)}
        style={{
          ...styled.button,
          color: activeChannelId === item.id ? "#fff" : "#000",
        }}
      >
        # {item.name}
      </Button>
      {item.removable && (
        <>
          <Button
            style={styled.buttonArrow}
            type="button"
            onClick={handleClick}
          >
            <span style={{ display: "none" }}>Управление каналом</span>▼
          </Button>
          <Popup anchorEl={anchorEl} handleClose={handleClose} />
        </>
      )}
    </li>
  )
}

const Channels = ({ channels, activeChannelId, setActiveChannelId }) => {
  const socket = useContext(SocketContext)
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = useCallback(() => setOpenModal(true), [])
  const handleClose = useCallback(() => setOpenModal(false), [])

  const createNewChannel = useCallback(
    (channelName) => {
      return new Promise((resolve, reject) => {
        if (channelName.length < 3 || channelName.length > 20) {
          reject(new Error("От 3 до 20 символов"))
          return
        }
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
            <ItemChannel
              item={item}
              key={item.id}
              setActiveChannelId={setActiveChannelId}
              activeChannelId={activeChannelId}
            />
          ))}
        </ul>
      )}
    </Box>
  )
}

export default Channels
