import { Box } from "@mui/material"
import { useMemo, useState, useContext, useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  appChannelsSelector,
  actions as actionsChannels,
} from "store/channelSlice"
import { SocketContext } from "context/socketContext"
import Channels from "./Channels"
import Messages from "./Messages"

const Chat = () => {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  const { channels, messages } = useSelector(appChannelsSelector)
  const [activeChannelId, setActiveChannelId] = useState(1)

  const activeChannel = useMemo(() => {
    if (channels.length > 0) {
      return channels.find((item) => item.id === activeChannelId)
    }
    return null
  }, [activeChannelId, channels])

  const handleAddNewChannels = useCallback((channel) => {
    dispatch(actionsChannels.addChannel(channel))
    setActiveChannelId(channel.id)
  }, [])

  useEffect(() => {
    socket.on("newChannel", handleAddNewChannels)

    return () => {
      socket.off("newChannel", handleAddNewChannels)
    }
  }, [handleAddNewChannels])

  return (
    <Box style={{ display: "flex", height: "100%" }}>
      <Channels
        channels={channels}
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
      />
      <Messages messages={messages} currentChannel={activeChannel} />
    </Box>
  )
}

export default Chat
