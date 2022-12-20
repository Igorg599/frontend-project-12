import { Box } from "@mui/material"
import { useMemo, useContext, useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  appChannelsSelector,
  actions as actionsChannels,
} from "store/channelSlice"
import { appMessagesSelector } from "store/messageSlice"
import { SocketContext } from "context/socketContext"
import Channels from "./Channels"
import Messages from "./Messages"

const Chat = () => {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  const { channels, activeChannelId } = useSelector(appChannelsSelector)
  const { messages } = useSelector(appMessagesSelector)

  const activeChannel = useMemo(() => {
    if (channels.length > 0) {
      return channels.find((item) => item.id === activeChannelId)
    }
    return null
  }, [activeChannelId, channels])

  const handleAddNewChannel = useCallback((channel) => {
    dispatch(actionsChannels.addChannel(channel))
  }, [])

  const handleRenameChannel = useCallback((props) => {
    dispatch(actionsChannels.renameChannel(props))
  }, [])

  const handleRemoveChannel = useCallback((props) => {
    dispatch(actionsChannels.removeChannel(props))
  }, [])

  useEffect(() => {
    socket.on("newChannel", handleAddNewChannel)
    socket.on("renameChannel", handleRenameChannel)
    socket.on("removeChannel", handleRemoveChannel)

    return () => {
      socket.off("newChannel", handleAddNewChannel)
      socket.off("renameChannel", handleRenameChannel)
      socket.off("removeChannel", handleRemoveChannel)
    }
  }, [handleAddNewChannel, handleRenameChannel, handleRemoveChannel])

  return (
    <Box style={{ display: "flex", height: "100%" }}>
      <Channels channels={channels} activeChannelId={activeChannelId} />
      <Messages messages={messages} currentChannel={activeChannel} />
    </Box>
  )
}

export default Chat
